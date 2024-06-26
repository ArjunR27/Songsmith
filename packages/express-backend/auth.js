import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "./user-services.js";

export function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  userServices
    .findUserByName(username)
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).send("Username already taken");
      }

      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) =>
          generateAccessToken(username).then((token) => {
            return userServices
              .addUser({ username: username, password: hashedPassword })
              .then((result) => {
                res.status(201).send({ token: token, user: result });
              });
          }),
        );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Could not register user");
    });
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

export function loginUser(req, res) {
  const { username, password } = req.body; // from form

  if (!username || !password) {
    return res.status(400).send("Bad request: Missing username or password.");
  }

  userServices
    .findUserByName(username)
    .then((retrievedUser) => {
      if (!retrievedUser || retrievedUser.length === 0) {
        // invalid username
        return res.status(401).send("Unauthorized");
      }

      const hashedPassword = retrievedUser[0]["password"];

      if (!hashedPassword) {
        // Handle case where hashedPassword is missing
        return res.status(500).send("Server error: User data is corrupted.");
      }

      bcrypt
        .compare(password, hashedPassword)
        .then((matched) => {
          if (matched) {
            generateAccessToken(username)
              .then((token) => {
                return res
                  .status(200)
                  .json({ token: token, userId: retrievedUser[0]["_id"] });
              })
              .catch((error) => {
                console.error("Error generating token:", error);
                return res
                  .status(500)
                  .send("Server error: Could not generate token.");
              });
          } else {
            return res.status(401).send("Unauthorized");
          }
        })
        .catch((error) => {
          console.error("Error comparing passwords:", error);
          return res
            .status(500)
            .send("Server error: Password comparison failed.");
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      return res.status(500).send("Server error: Could not retrieve user.");
    });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export default {
  registerUser,
  loginUser,
  authenticateUser,
};
