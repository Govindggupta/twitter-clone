import User from "../models/user.models.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id) return res.status(400).json({ error: "You can't follow yourself" });

        if (!userToModify || !currentUser) return res.status(404).json({ error: "User not found" });

        const isFollowing = userToModify.following.includes(req.user._id);

        if(isFollowing){
            // unfollow
        }
        else{
            // follow
        }
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
