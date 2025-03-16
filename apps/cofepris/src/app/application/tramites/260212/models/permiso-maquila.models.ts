export interface solicitudModel {
    fechaCreación:string;
    mercancía:string;
    cantidad:string;
    proveedor:string;
  }

  export interface MercanciaModel {
    clasificaciónProducto:string;
    especificarClasificación:string;
    denominaciónEspecífica:string;
    denominaciónDistintiva:string;
    denominaciónComún:string;
    formaFarmacéutica:string;
    estadoFsico:string;
    }

  export interface ClaveModel {
    clave:string;
    descripcíon:string;
  }

  export interface LosOption {
    label: string;
    value: string;
  }