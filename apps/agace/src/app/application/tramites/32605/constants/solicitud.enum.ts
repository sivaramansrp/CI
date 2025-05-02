import {
  ConfiguracionColumna,
  InputFecha,
} from '@libs/shared/data-access-user/src';
import {
  EnlaceOperativo,
  RecibirNotificaciones,
  TransportistasTable,
} from '../models/solicitud.model';

/** Configuración de columnas para Recibir Notificaciones */
export const RECIBIR_NOTIFICACIONES_CONFIGURACION: ConfiguracionColumna<RecibirNotificaciones>[] =
  [
    {
      /** RFC del destinatario de la notificación */
      encabezado: 'RFC',
      clave: (item: RecibirNotificaciones) => item.rfc,
      orden: 1,
    },
    {
      /** CURP del destinatario de la notificación */
      encabezado: 'CURP',
      clave: (item: RecibirNotificaciones) => item.curp,
      orden: 2,
    },
    {
      /** Nombre del destinatario de la notificación */
      encabezado: 'Nombre',
      clave: (item: RecibirNotificaciones) => item.nombre,
      orden: 3,
    },
    {
      /** Primer apellido del destinatario */
      encabezado: 'Primer apellido',
      clave: (item: RecibirNotificaciones) => item.apellidoPaterno,
      orden: 4,
    },
    {
      /** Segundo apellido del destinatario */
      encabezado: 'Segundo apellido',
      clave: (item: RecibirNotificaciones) => item.apellidoMaterno,
      orden: 5,
    },
  ];

export const ENLACE_OPERATIVO_CONFIGURACION: ConfiguracionColumna<EnlaceOperativo>[] =
  [
    {
      encabezado: 'RFC',
      clave: (item: EnlaceOperativo) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'Nombre',
      clave: (item: EnlaceOperativo) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'Apellido Paterno',
      clave: (item: EnlaceOperativo) => item.apellidoPaterno,
      orden: 1,
    },
    {
      encabezado: 'Apellido Materno',
      clave: (item: EnlaceOperativo) => item.apellidoMaterno,
      orden: 1,
    },
    {
      encabezado: 'Ciudad o Estado de Residencia',
      clave: (item: EnlaceOperativo) => item.claveCiudad,
      orden: 1,
    },
    {
      encabezado: 'Ciudad',
      clave: (item: EnlaceOperativo) => item.ciudad,
      orden: 1,
    },
    {
      encabezado: 'Cargo',
      clave: (item: EnlaceOperativo) => item.cargo,
      orden: 1,
    },
    {
      encabezado: 'teléfono',
      clave: (item: EnlaceOperativo) => item.telefono,
      orden: 1,
    },
    {
      encabezado: 'Correo',
      clave: (item: EnlaceOperativo) => item.correo,
      orden: 1,
    },
    {
      encabezado: 'Suplente',
      clave: (item: EnlaceOperativo) => item.suplente,
      orden: 1,
    },
    {
      encabezado: 'Calle',
      clave: (item: EnlaceOperativo) => item.calle,
      orden: 1,
    },
    {
      encabezado: 'Numero Exterior',
      clave: (item: EnlaceOperativo) => item.numeroExterior,
      orden: 1,
    },
    {
      encabezado: 'Numero Interior',
      clave: (item: EnlaceOperativo) => item.numeroInterior,
      orden: 1,
    },
    {
      encabezado: 'Colonia',
      clave: (item: EnlaceOperativo) => item.colonia,
      orden: 1,
    },
    {
      encabezado: 'Codigo Postal',
      clave: (item: EnlaceOperativo) => item.codigoPostal,
      orden: 1,
    },
    {
      encabezado: 'Localidad',
      clave: (item: EnlaceOperativo) => item.localidad,
      orden: 1,
    },
    {
      encabezado: 'Delegacion Municipio',
      clave: (item: EnlaceOperativo) => item.delegacionMunicipio,
      orden: 1,
    },
  ];

export const FECHA_DE_INICIO: InputFecha = {
  /**
   * Etiqueta del campo de fecha de fin de vigencia.
   */
  labelNombre: 'Fecha de Inicio de Operaciones de Comercio Exterior',
  /**
   * Indica si el campo es obligatorio.
   */
  required: false,
  /**
   * Indica si el campo está habilitado.
   */
  habilitado: true,
};

export const FECHA_DE_PAGO: InputFecha = {
  /**
   * Etiqueta del campo de fecha de fin de vigencia.
   */
  labelNombre: 'Fecha de pago',
  /**
   * Indica si el campo es obligatorio.
   */
  required: false,
  /**
   * Indica si el campo está habilitado.
   */
  habilitado: true,
};

export const TRANSPORTISTAS_CONFIGURACION: ConfiguracionColumna<TransportistasTable>[] =
  [
    {
      encabezado: 'RFC',
      clave: (item: TransportistasTable) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'Denominaci\u00F3n o Raz\u00F3n social',
      clave: (item: TransportistasTable) => item.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Domicilio',
      clave: (item: TransportistasTable) => item.domicilio,
      orden: 3,
    },
    {
      encabezado: 'Registro CAAT vigente',
      clave: (item: TransportistasTable) => item.caat,
      orden: 4,
    },
  ];
