const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY; // Replace with your secret key

// Generate JWT token
const generateToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    secretKey,
    {
      expiresIn: "1d",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save(); // Save the updated user with the new token
  return token;
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return error || null;
  }
};

module.exports = { generateToken, verifyToken };
