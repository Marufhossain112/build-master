import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function PcBuild({ categoryData }) {
    const selectedData = useSelector(state => state.persistedPcBuilderReducer.selectedProduct);
    // console.log("selected data", selectedData);
    const handleCompleteBuild = () => toast('Build is completed successfully', { hideProgressBar: true, autoClose: 2000, type: 'success', closeButton: false });
    return (
        <div className=''>
            <h1 className='text-center text-xl font-semibold my-5'>Components</h1>
            <div className='flex gap-2 flex-col mx-1'>
                {categoryData && categoryData.map((category, index) => (
                    <div key={index} className="parent  border border-gray-400 rounded-sm p-2 w-full  md:w-[50%]  mx-auto flex justify-between overflow-auto">
                        <div className='flex gap-1 max-w-md max-h-16'>
                            <Image src={category.image} width={48} height={48} alt='img' />
                            <h5 >{category.name}</h5>
                            <div>
                                {selectedData.map((product, index) => (
                                    <div key={index}>{product.category === category.name ? <>
                                        <div className='flex items-center  rounded-md'>
                                            <div className='mx-1'>
                                                <Image src={product.image} width={48} height={48} alt='img' />
                                            </div>
                                            <p className=''>{product.name}
                                            </p>
                                            {/* <p>
                                            {product.price}
                                        </p> */}
                                        </div></> : null}</div>
                                ))}
                            </div>

                        </div>
                        <Link href={`/pc/build/${category.id}`}>
                            <button className='btn btn-outline'>Select</button>
                        </Link>
                    </div >
                ))
                }
            </div>
            {/* <button className='text-center inline-flex justify-center items-center text-xl font-semibold my-5'>Complete</button> */}
            <button disabled={selectedData.length < 7} onClick={handleCompleteBuild} className='btn btn-outline block mx-auto my-3'>Complete build</button>
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
    const res = await fetch(`http://localhost:3000/api/categories`);
    const data = await res.json();
    // console.log("Dataaaa", data);

    return {
        props: {
            categoryData: data.data,
        }
    };
};