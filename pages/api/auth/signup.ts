import {hash} from "bcryptjs"
import connectMongo from "../../../database/database"
import Users from "../../../model/schema"

export default async function handler(req: any, res: any) {
    connectMongo().catch(error => res.json({error: "Connection Failed...!"}))

    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({error: "Dont have from data..."})
        const {username, email, password} = req.body

        const checkExist = await Users.findOne({email})
        if (checkExist) return res.status(422).json({message: "User already exist...!"})

        const hashPassword = await hash(password, 12)
       const user = await Users.create({username, email, password:hashPassword})
        return res.status(200).json({data:user })
    } else {
        res.status(500).json({message: "HTTP method not valid only POST accepted."})
    }
}