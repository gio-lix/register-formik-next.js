import React from 'react';
import Link from "next/link";
import {BsArrowLeftShort} from "react-icons/bs"
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";

const Profile = () => {
    return (
        <section className="container mt-20 mx-auto text-center">
            <h3 className="text-4xl mb-20 font-bold">Profile Page</h3>
            <Link href={"/"}>

                <p className=" flex items-center justify-between w-52 m-auto font-extralight  group text-2xl">
                    <i className="group-hover:text-white text-4xl">
                        <BsArrowLeftShort/>
                    </i>
                    Home Page</p>
            </Link>
        </section>
    );
};

export default Profile;


export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req})
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}