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