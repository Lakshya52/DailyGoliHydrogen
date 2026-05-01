import { useLoaderData, Link } from 'react-router';

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  const data = await context.storefront.query(POLICIES_QUERY);

  const shopPolicies = data.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy) => policy != null);

  if (!policies.length) {
    throw new Response('No policies found', { status: 404 });
  }

  return { policies };
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const { policies } = useLoaderData();

  return (
    <div className="min-h-screen bg-(--bg-light) py-20 px-6 md:px-25 pt-[15dvh] ">
      <div className="w-full flex flex-col items-center gap-5 ">
        <h1 className="text-4xl md:text-6xl font-bold text-(--color-primary) font-lex-bold mb-8 text-center section-heading">
          Our Policies
        </h1>
        <p className="text-center w-full text-(--color-primary) opacity-70 mb-16 max-w-2xl mx-auto">
          Please review our store policies to understand your rights and responsibilities when shopping with us.
        </p>

        <div className="grid gap-6 w-full">
          {policies.map((policy) => (
            <Link
              key={policy.id}
              to={`/policies/${policy.handle}`}
              className="group flex items-center justify-between p-8 bg-(--white) rounded-2xl border border-(--color-primary) border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 no-underline"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-(--color-primary) group-hover:text-(--accent) transition-colors">
                  {policy.title}
                </h2>
                <p className="text-sm text-(--color-primary) opacity-50 mt-1">
                  Read full {policy.title.toLowerCase()}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-(--bg-light) flex items-center justify-center text-(--color-primary) group-hover:bg-(--color-primary) group-hover:text-(--white) transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
/** @typedef {import('storefrontapi.generated').PoliciesQuery} PoliciesQuery */
/** @typedef {import('storefrontapi.generated').PolicyItemFragment} PolicyItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
