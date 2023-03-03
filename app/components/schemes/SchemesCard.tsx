import { Link } from '@remix-run/react';

export function SchemesCard({
  schemes,
}: {
  schemes: { name: string; id: string; image: string };
}) {
  return (
    <Link
      to={'/schemes/'}
      prefetch="intent"
      key={schemes.id}
      className="max-w-[300px] max-h-[250px] relative rounded-lg overflow-hidden hover:opacity-75 xl:w-auto"
    >
      <span aria-hidden="true" className="">
        <div className="w-full h-full object-center object-cover">
          <img src={schemes.image + '?w=300&h=300'} />
        </div>
      </span>
      <span
        aria-hidden="true"
        className="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
      />
      <span className="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
        {schemes.name}
      </span>
    </Link>
  );
}
