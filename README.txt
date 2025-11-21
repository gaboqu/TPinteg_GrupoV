# 📘 API – Sistema de Reservas de Salones  
**Proyecto Integrador – Programación III (UNER)**

---

## 📌 Descripción

API REST para gestionar **salones**, **reservas**, **servicios asociados**, **turnos** y **notificaciones por correo electrónico**.  
Construida con **Node.js**, **Express**, **MySQL**, arquitectura por capas (controladores → servicios → base de datos), validaciones y plantillas para envío de mail.

---

## 🚀 Tecnologías utilizadas

- Node.js (ES Modules)
- Express
- MySQL2
- Express-validator
- Nodemailer + Handlebars
- CORS
- Dotenv
- Router modular

---

## ⚙️ Archivo `.env` (obligatorio)

Crear un archivo `.env` en la raíz con:

# Puerto del servidor
PUERTO=3000

# Credenciales para envío de correo (Nodemailer)
USERC='tpintegradorprog@gmail.com'
PASSC='elabrmjabnxvrhss'

# Base de datos MySQL  
HOST= 'localhost',
USER= 'reservas_user',
DATABASE= 'reservas',
PASSWORD= 'reservas_pass'
DB_PORT=3306

---

## 📦 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
Instalar dependencias:

bash
Copiar código
npm install
▶️ Iniciar el servidor
Modo desarrollo (con nodemon):

bash
Copiar código
npm run des
Modo producción:

bash
Copiar código
npm start
Si todo está correcto, verás:


