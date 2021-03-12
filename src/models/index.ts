import mongoose from 'mongoose';
import userSchema from './user'
import eventSchema from './event'

mongoose.set("debug", true);

mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb+srv://ferhkuku:PHYd4T5m3tXIPJgt@cluster0.whffu.mongodb.net/events?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true  }   
)

export const User = userSchema;
export const Event = eventSchema;

