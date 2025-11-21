import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

export default class NotificacionesService {

    enviarCorreo = async (datosCorreo) => {
        try {
            // Leo la plantilla desde la carpeta handlebars.
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const plantillaPath = path.join(__dirname, "../utiles/handlebars/plantilla.hbs");
            const plantilla = fs.readFileSync(plantillaPath, "utf-8");

            // Compilo la plantilla con los datos de la reserva.
            const template = handlebars.compile(plantilla);
            const datos = {
                fecha: datosCorreo.fecha,
                salon: datosCorreo.salon,
                turno: datosCorreo.turno
            };
            const correoHtml = template(datos);

            // Configuración del envío.
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.USERC,
                    pass: process.env.PASSC
                }
            });

            const mailOptions = {
                //to: datosCorreo.correoElectronico,
                to: "gabrielquiroga.e@gmail.com",
                subject: "Nueva Reserva",
                html: correoHtml
            };

            // Envío del correo.
            const resultado = await transporter.sendMail(mailOptions);

            // Retorno algo simple al controller.
            return {
                ok: true,
                mensaje: "Correo enviado.",
                info: resultado
            };

        } catch (error) {
            return {
                ok: false,
                mensaje: "Error al enviar el correo.",
                error
            };
        }
    };

    enviarMensaje = async (datos) => {  
        // sms, telegram, etc. (quedará para después)
    };

    enviarWhatsapp = async (datos) => {
        // futura integración
    };

    enviarNotificacionPush = async (datos) => {
        // push browser/app
    };
}
