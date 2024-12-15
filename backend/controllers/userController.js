import User from "../models/userModel.js";

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}


const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}


const createUser = async (req, res) => {
    const body = req.body;
    const user = new User(
        {
            username: body.username,
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role || "user"

        }
);
    const createdUser = await user.save();
    res.status(201).json(createdUser);
}


const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
}

const loginUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.email});
    if (user && (await user.comparePassword(req.body.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
} else {
        res.status(401).json({ message: "Invalid email or password" });
}
}

const logoutUser = async (req, res) => {
    res.json({ message: "User logged out" });
}

export { getUsers, getUserById, createUser, deleteUser, loginUser };