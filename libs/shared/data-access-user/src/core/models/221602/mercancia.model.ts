
export interface Mercancia {
    no_partida: number;
    tipo_requisito: string;
    requisito: string;
    numero_certificado_internacional: number;
    fraccion_arancelaria: string;
    nico: string;
    descripcion_nico: string;
    descripcion: string;
    unidad_medida_tarifa: string;
    cantidad_umt: number;
    unidad_medida_comercializacion: string;
    cantidad_umc: number;
    uso: string;
    tipo_producto: string;
    numero_lote: string;
    pais_origen: string;
    pais_procedencia: string;
    certificado_internacional_electronico: string;
  }

  export interface Exportador {
    nombre_denominacion_o_razon_social: string;
    telefono: string;
    correo_electronico: string;
    domicilio: string;
    pais: string;
  }

  export interface Destinatario{
    nombre_denominacion_o_razon_social: string;
    telefono: string;
    correo_electronico: string;
    calle: string;
    numero_exterior: string;
    numero_interior: string;
    pais: string;
    colonia: string;
    municipio_o_alcaldia: string;
    entidad_federativa: string;
    codigo_postal: string;
  }
  export const PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Anexar requisitos',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
  ];
  
  export const MENSAJE_TABLA_OBLIGATORIA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
  
  export const DATOS_SOLICITUD =
 ' Al dar clic en el boton "Cargar" se creara una nueva solicitud con los mismos datos de la solicitud 202768246';