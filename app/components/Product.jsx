import React, { useState } from "react";
import { Star, ShoppingCart, Check, CheckCheck } from "lucide-react"
import { CartForm } from '@shopify/hydrogen';
import UsVsThem from "./UsVsThem";

const Product = ({ product }) => {
  // Extract first selling plan (from Shopify Subscriptions app)
  const firstSellingPlan = product?.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0] ?? null;
  const monthlySellingPlanId = firstSellingPlan?.id ?? null;

  const [selectedPurchase, setSelectedPurchase] = useState(monthlySellingPlanId ? 'monthly' : 'oneTime');
  const [selectedImage, setSelectedImage] = useState(0);

  // If no product data is passed, provide empty fallback or handle error
  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-(--color-primary) text-xl">Linking to Shopify Store... (Run npx shopify hydrogen link)</p>
      </div>
    );
  }

  const { title, descriptionHtml, variants, images, sellingPlanGroups } = product;
  const firstVariant = variants.nodes[0];
  const variantId = firstVariant?.id;



  // Compute subscription price from selling plan's priceAdjustments
  const basePrice = parseFloat(firstVariant?.price?.amount || 1299);
  let subPrice = Math.round(basePrice * 0.87); // fallback: 13% off
  let savingsLabel = '13% off';
  if (firstSellingPlan) {
    const adj = firstSellingPlan.priceAdjustments?.[0]?.adjustmentValue;
    if (adj?.adjustmentPercentage != null) {
      const pct = adj.adjustmentPercentage;
      subPrice = Math.round(basePrice * (1 - pct / 100));
      savingsLabel = `${pct}% off`;
    } else if (adj?.adjustmentAmount?.amount != null) {
      subPrice = Math.round(basePrice - parseFloat(adj.adjustmentAmount.amount));
      savingsLabel = `Save ₹${Math.round(parseFloat(adj.adjustmentAmount.amount))}`;
    }
  }

  // Helper: append Shopify CDN width transform for responsive images
  const resizeImage = (url, width) => {
    if (!url || !url.includes('cdn.shopify.com')) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${width}`;
  };

  const productImageUrls = images.nodes.length > 0
    ? images.nodes.map(img => img.url)
    : [
      '/productImages/product-1.png',
      '/productImages/product-2.png',
      '/productImages/product-3.png',
      '/productImages/product-4.png',
      '/productImages/product-5.png',
    ];

  const pricing = {
    oneTime: {
      price: Math.round(basePrice),
      label: 'One Time Purchase',
      savings: null
    },
    monthly: {
      price: subPrice,
      label: firstSellingPlan?.name ?? 'Monthly Subscription',
      savings: savingsLabel,
      planId: monthlySellingPlanId,
    }
  };

  const benefits = [
    'Fast Delivery',
    'Free Shipping',
    '100% Authentic',
    'Money-back Guarantee'
  ];

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      {/* wrapper */}
      <div
        id="product"
        className="min-h-dvh flex items-center justify-start flex-col py-10 md:py-20 "
      >
        <div className="flex flex-col items-center justify-center gap-2 px-4 md:px-0">
          {/* <div className="font-lex-reg rounded-full h-10 px-4 bg-(--color-primary) text-(--white) flex items-center justify-center text-sm md:text-base">
            Hurry Up
          </div> */}
          <h2 className=" section-heading  text-(--color-primary) text-center  md:leading-18 mb-5 font-lex-med leading-[108%]">
            Limited Time Offer! <br /> Save Up To 13% on Your First Order!
          </h2>
          <p className="font-lex-reg text-(--color-primary) text-sm md:text-xl text-center">
            "Inspired by Science. Powered by Plants."
          </p>
          {/* <span className="flex flex-col md:flex-row text-(--color-primary) font-lex-reg text-sm md:text-xl text-center gap-2 md:gap-0" >
            4.8 stars | 85k Reviews | <b>&nbsp;1K+ Monthly Subscribers</b>
          </span> */}
          <span className="font-lex-reg text-(--color-primary) text-sm md:text-xl text-center">
            Use code <b>DAILYGOLI13</b> at checkout to claim your discount.
          </span>
        </div>

        {/* product purchasing section */}
        <div className="w-full md:w-[70%] mt-8 md:mt-15 flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-between relative px-4 md:px-0">

          {/* Image Gallery - Left Side */}
          <div className="w-full md:w-1/2 md:min-w-[50%]">
            <div className="sticky top-[10vh] flex flex-col gap-4 will-change-transform">
              {/* Main Image */}
              <div className="w-full aspect-square bg-(--bg-light) rounded-2xl overflow-hidden flex items-center justify-center border-2 border-(--color-primary)">
                <img
                  src={resizeImage(productImageUrls[selectedImage], 600)}
                  alt={images.nodes[selectedImage]?.altText || "Product Image"}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width="600"
                  height="600"
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto py-4">
                {productImageUrls.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 min-w-20 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                      ? 'border-(--color-primary)'
                      : 'border-(--bg-light) hover:border-(--color-primary)'
                      }`}
                  >
                    <img
                      src={resizeImage(image, 100)}
                      alt={`Product thumbnail ${index + 1}`}
                      width="100"
                      height="100"
                      loading="lazy"
                      sizes="80px"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">

            {/* Product Title */}
            <div>
              <h2 className="text-2xl md:text-4xl font-lex-reg text-(--color-primary) mb-2">
                {title}
              </h2>
              <p className="text-sm md:text-lg text-(--color-primary) opacity-90">
                Premium Metabolic Balance Formula
              </p>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1 text-(--accent)">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="md:w-4.5 md:h-4.5" fill="currentColor" />
                ))}
              </div>
              <span className="text-(--color-primary) font-lex-reg">
                4.8 • 50+ Reviews
              </span>
            </div>

            {/* Purchase Type Toggle (Keeping original design but can be mapped to Selling Plans later) */}
            {monthlySellingPlanId && (
              <div className="flex gap-3 bg-(--bg-light) p-1 rounded-full w-fit">
                <button
                  onClick={() => setSelectedPurchase('monthly')}
                  className={`px-6 py-3 rounded-full font-lex-reg transition-all duration-300 relative cursor-pointer border border-(--color-primary) ${selectedPurchase === 'monthly'
                    ? 'bg-(--color-primary) text-(--white)'
                    : 'text-(--color-primary) hover:bg-(--white)'
                    }`}
                >
                  {firstSellingPlan?.name || 'Monthly Subscription'}
                  {selectedPurchase === 'monthly' && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-(--white) text-xs px-2 py-1 rounded-full">
                      {pricing.monthly.savings}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedPurchase('oneTime')}
                  className={`px-6 py-3 rounded-full font-lex-reg transition-all duration-300 border border-(--color-primary) cursor-pointer ${selectedPurchase === 'oneTime'
                    ? 'bg-(--color-primary) text-(--white)'
                    : 'text-(--color-primary) hover:bg-(--white)'
                    }`}
                >
                  One Time
                </button>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-(--bg-light) rounded-2xl py-4 md:py-6 ">
              <p className="text-(--color-primary) opacity-90 text-sm mb-2">
                {pricing[selectedPurchase].label}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl md:text-5xl font-lex-reg text-(--color-primary)">
                  ₹{pricing[selectedPurchase].price}
                </span>
                {/* strik through price */}
                <span className="text-sm md:text-base text-(--color-primary) opacity-80 line-through">
                  ₹1499
                </span>
              </div>
              <p className="text-xs md:text-sm text-(--color-primary) opacity-80">
                {selectedPurchase === 'monthly'
                  ? 'Cancel anytime, no hidden charges'
                  : 'One-time payment, free shipping'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <p className="font-lex-reg text-sm md:text-base text-(--color-primary)">Quantity:</p>
              <div className="flex items-center border border-(--color-primary) rounded-xl overflow-hidden h-10 md:h-12">
                <button
                  onClick={decrementQuantity}
                  className="w-10 md:w-12 h-full flex items-center justify-center hover:bg-(--color-primary) hover:text-(--white) transition-all cursor-pointer text-lg md:text-xl"
                >
                  -
                </button>
                <span className="w-10 md:w-12 h-full flex items-center justify-center font-lex-reg text-sm md:text-lg border-x border-(--color-primary)">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 md:w-12 h-full flex items-center justify-center hover:bg-(--color-primary) hover:text-(--white) transition-all cursor-pointer text-lg md:text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <div id="product-actions" className="w-full">
              {/* Buy Now Button - Direct to checkout redirected handled by cart action */}
              <CartForm
                className="w-full"
                route="/cart"
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{
                  lines: [{
                    merchandiseId: variantId,
                    quantity: quantity,
                    selectedVariant: firstVariant,
                    ...(selectedPurchase === 'monthly' && monthlySellingPlanId ? { sellingPlanId: monthlySellingPlanId } : {}),
                  }],
                }}
              >
                <button
                  type="submit"
                  name="checkout"
                  value="true"
                  className="w-full h-12 md:h-16 px-6 md:px-8 bg-(--color-primary) text-(--white) rounded-xl font-lex-reg text-sm md:text-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer hover:bg-(--accent) hover:text-(--color-primary) border border-(--color-primary)"
                >
                  Buy Now
                </button>
              </CartForm>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-(--color-primary)">
                  <div className="w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center">
                    <Check size={14} className="text-(--white)" />
                  </div>
                  <span className="text-sm font-lex-reg">{benefit}</span>
                </div>
              ))}
            </div>
            {/* hello */}
            {/* images of trust icons */}
            <div className="flex items-center justify-between w-full bg-white border-(--color-primary) p-4 rounded">
              <img className="h-10" src="/trustLogos/fda.svg" alt="fssai logo" />
              <img className="h-10" src="/trustLogos/fssai.png" alt="fda logo" />
              <img className="h-10" src="/trustLogos/iso.webp" alt="ISO logo" />
              <img className="h-10" src="/trustLogos/gmp.webp" alt="WHO-GMP logo" />
              {/* <img className="h-10" src="/trustLogos/ayush.svg" alt="ayush" /> */}
              <img className="h-10" src="/trustLogos/haccp.webp" alt="hcapp" />
            </div>

            {/* Product Features */}
            <div className="bg-(--bg-light) rounded-2xl space-y-3">
              <div className="flex gap-3 items-start justify-start">
                <CheckCheck size={20} className="min-h-5 h-5 w-5 min-w-5 max-w-5 max-h-5 text-(--color-primary) " />
                <p className="text-(--color-primary) text-xl font-lex-reg">GLP-1 Pathway Science Inspired — 6 clinically studied botanical ingredients</p>
              </div>
              <div className="flex gap-3 items-start justify-start">
                <CheckCheck size={20} className="min-h-5 h-5 w-5 min-w-5 max-w-5 max-h-5 text-(--color-primary) " />
                <p className="text-(--color-primary) text-xl font-lex-reg">Supports and control your appetite & reduces sugar cravings naturally in your body</p>
              </div>
              <div className="flex gap-3 items-start justify-start">
                <CheckCheck size={20} className="min-h-5 h-5 w-5 min-w-5 max-w-5 max-h-5 text-(--color-primary) " />
                <p className="text-(--color-primary) text-xl font-lex-reg">Berberine + Chromium for healthy blood sugar and metabolism support</p>
              </div>
              <div className="flex gap-3 items-start justify-start">
                <CheckCheck size={20} className="min-h-5 h-5 w-5 min-w-5 max-w-5 max-h-5 text-(--color-primary) " />
                <p className="text-(--color-primary) text-xl font-lex-reg">Inulin prebiotic for gut health and sustained energy</p>
              </div>
              <div className="flex gap-3 items-start justify-start">
                <CheckCheck size={20} className="min-h-5 h-5 w-5 min-w-5 max-w-5 max-h-5 text-(--color-primary) " />
                <p className="text-(--color-primary) text-xl font-lex-reg">100% Veg Capsules | No artificial additives | FSSAI approved</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-(--bg-light) flex items-center justify-center gap-4 text-xs text-(--color-primary) opacity-80">
              <span>🔒 Secure Checkout</span>
              <span>🚚 Ships in 24 Hours</span>
              <span>✓ Verified Sellers</span>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default Product;
