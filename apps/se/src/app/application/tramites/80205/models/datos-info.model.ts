
export interface ServicioInmex {
    Servicio?: string;
    RegistroContribuyentes?: string;
    DenominaciónSocial?: string;
    NumeroIMMEX?: string;
    AñoIMMEX?: string;
  }
 export interface Servicio {
        descripiónDelServicio?:string;
        descripcion?: string;
        tipode?: string;
    }  

    export interface InfoServicios {
        seleccionaLaModalidad: string;
        folio: string;
        ano: string;
      }
    
      export interface Servicios{
        seleccionaLaModalidad: string;
        folio: string;
        ano:string;
      }
     export interface ResponseData {
        idsubmanufacturer: string;
        infoServicios: InfoServicios;
      }
      
     export interface ApiResponse {
        code: number;
        data: ResponseData;
        infoServicios: InfoServicios;
      }
    export interface AccionBoton {
        accion: string;
        valor: number;
      }
      
      