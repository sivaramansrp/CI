import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export interface AvisoCatalogo {
  cveFraccionArancelaria: CatalogosSelect;
  entidadFederativa: CatalogosSelect;
  delegacionMunicipio: CatalogosSelect;
  colonia: CatalogosSelect;
}
