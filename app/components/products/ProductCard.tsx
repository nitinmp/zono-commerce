import { SearchQuery } from '~/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';

export type ProductCardProps = SearchQuery['search']['items'][number];
export function ProductCard({
  productAsset,
  productName,
  slug,
  id,
  priceWithTax,
  currencyCode,
  productVariants,
}: ProductCardProps) {
  return (
    <Link className="flex flex-col" prefetch="intent" to={`/products/${id}`}>
      <img
        className="rounded-xl flex-grow object-cover aspect-[7/8]"
        alt=""
        src={productAsset?.preview + '?w=300&h=400'}
      />
      <div className="h-2" />
      <div className="text-sm text-gray-700">{productVariants[0]?.name}</div>
      <div className="text-sm font-medium text-gray-900">
        <Price priceWithTax={productVariants[0]?.price} currencyCode={'INR'} />
      </div>
    </Link>
  );
}
