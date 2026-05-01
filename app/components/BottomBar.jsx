import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AddToCartButton } from './AddToCartButton';
import { CartForm } from '@shopify/hydrogen';
import { useAside } from './Aside';

const BottomBar = ({ product }) => {
  const { open } = useAside();
  const location = useLocation();
  const [isOverlaying, setIsOverlaying] = useState(false);
  const selectedVariant = product?.variants?.nodes?.[0];

  useEffect(() => {
    let observer;

    const attachObserver = () => {
      const target = document.getElementById('product-actions');
      if (target) {
        observer = new IntersectionObserver(
          ([entry]) => {
            setIsOverlaying(entry.isIntersecting);
          },
          { threshold: 0.1 }
        );
        observer.observe(target);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!attachObserver()) {
      // If not found, watch for it to be added to the DOM
      const mutationObserver = new MutationObserver((mutations, obs) => {
        if (attachObserver()) {
          obs.disconnect(); // Stop watching once found and attached
        }
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => {
        mutationObserver.disconnect();
        if (observer) observer.disconnect();
      };
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const isCartPage = location.pathname.endsWith('/cart');
  if (isCartPage) return null;

  return (
    <div className={`fixed bottom-0 left-0 w-full h-16 bg-(--white) z-[10001] flex items-center justify-between px-4 md:px-10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-500 ${isOverlaying ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      {/* Left side marquee - only if product exists */}
      <div className="flex-1 overflow-hidden mr-4 hidden md:block">
        {/* <div className="flex items-center gap-12 animate-marquee whitespace-nowrap text-(--color-primary)">
          <div className="flex items-center gap-12">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Natural Metabolism Support • CQR-300 • Berberine
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Clinically Proven Ingredients • Daily Goli MB-360
            </span>
          </div>
          <div className="flex items-center gap-12">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Natural Metabolism Support • CQR-300 • Berberine
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Clinically Proven Ingredients • Daily Goli MB-360
            </span>
          </div>
        </div> */}
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        {product ? (
          <>
            <div className="flex flex-col md:hidden">
              <span className="text-[10px] font-bold text-(--color-primary) uppercase truncate max-w-[150px]">{product.title}</span>
              <span className="text-xs font-bold">${selectedVariant?.price?.amount}</span>
            </div>

            <div className="flex gap-2">
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{
                  lines: [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                    },
                  ],
                }}
              >
                {(fetcher) => {
                  // Navigate to cart when the add action is successful
                  if (fetcher.state === 'loading' && fetcher.data && typeof window !== 'undefined') {
                    window.location.href = '/cart';
                  }

                  return (
                    <button
                      type="submit"
                      disabled={fetcher.state !== 'idle'}
                      className="px-4 h-10 flex items-center justify-center bg-transparent border-2 border-(--color-primary) text-(--color-primary) rounded-full text-xs font-bold uppercase hover:bg-(--color-primary) hover:text-white transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      {fetcher.state !== 'idle' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </div>
                      ) : 'Add to Cart'}
                    </button>
                  );
                }}
              </CartForm>

              {selectedVariant && (
                <a
                  href={`/cart/${selectedVariant.id}:1`}
                  className="px-6 h-10 flex items-center justify-center bg-(--color-primary) text-white rounded-full text-xs font-bold uppercase hover:opacity-90 transition-all no-underline whitespace-nowrap cursor-pointer border-none"
                  onClick={(e) => {
                    // Instant feedback
                    e.currentTarget.innerHTML = '<div class="flex items-center gap-2"><div class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Processing...</div>';
                  }}
                >
                  Buy Now
                </a>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/collections/all"
            className="w-full md:w-auto px-8 h-10 flex items-center justify-center bg-(--color-primary) text-white rounded-full text-xs font-bold uppercase hover:opacity-90 transition-all no-underline whitespace-nowrap"
          >
            Shop Our Collection
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
