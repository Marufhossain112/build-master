import React from 'react';
import StarRating from './StarRating';
import Image from 'next/image';
import Link from 'next/link';
export default function FeaturedCategories({ categories }) {
    // console.log("I am all categories", categories);
    return (
        <>
            {
                categories && categories.map(category => (
                    <Link href={`/pc/categories/${category.id}`} key={category.id} className="card w-60  bg-base-100 shadow-xl">
                        <figure><Image width={50} height={50} src={category.image} alt={category.name} /></figure>
                        <div className="card-body">
                            {/* <div className='flex justify-between'> */}
                            <h2 className="card-title mx-auto text-sm hover:text-green-500">
                                {category.name}
                            </h2>
                            {/* </div> */}
                        </div>
                    </Link>
                ))
            }
        </>
    );
}
