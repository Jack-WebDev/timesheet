
const jwt = require("jsonwebtoken")
const db = require("../database/db")

const saveRefreshToken = async (db, refreshToken) => {
  const expiresIn = 30 * 24 * 60 * 60;
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
    await db("refresh_tokens").insert({
        Token: refreshToken,
        ExpiresAT: expiresAt
    })

  console.log("done!");
};

const getRefreshToken = async (req, res) => {

  const token = req.cookies.refreshToken

  try {
    const query = "SELECT * FROM RefreshTokens WHERE RefreshToken = ?";
    const value = [token];

    const [data] = await pool.query(query, value);

    const user = data[0].UserID;

    const [id] = await pool.query("SELECT * FROM USERS WHERE UserID = ?", [
      user,
    ]);

    const resData = id[0];

    const newToken = jwt.sign(
      { id: resData.UserID, role: resData.Role },
      process.env.JWT_KEY,
      { expiresIn: "15s" }
    );

    res.cookie("jwt", newToken, {
      httpOnly: true,
      maxAge: 15 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error(`Error refreshing token: ${error}`);
  }

};

module.exports = { saveRefreshToken};