import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useRouter } from 'next/router';
export default function CategoryDetails({ categoryData }) {
    // console.log("I am single category based data", categoryData);
    const router = useRouter();
    // console.log("UNDEFINED",router.query.params);

    console.log("router_query", router.query.categoryDetailsId);
    // const selectedProduct = categoryData.products.filter(product => product.id === categoryData.id);
    // console.log(selectedProduct);
    // const { name, image, category, price, status, avgRating, description, keyFeatures, reviews } = selectedProduct[0];
    return (
        <></>
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
    );
}
CategoryDetails.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
// export const getStaticPaths = async () => {
//     const res = await fetch(`http://localhost:5000/categories`);
//     const products = await res.json();
//     const paths = products.map((product) => ({
//         params: { categoryDetailsId: (product.id).toString() },
//     }));
//     return {
//         paths, fallback: false
//     };
// };
// export const getStaticProps = async (context) => {
//     const { params } = context;
//     const res = await fetch(`http://localhost:5000/categories/${params.categoryDetailsId}`);
//     const data = await res.json();
//     console.log("DAAAAAAAAAAta", data);

//     const res2 = await fetch(`http://localhost:5000/${data.name}/${params.categoryDetailsId}`);
//     // console.log("resData", data.name);
//     const categoryBasedData = await res2.json();
//     // console.log("I am category based data", categoryBasedData);

//     return {
//         props: {
//             categoryData: data,
//             // categoryBasedData
//         }
//     };
// };

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:5000/categories`);
    const categories = await res.json();
    console.log("Categories", categories);

    const paths = categories.flatMap(category => /* (console.log("ProdddddddddcutName",category)
    ) */
        category.products.map(product => ({
            params: { categoryDetailsId: (product.id).toString(), productCategory: product.category }
        }))
    );
    console.log("pathsss", paths);

    return { paths, fallback: false };
}
// export async function getStaticProps(context) {
//     console.log("cat-id", context);
//     const res = await fetch(`http://localhost:5000/categories`);
//     const categories = await res.json();
//     // const { categoryDetailsId } = params;

//     // Find the product based on the categoryDetailsId
//     // const product = categories.flatMap(category =>
//     //     category.products.find(product => product.id.toString() === categoryDetailsId[0])
//     // );
//     console.log("last product", product);

//     return { props: { product: product || null } };
// }

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:5000/categories`);
    const categories = await res.json();
    const { categoryDetailsId } = params;
    console.log("Paramsss", params);

    // Find the product based on the categoryDetailsId;
    const product = categories.flatMap(category =>
        category.products.find(product => product.id.toString() === categoryDetailsId)
    );
    console.log("last product", product);

    return { props: { product: product || null } };
}