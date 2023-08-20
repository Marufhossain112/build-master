// import RootLayout from '@/Layouts/RooqqtLayout';
import RootLayout from '@/Layouts/RootLayout';
import FeaturedProducts from '@/components/FeaturedProducts';
import Navbar from '@/components/Navbar';
import StarRating from '@/components/StarRating';
import Image from 'next/image';
import Container from 'postcss/lib/container';
import React from 'react';

export default function Home({ featuredProducts }) {
  console.log("from featuredProducts", featuredProducts);
  return (
    <div className='h-[100vh]'>
      {/* <ul>
        {allProducts &&
          allProducts.map((product, index) => (
            <li key={index}>
              {product.keyFeatures.map((item, itemIndex) => {
                const keyValues = Object.entries(item);
                return (
                  <div key={itemIndex}>
                    {keyValues.map(([key, value]) => (
                      <div key={key}>
                        {key}: {value}
                      </div>
                    ))}
                  </div>
                );
              })}
            </li>
          ))}
      </ul> */}
      <h1 className='text-center text-xl font-semibold my-3'>Featured Products</h1>
      <div className='flex flex-wrap gap-4 justify-center'>
        <FeaturedProducts featuredProducts={featuredProducts}></FeaturedProducts>
      </div>
    </div >
  );
}
Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/featuredProducts");
  const data = await res.json();
  return {
    props: {
      featuredProducts: data
    }
  };
};
