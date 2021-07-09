import mongoose from 'mongoose';

const mongoURL = "mongodb://"+process.env.HOST+"/"+process.env.DB;
console.log(mongoURL)
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false    
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))