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

export interface DatosDelTercero {
  nombre: string;
  telefono: string;
  correoElectronico: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  pais: string;
  estado: string;
  municipio: string;
  localidad: string;
  codigoPostal: string;
}
  
  export interface DatosDelTramite {
    aduanaDeIngreso: string;
    medioDeTransporte: string;
    identificacionDelTransporte: string;
  }