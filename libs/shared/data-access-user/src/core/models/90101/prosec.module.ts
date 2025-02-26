export interface LISTAPASOWIZARD {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

export interface ACCIONBOTON {
  accion: string;
  valor: number;
}

export interface plantas {
  modalidad: string;
  Estado: string;
  RepresentacionFederal: string;
  ActividadProductiva: string;
}

export interface sectoresYMercancias {
  sector: string;
  Fraccion_arancelaria: string;
}

export interface ListaDeDatosFinal {
    plantas: plantas[];
    sectoresYMercancias: sectoresYMercancias[];
}

export function createDatosState(params: Partial<ListaDeDatosFinal> = {}): ListaDeDatosFinal {
    return {
        plantas: params.plantas || [],
        sectoresYMercancias: params.sectoresYMercancias || [],
    };
}