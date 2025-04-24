
export interface DatosSolicitud {
  
  id: number;
  fracciónArancelaria: number;
  cantidad: number;
  cantidadLetra: string;

}

export interface RespuestaSolicitud {
 
  success: boolean;
  datos: DatosSolicitud;
  message: string;
}