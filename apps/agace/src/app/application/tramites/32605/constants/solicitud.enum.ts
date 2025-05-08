import {
  ConfiguracionAporteColumna,
  ConfiguracionColumna,
  InputFecha,
  TablaCampoSeleccion,
} from '@libs/shared/data-access-user/src';
import {
  Domicilios,
  EnlaceOperativo,
  Inventarios,
  NumeroDeEmpleados,
  RecibirNotificaciones,
  SeccionSociosIC,
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

export const NUMERO_DE_EMPLEADOS_CONFIGURACION: ConfiguracionColumna<NumeroDeEmpleados>[] =
  [
    {
      encabezado: 'Denominacion Social',
      clave: (item: NumeroDeEmpleados) => item.denominacion,
      orden: 1,
    },
    {
      encabezado: 'RFC',
      clave: (item: NumeroDeEmpleados) => item.RFC,
      orden: 2,
    },
    {
      encabezado: 'Numero de Empleados',
      clave: (item: NumeroDeEmpleados) => item.numeroDeEmpleados,
      orden: 3,
    },
    {
      encabezado: 'Bimestre',
      clave: (item: NumeroDeEmpleados) => item.bimestre,
      orden: 4,
    },
  ];

export const DOMICILIOS_CONFIGURACION_COLUMNAS: ConfiguracionColumna<Domicilios>[] =
  [
    {
      /** Instalaciones principales de la empresa */
      encabezado: 'Instalaciones principales',
      clave: (item: Domicilios) => item.instalacionPrincipal,
      orden: 1,
    },
    {
      /** Tipo de instalación */
      encabezado: 'Tipo de instalación',
      clave: (item: Domicilios) => item.tipoInstalacion,
      orden: 1,
    },
    {
      /** Entidad federativa donde está ubicada la instalación */
      encabezado: 'Entidad federativa',
      clave: (item: Domicilios) => item.entidadFederativa,
      orden: 1,
    },
    {
      /** Municipio o delegación donde está ubicada la instalación */
      encabezado: 'Municipio o delegación',
      clave: (item: Domicilios) => item.municipioDelegacion,
      orden: 1,
    },
    {
      /** Dirección completa: colonia, calle y número */
      encabezado: 'Colonia, calle y número',
      clave: (item: Domicilios) => item.direccion,
      orden: 1,
    },
    {
      /** Código postal del domicilio */
      encabezado: 'Código postal',
      clave: (item: Domicilios) => item.codigoPostal,
      orden: 1,
    },
    {
      /** Registro ante SE/SAT */
      encabezado: 'Registro an SE/SAT',
      clave: (item: Domicilios) => item.registroSESAT,
      orden: 1,
    },
    {
      /** Proceso productivo realizado en la instalación */
      encabezado: 'Proceso Productivo',
      clave: (item: Domicilios) => item.procesoProductivo,
      orden: 1,
    },
    {
      encabezado: 'Acredita el uso y Goce del Inmueble',
      clave: (item: Domicilios) => item.acreditaInmueble,
      orden: 1,
    },
    {
      encabezado: 'Realiza operaciones de Comercio Exterior',
      clave: (item: Domicilios) => item.operacionesCExt,
      orden: 1,
    },
    {
      encabezado: 'Reconocimiento Mutuo (Instalaci\u00F3n C-TPAT)',
      clave: (item: Domicilios) => item.instalacionCtpat,
      orden: 1,
    },
    {
      encabezado: 'Perfil de la empresa',
      clave: (item: Domicilios) => item.instalacionPerfil,
      orden: 1,
    },
    {
      encabezado: 'Perfil del Recinto Fiscalizado Estrategico',
      clave: (item: Domicilios) => item.instalacionPerfilRFE,
      orden: 1,
    },
    {
      encabezado: 'Perfil del Auto Transportista Terrestre',
      clave: (item: Domicilios) => item.instalacionPerfilAuto,
      orden: 1,
    },
    {
      encabezado: 'Perfil del Transportista Ferroviario',
      clave: (item: Domicilios) => item.instalacionPerfilFerro,
      orden: 1,
    },
    {
      encabezado: 'Perfil del Recinto Fiscalizado',
      clave: (item: Domicilios) => item.instalacionPerfilRf,
      orden: 1,
    },
    {
      encabezado: 'Perfil de Mensajeria y Paqueteria',
      clave: (item: Domicilios) => item.instalacionPerfilMensajeria,
      orden: 1,
    },
  ];

export const INVENTARIOS_CONFIGURACION: ConfiguracionAporteColumna<Inventarios>[] =
  [
    {
      encabezado: 'Nombre del sistema o datos para su identificación',
      llave: '',
      clave: (item: Inventarios) => item.nombre,
      orden: 1,
      opcionDeEntrada: TablaCampoSeleccion.NONE,
    },
    {
      encabezado: 'Lugar de radicación',
      llave: '',
      clave: (item: Inventarios) => item.lugarRadicacion,
      orden: 2,
      opcionDeEntrada: TablaCampoSeleccion.NONE,
    },
    {
      encabezado:
        'Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.',
      llave: '',
      clave: (item: Inventarios) => item.anexo24,
      orden: 3,
      opcionDeEntrada: TablaCampoSeleccion.CHECKBOX,
    },
  ];

/** Configuración de columnas para Sección de Socios IC */
export const SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS: ConfiguracionColumna<SeccionSociosIC>[] =
  [
    {
      /** Tipo de Persona */
      encabezado: 'Tipo de Persona',
      clave: (item: SeccionSociosIC) => item.tipoPersonaMuestra,
      orden: 1,
    },
    {
      /** Nombre completo */
      encabezado: 'Nombre',
      clave: (item: SeccionSociosIC) => item.nombreCompleto,
      orden: 1,
    },
    {
      /** RFC del Socio IC */
      encabezado: 'RFC',
      clave: (item: SeccionSociosIC) => item.rfc,
      orden: 1,
    },
    {
      /** Carácter en que actúa el Socio IC */
      encabezado: 'En su carácter de',
      clave: (item: SeccionSociosIC) => item.caracterDe,
      orden: 1,
    },
    {
      /** Carácter en que actúa el Socio IC */
      encabezado: 'Nacionalidad',
      clave: (item: SeccionSociosIC) => item.nacionalidad,
      orden: 1,
    },

    {
      /** ¿Obligado a tributar en México? */
      encabezado: 'Obligado a tributar en México',
      clave: (item: SeccionSociosIC) => item.tributarMexico,
      orden: 1,
    },
    {
      /** Nombre de la empresa */
      encabezado: 'Nombre de la empresa',
      clave: (item: SeccionSociosIC) => item.nombreEmpresa,
      orden: 1,
    },
  ];
