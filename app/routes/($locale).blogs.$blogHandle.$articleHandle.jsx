import { Link, useLoaderData } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `DailyGoli | ${data?.article.title ?? ''} article` }];
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
  const { blogHandle, articleHandle } = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 });
  }

  const [{ blog }] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: { blogHandle, articleHandle },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return { article, blogHandle };
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

export default function Article() {
  /** @type {LoaderReturnData} */
  const { article, blogHandle } = useLoaderData();
  const { title, image, contentHtml, author } = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="min-h-screen bg-(--bg-light) text-(--color-primary) font-lex-reg">

      {/* Blog Header */}
      <div className="mx-auto w-[85dvw] pt-[15dvh]">
        <div className="max-w-6xl mx-auto  md:px-0">
          <Link
            to={`/blogs`}
            className="inline-flex items-center gap-2 text-(--color-primary) opacity-80 hover:opacity-100 font-lex-med text-sm mb-10 w-fit hover:-translate-x-1 transition-all duration-300"
          >
            ← Back to Blogs
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 items-center justify-between w-full">
            <div>
              <div className="flex items-center gap-3 mb-5"> 
                <span className="h-8 px-4 rounded-full bg-(--accent) text-(--color-primary) text-xs font-lex-med flex items-center justify-center uppercase tracking-wider">
                  Blog
                </span>
                <span className="opacity-80 text-sm font-lex-med">
                  <time dateTime={article.publishedAt}>{publishedDate}</time>
                </span>
                {author?.name && (
                  <>
                    <span className="opacity-40">·</span>
                    <address className="not-italic opacity-80 text-sm font-lex-med">{author.name}</address>
                  </>
                )}
              </div>

              <h1 className="font-lex-med text-(--color-primary) leading-[105%] mb-6 pr-5" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', paddingRight: 'clamp(0px, 1vw, 40px)' }}>
                {title}
              </h1>
              
            </div>

            {image && (
              <div className="overflow-hidden rounded-[2rem] border border-(--color-primary)/10 shadow-lg min-h-90">
                <Image
                  data={image}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="eager"
                  alt={image.altText || title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="mx-auto w-[85dvw] pt-5 pb-16 md:pb-24">
        {/* Decorative divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-(--color-primary)/15" />
          <img src="/images/LogoGreen.webp" alt="Daily Goli" className="h-8 w-auto opacity-40" />
          <div className="flex-1 h-px bg-(--color-primary)/15" />
        </div>

        {/* Article content */}
        <div
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="
            text-(--color-primary) font-lex-reg text-lg leading-[185%]
            [&_h1]:text-4xl [&_h1]:font-lex-med [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:leading-[120%]
            [&_h2]:text-3xl [&_h2]:font-lex-med [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:leading-[120%]
            [&_h3]:text-2xl [&_h3]:font-lex-med [&_h3]:mt-8 [&_h3]:mb-4
            [&_p]:mb-6 [&_p]:opacity-90
            [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2
            [&_ol]:mb-6 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2
            [&_li]:opacity-90
            [&_a]:text-(--color-primary) [&_a]:underline [&_a]:underline-offset-4 [&_a]:opacity-80 [&_a]:hover:opacity-100
            [&_blockquote]:border-l-4 [&_blockquote]:border-(--color-primary) [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:opacity-70 [&_blockquote]:my-8 [&_blockquote]:text-xl
            [&_img]:rounded-2xl [&_img]:w-full [&_img]:my-8 [&_img]:shadow-md
            [&_strong]:font-lex-med
            [&_hr]:border-none [&_hr]:h-px [&_hr]:bg-(--color-primary)/15 [&_hr]:my-12
          "
        />

        {/* Bottom nav */}
        <div className="mt-16 pt-10 border-t border-(--color-primary)/10 flex items-center justify-between">
          <Link
            to={`/blogs/${blogHandle}`}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-(--color-primary) text-(--white) font-lex-med text-sm hover:bg-opacity-90 transition-all hover:-translate-x-1"
          >
            ← All Articles
          </Link>
          <div className="text-xs font-lex-med opacity-40 uppercase tracking-widest">Daily Goli</div>
        </div>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
