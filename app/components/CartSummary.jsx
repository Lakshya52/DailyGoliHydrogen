import { CartForm, Money } from '@shopify/hydrogen';
import { useEffect, useId, useRef, useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({ cart, layout }) {
  const summaryId = useId();
  const discountsHeadingId = useId();
  const discountCodeInputId = useId();
  const giftCardHeadingId = useId();
  const giftCardInputId = useId();

  const containerClass = layout === 'page'
    ? 'bg-(--white) rounded-2xl border border-(--color-primary)/20 p-6 md:p-8 lg:sticky lg:top-[18dvh]'
    : 'cart-summary-aside';

  return (
    <div aria-labelledby={summaryId} className={containerClass}>
      <div>
        <h2 id={summaryId} className={layout === 'page' ? 'text-2xl font-bold text-(--color-primary) mb-4' : ''}>
          Order Summary
        </h2>
      </div>

      {/* Subtotal */}
      <div>
        <dl role="group" className="space-y-3">
          <div className="flex justify-between items-center pb-3">
            <dt className="text-(--color-primary) opacity-70">Subtotal</dt>
            <dd className="font-semibold text-(--color-primary)">
              {cart?.cost?.subtotalAmount?.amount ? (
                <Money data={cart?.cost?.subtotalAmount} />
              ) : (
                '-'
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Discounts Section */}
      <CartDiscounts
        discountCodes={cart?.discountCodes}
        discountsHeadingId={discountsHeadingId}
        discountCodeInputId={discountCodeInputId}
      />

      {/* Gift Cards Section */}
      <div className="mt-5">
        <CartGiftCard
          giftCardCodes={cart?.appliedGiftCards}
          giftCardHeadingId={giftCardHeadingId}
          giftCardInputId={giftCardInputId}
        />
      </div>

      {/* Totals */}
      <div className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <dt className="text-lg font-semibold text-(--color-primary)">Total</dt>
          <dd className="text-2xl font-bold text-(--color-primary)">
            {cart?.cost?.totalAmount?.amount ? (
              <Money data={cart?.cost?.totalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
        {cart?.cost?.totalTaxAmount?.amount && (
          <p className="text-sm text-(--color-primary) opacity-70 text-right mb-4">
            Tax included in total
          </p>
        )}
      </div>

      {/* Checkout Actions */}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({ checkoutUrl }) {
  if (!checkoutUrl) return null;

  return (
    <div className="space-y-3">
      <a
        href={checkoutUrl}
        target="_self"
        className="block w-full bg-(--color-primary) hover:opacity-80 text-(--white) font-lex-med py-3 px-4 rounded-xl text-center transition duration-200"
      >
        Proceed to Checkout
      </a>
      <a
        href="/#product"
        className="block w-full border border-(--color-primary) hover:bg-(--color-primary)/5 text-(--color-primary) font-lex-med py-3 px-4 rounded-xl text-center transition duration-200"
      >
        Continue Shopping
      </a>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 *   discountsHeadingId: string;
 *   discountCodeInputId: string;
 * }}
 */
function CartDiscounts({
  discountCodes,
  discountsHeadingId,
  discountCodeInputId,
}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  return (
    <section aria-label="Discounts" className="">
      {/* Show applied discount codes */}
      <div hidden={!codes.length}>
        <h3 id={discountsHeadingId} className="text-sm font-semibold text-(--color-primary) mb-2">
          Applied Discount
        </h3>
        <UpdateDiscountForm>
          <div
            className="flex items-center justify-between bg-(--accent) bg-opacity-20 border border-(--accent) rounded px-3 py-2"
            role="group"
            aria-labelledby={discountsHeadingId}
          >
            <code className="text-sm font-medium text-(--color-primary)">
              ✓ {codes?.join(', ')}
            </code>
            <button
              type="submit"
              aria-label="Remove discount"
              className="text-(--accent) hover:text-(--color-primary) text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </UpdateDiscountForm>
      </div>

      {/* Input to apply discount code */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2 overflow-hidden">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Discount code
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 min-w-0 px-3 py-2 border border-(--color-primary) border-opacity-30 rounded-lg text-sm text-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder:text-(--color-primary) placeholder:opacity-50"
          />
          <button
            type="submit"
            aria-label="Apply discount code"
            className="h-11 min-w-[80px] bg-(--color-primary) hover:opacity-80 text-(--accent) font-lex-med px-5 rounded-xl text-sm transition shrink-0"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </section>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({ discountCodes, children }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
 *   giftCardHeadingId: string;
 *   giftCardInputId: string;
 * }}
 */
function CartGiftCard({ giftCardCodes, giftCardHeadingId, giftCardInputId }) {
  const giftCardCodeInput = useRef(null);
  const removeButtonRefs = useRef(new Map());
  const previousCardIdsRef = useRef([]);
  const giftCardAddFetcher = useFetcher({ key: 'gift-card-add' });
  const [removedCardIndex, setRemovedCardIndex] = useState(null);

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      if (giftCardCodeInput.current !== null) {
        giftCardCodeInput.current.value = '';
      }
    }
  }, [giftCardAddFetcher.data]);

  useEffect(() => {
    const currentCardIds = giftCardCodes?.map((card) => card.id) || [];

    if (removedCardIndex !== null && giftCardCodes) {
      const focusTargetIndex = Math.min(
        removedCardIndex,
        giftCardCodes.length - 1,
      );
      const focusTargetCard = giftCardCodes[focusTargetIndex];
      const focusButton = focusTargetCard
        ? removeButtonRefs.current.get(focusTargetCard.id)
        : null;

      if (focusButton) {
        focusButton.focus();
      } else if (giftCardCodeInput.current) {
        giftCardCodeInput.current.focus();
      }

      setRemovedCardIndex(null);
    }

    previousCardIdsRef.current = currentCardIds;
  }, [giftCardCodes, removedCardIndex]);

  const handleRemoveClick = (cardId) => {
    const index = previousCardIdsRef.current.indexOf(cardId);
    if (index !== -1) {
      setRemovedCardIndex(index);
    }
  };

  return (
    <section aria-label="Gift cards" className="">
      {giftCardCodes && giftCardCodes.length > 0 && (
        <div>
          <h3 id={giftCardHeadingId} className="text-sm font-semibold text-(--color-primary) mb-2">
            Applied Gift Cards
          </h3>
          <div className="space-y-2">
            {giftCardCodes.map((giftCard) => (
              <div key={giftCard.id} className="bg-(--accent) bg-opacity-10 border border-(--accent) rounded px-3 py-2 flex items-center justify-between">
                <RemoveGiftCardForm
                  giftCardId={giftCard.id}
                  lastCharacters={giftCard.lastCharacters}
                  onRemoveClick={() => handleRemoveClick(giftCard.id)}
                  buttonRef={(el) => {
                    if (el) {
                      removeButtonRefs.current.set(giftCard.id, el);
                    } else {
                      removeButtonRefs.current.delete(giftCard.id);
                    }
                  }}
                >
                  <span className="text-sm">
                    <code className="font-medium text-(--color-primary)">***{giftCard.lastCharacters}</code>
                    <span className="text-(--accent) font-semibold ml-2">
                      <Money data={giftCard.amountUsed} />
                    </span>
                  </span>
                </RemoveGiftCardForm>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddGiftCardForm fetcherKey="gift-card-add">
        <div className="flex gap-2 overflow-hidden">
          <label htmlFor={giftCardInputId} className="sr-only">
            Gift card code
          </label>
          <input
            id={giftCardInputId}
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="flex-1 min-w-0 px-3 py-2 border border-(--color-primary) border-opacity-30 rounded-lg text-sm text-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder:text-(--color-primary) placeholder:opacity-50"
          />
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            aria-label="Apply gift card code"
            className="h-11 min-w-[80px] bg-(--color-primary) hover:opacity-80 text-(--accent) font-lex-med px-5 rounded-xl text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            Add
          </button>
        </div>
      </AddGiftCardForm>
    </section>
  );
}

/**
 * @param {{
 *   fetcherKey?: string;
 *   children: React.ReactNode;
 * }}
 */
function AddGiftCardForm({ fetcherKey, children }) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardId: string;
 *   lastCharacters: string;
 *   children: React.ReactNode;
 *   onRemoveClick?: () => void;
 *   buttonRef?: (el: HTMLButtonElement | null) => void;
 * }}
 */
function RemoveGiftCardForm({
  giftCardId,
  lastCharacters,
  children,
  onRemoveClick,
  buttonRef,
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      <div className="flex items-center justify-between w-full">
        <span>{children}</span>
        <button
          type="submit"
          aria-label={`Remove gift card ending in ${lastCharacters}`}
          onClick={onRemoveClick}
          ref={buttonRef}
          className="text-(--accent) hover:text-(--color-primary) text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </CartForm>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
