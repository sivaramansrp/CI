import { SeccionSociosIC } from "../models/empresas-comercializadoras.model";

export interface Aduanas {
  descripcion: string;
  id: number;
}

export interface RespuestaAduanas {
  code: number;
  data: Aduanas[]
  message: string;
}

export interface Instalaciones extends SeccionSociosIC {
  id: number;
  entidadFederativa: string;
  municipio: string;
  coloniaCalleNumero: string;
  codigoPostal: string;
  registroAduana: string;
}