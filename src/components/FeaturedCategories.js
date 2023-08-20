import React from 'react';
import StarRating from './StarRating';
import Image from 'next/image';
export default function FeaturedCategories({ categories }) {
    console.log("I am groot", categories);
    return (
        <>
            {
                categories && categories.map(category => (
                    <div key={category.id} className="card w-60  bg-base-100 shadow-xl">
                        <figure><Image width={50} height={50} src={category.image} alt={category.name} /></figure>
                        <div className="card-body">
                            {/* <div className='flex justify-between'> */}
                            <h2 className="card-title mx-auto text-sm hover:text-green-500">
                                {category.name}
                            </h2>
                            {/* </div> */}
                        </div>
                    </div>
                ))
            }
        </>
    );
}
