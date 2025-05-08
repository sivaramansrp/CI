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
    [key: string]: string|undefined; 
  }

  export interface DatosDelTerceroDestinatario {
    id?: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    razonSocial: string;
    telefono: string;
    correoElectronico: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    pais: string;
    estado: string;
    municipioAlcaldia: string;
    colonia: string;
    lada: string;
    codigoPostal: string;
    [key: string]: string|undefined;
  }
  
  export interface Instalacion {
    id?: string;
    nombreInstalacion: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    pais: string;
    [key: string]: string|undefined;
  }