import React from 'react';
import StarRating from './StarRating';
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function FeaturedProducts({ featuredProducts }) {
    // console.log("featuredProducts`````````", featuredProducts);

    const router = useRouter();
    const handleProductClick = (productId) => {
        router.push(`pc/product-details/${productId}`); // Programmatically navigate
    };
    return (
        <>
            {
                featuredProducts && featuredProducts.map(product => (
                    <div key={product.id} onClick={() => handleProductClick(product.id)} className="card w-96 bg-base-100 shadow-xl">
                        <figure><Image width={200} height={100} src={product.image} alt={product.name} /></figure>
                        <div className="card-body">
                            <div className='flex justify-between'>
                                <h2 className="card-title text-sm hover:text-green-500 hover:underline">
                                    {product.name}
                                </h2>
                                <div>
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
        </>
    );
}
