import * as mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URL as string)
        if (connection.readyState === 1 ) {
            return  Promise.resolve(true)
        }
    } catch (err: any) {
        return Promise.reject(err)
    }
}
export default connectMongo