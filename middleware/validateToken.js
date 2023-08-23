import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader =
    req.body.token || req.query.token || req.headers["x-access-token"];
  const secret = process.env.ACCESS_TOKEN_SECERET;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized!");
      }

      console.log(decode);
    });
  }
});

export { validateToken };
