import { Optional } from "@angular/core";
  export interface PermisosCancelarData {
    code: number;
    data: PermisosCancelar[]
    message: string;
  }

  export interface PermisosCancelar {
    Id:number
    FolioTtrámite : number;
    TipoSolicitud : string;
    Régimen : string;
    ClasificaciónRégimen : string;
    CondiciónDeLaMercancía : string;
    FracciónArancelaria : string | Optional;
  }