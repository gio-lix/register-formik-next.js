import React, {FC, useEffect, useState} from 'react';
import Link from "next/link";
import {UserType} from "../types/types";
import {signOut} from "next-auth/react"
import s from "../styles/User.module.css"
import {useRouter} from 'next/router'
import {BsArrowLeftShort} from "react-icons/bs";

interface Props {
    user: UserType
}

const User: FC<Props> = ({user}) => {
    const [classname, setClassname] = useState("")

    const router = useRouter()

    useEffect(() => {
        if (router.pathname === "/") {
            setClassname(s.user_info_active_styles)
        }
        return () => {
            setClassname("")
        }
    }, [router.pathname])

    return (
        <section className={`relative container mx-auto text-center py-20  ${classname}`}>
            <article  className={`${s.user_info} m-auto  mb-10 text-indigo-600`}   >
                <h3>Authorize User Homepage</h3>
                <div className={`details ${s.user_details} text-gray-800`}>
                    <h5 className="text-xl mb-6">{user.name}</h5>
                    <h5 className="text-xl">{user.email}</h5>
                </div>
            </article>
            <div className="absolute right-10 top-0">
                <button
                    onClick={() => signOut()}
                    className="mt-5 px-10 py-1 border-none
                    bg-transparent text-xl font-extrabold text-white hover:text-black rounded-sm ">Sign Out
                </button>
            </div>
            <div className={`flex justify-center ${s.profile_nav}`}>
                <Link href="/profile"><span className="flex items-center mt-5 font-extrabold
                group px-12 text-white text-xl py-2 text-gray-800 ">
                    Profile Page
                    <i className="group-hover:text-white  text-4xl rotate-180 ml-5 group-hover:text-green-300">
                        <BsArrowLeftShort/>
                    </i>
                </span></Link>
            </div>
        </section>
    );
};

export default User;