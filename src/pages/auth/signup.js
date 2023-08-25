/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import RootLayout from '@/Layouts/RootLayout';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import app from '@/firebase/firebase.config';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/userSlice';
import { toast } from 'react-toastify';
export default function signup() {
    const dispatch = useDispatch();
    const [isError, setIsError] = useState("");
    const auth = getAuth(app);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm();
    // toast 
    const handleSuccess = () => toast('Sign up is successful', { hideProgressBar: true, autoClose: 2000, type: 'success', closeButton: false });
    const handleFailed = () => toast('Failed to sign up', { hideProgressBar: true, autoClose: 2000, type: 'failed', closeButton: false });

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                if (user) {
                    dispatch(setUser(user.email));
                    handleSuccess();
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log("errorCode", errorCode, "errorMessage", errorMessage);
                if (errorCode === "auth/weak-password") {
                    setIsError("Password should be at least 6 characters");
                } else if (errorCode === "auth/invalid-email") {
                    setIsError("Please enter valid email");
                } else if (errorCode === "auth/email-already-in-use") {
                    setIsError("Email is already connected with another account");
                }
                else {
                    setIsError(errorMessage);
                }
                handleFailed();
            });
        await updateProfile(auth.currentUser, {
            displayName: data.name
        }).then(() => {
        }).catch((error) => {
            // console.log(error);
        });
    };

    return (
        <div class="flex flex-col h-screen bg-gray-100">
            <div class="grid place-items-center mx-2 my-20 sm:my-auto">
                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg shadow-md lg:shadow-lg">
                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                        Sign Up
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} class="mt-10" method="POST">
                        <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">Name</label>
                        <input id="name" type="name" name="name" placeholder="name" autocomplete="name"
                            class="block w-full py-3 px-1 mt-2 
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"{...register("name", { required: true })}
                            required />
                        {errors.name && (
                            <p className="text-red-600">{errors.name?.message}</p>
                        )}
                        <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                        <input id="email" type="email" name="email" {...register("email", { required: true })} placeholder="e-mail address" autocomplete="email"
                            class="block w-full py-3 px-1 mt-2 
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required />
                        {errors.email && (
                            <p className="text-red-600">{errors.email?.message}</p>
                        )}
                        <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                        <input id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200" {...register("password", { required: true })}
                            required />
                        {errors.password && (
                            <p className="text-red-600">{errors.password?.message}</p>
                        )}
                        {<p className='text-red-700'>{isError}</p>}
                        <button type="submit"
                            class="w-full py-3  bg-gray-800 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:bg-gray-700 hover:shadow-none">
                            Sign Up
                        </button>

                        <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                            Already have an account ?
                            <Link href="/auth/signin" class="flex-2 underline ml-1">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
signup.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};













