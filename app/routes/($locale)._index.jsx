import { useLoaderData } from 'react-router';
import { lazy, Suspense } from 'react';
import Hero from '~/components/Hero';

// Lazy-load below-fold components to reduce initial JS bundle
const Facts = lazy(() => import('~/components/Facts'));
const Ingredients = lazy(() => import('~/components/Ingredients'));
const Product = lazy(() => import('~/components/Product'));
const Reviews = lazy(() => import('~/components/Reviews'));
const Faq = lazy(() => import('~/components/Faq'));
const UsVsThem = lazy(() => import('~/components/UsVsThem'));

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Daily Goli | MB-360' },
    { name: 'description', content: 'A plant-based supplement with CQR-300, Berberine & Chromium - designed to support your metabolism, manage cravings, and take control of your wellness journey.' }
  ];
};

/**
 * Set cache-control headers on the document response to reduce TTFB on repeat visits
 */
export const headers = () => ({
  'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=3600',
});

export async function loader(args) {
  const { storefront } = args.context;

  // Try to fetch the specific product (cached to reduce TTFB)
  const { product } = await storefront.query(PRODUCT_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      handle: 'daily-goli-mb-360',
    },
  });

  // FALLBACK: If not found, fetch the first available product in the catalog
  let finalProduct = product;
  if (!finalProduct) {
    const { products } = await storefront.query(FALLBACK_PRODUCTS_QUERY);
    if (products?.nodes?.length > 0) {
      finalProduct = products.nodes[0];
      console.log('DEBUG: Specific handle not found. Available products:', products.nodes.map(p => p.handle));
    }
  }

  return {
    product: finalProduct,
    isShopLinked: Boolean(args.context.env.PUBLIC_STORE_DOMAIN),
  };
}

export default function Homepage() {
  const { product } = useLoaderData();

  return (
    <div className="home">
      <div className="min-h-25 max-h-[20dvh] px-4 md:px-25" ></div>
      <Hero />
      <img id="benefits" src="/images/ribbon1.png" width="1920" height="100" loading="lazy" className="w-full mt-15" alt="ribbon divider" />
      <Suspense fallback={null}>
        <Facts />
        <Ingredients />
        <img src="/images/ribbon2.png" width="1920" height="100" loading="lazy" className="w-full relative z-50" alt="ribbon divider" />
        <Product product={product} />
        <UsVsThem />
        <Reviews />
        <Faq />
      </Suspense>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query HomepageProducts($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      description
      options {
        name
        values
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
           product {
            handle
            title
            id
          }
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      sellingPlanGroups(first: 10) {
        nodes {
          name
          sellingPlans(first: 10) {
            nodes {
              id
              name
              description
              options {
                name
                value
              }
              priceAdjustments {
                adjustmentValue {
                  ... on SellingPlanPercentagePriceAdjustment {
                    adjustmentPercentage
                  }
                  ... on SellingPlanFixedAmountPriceAdjustment {
                    adjustmentAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

const FALLBACK_PRODUCTS_QUERY = `#graphql
  query FallbackProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 5) {
      nodes {
        id
        title
        handle
        vendor
        descriptionHtml
        description
        options {
          name
          values
        }
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              id
              url
              altText
              width
              height
            }
             product {
              handle
              title
              id
            }
          }
        }
        images(first: 10) {
          nodes {
            url
            altText
            width
            height
          }
        }
        sellingPlanGroups(first: 10) {
          nodes {
            name
            sellingPlans(first: 10) {
              nodes {
                id
                name
                description
                options {
                  name
                  value
                }
                priceAdjustments {
                  adjustmentValue {
                    ... on SellingPlanPercentagePriceAdjustment {
                      adjustmentPercentage
                    }
                    ... on SellingPlanFixedAmountPriceAdjustment {
                      adjustmentAmount {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
