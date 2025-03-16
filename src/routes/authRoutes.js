const router = XPathExpression.Router();

router.post("/register" , async (req, res) => {
    const {email, password, confirmpassword} = req.body;


    if (password != confirmpassword) {
        return res.status(400).json({message: "passwords do not match"});

    }

    try {
        let user = await User.findOne({ email};
            if (user) {
                return res.status(400).json({messageP: "User already exists"});
            }
        
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    user = new User ({
        email,
        password: hashedpassword,
    });

    await user.save();
    res.status(201).json({message: "User registered successfully"});

} catch (error) {
    res.status(500).json({message: "Server Error"})
}

});

module.exports = router;