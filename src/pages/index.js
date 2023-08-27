// import RootLayout from '@/Layouts/RooqqtLayout';
import RootLayout from '@/Layouts/RootLayout';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import React from 'react';

export default function Home({ featuredProducts, categories }) {
  // console.log("from categories", categories);
  return (
    <div>
      {/* Featured Products */}
      <h1 className='text-center text-xl font-semibold my-5'>Featured Products</h1>
      <div className='flex flex-wrap gap-4 justify-center pb-5'>
        <FeaturedProducts featuredProducts={featuredProducts}></FeaturedProducts>
      </div>
      {/* Featured Categories */}
      <h1 className='text-center text-xl font-semibold my-5'>Featured Categories</h1>
      <div className='flex flex-wrap gap-x-6 gap-y-8 justify-center pb-5'>
        <FeaturedCategories categories={categories}></FeaturedCategories>
      </div>
    </div >
  );
}
Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/featuredProducts");
  const data = await res.json();
  const categories = await fetch("http://localhost:3000/api/categories");
  const categoriesData = await categories.json();
  return {
    props: {
      featuredProducts: data.data,
      categories: categoriesData.data
    }
  };
};
