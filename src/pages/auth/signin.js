/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import RootLayout from '@/Layouts/RootLayout';
import Link from 'next/link';
import app from "@/firebase/firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function signin() {
    const [isError, setIsError] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = getAuth(app);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleSignIn = () => toast('Sign in is successful', { hideProgressBar: true, autoClose: 2000, type: 'success', closeButton: false });
    const handleFailed = () => toast('Failed to sign in', { hideProgressBar: true, autoClose: 2000, type: 'error', closeButton: false });
    const onSubmit = async (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    dispatch(setUser(user.email));
                    handleSignIn();
                    router.push("/");
                }
            }).catch(error => {
                // Handle authentication errors
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === "auth/user-not-found") {
                    setIsError("User not found. Please check your email or sign up.");
                    // Display an appropriate error message to the user
                } else if (errorCode === "auth/wrong-password") {
                    setIsError("Incorrect password. Please double-check your password.");
                    // Display an appropriate error message to the user
                } else {
                    setIsError(errorMessage);
                }
                handleFailed();
            });
    };
    return (
        <div class="flex flex-col h-screen bg-gray-100">
            <div class="grid place-items-center mx-2 my-20 sm:my-auto">
                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg shadow-md lg:shadow-lg">
                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                        Login
                    </h2>
                    <form class="mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                        <input id="email" type="email" name="email" placeholder="e-mail address" autocomplete="email"
                            class="block w-full py-3 px-1 mt-2 
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            {...register("email", { required: true })}
                            required />
                        {errors.email && (
                            <p className="text-red-600">{errors.email?.message}</p>
                        )}
                        <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                        <input id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
                            class="block w-full py-3 px-1 mt-2 mb-4
                        text-gray-800 appearance-none 
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            {...register("password", { required: true })}
                            required />
                        {errors.password && (
                            <p className="text-red-600">{errors.password?.message}</p>
                        )}
                        {<p className="text-red-700">{isError}</p>}
                        <button type="submit"
                            class="w-full py-3  bg-gray-800 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:bg-gray-700 hover:shadow-none">
                            Login
                        </button>
                        <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                            Do not have any account ?
                            <Link href="/auth/signup" class="flex-2 underline ml-1">
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
signin.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};