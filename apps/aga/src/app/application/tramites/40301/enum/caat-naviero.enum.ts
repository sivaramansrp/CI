
/**
 * Secciones a mostrar dentro de cada Paso de acuerdo al trámite
 */
export const SECCIONES_TRAMITE_40301 = {
    PASO_1: {
        VALIDACION_SECCION_1: true,
        VALIDACION_SECCION_2: true,
    },
    PASO_2: {
      requiereValidacion: true,
    },
  };

  export const CAAT_NAVIERO_PASOS = [
    {
      indice: 1,
      titulo: 'Capturar solicitud',
      activo: true,
      completado: true,
    },
    {
      indice: 2,
      titulo: 'Firmar solicitud',
      activo: false,
      completado: false,
    },
  ];
  

export const CATALOGOS_40301_ID = {
  TRAMITE: '40301',
  OBTENER_META_INFO: "obtenerMetaInfo",
  AGENT_CATALOG: "tipoAgente"
}

export const META_INFO_40301 = {
  titulo: 'Registro CAAT Naviero',
  tipoAgenteLabel: 'Tipo de Agente',
  roles: ['Admin', 'User', "personaMoral"], // Roles de usuario que pueden acceder al trámite
};


export const AGENT_CATALOG = [
  { id: 1, clave: "TIAGN.AN", descripcion: "Agente naviero" },
  { id: 2, clave: "TIAGN.AIC", descripcion: "Agente internacional de carga" },
  { id: 3, clave: "TIAGN.CB", descripcion: "Consignatario de buque" }
];
