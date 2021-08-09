import express from "express";
import cors from "cors";

import registerRoutes from "./routes/registerRoutes";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/registros", registerRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
