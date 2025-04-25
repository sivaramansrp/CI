
export interface DatosSolicitud {
  
  id: number;
  fraccionArancelaria: number;
  cantidad: number;
  cantidadLetra: string;

}

export interface RespuestaSolicitud {
 
  success: boolean;
  datos: DatosSolicitud;
  message: string;
}