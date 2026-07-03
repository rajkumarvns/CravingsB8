import jwt from "jsonwebtoken";

export const getToken = async (user, res) => {
  try {
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("Oreo", token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
    });

    return token;
  } catch (error) {
    throw error;
  }
};
