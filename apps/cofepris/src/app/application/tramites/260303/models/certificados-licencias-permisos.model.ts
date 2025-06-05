import { Catalogo} from "@libs/shared/data-access-user/src";

export interface EstadoCatalogResponse {
  code: number;
  data: Catalogo[];
  message: string;
}