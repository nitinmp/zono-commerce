import { DataFunctionArgs } from '@remix-run/cloudflare';
import { search, searchFacetValues } from '~/providers/products/products';
import { sdk } from '~/graphqlWrapper';

/**
 * This loader deals with loading product searches, which is used in both the search page and the
 * category list page.
 */
export async function filteredSearchLoader({
  params,
  request,
}: DataFunctionArgs) {
  const url = new URL(request.url);
  const term = url.searchParams.get('q');
  const facetValueIds = url.searchParams.getAll('fvid');
  const collectionId = params;

  console.log(params, '1240');

  let resultPromises: [
    ReturnType<typeof search>,
    ReturnType<typeof searchFacetValues>,
  ];
  const searchResultPromise = search(
    {
      input: {
        searchProducts: {
          collectionId: params?.slug === 'Non-Alcoholic' ? '29' : '5',
        },
      },
    },
    { request },
  );
  if (facetValueIds.length) {
    resultPromises = [
      searchResultPromise,
      searchFacetValues(
        {
          input: {},
        },
        { request },
      ),
    ];
  } else {
    resultPromises = [searchResultPromise, searchResultPromise];
  }
  const [result, resultWithoutFacetValueFilters] = await Promise.all(
    resultPromises,
  );
  return {
    term,
    facetValueIds,
    result: result.search,
    resultWithoutFacetValueFilters: resultWithoutFacetValueFilters.search,
  };
}
