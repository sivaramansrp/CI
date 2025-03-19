interface PERSMISOCALENDER {
    FolioTtrámite: string;
    TipoSolicitud: string;
    Régimen: string;
    ClasificaciónRégimen: string;
    CondiciónDeLaMercancía: string;
    FracciónArancelaria: string;
  }
  export const PERSMISOCALENDERTABLE = [
    {
      encabezado: 'Folio trámite',
      clave: (ele: PERSMISOCALENDER) => ele.FolioTtrámite,
      orden: 1
    },
    {
      encabezado: 'Tipo solicitud',
      clave: (ele: PERSMISOCALENDER) => ele.TipoSolicitud,
      orden: 2
    },
    {
      encabezado: 'Régimen',
      clave: (ele: PERSMISOCALENDER) => ele.Régimen,
      orden: 3
    },
    {
      encabezado: 'Clasificación régimen',
      clave: (ele: PERSMISOCALENDER) => ele.ClasificaciónRégimen,
      orden: 4
    },
    {
      encabezado: 'Condición de la mercancía',
      clave: (ele: PERSMISOCALENDER) => ele.CondiciónDeLaMercancía,
      orden: 5
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: PERSMISOCALENDER) => ele.FracciónArancelaria,
      orden: 6
    }
  ]