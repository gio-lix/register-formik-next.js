import React, {useEffect, useRef, useState} from 'react';
import {FcGoogle} from "react-icons/fc"
import {AiFillGithub, AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import {HiAtSymbol} from "react-icons/hi"
import {IoMdClose} from "react-icons/io"

import s from "../styles/Form.module.css"
import Layout from "../layout/Layout";
import Link from "next/link";
import {signIn} from "next-auth/react"
import {useFormik} from 'formik';
import {login_validate} from "../utils/validate";
import {LoginType} from "../types/types";
import {useRouter} from "next/router"


const Login = () => {
    const [loading,setLoading] = useState<boolean>(false)
    const [focus, setFocus] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const emailRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        } as LoginType,
        validate: login_validate,
        onSubmit: handleSubmit as (e: LoginType) => void
    });

    async function handleSubmit(values: LoginType) {
        setLoading(true)

        const status = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
        if (status!.ok) {
            router.push(status!.url!)
            setLoading(false)
        }

        if (!status!.ok) {
            setLoading(false)
            setError(status!.error!)
        }
    }

    useEffect(() => {
        const handleClick = (e:any) => {
            if (!e.path.includes(emailRef.current)) setFocus(false)
        }
        window.addEventListener("click", handleClick)
        return () => {window.removeEventListener("click", handleClick)}
    },[emailRef.current])


    useEffect(() => {
        const timer = setTimeout(() => {
            setError("")
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [error])

    return (
        <Layout  title="login">
            {loading ? (<>
                <img className="mx-auto h-5" src={"/assets/loading-12.gif"} alt="spinner"/>
            </>) : (
                <h5 className="text-red-500">{error}</h5>
            )}
            <section className="w-3/4 mx-auto flex flex-col gap-2">
                <div>
                    <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
                    <p className="w-3/4 mx-auto text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Iste, nam!</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="flex flex-col  gap-5">
                    <div
                        className={`${s.input_group} ${formik.errors.email && formik.touched.email ? "border-rose-400" : ""}`}>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className={s.input_text}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onFocus={() => setFocus(true)}
                            ref={emailRef}
                        />
                        <i
                            onClick={() => formik.setFieldValue("email", "" )}
                            className={`absolute right-[40px] ${focus && s.close_email_focus}`}>
                            <IoMdClose />
                        </i>
                        <span title="email">
                            <HiAtSymbol className="cursor-default" size={18}/>
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email
                        ? <span className="text-red-500">{formik.errors.email}</span>
                        : <span></span>
                    }
                    <div
                        className={`${s.input_group} ${formik.errors.password && formik.touched.password ? "border-rose-400" : ""}`}>
                        <input
                            type={`${show ? "text" : "password"}`}
                            name="password"
                            placeholder="password"
                            className={s.input_text}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <span onClick={() => setShow(!show)}>
                            {show ? <AiFillEye/> : <AiFillEyeInvisible/>}
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password
                        ? <span className="text-red-500">{formik.errors.password}</span>
                        : <span></span>
                    }
                    <div className={s.input_group}>
                        <button type="submit" className={s.button}>
                            Login
                        </button>
                    </div>
                </form>
                <div className="input-button py-1">
                    <button
                        onClick={() => signIn("google", {
                            callbackUrl: 'http://localhost:3000//'
                        })}
                        type="submit"
                        className={s.button_custom}>
                        Sign In With Google <FcGoogle  className='text-xl'/>
                    </button>
                </div>
                <div className="input-button py-1">
                    <button
                        onClick={() => signIn("github", {
                            callbackUrl: 'http://localhost:3000//'
                        })}
                        type="submit" className={s.button_custom}>
                        Sign In With Github <AiFillGithub  className='text-xl'/>
                    </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                    dont have an account Yet? <Link href={"/register"}>
                    <i className="text-blue-700">Sign Up</i>
                </Link>
                </p>
            </section>
        </Layout>
    );
};

export default Login;



