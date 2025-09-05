const sql = require("mssql");

const dbConfig = {
    server: "ARKADATA",          
    database: "productos_db",     
    port: 1433,                   
    user: "nodeuser",             
    password: "123456",           
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("✅ Conectado a SQL Server");
        return pool;
    })
    .catch(err => console.log("❌ Error de conexión:", err));

module.exports = {
    sql, poolPromise
};
