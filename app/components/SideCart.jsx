import { X, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { Await } from "react-router";
import { Image, Money, CartForm } from "@shopify/hydrogen";
import { useCartUI } from "../context/CartUIContext";

export default function SideCart({ cart }) {
  const { isCartOpen, closeCart } = useCartUI();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-[10000] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md pt-10 bg-white z-[10001] shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-(--color-primary)">Your Cart</h2>
          <button
            onClick={closeCart}
            className="h-9 w-9 rounded-full bg-(--color-primary) text-white flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Suspense fallback={
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Await resolve={cart}>
              {(resolvedCart) => {
                const lines = resolvedCart?.lines?.nodes ?? [];

                if (lines.length === 0) {
                  return (
                    <p className="text-gray-400 text-sm text-center mt-10">
                      Your cart is empty.
                    </p>
                  );
                }

                return (
                  <ul className="flex flex-col gap-4">
                    {lines.map((line) => (
                      <li key={line.id} className="flex gap-4 items-start border-b border-gray-100 pb-4">
                        {/* Product Image */}
                        {line.merchandise.image && (
                          <Image
                            data={line.merchandise.image}
                            width={80}
                            height={80}
                            className="rounded-xl object-cover w-20 h-20 flex-shrink-0"
                          />
                        )}

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col gap-1">
                          <p className="text-sm font-semibold text-(--color-primary) leading-tight">
                            {line.merchandise.product.title}
                          </p>
                          {line.merchandise.title !== "Default Title" && (
                            <p className="text-xs text-gray-400">{line.merchandise.title}</p>
                          )}
                          <Money
                            data={line.cost.totalAmount}
                            className="text-sm font-bold"
                          />

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-1">
                            {/* Decrease */}
                            <CartForm
                              route="/cart"
                              action={CartForm.ACTIONS.LinesUpdate}
                              inputs={{ lines: [{ id: line.id, quantity: Math.max(0, line.quantity - 1) }] }}
                            >
                              <button
                                type="submit"
                                className="w-7 h-7 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                              >
                                −
                              </button>
                            </CartForm>

                            <span className="text-sm w-5 text-center">{line.quantity}</span>

                            {/* Increase */}
                            <CartForm
                              route="/cart"
                              action={CartForm.ACTIONS.LinesUpdate}
                              inputs={{ lines: [{ id: line.id, quantity: line.quantity + 1 }] }}
                            >
                              <button
                                type="submit"
                                className="w-7 h-7 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                              >
                                +
                              </button>
                            </CartForm>

                            {/* Remove */}
                            <CartForm
                              route="/cart"
                              action={CartForm.ACTIONS.LinesRemove}
                              inputs={{ lineIds: [line.id] }}
                            >
                              <button
                                type="submit"
                                className="ml-auto w-7 h-7 rounded-full text-red-400 flex items-center justify-center hover:bg-red-50 transition cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </CartForm>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              }}
            </Await>
          </Suspense>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
          <Suspense fallback={null}>
            <Await resolve={cart}>
              {(resolvedCart) => resolvedCart?.cost?.totalAmount && (
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <Money data={resolvedCart.cost.totalAmount} />
                </div>
              )}
            </Await>
          </Suspense>

          <Suspense fallback={null}>
            <Await resolve={cart}>
              {(resolvedCart) => (
                <a
                  href={resolvedCart?.checkoutUrl ?? "/cart"}
                  className="w-full h-12 bg-(--color-primary) text-white rounded-full font-lex-reg flex items-center justify-center hover:opacity-90 transition-opacity no-underline text-sm font-semibold"
                >
                  Checkout
                </a>
              )}
            </Await>
          </Suspense>
        </div>

      </div>
    </>
  );
}