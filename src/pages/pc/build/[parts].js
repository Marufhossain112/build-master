import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCpu, selectedMonitor, selectedMotherboard, selectedOthers, selectedPowerSupply, selectedProduct, selectedRam, selectedStorageDevice, updateSelectedProduct } from '@/redux/pcBuilder/pcBuilderReducer';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
export default function Parts({ categoryData }) {
  const router = useRouter();
  console.log('I am cat data', categoryData);
  const selectedProductList = useSelector(state => state.persistedPcBuilderReducer.selectedProduct);
  // console.log("selectedProductList", selectedProductList);
  const dispatch = useDispatch();
  const handleAddToBuilder = (product, productName, productCategory) => {
    const existProduct = selectedProductList.filter(selected => selected.name === productName);
    const sameCategoryProduct = selectedProductList.filter(selected => selected.category === productCategory);
    // // console.log("sameCategoryProduct", sameCategoryProduct.push(product));
    // console.log("Sameee", sameCategoryProduct);
    // console.log("Before splicing", selectedProductList);
    const handleExistToast = () => toast('Product is already selected', { hideProgressBar: true, autoClose: 2000, type: 'error', closeButton: false });
    if (existProduct.length) {
      // dispatch(selectedProduct(product));
      handleExistToast();
      return;
    }
    else if (!existProduct.length) {
      dispatch(selectedProduct(product));
    } else {
      // console.log("already added");
    }
    if (sameCategoryProduct.length) {

      const foundProduct = selectedProductList.find(product => product === sameCategoryProduct[0]);
      const foundProductIndex = selectedProductList.findIndex(product => product === sameCategoryProduct[0]);
      // console.log("foundProduct index", foundProduct, foundProductIndex);
      // selectedProductList.shift();
      if (foundProductIndex !== -1) {
        dispatch(updateSelectedProduct(foundProductIndex));
      }

      // selectedProductList.splice(foundProductIndex, 1);
      // dispatch(updateSelectedProduct(foundProductIndex, 1));
    }
    // console.log("After splicing", selectedProductList);



    if (productCategory === "CPU") {
      dispatch(selectedCpu(product));
    }
    if (productCategory === "Motherboard") {
      dispatch(selectedMotherboard(product));
    }
    if (productCategory === "RAM") {
      dispatch(selectedRam(product));
    }
    if (productCategory === "Power-Supply") {
      dispatch(selectedPowerSupply(product));
    }
    if (productCategory === "Storage-Device") {
      dispatch(selectedStorageDevice(product));
    }
    if (productCategory === "Monitor") {
      dispatch(selectedMonitor(product));
    }
    if (productCategory === "Others") {
      dispatch(selectedOthers(product));
    }
    router.push('/pc/build/build-pc');
  };
  return (
    // <></>
    <>
      <h1 className='text-center text-xl font-semibold my-5'>{categoryData.name}</h1>
      {categoryData.products.map((product, index) => (
        <div key={index} className="card card-side bg-base-100 shadow-xl my-5 md:mx-auto md:w-1/2 p-2 mx-5">
          <figure><Image src={product.image} height={120} width={120} alt="Movie" responsive /></figure>
          <div className="card-body">
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h2 className="card-title text-sm">{product.name}</h2>
                <p className="">Status: {
                  product.status === "in stock" ? <span className='text-green-600 font-semibold'>{product.status} </span> : <span className='text-red-500 font-semibold'>{product.status} </span>
                }
                </p>
                <p className=''>Category : {product.category}</p>
                <p>Price: <span className='font-semibold'>${product.price}</span> </p>
              </div>
              <div className="card-actions ">
                <StarRating individualRating={product.individualRating}></StarRating>
              </div>
            </div>
            <div className="card-actions justify-start lg:justify-end">
              <button onClick={() => handleAddToBuilder(product, product.name, product.category)} className="btn btn-outline ">Add to builder</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
Parts.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
};
export const getServerSideProps = async (context) => {
  // console.log("context", context);
  const { params } = context;

  const res = await fetch(`http://localhost:3000/api/categories/${params.parts}`);
  const data = await res.json();
  // console.log("Dataaaa", data);

  return {
    props: {
      categoryData: data.data,
    }
  };
};