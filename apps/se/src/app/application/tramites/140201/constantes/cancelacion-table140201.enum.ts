export const CANCELLATIONOFAUTHORIZATIONS=[
    {
        encabezado: 'Folio de programa',
        clave: (ele: CancellationOfAuthorizations): string => ele.FolioDePrograma,
        orden: 1,
      },
      {
        encabezado: 'Tipo programa',
        clave: (ele: CancellationOfAuthorizations): string => ele.TipoPrograma,
        orden: 1,
      },
      {
        encabezado: 'Selecciona la modalidad',
        clave: (ele: CancellationOfAuthorizations): string => ele.SeleccionaLaModalidad,
        orden: 1,
      }

]