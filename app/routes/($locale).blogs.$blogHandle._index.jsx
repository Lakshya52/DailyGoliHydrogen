import { Link, useLoaderData } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `DailyGoli | ${data?.blog.title ?? ''} blog` },
    {
      name: 'description',
      content:
        data?.blog.seo?.description ||
        `Read ${data?.blog.title ?? 'our blog'} for wellness tips, product guides, and healthy living insights.`,
    },
  ];
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
async function loadCriticalData({ context, request, params }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, { status: 404 });
  }

  const [{ blog }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle: params.blogHandle, data: blog });

  return { blog };
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

export default function Blog() {
  /** @type {LoaderReturnData} */
  const { blog } = useLoaderData();
  const { articles } = blog;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-25 bg-(--bg-light) text-(--color-primary) font-lex-reg">
      <div className="max-w-7xl mx-auto">
        <Link to="/blogs" className="text-(--color-primary) opacity-60 hover:opacity-100 flex items-center gap-2 mb-8 font-lex-med w-fit hover:-translate-x-1 transition-transform">
          ← Back to Blogs
        </Link>
        <h1 className="text-4xl md:text-6xl text-center section-heading mb-16 capitalize">{blog.title}</h1>
        <PaginatedResourceSection
          connection={articles}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
        >
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
        {article.image && (
          <div className="w-full aspect-[3/2] bg-(--bg-light) overflow-hidden border-b border-(--color-primary)/10">
            <Image
              alt={article.image.altText || article.title}
              aspectRatio="3/2"
              data={article.image}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
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

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

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

/** @typedef {import('./+types/blogs.$blogHandle._index').Route} Route */
/** @typedef {import('storefrontapi.generated').ArticleItemFragment} ArticleItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
