import { BodyTablaDictamenes, BodyTablaDocumentos, BodyTablaEnvioDigital, BodyTablaOpinion, BodyTablaRequerimiento, BodyTablaTareasTramite } from "../models/shared/consulta-generica.model";

export const TITULO_ACUSES = 'Acuse(s)';
export const TXT_ALERTA_ACUSES = (folio: string) => {
  return `Tu solicitud ha sido registrada con el siguiente número de folio:  < ${folio} >`;
};

export const CONSULTA_ACUSES = {
    txtAlerta:
      'Tu solicitud ha sido registrada con el siguiente número de folio:',
    tituloSeccionAcuse: 'Acuse(s)',
    encabezadoTablaAcuse: [
      {
        key: 'id',
        valor: 'No.',
      },
      {
        key: 'documento',
        valor: 'Documento.',
      },
    ],
    datosTablaAcuses: [
      {
        id: 1,
        idDocumento: 'doc12',
        documento: 'Acuse de recepción de trámite',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
    ],
    accionesTablaAcuses: [
      {
        tipo: 'descargar',
        label: 'Descargar',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };

  export const CONSULTA_RESOLUCIONES = {
    txtAlerta:
      'Tu solicitud ha sido registrada con el siguiente número de folio:',
    tituloSeccionResolucion: 'Resolucion(es)',
    encabezadoTablaResolucion: [
      {
        key: 'id',
        valor: 'No.',
      },
      {
        key: 'documento',
        valor: 'Documento.',
      },
    ],
    datosTablaResolucion: [
      {
        id: 1,
        idDocumento: 'doc12',
        documento: 'Acuse de recepción de trámite',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
    ],
    accionesTablaResolucion: [
      {
        tipo: 'descargar',
        label: 'Descargar',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };

  export const CONSULTA_REQUERIMIENTOS = {
    encabezadoTablaRequerimiento: [
      {
        key: 'id' as keyof BodyTablaRequerimiento,
        valor: 'No.',
      },
      {
        key: 'fechaCreacion' as keyof BodyTablaRequerimiento,
        valor: 'Fecha de creación',
      },
      {
        key: 'fechaGeneracion' as keyof BodyTablaRequerimiento,
        valor: 'Fecha de generación',
      },
      {
        key: 'fechaAtencion' as keyof BodyTablaRequerimiento,
        valor: 'Fecha de atención',
      },
      {
        key: 'estatus' as keyof BodyTablaRequerimiento,
        valor: 'Estatus',
      },
    ],
    datosTablaRequerimiento: [
      {
        id: 1,
        fechaCreacion: '2025-03-01',
        fechaGeneracion: '2025-03-02',
        fechaAtencion: '2025-03-03',
        estatus: 'Pendiente',
        urlPdf: 'assets/pdf/Test03.pdf'
      },
      {
        id: 2,
        fechaCreacion: '2025-03-04',
        fechaGeneracion: '2025-03-05',
        fechaAtencion: '2025-03-06',
        estatus: 'Atendido',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:3,
        fechaCreacion: '2025-03-07',
        fechaGeneracion: '2025-03-08',
        fechaAtencion: '2025-03-09',
        estatus: 'En proceso',
        urlPdf: 'assets/pdf/Test03.pdf',
      }
    ],
    accionesTablaRequerimiento: [
      {
        tipo: 'descargar',
        label: 'Detalle',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };

  export const CONSULTA_TAREASTRAMITE = {
    encabezadoTablaTareasTramite: [
      {
        key: 'id' as keyof BodyTablaTareasTramite,
        valor: 'No.',
      },
      {
        key: 'nombreTarea' as keyof BodyTablaTareasTramite,
        valor: 'Nombre de la tarea',
      },
      {
        key: 'nombreUsuarioAsignado' as keyof BodyTablaTareasTramite,
        valor: 'Nombre del usuario al que se le asignó la tarea',
      },
      {
        key: 'claveUsuarioAsignado' as keyof BodyTablaTareasTramite,
        valor: 'Clave de usuario al que se le asignó la tarea',
      },
      {
        key: 'fechaAsignacion' as keyof BodyTablaTareasTramite,
        valor: 'Fecha de asignación',
      },
      {
        key: 'fechaAtencion' as keyof BodyTablaTareasTramite,
        valor: 'Fecha de atención',
      },
    ],
    datosTablaTareasTramite: [
      {
        id: 1,
        nombreTarea: 'Revisión de documentos',
        nombreUsuarioAsignado: 'Juan Pérez',
        claveUsuarioAsignado: 'JP123',
        fechaAsignacion: '2025-03-01',
        fechaAtencion: '2025-03-02'
      },
      {
        id: 2,
        nombreTarea: 'Validación de datos',
        nombreUsuarioAsignado: 'María López',
        claveUsuarioAsignado: 'ML456',
        fechaAsignacion: '2025-03-03',
        fechaAtencion: '2025-03-04'
      },
      {
        id: 3,
        nombreTarea: 'Autorización de trámite',
        nombreUsuarioAsignado: 'Carlos Sánchez',
        claveUsuarioAsignado: 'CS789',
        fechaAsignacion: '2025-03-05',
        fechaAtencion: '2025-03-06'
      },
      {
        id: 4,
        nombreTarea: 'Generación de dictamen',
        nombreUsuarioAsignado: 'Ana Gómez',
        claveUsuarioAsignado: 'AG321',
        fechaAsignacion: '2025-03-07',
        fechaAtencion: '2025-03-08'
      },
      {
        id: 5,
        nombreTarea: 'Entrega de resultados',
        nombreUsuarioAsignado: 'Luis Fernández',
        claveUsuarioAsignado: 'LF654',
        fechaAsignacion: '2025-03-09',
        fechaAtencion: '2025-03-10'
      }
    ],
    accionesTablaTareasTramite: [
      {
        tipo: 'descargar',
        label: 'Detalle',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };

  export const CONSULTA_DICTAMENES = {
    encabezadoTablaDictamen: [
      {
        key: 'id' as keyof BodyTablaDictamenes,
        valor: 'No.',
      },
      {
        key: 'fechaCreacion' as keyof BodyTablaDictamenes,
        valor: 'Fecha de creación',
      },
      {
        key: 'fechaGeneracion' as keyof BodyTablaDictamenes,
        valor: 'Fecha de generación',
      },
      {
        key: 'fechaAutorizacion' as keyof BodyTablaDictamenes,
        valor: 'Fecha de autorización',
      },
      {
        key: 'tipo' as keyof BodyTablaDictamenes,
        valor: 'Tipo',
      },
      {
        key: 'estatus' as keyof BodyTablaDictamenes,
        valor: 'Estatus',
      },
      {
        key: 'sentido' as keyof BodyTablaDictamenes,
        valor: 'Sentido',
      },
    ],
    datosTablaDictamen: [
      {
        id:1,
        fechaCreacion: '2025-03-01',
        fechaGeneracion: '2025-03-02',
        fechaAutorizacion: '2025-03-03',
        tipo: 'Acta de nacimiento',
        estatus: 'Autorizado',
        sentido: 'Positivo',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:2,
        fechaCreacion: '2025-03-05',
        fechaGeneracion: '2025-03-06',
        fechaAutorizacion: '2025-03-07',
        tipo: 'Comprobante de domicilio',
        estatus: 'Pendiente',
        sentido: 'Negativo',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:3,
        fechaCreacion: '2025-03-10',
        fechaGeneracion: '2025-03-11',
        fechaAutorizacion: '2025-03-12',
        tipo: 'Identificación oficial',
        estatus: 'Rechazado',
        sentido: 'Negativo',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:4,
        fechaCreacion: '2025-03-15',
        fechaGeneracion: '2025-03-16',
        fechaAutorizacion: '2025-03-17',
        tipo: 'CURP',
        estatus: 'Autorizado',
        sentido: 'Positivo',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:5,
        fechaCreacion: '2025-03-20',
        fechaGeneracion: '2025-03-21',
        fechaAutorizacion: '2025-03-22',
        tipo: 'RFC',
        estatus: 'Pendiente',
        sentido: 'Positivo',
        urlPdf: 'assets/pdf/Test03.pdf',
      }
    ],
    accionesTablaDictamen: [
      {
        tipo: 'descargar',
        label: 'Detalle',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };
 
  export const CONSULTA_DOCUMENTOS = {
    encabezadoTablaDocumento: [
      {
        key: 'id' as keyof BodyTablaDocumentos,
        valor: 'No.',
      },
      {
        key: 'tipoDocumento' as keyof BodyTablaDocumentos,
        valor: 'Tipo de documento',
      },
      {
        key: 'estatus' as keyof BodyTablaDocumentos,
        valor: 'Estatus',
      },
      {
        key: 'fechaAdjunto' as keyof BodyTablaDocumentos,
        valor: 'Fecha en que adjuntó',
      },
      {
        key: 'nombreArchivo' as keyof BodyTablaDocumentos,
        valor: 'Nombre del archivo',
      },
    ],
    datosTablaDocumento: [
      {
        id:1,
        tipoDocumento: 'Contrato de maquila',
        estatus: 'Autorizado',
        fechaAdjunto: '2025-03-02',
        nombreArchivo: 'acta_nacimiento.pdf',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:2,
        tipoDocumento: 'Para acreditar el requisito de inversión',
        estatus: 'Guardado',
        fechaAdjunto: '2025-03-02',
        nombreArchivo: 'titulo.pdf',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:3,
        tipoDocumento: 'Comprobante de pago',
        estatus: 'en proceso',
        fechaAdjunto: '2025-03-02',
        nombreArchivo: 'salario.pdf',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:4,
        tipoDocumento: 'Diagrama de flujo con una descripción de los procesos',
        estatus: 'eliminado',
        fechaAdjunto: '2025-03-02',
        nombreArchivo: 'solicitud.pdf',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
      {
        id:5,
        tipoDocumento: 'Ultimo comprobante de pago',
        estatus: 'Pendiente',
        fechaAdjunto: '2025-03-02',
        nombreArchivo: 'comprobante_domicilio.pdf',
        urlPdf: 'assets/pdf/Test03.pdf',
      }
    ],
    accionesTablaDocumento: [
      {
        tipo: 'Ver',
        label: 'Ver',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };

  export const CONSULTA_ENVIODIGITAL = {
    encabezadoTablaEnvioDigital: [
      {
        key: 'id' as keyof BodyTablaEnvioDigital,
        valor: 'No.',
      },
      {
        key: 'fecha' as keyof BodyTablaEnvioDigital,
        valor: 'Fecha',
      },
      {
        key: 'transaccion' as keyof BodyTablaEnvioDigital,
        valor: 'Transacción',
      },
      {
        key: 'estado' as keyof BodyTablaEnvioDigital,
        valor: 'Estado',
      },
      {
        key: 'observaciones' as keyof BodyTablaEnvioDigital,
        valor: 'Observaciones',
      },
    ],
    datosTablaEnvioDigitalEnvio: [
      {
        id: 1,
        fecha: '2025-03-01',
        transaccion: 'Mx1810240000005',
        estado: 'Certificado Enviado a IOP',
        observaciones: 'Observaciones 1',
      },
      {
        id: 2,
        fecha: '2025-03-01',
        transaccion: 'Mx1810240000005',
        estado: 'Certificado Recibido a IOP',
        observaciones: 'Observaciones 2',
      },
      {
        id: 3,
        fecha: '2025-03-01',
        transaccion: 'Mx1810240000005',
        estado: 'Certificado Recibido por VUCE',
        observaciones: 'Observaciones 3',
      }
    ],
    datosTablaEnvioDigitalRevision: [      
    ]
  };

  export const CONSULTA_OPINIONES = {
    encabezadoTablaOpinion: [
      {
        key: 'id' as keyof BodyTablaOpinion,
        valor: 'No.',
      },
      {
        key: 'documento' as keyof BodyTablaOpinion,
        valor: 'Documento.',
      },
    ],
    datosTablaOpinion: [
      {
        id: 1,
        documento: 'Documento_prueba.pdf',
        urlPdf: 'assets/pdf/Test03.pdf',
      },
    ],
    accionesTablaOpinion: [
      {
        tipo: 'descargar',
        label: 'Descargar',
        icono: 'bi-arrow-bar-down',
      },
    ],
  };