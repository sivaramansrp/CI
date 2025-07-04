import { Catalogo } from "@libs/shared/data-access-user/src";

export interface DatosDeLaSolicitud {
    tipoRequisitoList: Catalogo[];
    requisitoList: Catalogo[];
    fraccionArancelariaList: Catalogo[];
    nicoList: Catalogo[];
    umtList: Catalogo[];
    umcList: Catalogo[];
    especieList: Catalogo[];
    usoList: Catalogo[];
    paisOrigenList: Catalogo[];
    paisDeProcedenciaList: Catalogo[];
    sexoList: Catalogo[];
}
export interface Sensible {
  NumeroLote: string;
  ColorPelaje: string;
  EdadAnimal: string;
  FaseDesarrollo: string;
  FuncionZootecnica: string;
  NombreMercancia: string;
  NumeroIdentificacion: string;
  Raza: string;
  NombreCientifico: string;
  Sexo: string;
}

export interface AnimalesFormularioSolicitud {
  tipoRequisito: string;
  requisito: string;
  numeroCertificado?: string;
  fraccionArancelaria: string;
  descripcionFraccion?: string;
  nico: string;
  descripcionNico?: string;
  descripcion?: string;
  cantidadUMT?: string;
  umt: string;
  cantidadUMC?: string;
  umc: string;
  especie: string;
  uso: string;
  paisOrigen: string;
  paisDeProcedencia: string;
}

export interface ProductosCatalogosDatos {
    tipoRequisitoList: Catalogo[];
    requisitoList: Catalogo[];
    fraccionArancelariaList: Catalogo[];
    nicoList: Catalogo[];
    umtList: Catalogo[];
    umcList: Catalogo[];
    especieList: Catalogo[];
    usoList: Catalogo[];
    paisOrigenList: Catalogo[];
    paisDeProcedenciaList: Catalogo[];
    sexoList: Catalogo[];
    presentacionList: Catalogo[];
    cantidadPresentacionList: Catalogo[];
    tipoPresentacionList: Catalogo[];
    tipoPlantaList: Catalogo[];
    plantaAutorizadaOrigenList: Catalogo[];

}

export interface AnimalesFormularioSolicitudForm {
  tipoRequisito: string;
  requisito: string;
  numeroCertificado: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
  descripcionNico: string;
  descripcion: string;
  cantidadUMT: string;
  umt: { value: string; disabled: boolean };
  cantidadUMC: string;
  umc: string;
  especie: string;
  uso: string;
  paisOrigen: string;
  paisDeProcedencia: string;
}

export interface AnimalesEventos {
  formulario: AnimalesFormularioSolicitudForm;
  tablaDatos: Sensible[]
}

export interface ProductoDetallasForm {
  tipoRequisito: string;
  requisito: string;
  numeroCertificado: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
  descripcionNico: string;
  descripcion: string;
  cantidadUMT: string;
  umt: { value: string; disabled: boolean };
  cantidadUMC: string;
  umc: string;
  especie: string;
  uso: string;
  paisOrigen: string;
  paisDeProcedencia: string;
  presentacion: string;
  cantidadPresentacion: string;
  tipoPresentacion: string;
  tipoPlanta: string;
  plantaAutorizadaOrigen: string;
}

export interface ProductoDetallaEventos {
  formulario: ProductoDetallasForm;
  // tablaDatos: Sensible[]
}


export interface DetallasDatos {
  numeroDeLote?: string;
  fechaElaboracionEmpaqueProceso?: string;
  fechaProduccionSacrificio?: string;
  fechaCaducidadProducto?: string;
  fechaFinElaboracionEmpaqueProceso?: string;
  fechaFinProduccionSacrificio?: string;
  fechaFinCaducidadProducto?: string;
}