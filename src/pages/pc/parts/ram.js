import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
export default function Ram({ categoryData }) {
  return (
    <>  <h4 className='text-center py-4  font-bold text-2xl'>Ram</h4>
      <div className='flex justify-center flex-wrap gap-4'>
        {
          categoryData && categoryData.products.map(category => (
            <div key={category.id} className="card w-96 bg-base-100 shadow-xl">
              <figure><Image width={200} height={100} src={category.image} alt={category.name} /></figure>
              <div className="card-body">
                <div className='flex justify-between'>
                  <h2 className="card-title text-sm hover:text-green-500 hover:underline">
                    {category.name}
                  </h2>
                  <div>
                    <StarRating individualRating={category.individualRating}></StarRating>
                  </div>
                </div>
                <div className="">Status: {
                  category.status === "in stock" ? <span className='text-green-600 font-semibold'>{category.status} </span> : <span className='text-red-500 font-semibold'>{category.status} </span>
                }
                </div>
                <div className="card-actions justify-between">
                  <div className="">${category.price}</div>
                  <div className="badge badge-outline">{category.category}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>

  );
}
Ram.getLayout = function getLayout(page) {
  return <RootLayout >{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/categories/3`);
  const data = await res.json();
  return {
    props: {
      categoryData: data.data,
    }
  };
};
