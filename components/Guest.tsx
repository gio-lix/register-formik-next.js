import React from 'react';
import Link from "next/link";

const Guest = () => {
    return (
        <section className="container mx-auto text-center py-20">
            <h3 className="">Guest Homepage</h3>
            <div className="flex justify-center">
                <Link href="/login"><span className="mt-5 px-10 py-1 rounded-sm bg-indigo-400 text-gray-800 ">
                    Sign In
                </span></Link>
            </div>
        </section>
    );
};

export default Guest;