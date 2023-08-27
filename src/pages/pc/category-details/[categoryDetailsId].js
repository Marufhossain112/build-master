/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function CategoryDetails({ categoryBasedData }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const router = useRouter();
    const params = router.query.categoryDetailsId;
    // console.log("Paramssssssss", params);

    const { categoryId } = useSelector(state => (state.persistedProductReducer));
    // console.log("see me", categoryId);

    const findData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const getData = await response.json();
            const products = getData.data.products;
            const selectedProduct = products.find(product => product.id === params);
            // console.log("selectedProduct", selectedProduct);
            return selectedProduct;
            // setIsSelectedProduct.push(selectedProduct);
        } catch (error) {
            // console.error("Error fetching data:", error);
        }
    };

    findData().then((product) => setSelectedProduct(product));

    // console.log("see u soon", selectedProduct);

    // const categoryProduct = useSelector(state => state.persistedProductReducer.categoryProduct);
    // const categoryId = useSelector(state => state.persistedProductReducer.categoryId);
    // const selectedProduct = categoryProduct?.find(product => product.id === categoryId);
    // console.log("CCCCCCCCategoryDetailsPage", categoryBasedData);

    // console.log("selectedProduct", selectedProduct);
    // console.log("categoryProduct", categoryProduct, "categoryId", categoryId);

    // const { name, image, category, price, status, avgRating, description, keyFeatures, reviews } = selectedProduct;
    // console.log("me final product", selectedProduct);

    return (
        // <></>
        <> <div className='flex justify-center'>
            {/* info */}
            <div className="card lg:card-side bg-base-100">
                <figure ><Image height={300} width={300} src={selectedProduct?.image} alt="Album" /></figure>
                <div className="card-body ">
                    <h2 className="card-title">{selectedProduct?.name}</h2>
                    <div className='flex gap-2'>
                        <p>Status: {
                            selectedProduct?.status === "in stock" ? <span className='text-green-600 font-semibold'>{selectedProduct?.status} </span> : <span className='text-red-500 font-semibold'>{selectedProduct?.status} </span>
                        }</p>
                        <p>Price: ${selectedProduct?.price}</p>
                        <p>Category: {selectedProduct?.category}</p>
                    </div>
                    {/* key features */}
                    <div>
                        <h4 className='text-lg'>Key Features :
                            {
                                <ul>
                                    {selectedProduct?.keyFeatures &&
                                        selectedProduct?.keyFeatures.map((item, index) => {
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
                <h2 className="card-title">{selectedProduct?.name}</h2>
                <p className='text-justify'>{selectedProduct?.description}</p>
            </div>
            {/* reviews */}
            <div className='p-4 shadow-lg'>
                <div className='flex flex-col gap-2 w-full '>
                    <h2 className='font-bold text-xl py-2'>Reviews ({selectedProduct?.reviews.length}) </h2>
                    <div className='flex items-center'>
                        <span className='text-lg font-semibold'>Avg.
                            { } </span><StarRating individualRating={selectedProduct?.avgRating}></StarRating><p>{`(${selectedProduct?.avgRating} out of 5)`}</p>
                    </div>
                    <div>
                    </div>
                </div>
                <hr />
                <div>
                    {selectedProduct?.reviews.map((review, index) => {
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
};
CategoryDetails.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
export const getStaticPaths = async () => {
    const res = await fetch(`http://localhost:3000/api/categories`);
    const products = await res.json();
    // console.log("catcatcat", products);
    const paths = products.data.map((product) => ({
        params: { categoryDetailsId: (product.id) },
    }));
    return {
        paths, fallback: false
    };
};
export const getStaticProps = async (context) => {
    // const { categoryId } = useSelector(state => (state.persistedProductReducer));
    const { params } = context;
    const res = await fetch(`http://localhost:3000/api/categories/${params.categoryDetailsId}`);
    const res2 = await fetch(`http://localhost:3000/api/categories/${params.categoryDetailsId}`);
    const data = await res.json();
    const data2 = await res2.json();
    return {
        props: {
            categoryBasedData: data.data.products,
            categoryBasedData2: data2.data.products,
        }
    };
};