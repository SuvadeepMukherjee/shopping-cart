const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    //console.log("Entering get User controller");
    const userId = req.params.userId;
    //console.log("Entering getUser Controller", userId);

    const user = await User.findOne({ userId });
    console.log("User found");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId: user.userId });
    //console.log("response send");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUser };
