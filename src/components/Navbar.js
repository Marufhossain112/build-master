import Image from 'next/image';
import React from 'react';
import logo from '/public/logo.png';
import Link from 'next/link';
export default function Navbar() {
    return (
        <div className="navbar bg-emerald-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link href="/"><li><a>Home</a></li></Link>
                        <li><a>Sign in</a></li>
                        <li><a>Sign out</a></li>
                        <li><a>Sign up</a></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Categories</summary>
                                <ul className="p-2">
                                    <li><Link href="/pc/parts/cpu">CPU</Link></li>
                                    <li><Link href="/pc/parts/motherboard">Motherboard</Link></li>
                                    <li><Link href="/pc/parts/ram">RAM</Link></li>
                                    <li><Link href="/pc/parts/power-supply">Power Supply</Link></li>
                                    <li><Link href="/pc/parts/storage-device">Storage
                                        Device</Link></li>
                                    <li><Link href="/pc/parts/others">Others</Link></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                {/* <Link href="/" >  </Link>  */}
                <Image className='ml-4' src={logo} alt='logo' height={30} width={30} />
                <Link href="/" className="btn btn-ghost normal-case text-xl">Build Master</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link href="/"><li><a>Home</a></li></Link>
                    <li><a>Sign in</a></li>
                    <li><a>Sign out</a></li>
                    <li><a>Sign up</a></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Categories</summary>
                            <ul className="p-2 z-50">
                                <li><Link href="/pc/parts/cpu">CPU</Link></li>
                                <li><Link href="/pc/parts/motherboard">Motherboard</Link></li>
                                <li><Link href="/pc/parts/ram">RAM</Link></li>
                                <li><Link href="/pc/parts/power-supply">Power Supply</Link></li>
                                <li><Link href="/pc/parts/storage-device">Storage
                                    Device</Link></li>
                                <li><Link href="/pc/parts/others">Others</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link href={'/pc/build-pc'}>
                    <button className="btn">Pc Builder</button>
                </Link>
            </div>
        </div>
    );
}
