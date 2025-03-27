export interface AccionBoton {
    accion: string;
    valor: number;
  }

  export interface PermisoModel {
    Nombre : string;
     RFC :string;
     CURP :string;
     Teléfono:number;
     CorreoElectrónico:string;
     calle:string;
     numeroExterior:number;
     numeroInterior:number;
        pais:string;
        colonia:string;
        municipio:string;
        localidad:string;
        entidadFederativa:string;
        estadoLocalidad:string;
        codigoPostal:number;
}

export const NICO_TABLA = [
  { encabezado: 'Nombre/denominacion o razon social', clave: (item: PermisoModel) => item.Nombre, orden: 1 },
  { encabezado: 'RFC', clave: (item: PermisoModel) => item.RFC, orden: 2 },
  { encabezado: 'CURP', clave: (item: PermisoModel) => item.CURP, orden: 3 },
  { encabezado: 'Telefono', clave: (item: PermisoModel) => item.Teléfono, orden: 4 },
  { encabezado: 'Correo electronico', clave: (item: PermisoModel) => item.CorreoElectrónico, orden: 5 },
  { encabezado: 'Calle', clave: (item: PermisoModel) => item.calle, orden: 6 },
  { encabezado: 'numeroExterior', clave: (item: PermisoModel) => item.numeroExterior, orden: 7 },
  { encabezado: 'numeroInterior', clave: (item: PermisoModel) => item.numeroInterior, orden: 8 },
  { encabezado: 'pais', clave: (item: PermisoModel) => item.calle, orden: 9 },
  { encabezado: 'colonia', clave: (item: PermisoModel) => item.colonia, orden: 10 },
  { encabezado: 'municipio', clave: (item: PermisoModel) => item.municipio, orden: 11 },
  { encabezado: 'localidad', clave: (item: PermisoModel) => item.localidad, orden: 12 },
  { encabezado: 'entidadFederativa', clave: (item: PermisoModel) => item.entidadFederativa, orden: 13 },
  { encabezado: 'estadoLocalidad', clave: (item: PermisoModel) => item.estadoLocalidad, orden: 14 },
  { encabezado: 'codigoPostal', clave: (item: PermisoModel) => item.codigoPostal, orden: 15 },
]


