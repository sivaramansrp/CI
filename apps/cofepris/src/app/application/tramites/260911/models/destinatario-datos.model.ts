export interface DestinatarioCapturarColumns {

    Nombre_denominación_o_razón_social: string;
    r_f_c: string;
    curp: string;
    teléfono: number;
    correo_electrónico: string,
    calle: string;
    número_exterior: number;
    número_interior: number;
    País: string;
    Colonia: string;
    Municipio_o_alcaldía: string;
    Localidad: string;
    Entidad_federativa: string;
    Estado_localidad: string;
    Código_postal: string;
    Colonia_o_equivalente: string;
}

export const DESTINATARIO_TABLE_COLUMNS = 
[
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (fila:DestinatarioCapturarColumns) => fila.Nombre_denominación_o_razón_social,
      orden: 1
    },
    {
      encabezado: 'R.F.C.',
      clave: (fila:DestinatarioCapturarColumns) => fila.r_f_c,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (fila:DestinatarioCapturarColumns) => fila.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila:DestinatarioCapturarColumns) => fila.teléfono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (fila:DestinatarioCapturarColumns) => fila.correo_electrónico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (fila:DestinatarioCapturarColumns) => fila.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (fila:DestinatarioCapturarColumns) => fila.número_exterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (fila:DestinatarioCapturarColumns) => fila.número_interior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (fila:DestinatarioCapturarColumns) => fila.País,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (fila:DestinatarioCapturarColumns) => fila.Colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila:DestinatarioCapturarColumns) => fila.Municipio_o_alcaldía,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (fila:DestinatarioCapturarColumns) => fila.Localidad,
      orden: 12,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (fila:DestinatarioCapturarColumns) => fila.Entidad_federativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/localidad',
      clave: (fila:DestinatarioCapturarColumns) => fila.Estado_localidad,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (fila:DestinatarioCapturarColumns) => fila.Código_postal,
      orden: 15,
    },
    {
      encabezado: 'Colonia o equivalente',
      clave: (fila:DestinatarioCapturarColumns) => fila.Colonia_o_equivalente,
      orden: 16,
    },
  ];
