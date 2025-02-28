import User from "../../models/user-model.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href='${BASE_URL}/api/users/verify/${user.verificationToken}' target='_blanc'>Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

export default ctrlWrapper(resendVerifyEmail);