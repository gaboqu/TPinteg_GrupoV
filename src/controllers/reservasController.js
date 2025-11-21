import ReservaServicio from '../services/reservaServicio.js';

export default class ReservasController {

    constructor() {
        this.reservaServicio = new ReservaServicio();
    }

    crear = async (req, res) => {
        try {
             const {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total,
                servicios } = req.body;

                const reserva = {
                    fecha_reserva,
                    salon_id,
                    usuario_id,
                    turno_id,
                    foto_cumpleaniero,
                    tematica,
                    importe_salon,
                    importe_total,
                    servicios
                };
                const nuevaReserva = await this.reservaServicio.crear(reserva);

                if (!nuevaReserva) {
                    return res.status(400).json({
                        estado: false,
                        mensaje: "No se pudo crear la reserva."
                    });
                }   

                res.json({
                    estado: true, 
                    mensaje: 'Reserva creada!',
                    salon: nuevaReserva
            });
        } catch (error) {
            console.error('Error POST /reservas:', error);
            res.status(500).json({
                ok: false,
                mensaje: "Error del servidor."
            });
        }
    };

    buscarTodos = async (req, res) => {
        try {
            const reservas = await this.reservaServicio.buscarTodos();
            res.json({
                estado: true,
                datos: reservas
            });
        }   catch (error) {
            console.error('Error GET /reservas:', error);
            res.status(500).json({
                ok: false,
                mensaje: "Error del servidor GetAll."
            });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const reserva_id = req.params.reserva_id;
            const reserva = await this.reservaServicio.buscarPorId(reserva_id);

            if (!reserva) {
                return  res.status(404).json({
                    estado: false,
                    mensaje: "Reserva no encontrada."
                });
            }
            res.json({
                estado: true,
                datos: reserva
            });
        } catch (error) {
            console.error('Error GET /reservas/:reserva_id:', error);
            res.status(500).json({  
                estado: false,
                mensaje: "Error del servidor."
            });
        }
    };
}


