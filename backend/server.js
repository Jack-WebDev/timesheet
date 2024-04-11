const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user")
const PORT = process.env.PORT || 8001;

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users",userRouter)

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
