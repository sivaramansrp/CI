export interface MercanciasData {
    code: number;
    data: Mercancias[]
    message: string;
  }
  
  export interface Mercancias{
    clasificacionDelProducto:string;
    especificarClasificacionDelProduct : string;
    denominacion : string;
    denominacionDistintiva : string;
    numeroCAS : string;
    fraccionArancelaria : string;
    descripcionDeFraccion : string;
  }
