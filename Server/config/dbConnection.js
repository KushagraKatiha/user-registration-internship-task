import mongoose from 'mongoose'

const dbConn = async ()=> {
    mongoose.connect(process.env.MONGO_URI)
    .then((conn)=>{
        console.log("Mongo DB connected: ", conn.connection.host);
    })
    .catch((err)=>{
        console.log(err.message);
    })
}

export default dbConn