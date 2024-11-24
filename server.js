import userRouter from "./routes/userRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import categoriaRouter from "./routes/categoriaRoute.js";
import horarioRouter from "./routes/horarioRoute.js";
//import { createPool } from "mysql2/promise";
import express from "express";
import cors from "cors";
import resenaRouter from "./routes/resenaRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Configuración de CORS

// Configuración del body parser para manejar las solicitudes JSON
app.use(userRouter);
app.use(restaurantRouter);
app.use(reviewRouter);
app.use(categoriaRouter);
app.use(horarioRouter);
app.use(resenaRouter)
/*// Configuración de la conexión a la base de datos MySQL
export const pool = createPool({
  host: "b6737tipdo8cxkuodyo9-mysql.services.clever-cloud.com",
  port: "3306",
  user: "uhim7e19cwvekoxv",
  password: "UwYce5Nw2VF3UkEeDsi3",
  database: "b6737tipdo8cxkuodyo9",
});*/
// Inicia el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});