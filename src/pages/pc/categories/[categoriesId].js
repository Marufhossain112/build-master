import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { categoryId, categoryName, categoryProduct } from '@/redux/product/productReducer';
export default function Categories({ categoryData, categoryBasedData }) {
    const dispatch = useDispatch();
    // console.log("I am single categoryBasedData", categoryBasedData);
    // console.log("categories", categoryData);
    const router = useRouter();
    const handleCategoryClick = (productId) => {
        dispatch(categoryProduct(categoryBasedData));
        dispatch(categoryId(productId));
        router.push(`/pc/category-details/${productId}`); // Programmatically navigate
    };
    return (
        // <> <div className='flex justify-center'>
        //     {/* info */}
        //     <div className="card lg:card-side bg-base-100">
        //         <figure ><Image height={300} width={300} src={image} alt="Album" /></figure>
        //         <div className="card-body ">
        //             <h2 className="card-title">{name}</h2>
        //             <div className='flex gap-2'>
        //                 <p>Status: {
        //                     status === "in stock" ? <span className='text-green-600 font-semibold'>{status} </span> : <span className='text-red-500 font-semibold'>{status} </span>
        //                 }</p>
        //                 <p>Price: ${price}</p>
        //                 <p>Category: {category}</p>
        //             </div>
        //             {/* key features */}
        //             <div>
        //                 <h4 className='text-lg'>Key Features :
        //                     {
        //                         <ul>
        //                             {keyFeatures &&
        //                                 keyFeatures.map((item, index) => {
        //                                     const keyValues = Object.entries(item);
        //                                     return (
        //                                         <ul key={index}>
        //                                             {keyValues.map(([key, value]) => (
        //                                                 <li className='text-[15px]' key={key}>
        //                                                     {key}: {value}
        //                                                 </li>
        //                                             ))}
        //                                         </ul>
        //                                     );
        //                                     console.log("item girl", keyValues);
        //                                 }
        //                                 )}
        //                         </ul>
        //                     }
        //                 </h4>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        //     <hr />
        //     {/* description */}
        //     <div className='p-4 shadow-lg' >
        //         <h2 className='font-bold text-xl py-3'>Description</h2>
        //         <h2 className="card-title">{name}</h2>
        //         <p className='text-justify'>{description}</p>
        //     </div>
        //     {/* reviews */}
        //     <div className='p-4 shadow-lg'>
        //         <div className='flex flex-col gap-2 w-full '>
        //             <h2 className='font-bold text-xl py-2'>Reviews ({reviews.length}) </h2>
        //             <div className='flex items-center'>
        //                 <span className='text-lg font-semibold'>Avg.
        //                     { } </span><StarRating individualRating={avgRating}></StarRating><p>{`(${avgRating} out of 5)`}</p>
        //             </div>
        //             <div>
        //             </div>
        //         </div>
        //         <hr />
        //         <div>
        //             {reviews.map((review, index) => {
        //                 // const { name, review } = review;
        //                 return (
        //                     <div key={index}>
        //                         <div className="card w-96 bg-base-100 shadow-xl">
        //                             <div className="card-body px-0 py-1">
        //                                 <div className='flex'>
        //                                     <p className='font-semibold'>{review.name}</p>
        //                                     <StarRating individualRating={review.rating}></StarRating>
        //                                 </div>
        //                                 <p className='pb-2'>{review.review}</p>
        //                             </div>
        //                         </div>
        //                     </div>);
        //             })}
        //         </div>
        //     </div>
        // </>
        <>  <h4 className='text-center py-4 font-bold text-2xl'>{categoryData.name}</h4>
            <div className='flex justify-center flex-wrap gap-4'>
                {
                    categoryBasedData && categoryBasedData.map(category => (
                        <div onClick={() => handleCategoryClick(category.id)} key={category.id} className="card w-96 bg-base-100 shadow-xl">
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
Categories.getLayout = function getLayout(page) {
    return <RootLayout >{page}</RootLayout>;
};
export const getStaticPaths = async () => {
    const res = await fetch(`http://localhost:5000/categories`);
    const products = await res.json();
    const paths = products.map((product) => ({
        params: { categoriesId: (product.id).toString() },
    }));
    return {
        paths, fallback: false
    };
};
export const getStaticProps = async (context) => {
    const { params } = context;
    const res = await fetch(`http://localhost:5000/categories/${params.categoriesId}`);
    const data = await res.json();
    const res2 = await fetch(`http://localhost:5000/${data.name}`);
    // console.log("resData", data.name);
    const categoryBasedData = await res2.json();

    return {
        props: {
            categoryData: data,
            categoryBasedData
        }
    };
};
