import React, {useEffect, useRef, useState} from 'react';
import Layout from "../layout/Layout";
import s from "../styles/Form.module.css";
import {HiAtSymbol} from "react-icons/hi";
import {AiFillEye, AiFillEyeInvisible, AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import Link from "next/link";
import {useFormik} from "formik";
import {RegisterType} from "../types/types";
import {register_validate} from "../utils/validate";
import {useRouter} from "next/router"
import {IoMdClose} from "react-icons/io";
import {log} from "util";



interface IPassword {
    password: boolean
    cf_password: boolean
}

const Register = () => {
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const emailRef = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)
    const [show, setShow] = useState<IPassword>({
        password: false,
        cf_password: false,
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            cf_password: ""
        } as RegisterType,
        validate: register_validate,
        onSubmit: handleSubmit as (e: RegisterType) => void
    });

    const [loading,setLoading] = useState(false)

    async function handleSubmit(values: RegisterType) {
        setLoading(true)
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        }
        await fetch("http://localhost:3000/api/auth/signup", options)
            .then(res => res.json())
            .then(data => {
               if (Object.keys(data).includes("data")) {
                   router.push("http://localhost:3000")
               } else {
                   setError(data.message)
               }
            })
            .finally(() => {
                setLoading(false)
            })

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
        <Layout title="register">
            {loading ? (<>
                <img className="mx-auto h-5" src={"/assets/loading-12.gif"} alt="spinner"/>
            </>) : (
                <h5 className="text-red-500">{error}</h5>
            )}
            <section className="w-3/4 mx-auto flex flex-col gap-1">
                <div>
                    <h1 className="text-gray-800 text-xl font-bold py-1">Register</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="flex flex-col  gap-4">
                    <div className={`
                    ${s.input_group} 
                    ${formik.errors.username && formik.touched.username ? "border-rose-400" : ""}`}
                    >
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className={s.input_text}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                    </div>
                    {formik.errors.username && formik.touched.username
                        ? <span className="text-red-500">{formik.errors.username}</span>
                        : <span></span>
                    }
                    <div  className={`${s.input_group} ${formik.errors.email && formik.touched.email ? "border-rose-400" : ""}`}>
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
                        <span>
                            <HiAtSymbol size={18}/>
                        </span>
                    </div>
                    {formik.errors.email && formik.touched.email
                        ? <span className="text-red-500">{formik.errors.email}</span>
                        : <span></span>
                    }
                    <div className={`${s.input_group} ${formik.errors.password && formik.touched.password ? "border-rose-400" : ""}`}>
                        <input
                            type={`${show.password ? "text" : "password"}`}
                            name="password"
                            placeholder="password"
                            className={s.input_text}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <span onClick={() => setShow({...show, password: !show.password})}>
                            {show.password ? <AiFillEye/> : <AiFillEyeInvisible/>}
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password
                        ? <span className="text-red-500">{formik.errors.password}</span>
                        : <span></span>
                    }
                    <div className={`${s.input_group} ${formik.errors.cf_password && formik.touched.cf_password ? "border-rose-400" : ""}`}>
                        <input
                            type={`${show.cf_password ? "text" : "password"}`}
                            name="cf_password"
                            placeholder="confirm password"
                            className={s.input_text}
                            onChange={formik.handleChange}
                            value={formik.values.cf_password}
                        />
                        <span onClick={() => setShow({...show, cf_password: !show.cf_password})}>
                            {show.cf_password ? <AiFillEye/> : <AiFillEyeInvisible/>}
                        </span>
                    </div>
                    {formik.errors.cf_password && formik.touched.cf_password
                        ? <span className="text-red-500">{formik.errors.cf_password}</span>
                        : <span></span>
                    }
                    <div className={s.input_group}>
                        <button type="submit" className={s.button}>
                            Register
                        </button>
                    </div>
                    <div className="input-button py-1">
                        <button type="submit" className={s.button_custom}>
                            Sign In With Google <FcGoogle className='text-xl'/>
                        </button>
                    </div>
                    <div className="input-button py-1">
                        <button type="submit" className={s.button_custom}>
                            Sign In With Github <AiFillGithub  className='text-xl'/>
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-400">
                    have an account? <Link href={"/login"}>
                    <i className="text-blue-700">Sign In</i>
                </Link>
                </p>
            </section>
        </Layout>
    );
};

export default Register;