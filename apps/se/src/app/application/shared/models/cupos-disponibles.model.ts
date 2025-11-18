/**
 * Interfaz de payload para buscar cupos disponibles.
 * @interface
 * @property {string} rfc_solicitante - RFC del solicitante.
 * @property {object} cupo_disponible - Detalles del cupo disponible.
 * @property {string} cupo_disponible.nombreProducto - Nombre del producto.
 * @property {string} cupo_disponible.nombreSubproducto - Nombre del subproducto.
 * @property {string} cupo_disponible.mecanismoAsignacion - Mecanismo de asignación.
 * @property {string} cupo_disponible.claveRegimen - Clave del régimen.
 * @property {number} cupo_disponible.idTratadoAcuerdo - ID del tratado/acuerdo.
 * @property {string} cupo_disponible.claveRepresentacionFederal - Clave de representación federal.
 */
export interface CuposDisponiblesBuscarPayload {
    rfc_solicitante: string;
    cupo_disponible: {
        nombreProducto: string;
        nombreSubproducto: string;
        mecanismoAsignacion: string;
        claveRegimen: string;
        idTratadoAcuerdo: number;
        claveRepresentacionFederal: string;
    };
}

/**
 * Interfaz de respuesta para la búsqueda de cupos disponibles.
 * @interface
 * @property {number} idCupo - ID del cupo.
 * @property {number} idMecanismoAsignacion - ID del mecanismo de asignación.
 * @property {string} nombreProducto - Nombre del producto.
 * @property {string | null} nombreSubproducto - Nombre del subproducto.
 * @property {string} mecanismoAsignacion - Mecanismo de asignación.
 * @property {Fraccion[] | null} fracciones - Fracciones.
 * @property {string} tipoCupo - Tipo de cupo.
 * @property {number | null} ideTipoCupo - ID del tipo de cupo.
 * @property {string | null} claveRegimen - Clave del régimen.
 * @property {number | null} idTratadoAcuerdo - ID del tratado/acuerdo.
 * @property {string | null} claveRepresentacionFederal - Clave de representación federal.
 * @property {string} umCupo - Unidad de medida del cupo.
 */
export interface CuposDisponiblesBuscarResponse {
    idCupo: number;
    idMecanismoAsignacion: number;
    nombreProducto: string;
    nombreSubproducto: string | null;
    mecanismoAsignacion: string;
    fracciones: Fraccion[] | null;
    tipoCupo: string;
    ideTipoCupo: number | null;
    claveRegimen: string | null;
    idTratadoAcuerdo: number | null;
    claveRepresentacionFederal: string | null;
    umCupo: string;
}

export interface Fraccion {
    fraccion: string;
}

/**
 * Interfaz de payload para obtener certificados disponibles.
 * @interface
 * @property {number} idMecanismoAsignacion - ID del mecanismo de asignación.
 * @property {string} ideTipoMecAsignacion - ID del tipo de mecanismo de asignación.
 * @property {object} cupo - Detalles del cupo.
 * @property {string} cupo.regimen - Régimen.
 * @property {string} cupo.ideTipoCupo - ID del tipo de cupo.
 * @property {string} cupo.cveUnidadMedidaOficialCupo - Clave de la unidad de medida oficial del cupo.
 */
export interface ObtenerCertificadosDisponiblesPayload {
    rfc: string;
    mecanismo_asignacion: {
        idMecanismoAsignacion: number;
        ideTipoMecAsignacion: string;
        cupo: {
            regimen: string;
            ideTipoCupo: string;
            cveUnidadMedidaOficialCupo: string;
        };
    };
}

/**
 * Interfaz de respuesta para certificados disponibles.
 * @interface
 * @property {number} idExpedicion - ID de expedición.
 * @property {number} numCertificado - Número de certificado.
 * @property {string} rfc - RFC.
 * @property {string} denominacion - Denominación.
 * @property {string} numFolioOficio - Número de folio de oficio.
 * @property {string | null} numFolioTramite - Número de folio de trámite.
 * @property {string} estado - Estado.
 * @property {number} estadoCancelacion - Estado de cancelación.
 * @property {number} montoAsignado - Monto asignado.
 * @property {number} montoDisponible - Monto disponible.
 * @property {number} montoExpedido - Monto expedido.
 * @property {number} montoCancelado - Monto cancelado.
 * @property {string} representacionFederal - Representación federal.
 * @property {string} claveRepresentacionFederal - Clave de representación federal.
 * @property {string | null} fechaInicioVigencia - Fecha de inicio de vigencia.
 * @property {string | null} fechaFinVigencia - Fecha de fin de vigencia.
 * @property {string | null} fechaCancelacion - Fecha de cancelación.
 * @property {string | null} facturasDisponibles - Facturas disponibles.
 * @property {string | null} facturasSeleccionadas - Facturas seleccionadas.
 * @property {number} factorConversion - Factor de conversión.
 * @property {string | null} estadoTransmision - Estado de transmisión.
 * @property {number} montoEjercidoCBP - Monto ejercido CBP.
 * @property {string} fabricante - Fabricante.
 * @property {string} importador - Importador.
 */
