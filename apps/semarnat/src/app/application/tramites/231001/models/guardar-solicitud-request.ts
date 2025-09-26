export interface GuardarSolicitud231001Request {
  solicitante: {
    rfc: string;
    nombre: string;
    es_persona_moral: boolean;
    certificado_serial_number: string;
  };
  aduana_solicitud: {
    cve_aduana: string;
  };
  descripcionGenerica1: string;
  id_solcitud: null;
  mercancias: AduanaSolicitud[];
  numeroProgramaImmex: string;
  numeroRegistroAmbiental: string;
}

interface AduanaSolicitud {
  cantidad_en_letra: string;
  capitulo_fraccion: string;
  cve_partida: string;
  cve_subpartida: string;
  desc_fraccion: string;
  desc_unidad_medida_comercial: string;
  descripcion_mercancia: string;
  generica2: string;
  cantidad: string;
  cve_unidad_medida_comercial: string;
}
