import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/notes')
    
    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:');
        process.exit(1);
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });

};

export default connectDB;



