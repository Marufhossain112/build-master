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
