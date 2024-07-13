const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Replace with your secret key
const User = require("../database/users/Users"); // Import your User model

const authenticate = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace("Bearer ", "");

    // Verify the token and decode its payload
    const decoded = jwt.verify(token, secretKey);

    // Find the user by the ID stored in the token's payload
    const user = await User.findById(decoded.id); // Assuming you store user ID in JWT

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Handle invalid token
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      // Handle expired token
      return res.status(401).json({ error: "Token expired" });
    }

    // Log the error for debugging purposes
    console.error("Authentication error: ", error);

    // Default to 401 Unauthorized for any other errors
    return res.status(401).json({ error: "Unauthorized" });
  }
};
const authorize = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "Forbidden: You do not have access to this resource" });
  }
};

module.exports = { authenticate, authorize };
