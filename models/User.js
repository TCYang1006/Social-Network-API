const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            trim: true,
            required: 'A user name is required'
        },
        email: {
            type: String,
            unique: true,
            required: 'An email address is required',
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        friends: [],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ]  
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
//get total count of friends on retrieval
userSchema.virtual('friendCount').get(function(){
    return this.friends.reduce(
        (total, friend) => total + friend.length + 1,
        0
    );
});

const user = model('user', userSchema);
model.exports = userSchema;