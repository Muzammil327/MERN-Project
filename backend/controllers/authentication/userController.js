import AuthUser from "../../models/authentication/authModel.js";

const getUser = async (req, res) => {
  const id = req.id;
  try {
    const user = await AuthUser.findById(id);
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    } else {
      return res.status(200).json({
        messsage: "User FOund",
        user: {
            id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
          },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
