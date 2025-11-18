import Salones from '../db/salones.js';


export default class SalonesServicio { 
    constructor() {
        this.salones = new Salones();
    }   

    buscarTodosTodos = async () => {
        return await this.salones.buscarTodos();
    }   
}