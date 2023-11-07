import { TipoDispositivo } from "./tipoDispositivo";

export class Dispositivo{
    id_Dispositivo:number=0; 
    nombre:string="";
    descripcion:string="";
    consumoHora:number=0;
    horasEncendidas:number=0;
    fecha: Date=new Date(Date.now());
    tipoDispositivo:TipoDispositivo=new TipoDispositivo();
}