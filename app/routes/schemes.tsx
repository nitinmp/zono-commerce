import { Link, useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { LoaderArgs } from '@remix-run/server-runtime';
import React from 'react';
import { useScroll } from 'framer-motion';
import { Breadcrumbs } from '~/components/Breadcrumbs';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const ref = React.useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const images = [
    'https://www.unitedbreweries.com/Images/product/bg/kingfisher_strong.jpg',
    'https://www.unitedbreweries.com/Images/product/bg/kingfisher_ultra.jpg',
    'https://www.unitedbreweries.com/Images/product/bg/kingfisher_storm.jpg',
  ];
  const headerImage =
    'https://www.unitedbreweries.com/images/home/ultra-wit-bier.jpg';

  const offerImage =
    'https://as2.ftcdn.net/v2/jpg/04/86/74/33/1000_F_486743312_Kk76mM7Hf9hjiI2DjwcT3x7sLUxrhAKm.jpg';

  const schemesList = [{ id: '1', name: 'Holi Delight' }];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          Holi Delight
        </h2>
      </div>
      <Breadcrumbs
        items={[{ name: 'Seaconal Schemes', slug: '', id: '1' }]}
      ></Breadcrumbs>
      <img
        className="mt-10 self-center"
        src={offerImage + '?w=800'}
        alt="header"
      />
      <div className="mt-10 text-base text-gray-700 text-justify w=800">
        Celebrate the joyous festival of Holi with our exciting festive scheme!
        Get ready to add more colors to your celebrations with amazing
        discounts, offers, and deals on a wide range of products. From
        traditional attires to home decor, and from sweets to gadgets, we have
        something for everyone to make their Holi more special. Hurry up and
        grab the best deals before they run out! Happy Holi!
      </div>
    </div>
  );
}
