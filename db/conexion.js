
import mysql from 'mysql2/promise';

export const conexion = await mysql.createConnection({
  host: 'localhost',
  user: 'reservas_user',
  database: 'reservas',
  password: 'reservas_pass'
});