import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
export default function ProductDetails({ product }) {
    // console.log("I am single product", product);
    const { name, image, category, price, status, avgRating, description, keyFeatures, reviews } = product;
    return (
        <> <div className='flex justify-center'>
            {/* info */}
            <div className="card lg:card-side bg-base-100">
                <figure ><Image height={300} width={300} src={image} alt="Album" /></figure>
                <div className="card-body ">
                    <h2 className="card-title">{name}</h2>
                    <div className='flex gap-2'>
                        <p>Status: {
                            status === "in stock" ? <span className='text-green-600 font-semibold'>{status} </span> : <span className='text-red-500 font-semibold'>{status} </span>
                        }</p>
                        <p>Price: ${price}</p>
                        <p>Category: {category}</p>
                    </div>
                    {/* key features */}
                    <div>
                        <h4 className='text-lg'>Key Features :
                            {
                                <ul>
                                    {keyFeatures &&
                                        keyFeatures.map((item, index) => {
                                            const keyValues = Object.entries(item);
                                            return (
                                                <ul key={index}>
                                                    {keyValues.map(([key, value]) => (
                                                        <li className='text-[15px]' key={key}>
                                                            {key}: {value}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                            // console.log("item girl", keyValues);
                                        }
                                        )}
                                </ul>
                            }
                        </h4>
                    </div>
                </div>
            </div>
        </div>
            <hr />
            {/* description */}
            <div className='p-4 shadow-lg' >
                <h2 className='font-bold text-xl py-3'>Description</h2>
                <h2 className="card-title">{name}</h2>
                <p className='text-justify'>{description}</p>
            </div>
            {/* reviews */}
            <div className='p-4 shadow-lg'>
                <div className='flex flex-col gap-2 w-full '>
                    <h2 className='font-bold text-xl py-2'>Reviews ({reviews.length}) </h2>
                    <div className='flex items-center'>
                        <span className='text-lg font-semibold'>Avg.
                            { } </span><StarRating individualRating={avgRating}></StarRating><p>{`(${avgRating} out of 5)`}</p>
                    </div>
                    <div>
                    </div>
                </div>
                <hr />
                <div>
                    {reviews.map((review, index) => {
                        // const { name, review } = review;
                        return (
                            <div key={index}>
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <div className="card-body px-0 py-1">
                                        <div className='flex'>
                                            <p className='font-semibold'>{review.name}</p>
                                            <StarRating individualRating={review.rating}></StarRating>
                                        </div>
                                        <p className='pb-2'>{review.review}</p>
                                    </div>
                                </div>
                            </div>);
                    })}
                </div>
            </div>
        </>
    );
}
ProductDetails.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/featuredProducts');
    const products = await res.json();
    const paths = products.data.map((product) => ({
        params: { productId: (product.id).toString() },
    }));
    return {
        paths, fallback: false
    };
};
export const getStaticProps = async (context) => {
    const { params } = context;
    const res = await fetch(`http://localhost:3000/api/featuredProducts/${params.productId}`);
    const data = await res.json();
    return {
        props: {
            product: data.data
        }
    };
};