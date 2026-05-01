import { Link, useLoaderData } from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `DailyGoli | ${data?.policy.title ?? ''}` }];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ params, context }) {
  if (!params.handle) {
    throw new Response('No handle was passed in', { status: 404 });
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', { status: 404 });
  }

  return { policy };
}

export default function Policy() {
  /** @type {LoaderReturnData} */
  const { policy } = useLoaderData();

  return (
    <div className="min-h-screen bg-(--white) py-20 px-6 md:px-25 pt-[15dvh]">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/policies" 
          className="inline-flex items-center gap-2 text-(--color-primary) opacity-60 hover:opacity-100 transition-opacity mb-8 no-underline font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Policies
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary) font-lex-bold mb-10 pb-6 " style={{marginBottom: "20px"}}>
          {policy.title}
        </h1>
        
        <div 
          className="policy-content text-(--color-primary) opacity-80 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: policy.body }} 
        />
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;

/**
 * @typedef {keyof Pick<
 *   Shop,
 *   'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
 * >} SelectedPolicies
 */

/** @typedef {import('./+types/policies.$handle').Route} Route */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Shop} Shop */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
