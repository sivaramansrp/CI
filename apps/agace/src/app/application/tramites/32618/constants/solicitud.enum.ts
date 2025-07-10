import { ConfiguracionAporteColumna, ConfiguracionColumna, TablaCampoSeleccion } from "@libs/shared/data-access-user/src";
import { Domicilios, Inventarios, NumeroDeEmpleados, RecibirNotificaciones, SeccionSociosIC } from "../models/solicitud.model";

/**
 * Configuración de las columnas para la visualización de la información de domicilios.
 * Cada columna corresponde a una propiedad de la entidad `Domicilios` y se utiliza para mostrarla en una tabla.
 */
export const DOMICILIOS_CONFIGURACION_COLUMNAS: ConfiguracionColumna<Domicilios>[] =
  [
    {
      /** Instalaciones principales de la empresa. */
      encabezado: 'Instalaciones principales',
      clave: (item: Domicilios) => item.instalacionPrincipal,
      orden: 1,
    },
    {
      /** Tipo de instalación de la empresa. */
      encabezado: 'Tipo de instalación',
      clave: (item: Domicilios) => item.tipoInstalacion,
      orden: 1,
    },
    {
      /** Entidad federativa donde está ubicada la instalación. */
      encabezado: 'Entidad federativa',
      clave: (item: Domicilios) => item.entidadFederativa,
      orden: 1,
    },
    {
      /** Municipio o delegación donde se encuentra la instalación. */
      encabezado: 'Municipio o delegación',
      clave: (item: Domicilios) => item.municipioDelegacion,
      orden: 1,
    },
    {
      /** Dirección completa del domicilio, incluyendo colonia, calle y número. */
      encabezado: 'Colonia, calle y número',
      clave: (item: Domicilios) => item.direccion,
      orden: 1,
    },
    {
      /** Código postal correspondiente al domicilio. */
      encabezado: 'Código postal',
      clave: (item: Domicilios) => item.codigoPostal,
      orden: 1,
    },
    {
      /** Registro del domicilio ante la Secretaría de Economía (SE) o el Servicio de Administración Tributaria (SAT). */
      encabezado: 'Registro ante SE/SAT',
      clave: (item: Domicilios) => item.registroSESAT,
      orden: 1,
    },
    {
      /** Proceso productivo que se realiza en la instalación. */
      encabezado: 'Proceso Productivo',
      clave: (item: Domicilios) => item.procesoProductivo,
      orden: 1,
    },
    {
      /** Indica si el domicilio acredita el uso y goce del inmueble. */
      encabezado: 'Acredita el uso y Goce del Inmueble',
      clave: (item: Domicilios) => item.acreditaInmueble,
      orden: 1,
    },
    {
      /** Indica si la instalación realiza operaciones de Comercio Exterior. */
      encabezado: 'Realiza operaciones de Comercio Exterior',
      clave: (item: Domicilios) => item.operacionesCExt,
      orden: 1,
    },
    {
      /** Reconocimiento mutuo para la instalación C-TPAT. */
      encabezado: 'Reconocimiento Mutuo (Instalación C-TPAT)',
      clave: (item: Domicilios) => item.instalacionCtpat,
      orden: 1,
    },
    {
      /** Perfil de la empresa correspondiente a la instalación. */
      encabezado: 'Perfil de la empresa',
      clave: (item: Domicilios) => item.instalacionPerfil,
      orden: 1,
    },
    {
      /** Perfil del Recinto Fiscalizado Estratégico. */
      encabezado: 'Perfil del Recinto Fiscalizado Estratégico',
      clave: (item: Domicilios) => item.instalacionPerfilRFE,
      orden: 1,
    },
    {
      /** Perfil del Auto Transportista Terrestre. */
      encabezado: 'Perfil del Auto Transportista Terrestre',
      clave: (item: Domicilios) => item.instalacionPerfilAuto,
      orden: 1,
    },
    {
      /** Perfil del Transportista Ferroviario. */
      encabezado: 'Perfil del Transportista Ferroviario',
      clave: (item: Domicilios) => item.instalacionPerfilFerro,
      orden: 1,
    },
    {
      /** Perfil del Recinto Fiscalizado. */
      encabezado: 'Perfil del Recinto Fiscalizado',
      clave: (item: Domicilios) => item.instalacionPerfilRf,
      orden: 1,
    },
    {
      /** Perfil de Mensajería y Paquetería. */
      encabezado: 'Perfil de Mensajería y Paquetería',
      clave: (item: Domicilios) => item.instalacionPerfilMensajeria,
      orden: 1,
    },
  ];

  /**
   * Configuración de las columnas para la visualización de la información de inventarios.
   * Cada columna representa una propiedad de la entidad `Inventarios` y se configura con
   * detalles como la clave, el encabezado, y el tipo de entrada en la tabla.
   */
  export const INVENTARIOS_CONFIGURACION: ConfiguracionAporteColumna<Inventarios>[] =
    [
      {
        /**
         * Encabezado que muestra el nombre del sistema o los datos para su identificación.
         * Esta columna muestra el nombre del sistema de inventarios.
         */
        encabezado: 'Nombre del sistema o datos para su identificación',
        llave: '',
        clave: (item: Inventarios) => item.nombre,
        orden: 1,
        opcionDeEntrada: TablaCampoSeleccion.NONE,
      },
      {
        /**
         * Encabezado que muestra el lugar de radicación del inventario.
         * Esta columna indica el lugar donde se encuentra ubicado el inventario.
         */
        encabezado: 'Lugar de radicación',
        llave: '',
        clave: (item: Inventarios) => item.lugarRadicacion,
        orden: 2,
        opcionDeEntrada: TablaCampoSeleccion.NONE,
      },
      {
        /**
         * Encabezado que pregunta si se cuenta con un sistema de control de inventarios
         * conforme a las disposiciones del Anexo 24.
         * Esta columna contiene un campo de tipo checkbox.
         */
        encabezado:
          'Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.',
        llave: '',
        clave: (item: Inventarios) => item.anexo24,
        orden: 3,
        opcionDeEntrada: TablaCampoSeleccion.CHECKBOX,
      },
    ];
    /**
     * Configuración de columnas para la tabla de Número de Empleados.
     * Cada objeto en el arreglo define los detalles de una columna.
     * La clave indica el valor que se mostrará y el orden define la posición de la columna en la tabla.
     */
    export const NUMERO_DE_EMPLEADOS_CONFIGURACION: ConfiguracionColumna<NumeroDeEmpleados>[] =
      [
        /**
         * Configuración para la columna "Denominación Social".
         * Muestra la denominación social de la empresa.
         */
        {
          encabezado: 'Denominacion Social',
          clave: (item: NumeroDeEmpleados) => item.denominacion,
          orden: 1,
        },
    
        /**
         * Configuración para la columna "RFC".
         * Muestra el RFC de la empresa.
         */
        {
          encabezado: 'RFC',
          clave: (item: NumeroDeEmpleados) => item.RFC,
          orden: 2,
        },
    
        /**
         * Configuración para la columna "Número de Empleados".
         * Muestra la cantidad de empleados que tiene la empresa.
         */
        {
          encabezado: 'Numero de Empleados',
          clave: (item: NumeroDeEmpleados) => item.numeroDeEmpleados,
          orden: 3,
        },
    
        /**
         * Configuración para la columna "Bimestre".
         * Muestra el bimestre en el que se reporta la información.
         */
        {
          encabezado: 'Bimestre',
          clave: (item: NumeroDeEmpleados) => item.bimestre,
          orden: 4,
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