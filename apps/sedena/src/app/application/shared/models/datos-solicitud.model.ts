import { Catalogo } from '@ng-mf/data-access-user';

export interface RespuestaCatalogos {
  code: number;
  data: Catalogo[];
  message: string;
}
