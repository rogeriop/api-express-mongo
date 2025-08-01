import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso');
  // Verifica o nome do banco conectado
  console.log("Banco conectado:", db.name || db.db?.databaseName);
})

const app = express();
app.use(express.json())
routes(app);

export default app