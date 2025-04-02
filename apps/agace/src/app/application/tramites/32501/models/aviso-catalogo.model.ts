import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export interface AvisoCatalogo {
  cveFraccionArancelaria: CatalogosSelect;
  entidadFederativa: CatalogosSelect;
  delegacionMunicipio: CatalogosSelect;
  colonia: CatalogosSelect;
  aduanaDeImportacion: CatalogosSelect;
}

export interface OperacionDeImportacion {
  agenteAduanal: string;
  rfc: string;
  numeroDePedimento: string;
  aduanaDeImportacion: string;
}
