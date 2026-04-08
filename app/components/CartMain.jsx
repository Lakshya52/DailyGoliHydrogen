import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
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
export function CartMain({layout, cart: originalCart}) {
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
      className={`${layout === 'page' ? 'w-full flex items-center justify-center ' : className} bg-(--bg-light)  `} 
      style={{
        paddingBottom:0,
        paddingTop:0,
      }}
      aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}
    >
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className={`mt-20 ${layout === 'page' ? 'container bg-(--bg-light) w-full px-4 px-[55px] py-8' : 'cart-details'}`}>
        {layout === 'page' && (
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-(--color-primary) font-lex-bold section-heading ">Shopping Cart</h1>
            <p className="text-sm md:text-base text-(--color-primary) opacity-70">Review and manage your items before checkout</p>
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
function CartEmpty({hidden = false}) {
  const {close} = useAside();
  return (
    <div hidden={hidden} className='bg-(--accent)' >
      {hidden === false && (
        <div className="w-full min-h-screen flex items-center justify-center  px-4 md:px-25 text-(--color-primary) bg-(--accent)">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <svg
                className="w-20 md:w-24 h-20 md:h-24 text-(--accent)"
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
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-2 font-lex-bold">Your cart is empty</h2>
            <p className="text-base md:text-xl text-(--color-primary) opacity-70 mb-8">
              Looks like you haven&rsquo;t added anything yet. Let&rsquo;s get you started!
            </p>
            <Link
              to="/collections"
              onClick={close}
              prefetch="viewport"
              className="inline-block bg-(--color-primary) hover:bg-(--color-primary) hover:opacity-80 text-(--accent) font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Continue shopping →
            </Link>
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
