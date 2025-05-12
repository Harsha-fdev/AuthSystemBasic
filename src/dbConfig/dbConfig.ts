import mongoose from 'mongoose';

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!); //for typescript we have use non-null assertion  if we are sure env is defined
        const connection = mongoose.connection;

        connection.on('connected' , () => {
            console.log('MongoDB connected Successfully');
        })

        connection.on('error' , (err) => {
            console.log('MongoDB connection error: Please make sure MongoDB is running.' +err);
            process.exit();//this immediately stops nodejs process
        })

    } 
    catch (error) {

        console.log('something went wrong');
        console.log(error);

    }
}