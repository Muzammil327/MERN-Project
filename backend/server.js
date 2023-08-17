import app from './app.js';
import colors from 'colors'

import crudRoutes from "./routes/crud/crudRoutes.js";
import authRoutes from "./routes/authentication/authRoute.js";
import connectDB from "./config/db.js";
import env from './utils/ValidateEnv.js'

// Connection String 
connectDB();

// api Routes 
app.use("/api/crud", crudRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

// port 
const PORT = 8000 || env.PORT;


app.listen(PORT, () => {
    console.log(`Server ${env.DEV_MODE} running on port PORT`.bgCyan.white);
});