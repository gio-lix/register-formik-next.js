import {LoginType, RegisterType} from "../types/types";

export const login_validate = (values: LoginType) => {
    const errors: any = {}

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.trim().length < 8 || values.password.trim().length > 20) {
        errors.password = 'Must be greater then 8 and less then 20 characters long';
    }
    return errors
}


export const register_validate = (values: RegisterType) => {
    const errors: any = {}

    if (!values.username) {
        errors.username = "Required"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password ) {
        errors.password = 'Required';
    } else if (values.password.trim().length < 8 || values.password.trim().length > 20) {
        errors.password = 'Must be greater then 8 and less then 20 characters long';
    }

    if (!values.cf_password ) {
        errors.cf_password = 'Required';
    } else if (values.password !== values.cf_password) {
        errors.cf_password = "Password Not Match...!"
    }

    return errors
}