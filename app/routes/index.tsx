import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import React from 'react';
import { useScroll } from 'framer-motion';
import Carousel from 'framer-motion-carousel';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const headerImage = collections[0]?.featuredAsset?.preview;
  const ref = React.useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const images = [
    'https://www.unitedbreweries.com/Images/product/bg/kingfisher_strong.jpg',
    'https://www.unitedbreweries.com/Images/product/bg/kingfisher_ultra.jpg',
    'https://www.unitedbreweries.com/Images/product/bg/kingfisher_storm.jpg',
  ];
  const carouselText =
    'The beer brands manufactured and marketed by United Breweries Ltd. have always been recognized for their international quality. A name synonymous with beer in India, Kingfisher stands for excitement, youth, and camaraderie. \nThis largest-selling beer in India, commands a significant market share* in the country with an alternate bottle of beer sold in India being a Kingfisher brand. We are also available in 60+ countries across the globe.\nOver the years, the Kingfisher family has expanded to include brands and variants that cater to all segments of our audience. The Heineken brands augment our portfolio with stellar products of global repute, making UB a preferred option for consumers and customers alike';
  return (
    <>
      <div className="relative">
        <Carousel autoPlay={false} loop interval={100}>
          {images.map((item, i) => (
            <img
              src={item}
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          ))}
        </Carousel>
        <div className="absolute bottom-10 ml-24 w-1/2">
          <p className="font-sans text-white leading-loose">{carouselText}</p>
        </div>
      </div>

      <section
        aria-labelledby="category-heading"
        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-light tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
              <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="~/routes/__cart/index#"
            className="block text-sm font-semibold text-primary-600 hover:text-primary-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
}
