import { CatalogosResponse } from '@libs/shared/data-access-user/src';

export type SimpleCatalogoResponse<T> = Pick<
  CatalogosResponse,
  'codigo' | 'mensaje'
> & { datos: T };

export interface ImmexResponse {
  idProgAutorizado: number;
  numFolioTramite: string;
  idTipoTramite: number;
  idTipoPersona: string;
  isPersonaMoral: boolean | null;
  razonSocial: string;
  nombre: string | null;
}
