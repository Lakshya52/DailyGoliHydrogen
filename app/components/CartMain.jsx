import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { CartSummary } from './CartSummary';
/**
 * Returns a map of all line items and their children.
 * @param {CartLine[]} lines
 * @return {import("C:/Users/ACEONE/Desktop/udyam capital work doj 21-07-2025/websites/DailyGoli/hydrogen-storefront-fresh/app/components/CartMain").LineItemChildrenMap}
 */
function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const children = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(children)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}
/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * @param {CartMainProps}
 */
export function CartMain({ layout, cart: originalCart }) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  return (
    <section
      className={`${layout === 'page' ? 'w-full flex flex-col items-center justify-center ' : className} bg-(--bg-light)  `}
      style={{
        paddingBottom: 0,
        paddingTop: 0,
      }}
      aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}
    >
      <CartEmpty hidden={linesCount} layout={layout} />
      <div
        hidden={!linesCount}
        className={`w-full ${layout === 'page' ? 'pt-[15dvh] bg-(--bg-light) px-7 md:px-25 py-8' : 'cart-details'}`}
      >
        {layout === 'page' && (
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-(--color-primary) font-lex-bold section-heading ">Shopping Cart</h1>
            {/* <p className="text-sm md:text-base text-(--color-primary) opacity-70">Review and manage your items before checkout</p> */}
          </div>
        )}

        {cartHasItems && layout === 'page' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-(--accent) rounded-lg border border-(--color-primary) border-opacity-20">
                <div className="border-b border-(--color-primary) border-opacity-20 px-6 py-4">
                  <h2 className="text-xl font-semibold text-(--color-primary)">
                    Items ({cart?.totalQuantity || 0})
                  </h2>
                </div>
                <div className="divide-y divide-(--color-primary) divide-opacity-20">
                  <p id="cart-lines" className="sr-only">
                    Line items
                  </p>
                  <ul aria-labelledby="cart-lines" className="divide-y divide-(--color-primary) divide-opacity-20">
                    {(cart?.lines?.nodes ?? []).map((line) => {
                      if (
                        'parentRelationship' in line &&
                        line.parentRelationship?.parent
                      ) {
                        return null;
                      }
                      return (
                        <CartLineItem
                          key={line.id}
                          line={line}
                          layout={layout}
                          childrenMap={childrenMap}
                        />
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <CartSummary cart={cart} layout={layout} />
            </div>
          </div>
        )}

        {layout === 'aside' && (
          <>
            <p id="cart-lines" className="sr-only">
              Line items
            </p>
            <div>
              <ul aria-labelledby="cart-lines">
                {(cart?.lines?.nodes ?? []).map((line) => {
                  if (
                    'parentRelationship' in line &&
                    line.parentRelationship?.parent
                  ) {
                    return null;
                  }
                  return (
                    <CartLineItem
                      key={line.id}
                      line={line}
                      layout={layout}
                      childrenMap={childrenMap}
                    />
                  );
                })}
              </ul>
            </div>
            {cartHasItems && <CartSummary cart={cart} layout={layout} />}
          </>
        )}
      </div>
    </section>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({ hidden = false, layout }) {
  const { close } = useAside();
  return (
    <div hidden={hidden} className={hidden ? '' : `flex-1 w-full ${layout === 'aside' ? 'h-full' : ''}`}>
      {hidden === false && (
        <div className={`w-full flex items-center justify-center bg-(--bg-light) text-(--color-primary) ${layout === 'page' ? 'min-h-[80vh] pt-[10dvh] pb-10 px-6 md:px-25' : 'h-full px-6 py-12'}`}>
          <div className="flex flex-col items-center text-center max-w-md gap-8 animate-fade-in relative z-10 w-full">
            {/* Animated Icon Container */}
            {/* <div className="relative group mt-4"> */}
            {/* <div className="absolute inset-0 bg-(--color-primary) opacity-10 blur-2xl rounded-full scale-[1.8] group-hover:scale-[2] transition-transform duration-700"></div> */}
            {/* <div className="relative w-32 h-32 rounded-full border border-(--color-primary) border-opacity-20 bg-(--bg-light) flex items-center justify-center shadow-2xl group-hover:-translate-y-2 transition-transform duration-500"> */}
            {/* <svg
                  className="w-14 h-14 text-(--color-primary) opacity-90 transition-transform duration-500 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {/* Floating bubbles 
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-(--color-primary) opacity-40 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute top-4 -left-4 w-3 h-3 rounded-full bg-(--color-primary) opacity-30 animate-pulse" style={{ animationDuration: '2s' }}></div> */}
            {/* </div>  */}
            {/* </div> */}

            {/* Text Content */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="font-lex-bold text-(--color-primary) tracking-tight" style={{ fontSize: "2.5rem" }}>
                Your cart is empty
              </h2>
              <p className="text-sm md:text-base text-(--color-primary) opacity-60 font-lex-reg leading-relaxed max-w-[280px] mx-auto">
                Looks like you haven&rsquo;t added anything yet. Discover our latest collections and find something you&rsquo;ll love!
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/#product"
              onClick={close}
              prefetch="viewport"
              className="relative overflow-hidden group h-14 w-full max-w-[260px] bg-(--color-primary) text-(--accent) font-lex-bold rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-3 tracking-wide">
                Start Shopping
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </Link>

            {/* Trust Badges */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-(--color-primary) border-opacity-10 w-full mt-2">
              <div className="flex flex-col items-center gap-3 text-center group/badge">
                <div className="w-10 h-10 rounded-xl bg-(--color-primary) bg-opacity-5 group-hover/badge:bg-opacity-10 transition-colors flex items-center justify-center text-(--color-primary)">
                  <svg className="w-5 h-5 opacity-70 group-hover/badge:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <span className="text-[10px] uppercase font-lex-bold tracking-widest text-(--color-primary) opacity-50 group-hover/badge:opacity-80 transition-opacity">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group/badge">
                <div className="w-10 h-10 rounded-xl bg-(--color-primary) bg-opacity-5 group-hover/badge:bg-opacity-10 transition-colors flex items-center justify-center text-(--color-primary)">
                  <svg className="w-5 h-5 opacity-70 group-hover/badge:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                </div>
                <span className="text-[10px] uppercase font-lex-bold tracking-widest text-(--color-primary) opacity-50 group-hover/badge:opacity-80 transition-opacity">Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group/badge">
                <div className="w-10 h-10 rounded-xl bg-(--color-primary) bg-opacity-5 group-hover/badge:bg-opacity-10 transition-colors flex items-center justify-center text-(--color-primary)">
                  <svg className="w-5 h-5 opacity-70 group-hover/badge:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
                <span className="text-[10px] uppercase font-lex-bold tracking-widest text-(--color-primary) opacity-50 group-hover/badge:opacity-80 transition-opacity">Returns</span>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */
/** @typedef {{[parentId: string]: CartLine[]}} LineItemChildrenMap */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartLineItem').CartLine} CartLine */
