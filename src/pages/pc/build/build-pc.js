import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function PcBuild({ categoryData }) {
    // console.log("Categories data", categoryData);
    return (
        <div className=''>
            <h1 className='text-center text-xl font-semibold my-5'>Components</h1>
            <div className='flex gap-2 flex-col mx-1'>
                {categoryData && categoryData.map((category, index) => (
                    <div key={index} className="parent  border border-gray-400 rounded-sm p-2 w-full  md:w-[50%]  mx-auto flex justify-between">
                        <div className='flex gap-1'>
                            <Image src={category.image} width={48} height={48} alt='img' />
                            <h5 >{category.name}</h5>
                        </div>
                        <Link href={`/pc/build/${category.id}`}>
                            <button className='btn btn-outline'>Select</button>
                        </Link>
                    </div >
                ))
                }
            </div>
        </div>

    );
}
PcBuild.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};
export const getServerSideProps = async () => {
    const res = await fetch(`http://localhost:5000/categories`);
    const data = await res.json();
    // console.log("Dataaaa", data);

    return {
        props: {
            categoryData: data,
        }
    };
};