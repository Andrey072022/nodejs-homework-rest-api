import express from "express";
import usersSchemas from "../../schemas/user-schema.js";
import { validateBody } from "../../decorators/index.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} from "../../controllers/user/index.js";

import { authenticate, upload, resizeImage  } from "../../middlewara/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userSignupSchema), register);

authRouter.post("/login", validateBody(usersSchemas.userSigninSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch("/", authenticate, validateBody(usersSchemas.userUpdateSubscriptionSchema), updateSubscription);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), resizeImage, updateAvatar);

export default authRouter;

