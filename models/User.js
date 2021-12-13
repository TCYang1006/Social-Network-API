const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
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
                ref: 'Thought'
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
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('User', UserSchema);
module.exports = User;