  export interface PermisosCancelarData {
    code: number;
    data: PermisosCancelar[]
    message: string;
  }

  export interface PermisosCancelar {
    id:number
    folioTramite : number;
    tipoSolicitud : string;
    regimen : string;
    clasificacionRegimen : string;
    condicionDeLaMercancia : string;
    fraccionArancelaria : string;
  }