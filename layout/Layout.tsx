import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import Head from "next/head";

interface Props {
    children: React.ReactNode
    title: string
}

const Layout: FC<Props> = ({
                               children,
                               title,
                           }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="flex h-screen">
                <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-3 ">
                    <div className="h-full w-full">
                        <img
                            className="cover h-full w-full object-cover"
                            src={"/assets/emre.jpg"}
                            alt={"img"}
                        />
                    </div>
                    <div className=" relative right flex flex-col justify-evenly col-span-2">
                        <div className="text-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;