import {useLoaderData, data} from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import { CartMain } from '~/components/CartMain';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: `DailyGoli | Cart` }];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({ actionHeaders }) => actionHeaders;

/**
 * @param {Route.ActionArgs}
 */
export async function action({ request, context }) {
  const { cart } = context;

  const formData = await request.formData();

  const { action, inputs } = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const rawCode = inputs.discountCode;

      // User inputted discount code (trimmed: pasted codes often carry whitespace)
      const formDiscountCode =
        typeof rawCode === 'string' ? rawCode.trim() : null;

      // Combine new + already-applied codes, deduplicated
      // (re-applying the same code sends duplicates, which Shopify rejects)
      const seen = new Set();
      const discountCodes = [];
      for (const code of [
        ...(formDiscountCode ? [formDiscountCode] : []),
        ...inputs.discountCodes,
      ]) {
        if (typeof code !== 'string') continue;
        const key = code.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          discountCodes.push(code);
        }
      }

      result = await cart.updateDiscountCodes(discountCodes);

      // Mutation responses use a minimal cart fragment (no discountCodes),
      // so re-read the full cart to verify the code actually stuck.
      // Shopify marks unknown codes inapplicable without an error,
      // so surface it explicitly instead of failing silently.
      if (formDiscountCode) {
        try {
          const freshCart = await cart.get();
          const applicableCodes = (freshCart?.discountCodes ?? [])
            .filter((discount) => discount.applicable)
            .map((discount) => discount.code.toLowerCase());
          if (!applicableCodes.includes(formDiscountCode.toLowerCase())) {
            result.errors = [
              ...(result.errors ?? []),
              {
                message: `"${formDiscountCode}" could not be applied. Check the code and try again.`,
              },
            ];
          }
        } catch {
          // Verification read failed: don't block the purchase with a guess.
        }
      }
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;

      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

      result = await cart.addGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove: {
      const appliedGiftCardIds = inputs.giftCardCodes;
      result = await cart.removeGiftCardCodes(appliedGiftCardIds);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const { cart: cartResult, errors, warnings } = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  const checkout = formData.get('checkout') === 'true';
  if (checkout && result?.cart?.checkoutUrl) {
    status = 303;
    headers.set('Location', result.cart.checkoutUrl);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    { status, headers },
  );
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  const { cart } = context;
  return await cart.get();
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <main className=" bg-white text-(--color-primary)">
      <CartMain layout="page" cart={cart} />
    </main>
  );
}

/** @typedef {import('react-router').HeadersFunction} HeadersFunction */
/** @typedef {import('./+types/cart').Route} Route */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
