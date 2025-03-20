  export interface PermisosCancelarData {
    code: number;
    data: PermisosCancelar[]
    message: string;
  }

  export interface PermisosCancelar {
    id:number
    folioTtrámite : number;
    tipoSolicitud : string;
    régimen : string;
    clasificaciónRégimen : string;
    condiciónDeLaMercancía : string;
    fracciónArancelaria : string;
  }