export interface ObtenerCertificadosDisponiblesResponse {
    idExpedicion: number;
    numCertificado: number;
    rfc: string;
    denominacion: string;
    numFolioOficio: string;
    numFolioTramite: string | null;
    estado: string;
    estadoCancelacion: number;
    montoAsignado: number;
    montoDisponible: number;
    montoExpedido: number;
    montoCancelado: number;
    representacionFederal: string;
    claveRepresentacionFederal: string;
    fechaInicioVigencia: string | null;
    fechaFinVigencia: string | null;
    fechaCancelacion: string | null;
    facturasDisponibles: string | null;
    facturasSeleccionadas: string | null;
    factorConversion: number;
    estadoTransmision: string | null;
    montoEjercidoCBP: number;
    fabricante: string;
    importador: string;
}

/**
 * Payload interface for searching a request detail.
 *
 * @property {string} rfc - The RFC (Registro Federal de Contribuyentes) identifier.
 * @property {number} id_mecanismo_asignacion - The assignment mechanism ID.
 *
 * @compodoc
 */
export interface DetalleSolicitudBuscarPayload {
    rfc: string;
    id_mecanismo_asignacion: number;
}

/**
 * @description
 * Respuesta detallada de la búsqueda de una solicitud de cupos disponibles.
 *
 * Incluye información sobre la denominación de la exposición, la cadena de fracciones,
 * el mecanismo de asignación y las asignaciones relacionadas.
 */
export interface DetalleSolicitudBuscarResponse {
    denominacion_exposicion: string;
    cadena_fracciones_cupo_tpl: string;
    mecanismo_asignacion: {
        criterioMecanismo: string | null;
        repFedMecanismosAsignacion: string | null;
        nombreMecanismoAsignacion: string;
        documentosMecanismo: string | null;
        idMecanismoAsignacion: number;
        observaciones: string;
        numeroPeriodoVigencia: string;
        ideTipoMecAsignacion: string;
        idePeriodoVigencia: string;
        ideOpinionMecanismo: string | null;
        descentralizar: boolean;
        fechaInicioVigencia: string;
        fechaFinVigencia: string;
        requiereBeneficiarios: boolean;
        descripcionFundamento: string;
        porcentaje: number | null;
        fechaEspecifica: string | null;
        requiereOpinion: boolean;
        numCantidadConstanteAcuerdo: number;
        numCertificadosPermitidos: number;
        fechaInicioRecepSolicitudes: string | null;
        fechaFinRecepSolicitudes: string | null;
        fechaProrrata: string | null;
        ideTipoComprobacionCert: string;
        activo: boolean;
        cveUnidadAdministrativa: string | null;
        fraccionesPorExpedir: boolean;
        fechaInicioVigenciaCertificados: string | null;
        fechaFinVigenciaCertificados: string | null;
        blnRequiereImportador: boolean;
        blnRequiereProductor: boolean;
        emitePEXIM: boolean;
        emiteCEROR: boolean;
        observacionesEmision: string | null;
        inactivoAutomatico: string | null;
        cupo: {
            idCupo: number;
            descClasificacionProducto: string;
            cveProducto: string;
            descSubproductoOtro: string | null;
            ideClasifSubproducto: string | null;
            cveUmOficialCupo: string | null;
            idTratadoAcuerdo: string;
            ideRegimen: string | null;
            fechaInicioVigencia: string;
            fechaFinVigencia: string;
            unidadMedidaComercializacion: string;
            paisesCupo: string[];
            fraccionesCupo: string[];
            fundamentos: string;
            instrumento: string | null;
            regimen: string;
            clasificacionProducto: string | null;
            ideTipoCupo: string;
            cveUsuario: string;
            producto: {
                clave: string;
                sigla: string;
                nombre: string;
                descripcion: string;
                fechaCaptura: string;
                fechaInicioVigencia: string;
                fechaFinVigencia: string | null;
                blnActivo: boolean;
            };
            tratadoAcuerdo: string | null;
            cveUnidadMedidaOficialCupo: string;
            cupoPrincipal: string | null;
            subcupos: string | null;
            categoriaTextilCupo: string | null;
            mecanismosAsignacion: string | null;
            categoriaTextilHelpers: string | null;
            montoTotal: number | null;
            saldoDisponible: number | null;
            montoAsignado: number | null;
        };
        solicitarMercancia: boolean;
        licitacionPublica: string | null;
    };
    asignaciones: Array<{
        idAsignacion: number;
        idSolicitud: number | null;
        idMecanismoAsignacion: number;
        cantidadSolicitada: number | null;
        cantidadAprobada: number | null;
        impTotalAprobado: number;
        impTotalExpedido: number;
        cantidadCancelada: number;
        asignacionActiva: boolean;
        aprobada: boolean;
        fechaInicioVigencia: string;
        fechaFinVigenciaSolicitada: string | null;
        fechaFinVigenciaAprobada: string | null;
        ideTipoAsignacionDirecta: string | null;
        idAsignacionR: number | null;
        numFolioAsignacion: string | null;
        numFolioAsignacionTPL: string | null;
        fechaAutorizacion: string;
        impAntecedenteAsignacion: number | null;
        idLicitacionPublica: number | null;
        rfcParticipante: string;
        impCalculadoProrrata: number | null;
        areaVenta: number | null;
        areaRefrigeracion: number | null;
        impAntecedenteEmpresa: number | null;
        montoDisponible: number | null;
        montoExpedido: number | null;
        añoAutorizacion: number;
    }>;
}