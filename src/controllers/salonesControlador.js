import SalonesServicio from "../services/salonesServicio.js";

export default class SalonesControlador {

    constructor() {
        this.salonesServicio = new SalonesServicio();
    }   
    buscarTodos = async (req, res) => { 

        try {
       
            const salones = await this.salonesServicio.buscarTodosTodos();

       
           res.json({ 
                estado: true, 
                'salones': salones 
            });
       
         } catch (error) {
           console.log('Error en GET /salones:buscarTodos', error);
                res.status(500).json({   
                estado: false,
                mensaje: 'Error del servidor.'
                });

         }
    }
}