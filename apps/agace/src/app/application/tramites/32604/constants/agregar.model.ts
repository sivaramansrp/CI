export interface Aduanas {
  descripcion: string;
  id: number;
}

export interface RespuestaAduanas {
  code: number;
  data: Aduanas[]
  message: string;
}

export interface Instalaciones {
  id: number;
  entidadFederativa: string;
  municipio: string;
  coloniaCalleNumero: string;
  codigoPostal: string;
  registroAduana: string;
}