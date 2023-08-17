import AuthUser from "../../models/authentication/authModel.js";
import { comparePassword } from "../../helper/bcrypt.js";
import JWT from "jsonwebtoken";

const loginController = async (req, res) => {
  const { password, email } = req.body;
  //   validation
  if (!email) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is Required.",
    });
  }
  if (!password) {
    return res.json({
      status: 400,
      success: false,
      error: "Password is Required.",
    });
  }
  //   existing email
  const user = await AuthUser.findOne({ email });
  if (!user) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is not registerd plz Login",
    });
  }

  // check password
  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.json({
      success: false,
      error: "Invalid Password",
    });
  }

   //token
   const token = JWT.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3d",
    }
  );
// cookie 
res.cookie(String(user._id), token, {
  path: "/",
  expires: new Date(Date.now() + 1000 * 30), // 30 seconds
  httpOnly: true,
  sameSite: "lax",
});
  try {
    return res.json({
      success: true,
      message: "User Login Successfully",
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        password: user.password
      },
      token
    });
  } catch (error) {
    return res.json({
        success: false,
        error: "Error Login User",
        error
      });
  }
};

export default loginController;
