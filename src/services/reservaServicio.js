import  Reservas  from "../db/reservas.js";
import  ReservaServicios  from "../db/reservas_servicios.js";
import  NotificacionesService  from "./notificacionesServicio.js";

export default class ReservaServicio {

    constructor() {
        this.reservas = new Reservas();
        this.reserva_servicios = new ReservaServicios();
        this.notificaciones_servicio = new NotificacionesService();
    }

    buscarTodos = () => {
        return this.reservas.buscarTodos();
    }
    buscarPorId = (reserva_id) => {
        return this.reservas.buscarPorId(reserva_id);
    }
    crear = async (reserva) => {
        const { fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total } = reserva;
        const nuevaReserva = await this.reservas.crear({ fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total });

        const result = await this.reserva_servicios.crear(nuevaReserva);

        if (!result) {
            return null;
        }

        await this.reserva_servicios.crear(result.reserva_id, servicios);

        const datosParaNotificacion = await this.reservas.datosParaNotificacion(nuevaReserva.reserva_id);

        return this.reserva.buscarPorId(result.reserva_id);
    }
}