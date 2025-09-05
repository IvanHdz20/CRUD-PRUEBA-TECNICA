const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");


router.get("/", async (req, res) => {
    try {
        const { search = "", page = 1, pageSize = 10, sort = "CreadoEn DESC" } = req.query;

        const pageNum = parseInt(page);
        const sizeNum = parseInt(pageSize);
        const offset = (pageNum - 1) * sizeNum;

        const whereClause = search 
            ? `WHERE Nombre LIKE '%${search}%' OR Sku LIKE '%${search}%'` 
            : "";

        const query = `
            SELECT *
            FROM Productos
            ${whereClause}
            ORDER BY ${sort}
            OFFSET ${offset} ROWS
            FETCH NEXT ${sizeNum} ROWS ONLY;

            SELECT COUNT(*) AS total
            FROM Productos
            ${whereClause};
        `;

        const pool = await poolPromise;
        const result = await pool.request().query(query);

        res.json({
            data: result.recordsets[0],
            total: result.recordsets[1][0].total,
            page: pageNum,
            pageSize: sizeNum
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Productos WHERE Id = @id");

        if (result.recordset.length === 0)
            return res.status(404).json({ message: "Producto no encontrado" });

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const { Nombre, Sku, Precio, Stock, Categoria, Activo } = req.body;

        if (!Nombre || !Sku || !Precio || !Categoria)
            return res.status(400).json({ message: "Campos requeridos faltantes" });

        const pool = await poolPromise;

        
        const existing = await pool.request()
            .input("Sku", sql.VarChar, Sku)
            .query("SELECT * FROM Productos WHERE Sku = @Sku");

        if (existing.recordset.length > 0)
            return res.status(400).json({ message: "El SKU ya existe" });

        
        await pool.request()
            .input("Nombre", sql.VarChar, Nombre)
            .input("Sku", sql.VarChar, Sku)
            .input("Precio", sql.Decimal(10,2), Precio)
            .input("Stock", sql.Int, Stock || 0)
            .input("Categoria", sql.VarChar, Categoria)
            .input("Activo", sql.Bit, Activo !== undefined ? Activo : true)
            .query(`
                INSERT INTO Productos (Nombre, Sku, Precio, Stock, Categoria, Activo, CreadoEn)
                VALUES (@Nombre, @Sku, @Precio, @Stock, @Categoria, @Activo, GETDATE())
            `);

        res.status(201).json({ message: "Producto creado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Sku, Precio, Stock, Categoria, Activo } = req.body;

        const pool = await poolPromise;

        
        const existing = await pool.request()
            .input("Sku", sql.VarChar, Sku)
            .input("Id", sql.Int, id)
            .query("SELECT * FROM Productos WHERE Sku = @Sku AND Id <> @Id");

        if (existing.recordset.length > 0)
            return res.status(400).json({ message: "El SKU ya existe" });

        await pool.request()
            .input("Id", sql.Int, id)
            .input("Nombre", sql.VarChar, Nombre)
            .input("Sku", sql.VarChar, Sku)
            .input("Precio", sql.Decimal(10,2), Precio)
            .input("Stock", sql.Int, Stock)
            .input("Categoria", sql.VarChar, Categoria)
            .input("Activo", sql.Bit, Activo)
            .query(`
                UPDATE Productos
                SET Nombre=@Nombre, Sku=@Sku, Precio=@Precio, Stock=@Stock, Categoria=@Categoria, Activo=@Activo
                WHERE Id=@Id
            `);

        res.json({ message: "Producto actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        await pool.request()
            .input("Id", sql.Int, id)
            .query("DELETE FROM Productos WHERE Id=@Id");

        res.json({ message: "Producto eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
