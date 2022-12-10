import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../model/schema"
import {compare} from "bcryptjs"


export default NextAuth({
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            // @ts-ignore
            async authorize(credentials: any, req: any) {
                const result = await Users.findOne({email: credentials.email})
                if (!result) {
                    throw new Error("No User found with this email address.")
                }
                const checkPassword = await compare(credentials.password, result.password)
                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username or Password does not mutch")
                }
                return {result}
            },
        })
    ],
    secret: "MDRGkIAsCOR3UpeZr/t3+IsZ0/GgBTubqDmapcq0ItY="
})
