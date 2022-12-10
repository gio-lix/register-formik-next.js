
export interface LoginType {
    email: string,
    password: string
}
export interface RegisterType extends LoginType{
    username: string,
    cf_password: string
}

export interface UserType {
    email: string
    name: string
    image: string
}