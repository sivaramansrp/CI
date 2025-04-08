import { CatalogosSelect } from '@libs/shared/data-access-user/src';

export interface SolicitudCatologo {
  aduana: CatalogosSelect;
  juntaTecnicaDerivada: CatalogosSelect;
}

export interface DivideFraccion {
  capitulo: string;
  partida: string;
  subpartida: string;
  subdivision: string;
}
