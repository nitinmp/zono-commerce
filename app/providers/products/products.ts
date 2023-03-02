import gql from 'graphql-tag';
import { QueryOptions, sdk } from '../../graphqlWrapper';
import { SearchQueryVariables } from '~/generated/graphql';

export function search(variables: SearchQueryVariables, options: QueryOptions) {
  console.log(variables, 'options');
  const ss = sdk.search(variables, options);

  ss.then((x) => {
    console.log(JSON.stringify(x)), 'abbas';
  });

  return ss;
}

export function searchFacetValues(
  variables: SearchQueryVariables,
  options: QueryOptions,
) {
  return sdk.searchFacetValues(variables, options);
}

export function getProductBySlug(id: string, options: QueryOptions) {
  const dd = sdk.product({ id }, options);

  dd.then((x) => console.log(JSON.stringify(x), '1234567'));
  return sdk.product({ id }, options);
}

export const detailedProductFragment = gql`
  fragment DetailedProduct on Product {
    id
    name
    description
    preview
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }

    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    variants {
      id
      name
      priceWithTax
      currencyCode
      sku
      stockLevel
      featuredAsset {
        id
        preview
      }
    }
  }
`;

gql`
  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
`;

export const listedProductFragment = gql`
  fragment ListedProduct on SearchResultProduct {
    id
    parentSku

    productVariants {
      id
      sku
      name
      shortName
    }
    productAsset {
      preview
    }
  }
`;

gql`
  query search($input: SearchProductInput!) {
    search(input: $input) {
      totalItems
      items {
        ...ListedProduct
      }
    }
  }
  ${listedProductFragment}
`;

gql`
  query searchFacetValues($input: SearchProductInput!) {
    search(input: $input) {
      totalItems
    }
  }
  ${listedProductFragment}
`;
