import express from "express";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import job from "./cron/cron.js";
const app = express();
job.start();
const PORT = ENV_VARS.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/",()=>{
  res.send("api is working")
})
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
if (ENV_VARS.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get(".", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("server started at post:" + PORT);
  connectDB();
});
