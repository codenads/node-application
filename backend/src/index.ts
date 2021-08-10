import express from "express";
import cors from "cors";

import collaboratorRoutes from "./routes/collaboratorRoutes";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/collaborator", collaboratorRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
