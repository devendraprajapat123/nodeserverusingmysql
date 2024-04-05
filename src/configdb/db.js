import mysql from 'mysql2'

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Deven@178",
    database:"user"
})

db.connect((err)=>{
if (err) {
    console.log("database not connected");
}else{
    console.log("Database connected");
}
})

export default db
