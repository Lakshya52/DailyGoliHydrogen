import * as React from 'react';
import { Pagination } from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection> encapsulates the previous and next pagination behaviors throughout your application.
 * @param {Class<Pagination<NodesType>>['connection']>}
 */
export function PaginatedResourceSection({
  connection,
  children,
  ariaLabel,
  resourcesClassName,
}) {
  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({ node, index }),
        );

        return (
          <div>
            <PreviousLink>
              {isLoading ? (
                <div className="flex items-center justify-center mt-10 group">
                  <span className="flex items-center gap-2 bg-(--color-primary) text-(--white) px-4 py-2 rounded-full group-hover:translate-y-[-1]">
                    Loading...
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-10 group">
                  <span className="flex items-center gap-2 bg-(--color-primary) text-(--white) px-4 py-2 rounded-full group-hover:translate-y-[-1]">
                    <span aria-hidden="true">↑</span> Load previous
                  </span>
                </div>
              )}
            </PreviousLink>
            {resourcesClassName ? (
              <div
                aria-label={ariaLabel}
                className={resourcesClassName}
                role={ariaLabel ? 'region' : undefined}
              >
                {resourcesMarkup}
              </div>
            ) : (
              resourcesMarkup
            )}
            <NextLink>
              {isLoading ? (
                <div className="flex items-center justify-center mt-10 group">
                  <span className="flex items-center gap-2 bg-(--color-primary) text-(--white) px-4 py-2 rounded-full group-hover:translate-y-[-1]">
                    Loading...
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-10 group">
                  <span className="flex items-center gap-2 bg-(--color-primary) text-(--white) px-4 py-2 rounded-full group-hover:translate-y-[-1]">
                    Load More Blogs <span aria-hidden="true">↓</span>
                  </span>
                </div>
              )}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
