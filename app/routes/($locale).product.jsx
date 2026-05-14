import { useLoaderData } from "react-router";
import Product from "~/components/Product";
import ProductPage from "~/components/ProductPage";

export async function loader({ context }) {
  const { storefront } = context;

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: "daily-goli-mb-360",
    },
  });

  // FALLBACK: If not found, fetch the first available product
  let finalProduct = product;
  if (!finalProduct) {
    const { products } = await storefront.query(FALLBACK_PRODUCTS_QUERY);
    if (products?.nodes?.length > 0) {
      finalProduct = products.nodes[0];
    }
  }

  if (!finalProduct) {
    throw new Response("Product not found", { status: 404 });
  }

  return { product: finalProduct };
}

export default function ProductRoute() {
  const { product } = useLoaderData();

  return (
    <div className="min-h-screen  mt-[15dvh] pb-20 ">
      <ProductPage product={product} />
      {/* <Product/> */}
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