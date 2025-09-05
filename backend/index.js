const express = require("express");
const cors = require("cors"); 
const app = express();
const productoRoutes = require("./routes/productoRoutes");


app.use(cors()); 
app.use(express.json());


app.use("/api/productos", productoRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
