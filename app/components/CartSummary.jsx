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

      {/* Summary Rows */}
      <div className="border-b border-(--color-primary)/10 pb-4">
        <dl role="group" className="space-y-4">
          <div className="flex justify-between items-center">
            <dt className="text-(--color-primary) opacity-70">Subtotal</dt>
            <dd className="font-semibold text-(--color-primary)">
              {cart?.cost?.subtotalAmount?.amount ? (
                <Money data={cart?.cost?.subtotalAmount} />
              ) : (
                '-'
              )}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-(--color-primary) opacity-70">Estimated Taxes</dt>
            <dd className="font-semibold text-(--color-primary)">
              {cart?.cost?.totalTaxAmount?.amount ? (
                <Money data={cart?.cost?.totalTaxAmount} />
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
      {/* <a
        href="/#product"
        className="block w-full border border-(--color-primary) hover:bg-(--color-primary)/5 text-(--color-primary) font-lex-med py-3 px-4 rounded-xl text-center transition duration-200"
      >
        Continue Shopping
      </a> */}
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
            placeholder="Discount code (optional)"
            className="flex-1 min-w-0 px-3 py-2 border border-(--color-primary) border-opacity-30 rounded-lg text-sm text-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder:text-(--color-primary) placeholder:opacity-50"
          />
          <button
            type="submit"
            aria-label="Apply discount code"
            className="h-11 min-w-[80px] bg-none text-(--color-primary) border border-(--color-primary) hover:opacity-80 font-lex-med px-5 rounded-xl text-sm transition shrink-0"
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
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
