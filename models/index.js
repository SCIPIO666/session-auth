const {Pool}=require('pg')
const dotenv=require('dotenv')
dotenv.config()
const pool = new Pool({
user: 'postgres',           
  host: 'localhost',
  database: 'auth',           
  password: process.env.DB_PASSWORD, 
  port: 5432,
});//db connection

module.exports=pool