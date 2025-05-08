export interface Mercancia {
    id?: string; 
    descripcion: string;
    fraccionArancelaria: string; 
    descripcionFraccion: string;          
    cantidadUMT: string;                 
    umt: string;                          
    cantidadUMC: string;                
    umc: string;                          
    nombreComun: string;                 
    nombreCientifico: string;            
    faseDesarrollo: string;              
    uso: string;                         
    otroUso: string;                     
    origen: string;                      
    paisOrigen: string;                  
    paisProcedencia: string;            
  }
  
  export interface DatosDelTramite {
    aduanaDeIngreso: string;
    medioDeTransporte: string;
    identificacionDelTransporte: string;
  }