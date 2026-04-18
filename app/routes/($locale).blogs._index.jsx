import { Link, useLoaderData } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: `Hydrogen | Blogs` }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, request }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const [{ articles }] = await Promise.all([
    context.storefront.query(ARTICLES_QUERY, {
      variables: {
        ...paginationVariables,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { articles };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  return {};
}

export default function Blogs() {
  /** @type {LoaderReturnData} */
  const { articles } = useLoaderData();

  return (
    <div className="min-h-screen  pt-[15dvh] pb-20 px-6 md:px-25 text-(--color-primary) font-lex-reg bg-(--bg-light)">
      <div className=" mx-auto">
        {/* <div className="font-lex-reg rounded-full text-sm w-fit h-10 px-6 bg-(--color-primary) text-(--white) flex items-center justify-center mb-4 mx-auto">
          Read & Discover
        </div> */}
        <h1 className="text-4xl md:text-6xl text-left font-lex-med mb-16 leading-[110%] section-heading">Our Blogs</h1>
        <p className="text-lg md:text-xl text-left font-lex-reg mb-16 leading-[150%] opacity-80">
          Stay updated with the latest news, tips, and insights on health, wellness, and everything related to Daily Goli. Explore our collection of articles and discover something new today.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <PaginatedResourceSection connection={articles}>
            {({ node: article, index }) => (
              <ArticleItem
                article={article}
                key={article.id}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
            )}
          </PaginatedResourceSection>
        </div>
      </div>
    </div>
  );
}

function ArticleItem({ article, loading }) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));
  return (
    <div className="bg-(--white) rounded-3xl border border-(--color-primary)/10 hover:border-(--color-primary)/40 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col group cursor-pointer shadow-sm hover:shadow-md h-full" key={article.id}>
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`} className="flex flex-col h-full">
        <div className="w-full aspect-[1/1] bg-(--bg-light) overflow-hidden border-b border-(--color-primary)/10">
          {article.image ? (
            <Image
              alt={article.image.altText || article.title}
              aspectRatio="1/1"
              data={article.image}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-(--color-primary)/5 group-hover:bg-(--color-primary)/10 transition-colors">
              <img src="/images/LogoGold.webp" alt="Daily Goli" className="h-16 w-auto opacity-40" />
              <span className="text-xs font-lex-med text-(--color-primary) opacity-40 uppercase tracking-widest">Daily Goli Blog</span>
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col flex-1">
          <small className="text-sm font-lex-med opacity-60 mb-3">{publishedAt}</small>
          <h3 className="text-2xl font-lex-med text-(--color-primary) leading-[130%] mb-4 line-clamp-3">{article.title}</h3>

          <div className="mt-auto pt-4 flex items-center gap-2 font-lex-med opacity-80 group-hover:opacity-100 transition-opacity">
            Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// NOTE: queries all articles across the Shopify store
const ARTICLES_QUERY = `#graphql
  query Articles(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...ArticleItem
      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;

/** @typedef {import('./+types/blogs._index').Route} Route */
/** @typedef {import('storefrontapi.generated').ArticlesQuery} ArticlesQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
