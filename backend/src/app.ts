import express, { Application } from "express";
import { configDotenv } from "dotenv";
const app: Application = express();
import userRoute from "./routes/user.routes";
import userProfileRoute from "./routes/tweetScrapper.route";
import cors from "cors";
import admin,{ServiceAccount} from "firebase-admin";
import cookieParser from "cookie-parser";
import  serviceAccount from "./utils/consitifyFirebase.json";


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

console.log("firebase connected");


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser())

app.use("/api/v0/user", userRoute);
app.use("/api/v0/userProfile",userProfileRoute );
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
