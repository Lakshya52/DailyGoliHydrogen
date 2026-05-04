import { CartForm, Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router';
import { ProductPrice } from './ProductPrice';
import { useAside } from './Aside';

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * If the line is a parent line that has child components (like warranties or gift wrapping), they are
 * rendered nested below the parent line.
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 *   childrenMap: LineItemChildrenMap;
 * }}
 */
export function CartLineItem({ layout, line, childrenMap }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  const liClass = layout === 'page' ? 'p-6' : 'cart-line';
  const containerClass = layout === 'page'
    ? 'flex gap-4 md:gap-6'
    : 'cart-line-inner';

  return (
    <li key={id} className={layout === 'page' ? 'p-4 md:p-6' : 'cart-line'}>
      <div className={layout === 'page' ? 'flex gap-4 md:gap-6' : 'cart-line-inner'}>
        {image && (
          <div className={layout === 'page' ? 'shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden border border-(--color-primary)/10' : ''}>
            <Image
              alt={title}
              aspectRatio="1/1"
              data={image}
              height={layout === 'page' ? 112 : 100}
              loading="lazy"
              width={layout === 'page' ? 112 : 100}
              className={layout === 'page' ? 'w-full h-full object-cover' : ''}
            />
          </div>
        )}

        <div className={layout === 'page' ? 'flex-1 min-w-0' : ''}>
          {/* Title row: name on left, price on right (desktop) */}
          <div className={layout === 'page' ? 'flex flex-wrap justify-between items-start gap-2 mb-2' : ''}>
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  close();
                }
              }}
              className={layout === 'page' ? 'hover:opacity-70 transition' : ''}
            >
              <p className={layout === 'page' ? 'font-lex-med text-(--color-primary) text-base md:text-lg' : ''}>
                <strong>{product.title}</strong>
              </p>
            </Link>
            {layout === 'page' && (
              <div className="shrink-0 font-lex-med text-(--color-primary) text-base md:text-lg">
                <ProductPrice price={line?.cost?.totalAmount} />
              </div>
            )}
          </div>

          {layout !== 'page' && <ProductPrice price={line?.cost?.totalAmount} />}

          <ul className={layout === 'page' ? 'mb-3 space-y-1' : ''}>
            {selectedOptions.map((option) => (
              <li key={option.name} className={layout === 'page' ? 'text-sm text-(--color-primary) opacity-60' : ''}>
                <small>
                  {option.name}: <span className="font-medium">{option.value}</span>
                </small>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
            <CartLineQuantity line={line} />
            <CartLineRemoveButton lineIds={[id]} disabled={line.isOptimistic} />
          </div>
        </div>
      </div>

      {lineItemChildren ? (
        <div>
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className={layout === 'page' ? 'ml-24 mt-4 space-y-4 border-l-2 border-gray-200 pl-4' : 'cart-line-children'}>
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 * @param {{line: CartLine}}
 */
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className={`flex items-center gap-2 border border-(--color-primary) border-opacity-30 rounded-lg p-1 ${isOptimistic ? 'opacity-50 grayscale' : ''}`}>
      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          className="w-8 h-8 flex items-center justify-center text-(--color-primary) hover:bg-(--accent) hover:text-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span>−</span>
        </button>
      </CartLineUpdateButton>

      <div className="w-8 flex items-center justify-center relative">
        <span className={`font-medium text-(--color-primary) ${isOptimistic ? 'opacity-0' : 'opacity-100'}`}>{quantity}</span>
        {isOptimistic && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          className="w-8 h-8 flex items-center justify-center text-(--color-primary) hover:bg-(--accent) hover:text-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span>+</span>
        </button>
      </CartLineUpdateButton>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({ lineIds, disabled }) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button
        disabled={disabled}
        type="submit"
        className="flex items-center justify-center text-(--color-primary) opacity-50 hover:opacity-100 hover:text-red-600 transition-all p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Remove item"
      >
        <IconRemove />
      </button>
    </CartForm>
  );
}

function IconRemove() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H5H21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10 11V17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M14 11V17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({ children, lines }) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @returns
 * @param {string[]} lineIds - line ids affected by the update
 */
function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('~/components/CartMain').LineItemChildrenMap} LineItemChildrenMap */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').CartLineFragment} CartLineFragment */
