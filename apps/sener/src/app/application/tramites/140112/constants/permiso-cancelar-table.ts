interface PersmisoCalender {
    folioTramite: string;
    tipoSolicitud: string;
    regimen: string;
    clasificacionRegimen: string;
    condicionDeLaMercancia: string;
    fraccionArancelaria: string;
  }
  export const PERSMISO_CALENDER_TABLE = [
    {
      encabezado: 'Folio tramite',
      clave: (ele: PersmisoCalender) => ele.folioTramite,
      orden: 1
    },
    {
      encabezado: 'Tipo solicitud',
      clave: (ele: PersmisoCalender) => ele.tipoSolicitud,
      orden: 2
    },
    {
      encabezado: 'Regimen',
      clave: (ele: PersmisoCalender) => ele.regimen,
      orden: 3
    },
    {
      encabezado: 'Clasificacion regimen',
      clave: (ele: PersmisoCalender) => ele.clasificacionRegimen,
      orden: 4
    },
    {
      encabezado: 'Condicion de la mercancia',
      clave: (ele: PersmisoCalender) => ele.condicionDeLaMercancia,
      orden: 5
    },
    {
      encabezado: 'Fraccion arancelaria',
      clave: (ele: PersmisoCalender) => ele.fraccionArancelaria,
      orden: 6
    }
  ]