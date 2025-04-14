export interface EnlaceOperativo {
    rfc: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    ciudadOEstadoDeResidencia: string;
    cargoOPuesto: string;
    telefono: string;
    correoElectronico: string;
    suplente: string;
}

export interface Personas {
  rfc: string;
  curp: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export const ENLACE_TABLA = [
    {
      encabezado: 'RFC',
      clave: (ele: EnlaceOperativo) => ele.rfc,
      orden: 1,
    },
    {
      encabezado: 'Nombre',
      clave: (ele: EnlaceOperativo) => ele.nombre,
      orden: 2,
    },
    {
      encabezado: 'Apellido Paterno',
      clave: (ele: EnlaceOperativo) => ele.apellidoPaterno,
      orden: 3,
    },
    {
      encabezado: 'Apellido Materno',
      clave: (ele: EnlaceOperativo) => ele.apellidoMaterno,
      orden: 4,
    },
    {
      encabezado: 'Ciudad o Estado de Residencia',
      clave: (ele: EnlaceOperativo) => ele.ciudadOEstadoDeResidencia,
      orden: 5,
    },
    {
      encabezado: 'Cargo o Puesto',
      clave: (ele: EnlaceOperativo) => ele.cargoOPuesto,
      orden: 6,
    },
    {
        encabezado: 'Teléfono',
        clave: (ele: EnlaceOperativo) => ele.telefono,
        orden: 7,
    },
    {
        encabezado: 'Correo Electrónico',
        clave: (ele: EnlaceOperativo) => ele.correoElectronico,
        orden: 8,
    },
    {
        encabezado: 'Suplente',
        clave: (ele: EnlaceOperativo) => ele.suplente,
        orden: 9,
    }
];

export const PERSONAS_PARA = [
  {
    encabezado: 'RFC',
    clave: (ele: Personas) => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'CURP',
    clave: (ele: Personas) => ele.curp,
    orden: 2,
  },
  {
    encabezado: 'Nombre',
    clave: (ele: Personas) => ele.nombre,
    orden: 3,
  },
  {
    encabezado: 'Apellido Paterno',
    clave: (ele: Personas) => ele.apellidoPaterno,
    orden: 4,
  },
  {
    encabezado: 'Apellido Materno',
    clave: (ele: Personas) => ele.apellidoMaterno,
    orden: 5,
  }  
];