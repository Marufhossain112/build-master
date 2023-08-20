// import RootLayout from '@/Layouts/RooqqtLayout';
import RootLayout from '@/Layouts/RootLayout';
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
        {/* <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <div className='flex justify-between'>   <h2 className="card-title">
              Shoes!
            </h2>
              <div>
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
                </div></div>
            <div className="">Status: <span className='text-green-600 font-semibold'>in stock</span></div>
            <div className="card-actions justify-between">
              <div className="">$30</div>
              <div className="badge badge-outline">monitor</div>
            </div>

          </div>
        </div> */}
        {
          featuredProducts && featuredProducts.map(product => (
            <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
              <figure><Image width={200} height={100} src={product.image} alt={product.name} /></figure>
              <div className="card-body">
                <div className='flex justify-between'>
                  <h2 className="card-title text-sm">
                    {product.name}
                  </h2>
                  <div>
                    {/* Replace this static rating with a dynamic one */}
                    {/* You can use the StarRating component here */}
                    {/* Example: <StarRating individualRating={product.individualRating} /> */}
                    <StarRating individualRating={product.individualRating}></StarRating>
                  </div>
                </div>
                <div className="">Status: {
                  product.status === "in stock" ? <span className='text-green-600 font-semibold'>{product.status} </span> : <span className='text-red-500 font-semibold'>{product.status} </span>
                }
                </div>
                <div className="card-actions justify-between">
                  <div className="">${product.price}</div>
                  <div className="badge badge-outline">{product.category}</div>
                </div>
              </div>
            </div>
          ))
        }

        {/* <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">monitor</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">monitor</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">monitor</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">monitor</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">monitor</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">monitor</div>
            </div>
          </div>
        </div> */}
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
