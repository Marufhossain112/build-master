import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
export default function ProductDetails({ product }) {
    console.log("I am single product", product);
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
                                            console.log("item girl", keyValues);
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
            <div className='p-4'>
                <h2 className='font-bold text-xl py-3'>Description</h2>
                <h2 className="card-title">{name}</h2>
                <p className='text-justify'>{description}</p>
            </div>
            {/* reviews */}
        </>
    );
}
ProductDetails.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:5000/featuredProducts');
    const products = await res.json();
    const paths = products.map((product) => ({
        params: { productId: (product.id).toString() },
    }));
    return {
        paths, fallback: false
    };
};
export const getStaticProps = async (context) => {
    const { params } = context;
    const res = await fetch(`http://localhost:5000/featuredProducts/${params.productId}`);
    const data = await res.json();
    return {
        props: {
            product: data
        }
    };
};