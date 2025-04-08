interface PersmisoCancelar {
    folioTramite: string;
    tipoSolicitud: string;
    regimen: string;
    clasificacionRegimen: string;
    condicionDeLaMercancia: string;
    fraccionArancelaria: string;
  }
  export const PERSMISO_CANCELAR_TABLE = [
    {
      encabezado: 'Folio trámite',
      clave: (ele: PersmisoCancelar) => ele.folioTramite,
      orden: 1
    },
    {
      encabezado: 'Tipo solicitud',
      clave: (ele: PersmisoCancelar) => ele.tipoSolicitud,
      orden: 2
    },
    {
      encabezado: 'Régimen',
      clave: (ele: PersmisoCancelar) => ele.regimen,
      orden: 3
    },
    {
      encabezado: 'Clasificación régimen',
      clave: (ele: PersmisoCancelar) => ele.clasificacionRegimen,
      orden: 4
    },
    {
      encabezado: 'Condición de la mercancía',
      clave: (ele: PersmisoCancelar) => ele.condicionDeLaMercancia,
      orden: 5
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: PersmisoCancelar) => ele.fraccionArancelaria,
      orden: 6
    }
  ]