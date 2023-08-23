import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';

export default function Parts({ categoryData }) {
  console.log(categoryData);

  return (
    <>
      <h1 className='text-center text-xl font-semibold my-5'>{categoryData.name}</h1>
      {categoryData.products.map((product, index) => (
        <div key={index} className="card card-side bg-base-100 shadow-xl my-5 md:mx-auto md:w-1/2 p-2 mx-5">
          <figure><Image src={product.image} height={120} width={120} alt="Movie" responsive /></figure>
          <div className="card-body">
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h2 className="card-title text-sm">{product.name}</h2>
                <p className="">Status: {
                  product.status === "in stock" ? <span className='text-green-600 font-semibold'>{product.status} </span> : <span className='text-red-500 font-semibold'>{product.status} </span>
                }
                </p>
                <p className=''>Category : {product.category}</p>
                <p>Price: <span className='font-semibold'>${product.price}</span> </p>
              </div>
              <div className="card-actions ">
                <StarRating individualRating={product.individualRating}></StarRating>
              </div>
            </div>
            <div className="card-actions justify-start lg:justify-end">
              <button className="btn btn-outline ">Add to builder</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
Parts.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
};
export const getServerSideProps = async (context) => {
  // console.log("context", context);
  const { params } = context;

  const res = await fetch(`http://localhost:5000/categories/${params.parts}`);
  const data = await res.json();
  // console.log("Dataaaa", data);

  return {
    props: {
      categoryData: data,
    }
  };
};