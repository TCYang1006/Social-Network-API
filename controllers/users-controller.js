const { User } = require('../models');
//const User = require('../models/User');

const userController = {
    //get all users
    getAllUsers(req, res) {
        console.log(User);
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(e => {
                console.log(e);
                res.sendStatus(400);
            });
    },
    //get ONE user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(e => {
                console.log(e);
                res.sendStatus(400);
            });
    },
    //create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(e => res.json(e));
    },
    //update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                res.json(dbUserData);
            })
            .catch(e => res.json(e));
    },
    //delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(e => res.json(e));
    },
    //add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                res.json(dbUserData);
            })
            .catch(e => res.json(e));
    },
    //delete a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                console.log(friends);
                res.json(dbUserData);
            })
            .catch(e => res.json(e));
    }
};

module.exports = userController;