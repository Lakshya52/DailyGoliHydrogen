import {useLoaderData} from 'react-router';
import Hero from '~/components/Hero';
import Facts from '~/components/Facts';
import Ingredients from '~/components/Ingredients';
import Product from '~/components/Product';
import Reviews from '~/components/Reviews';
import Faq from '~/components/Faq';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Daily Goli | MB-360'}];
};

export async function loader(args) {
  const {storefront} = args.context;
  
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: 'daily-goli-mb-360',
    },
  });

  return {
    product,
    isShopLinked: Boolean(args.context.env.PUBLIC_STORE_DOMAIN),
  };
}

export default function Homepage() {
  const {product} = useLoaderData();

  return (
    <div className="home">
      <div className="min-h-[100px] max-h-[20dvh] px-[100px]" ></div>
      <Hero />
      <img id="benefits" src="/images/ribbon1.png" className="w-full mt-15" alt="ribbon divider" />
      <Facts />
      <Ingredients />
      <img src="/images/ribbon2.png" className="w-full relative z-50" alt="ribbon divider" />
      <Product product={product} />
      <Reviews />
      <Faq />
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $country: CountryCode, $language: LanguageCode)
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
