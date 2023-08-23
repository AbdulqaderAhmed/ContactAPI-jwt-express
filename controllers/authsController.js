import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Fileds are required!");
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const usernameAvailabel = await User.findOne({ username });
  const emailAvailabel = await User.findOne({ email });

  if (usernameAvailabel) {
    res.status(409);
    throw new Error("Username already exist!");
  } else if (emailAvailabel) {
    res.status(409);
    throw new Error("Email already exist!");
  } else {
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({
        message: "User registerd successfully!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid!");
    }
  }
});

const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Fileds are required!");
  }

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const SECRET = process.env.ACCESS_TOKEN_SECERET;
      const data = {
        user_id: user.id,
        email: user.email,
        username: user.username,
      };
      const accessToken = jwt.sign(data, SECRET, { expiresIn: "15m" });

      user.token = accessToken;

      res.status(201).json({ message: "Logged in!", user: user });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
});

const getUser = expressAsyncHandler(async (req, res) => {
  res.send("current user!");
});

export { register, login, getUser };
