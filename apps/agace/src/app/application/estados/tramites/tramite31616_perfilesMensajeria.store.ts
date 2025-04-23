import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud31616.
 */
export interface Solicitud31616PerfilesMensajeriaState {
    /**
     * El valor de describaProcedimiento.
     */
    describaProcedimiento: string;
    /**
     * El valor de indiqueLosCriterios.
     */
    indiqueLosCriterios: string;
    /**
     * El valor de indiqueLosMetodos.
     */
    indiqueLosMetodos: string;
    /**
     * El valor de describaLosIndicadores.
     */
    describaLosIndicadores: string;
    /**
     * El valor de comercioExterior.
     */
    comercioExterior: string;
    /**
     * El valor de candadosSeguridad.
     */
    candadosSeguridad: string;
    /**
     * El valor de proveedorExterno.
     */
    proveedorExterno: string;
    /**
     * El valor de susceptibleContaminacion.
     */
    susceptibleContaminacion: string;
    /**
     * El valor de encuentrenVacios.
     */
    encuentrenVacios: string;
    /**
     * El valor de semirremolquesVacios.
     */
    semirremolquesVacios: string;
    /**
     * El valor de utilizarCandado.
     */
    utilizarCandado: string;
    /**
     * El valor de seguridadMismas.
     */
    seguridadMismas: string;
    /**
     * El valor de describaContratacion.
     */
    describaContratacion: string;
    /**
     * El valor de describaContratacion.
     */
    documentacionExigida: string;
    /**
     * El valor de examenesSolicitados.
     */
    examenesSolicitados: string;
    /**
     * El valor de conformeAnalisis.
     */
    conformeAnalisis: string;
    /**
     * El valor de periodicidad.
     */
    periodicidad: string;
    /**
     * El valor de confidencialidad.
     */
    confidencialidad: string;
    /**
     * El valor de contratacionPersonal.
     */
    contratacionPersonal: string;
    /**
     * El valor de describaProcedimientoPersonal.
     */
    describaProcedimientoPersonal: string;
    /**
     * El valor de seguimientoProcedimiento.
     */
    seguimientoProcedimiento: string;
    /**
     * El valor de identificaciones.
     */
    identificaciones: string;
    /**
     * El valor de sistemasInformaticos.
     */
    sistemasInformaticos: string;
    /**
     * El valor de proveedoresServicios.
     */
    proveedoresServicios: string;
    /**
     * El valor de administracionPersonal.
     */
    administracionPersonal: string;
    /**
     * El valor de expliqueBrevemente.
     */
    expliqueBrevemente: string;
    /**
     * El valor de encuentranFuera.
     */
    encuentranFuera: string;
    /**
     * El valor de actualizacionesSeguridad.
     */
    actualizacionesSeguridad: string;
    /**
     * El valor de accesoLosMismos.
     */
    accesoLosMismos: string;
    /**
     * El valor de continuidadNegocio.
     */
    continuidadNegocio: string;
    /**
     * El valor de semanaCorresponda.
     */
    semanaCorresponda: string;
    /**
     * El valor de semanaCorresponda.
     */
    recuperarInformacion: string;
    /**
     * El valor de informacionArchivada.
     */
    informacionArchivada: string;
    /**
     * El valor de procesoDatos.
     */
    procesoDatos: string;
    /**
     * El valor de copiasSeguridad.
     */
    copiasSeguridad: string;
    /**
     * El valor de proteccionDeLaInformacion.
     */
    proteccionDeLaInformacion: string;
    /**
     * El valor de perdidaDeLaInformacion.
     */
    perdidaDeLaInformacion: string;
    /**
     * El valor de controlanSistemas.
     */
    controlanSistemas: string;
    /**
     * El valor de accionesDelResto.
     */
    accionesDelResto: string;
    /**
     * El valor de sistemasConfidenciales.
     */
    sistemasConfidenciales: string;
    /**
     * El valor de proporcionaEsasContrasenas.
     */
    proporcionaEsasContrasenas: string;
    /**
     * El valor de actualizacionesPeriodicas.
     */
    actualizacionesPeriodicas: string;
    /**
     * El valor de falsificadosLicencias.
     */
    falsificadosLicencias: string;
    /**
     * El valor de procesoDeImportacion.
     */
    procesoDeImportacion: string;
    /**
     * El valor de telecomunicaciones.
     */
    telecomunicaciones: string;
    /**
     * El valor de sistemaComprometido.
     */
    sistemaComprometido: string;
    /**
     * El valor de seguridadDeLaTecnologia.
     */
    seguridadDeLaTecnologia: string;
    /**
     * El valor de mediosTransporte.
     */
    mediosTransporte: string;
    /**
     * El valor de estaDifusion.
     */
    estaDifusion: string;
    /**
     * El valor de enunciativaLimitativa.
     */
    enunciativaLimitativa: string;
    /**
     * El valor de procedimientosEmpresa.
     */
    procedimientosEmpresa: string;
    /**
     * El valor de mediosDeTransporte.
     */
    mediosDeTransporte: string;
    /**
     * El valor de relacionadosSeguridad.
     */
    relacionadosSeguridad: string;
    /**
     * El valor de reportarIncidentes.
     */
    reportarIncidentes: string;
    /**
     * El valor de actividadesSospechosas.
     */
    actividadesSospechosas: string;
    /**
     * El valor de brevementeSonsiste.
     */
    brevementeSonsiste: string;
    /**
     * El valor de incidenteSeguridad.
     */
    incidenteSeguridad: string;
    /**
     * El valor de caboInvestigacion.
     */
    caboInvestigacion: string;
    /**
     * El valor de operacionCaboInvestigacion.
     */
    operacionCaboInvestigacion: string;
 
}
/**
 * Función para crear el estado inicial de Solicitud31616PerfilesMensajeria.
 * @returns {Solicitud31616PerfilesMensajeriaState} El estado inicial de Solicitud31616PerfilesMensajeria.
 */
export function createInitialState(): Solicitud31616PerfilesMensajeriaState {
    return {
        /**
         * El valor de describaProcedimiento.
         */
        describaProcedimiento: '',
        /**
         * El valor de indiqueLosCriterios.
         */
        indiqueLosCriterios: '',
        /**
         * El valor de indiqueLosMetodos.
         */
        indiqueLosMetodos: '',
        /**
         * El valor de describaLosIndicadores.
         */
        describaLosIndicadores: '',
        /**
         * El valor de comercioExterior.
         */
        comercioExterior: '',
        /**
         * El valor de candadosSeguridad.
         */
        candadosSeguridad: '',
        /**
         * El valor de proveedorExterno.
         */
        proveedorExterno: '',
        /**
         * El valor de susceptibleContaminacion.
         */
        susceptibleContaminacion: '',
        /**
         * El valor de encuentrenVacios.
         */
        encuentrenVacios: '',
        /**
         * El valor de semirremolquesVacios.
         */
        semirremolquesVacios: '',
        /**
         * El valor de utilizarCandado.
         */
        utilizarCandado: '',
        /**
         * El valor de seguridadMismas.
         */
        seguridadMismas: '',
        /**
         * El valor de describaContratacion.
         */
        describaContratacion: '',
        /**
         * El valor de documentacionExigida.
         */
        documentacionExigida: '',
        /**
         * El valor de examenesSolicitados.
         */
        examenesSolicitados: '',
        /**
         * El valor de conformeAnalisis.
         */
        conformeAnalisis: '',
        /**
         * El valor de periodicidad.
         */
        periodicidad: '',
        /**
         * El valor de confidencialidad.
         */
        confidencialidad: '',
        /**
         * El valor de contratacionPersonal.
         */
        contratacionPersonal: '',
        /**
         * El valor de describaProcedimientoPersonal.
         */
        describaProcedimientoPersonal: '',
        /**
         * El valor de seguimientoProcedimiento.
         */
        seguimientoProcedimiento: '',
        /**
         * El valor de identificaciones.
         */
        identificaciones: '',
        /**
         * El valor de sistemasInformaticos.
         */
        sistemasInformaticos: '',
        /**
         * El valor de proveedoresServicios.
         */
        proveedoresServicios: '',
        /**
         * El valor de administracionPersonal.
         */
        administracionPersonal: '',
        /**
         * El valor de expliqueBrevemente.
         */
        expliqueBrevemente: '',
        /**
         * El valor de encuentranFuera.
         */
        encuentranFuera: '',
        /**
         * El valor de actualizacionesSeguridad.
         */
        actualizacionesSeguridad: '',
        /**
         * El valor de accesoLosMismos.
         */
        accesoLosMismos: '',
        /**
         * El valor de continuidadNegocio.
         */
        continuidadNegocio: '',
        /**
         * El valor de semanaCorresponda.
         */
        semanaCorresponda: '',
        /**
         * El valor de recuperarInformacion.
         */
        recuperarInformacion: '',
        /**
         * El valor de informacionArchivada.
         */
        informacionArchivada: '',
        /**
         * El valor de procesoDatos.
         */
        procesoDatos: '',
        /**
         * El valor de copiasSeguridad.
         */
        copiasSeguridad: '',
        /**
         * El valor de proteccionDeLaInformacion.
         */
        proteccionDeLaInformacion: '',
        /**
         * El valor de perdidaDeLaInformacion.
         */
        perdidaDeLaInformacion: '',
        /**
         * El valor de controlanSistemas.
         */
        controlanSistemas: '',
        /**
         * El valor de accionesDelResto.
         */
        accionesDelResto: '',
        /**
         * El valor de sistemasConfidenciales.
         */
        sistemasConfidenciales: '',
        /**
         * El valor de proporcionaEsasContrasenas.
         */
        proporcionaEsasContrasenas: '',
        /**
         * El valor de actualizacionesPeriodicas.
         */
        actualizacionesPeriodicas: '',
        /**
         * El valor de falsificadosLicencias.
         */
        falsificadosLicencias: '',
        /**
         * El valor de procesoDeImportacion.
         */
        procesoDeImportacion: '',
        /**
         * El valor de telecomunicaciones.
         */
        telecomunicaciones: '',
        /**
         * El valor de sistemaComprometido.
         */
        sistemaComprometido: '',
        /**
         * El valor de seguridadDeLaTecnologia.
         */
        seguridadDeLaTecnologia: '',
        /**
         * El valor de mediosTransporte.
         */
        mediosTransporte: '',
        /**
         * El valor de estaDifusion.
         */
        estaDifusion: '',
        /**
         * El valor de enunciativaLimitativa.
         */
        enunciativaLimitativa: '',
        /**
         * El valor de procedimientosEmpresa.
         */
        procedimientosEmpresa: '',
        /**
         * El valor de mediosDeTransporte.
         */
        mediosDeTransporte: '',
        /**
         * El valor de relacionadosSeguridad.
         */
        relacionadosSeguridad: '',
        /**
         * El valor de reportarIncidentes.
         */
        reportarIncidentes: '',
        /**
         * El valor de actividadesSospechosas.
         */
        actividadesSospechosas: '',
        /**
         * El valor de brevementeSonsiste.
         */
        brevementeSonsiste: '',
        /**
         * El valor de incidenteSeguridad.
         */
        incidenteSeguridad: '',
        /**
         * El valor de caboInvestigacion.
         */
        caboInvestigacion: '',
        /**
         * El valor de operacionCaboInvestigacion.
         */
        operacionCaboInvestigacion: '',
    };
}

 /**
 * Decorador Injectable para hacer que la tienda esté disponible a nivel raíz.
 */
@Injectable({
    providedIn: 'root',
})
/**
 * Decorador StoreConfig para configurar la tienda con un nombre y una opción de restablecimiento.
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite31616PerfilesMensajeria', resettable: true })

export class Tramite31616PerfilesMensajeriaStore extends Store<Solicitud31616PerfilesMensajeriaState>{
    /**
     * Crea una instancia de Tramite31616Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de describaProcedimiento.
     * @param describaProcedimiento - El valor de describaProcedimiento.
     */
    public setDescribaProcedimiento(describaProcedimiento: string) {
        this.update((state) => ({
            ...state,
            describaProcedimiento,
        }));
    }
    /**
     * Establece el estado de indiqueLosCriterios.
     * @param indiqueLosCriterios - El valor de indiqueLosCriterios.
     */
    public setIndiqueLosCriterios(indiqueLosCriterios: string) {
        this.update((state) => ({
            ...state,
            indiqueLosCriterios,
        }));
    }
    /**
     * Establece el estado de indiqueLosMetodos.
     * @param indiqueLosMetodos - El valor de indiqueLosMetodos.
     */
    public setIndiqueLosMetodos(indiqueLosMetodos: string) {
        this.update((state) => ({
            ...state,
            indiqueLosMetodos,
        }));
    }
    /**
     * Establece el estado de describaLosIndicadores.
     * @param describaLosIndicadores - El valor de describaLosIndicadores.
     */
    public setDescribaLosIndicadores(describaLosIndicadores: string) {
        this.update((state) => ({
            ...state,
            describaLosIndicadores,
        }));
    }
    /**
     * Establece el estado de comercioExterior.
     * @param comercioExterior - El valor de comercioExterior.
     */
    public setComercioExterior(comercioExterior: string) {
        this.update((state) => ({
            ...state,
            comercioExterior,
        }));
    }
    /**
     * Establece el estado de candadosSeguridad.
     * @param candadosSeguridad - El valor de candadosSeguridad.
     */
    public setCandadosSeguridad(candadosSeguridad: string) {
        this.update((state) => ({
            ...state,
            candadosSeguridad,
        }));
    }
    /**
     * Establece el estado de proveedorExterno.
     * @param proveedorExterno - El valor de proveedorExterno.
     */
    public setProveedorExterno(proveedorExterno: string) {
        this.update((state) => ({
            ...state,
            proveedorExterno,
        }));
    }
    /**
     * Establece el estado de susceptibleContaminacion.
     * @param susceptibleContaminacion - El valor de susceptibleContaminacion.
     */
    public setSusceptibleContaminacion(susceptibleContaminacion: string) {
        this.update((state) => ({
            ...state,
            susceptibleContaminacion,
        }));
    }
    /**
     * Establece el estado de encuentrenVacios.
     * @param encuentrenVacios - El valor de encuentrenVacios.
     */
    public setEncuentrenVacios(encuentrenVacios: string) {
        this.update((state) => ({
            ...state,
            encuentrenVacios,
        }));
    }
    /**
     * Establece el estado de semirremolquesVacios.
     * @param semirremolquesVacios - El valor de semirremolquesVacios.
     */
    public setSemirremolquesVacios(semirremolquesVacios: string) {
        this.update((state) => ({
            ...state,
            semirremolquesVacios,
        }));
    }
    /**
     * Establece el estado de utilizarCandado.
     * @param utilizarCandado - El valor de utilizarCandado.
     */
    public setUtilizarCandado(utilizarCandado: string) {
        this.update((state) => ({
            ...state,
            utilizarCandado,
        }));
    }
    /**
     * Establece el estado de seguridadMismas.
     * @param seguridadMismas - El valor de seguridadMismas.
     */
    public setSeguridadMismas(seguridadMismas: string) {
        this.update((state) => ({
            ...state,
            seguridadMismas,
        }));
    }
    /**
     * Establece el estado de describaContratacion.
     * @param describaContratacion - El valor de describaContratacion.
     */
    public setDescribaContratacion(describaContratacion: string) {
        this.update((state) => ({
            ...state,
            describaContratacion,
        }));
    }
    /**
     * Establece el estado de documentacionExigida.
     * @param documentacionExigida - El valor de documentacionExigida.
     */
    public setDocumentacionExigida(documentacionExigida: string) {
        this.update((state) => ({
            ...state,
            documentacionExigida,
        }));
    }
    /**
     * Establece el estado de examenesSolicitados.
     * @param examenesSolicitados - El valor de examenesSolicitados.
     */
    public setExamenesSolicitados(examenesSolicitados: string) {
        this.update((state) => ({
            ...state,
            examenesSolicitados,
        }));
    }
    /**
     * Establece el estado de conformeAnalisis.
     * @param conformeAnalisis - El valor de conformeAnalisis.
     */
    public setConformeAnalisis(conformeAnalisis: string) {
        this.update((state) => ({
            ...state,
            conformeAnalisis,
        }));
    }
    /**
     * Establece el estado de periodicidad.
     * @param periodicidad - El valor de periodicidad.
     */
    public setPeriodicidad(periodicidad: string) {
        this.update((state) => ({
            ...state,
            periodicidad,
        }));
    }
    /**
     * Establece el estado de confidencialidad.
     * @param confidencialidad - El valor de confidencialidad.
     */
    public setConfidencialidad(confidencialidad: string) {
        this.update((state) => ({
            ...state,
            confidencialidad,
        }));
    }
    /**
     * Establece el estado de contratacionPersonal.
     * @param contratacionPersonal - El valor de contratacionPersonal.
     */
    public setContratacionPersonal(contratacionPersonal: string) {
        this.update((state) => ({
            ...state,
            contratacionPersonal,
        }));
    }
    /**
     * Establece el estado de describaProcedimientoPersonal.
     * @param describaProcedimientoPersonal - El valor de describaProcedimientoPersonal.
     */
    public setDescribaProcedimientoPersonal(describaProcedimientoPersonal: string) {
        this.update((state) => ({
            ...state,
            describaProcedimientoPersonal,
        }));
    }
    /**
     * Establece el estado de seguimientoProcedimiento.
     * @param seguimientoProcedimiento - El valor de seguimientoProcedimiento.
     */
    public setSeguimientoProcedimiento(seguimientoProcedimiento: string) {
        this.update((state) => ({
            ...state,
            seguimientoProcedimiento,
        }));
    }
    /**
     * Establece el estado de identificaciones.
     * @param identificaciones - El valor de identificaciones.
     */
    public setIdentificaciones(identificaciones: string) {
        this.update((state) => ({
            ...state,
            identificaciones,
        }));
    }
    /**
     * Establece el estado de sistemasInformaticos.
     * @param sistemasInformaticos - El valor de sistemasInformaticos.
     */
    public setSistemasInformaticos(sistemasInformaticos: string) {
        this.update((state) => ({
            ...state,
            sistemasInformaticos,
        }));
    }
    /**
     * Establece el estado de proveedoresServicios.
     * @param proveedoresServicios - El valor de proveedoresServicios.
     */
    public setProveedoresServicios(proveedoresServicios: string) {
        this.update((state) => ({
            ...state,
            proveedoresServicios,
        }));
    }
    /**
     * Establece el estado de administracionPersonal.
     * @param administracionPersonal - El valor de administracionPersonal.
     */
    public setAdministracionPersonal(administracionPersonal: string) {
        this.update((state) => ({
            ...state,
            administracionPersonal,
        }));
    }
    /**
     * Establece el estado de expliqueBrevemente.
     * @param expliqueBrevemente - El valor de expliqueBrevemente.
     */
    public setExpliqueBrevemente(expliqueBrevemente: string) {
        this.update((state) => ({
            ...state,
            expliqueBrevemente,
        }));
    }
    /**
     * Establece el estado de encuentranFuera.
     * @param encuentranFuera - El valor de encuentranFuera.
     */
    public setEncuentranFuera(encuentranFuera: string) {
        this.update((state) => ({
            ...state,
            encuentranFuera,
        }));
    }
    /**
     * Establece el estado de actualizacionesSeguridad.
     * @param actualizacionesSeguridad - El valor de actualizacionesSeguridad.
     */
    public setActualizacionesSeguridad(actualizacionesSeguridad: string) {
        this.update((state) => ({
            ...state,
            actualizacionesSeguridad,
        }));
    }
    /**
     * Establece el estado de accesoLosMismos.
     * @param accesoLosMismos - El valor de accesoLosMismos.
     */
    public setAccesoLosMismos(accesoLosMismos: string) {
        this.update((state) => ({
            ...state,
            accesoLosMismos,
        }));
    }
    /**
     * Establece el estado de continuidadNegocio.
     * @param continuidadNegocio - El valor de continuidadNegocio.
     */
    public setContinuidadNegocio(continuidadNegocio: string) {
        this.update((state) => ({
            ...state,
            continuidadNegocio,
        }));
    }
    /**
     * Establece el estado de semanaCorresponda.
     * @param semanaCorresponda - El valor de semanaCorresponda.
     */
    public setSemanaCorresponda(semanaCorresponda: string) {
        this.update((state) => ({
            ...state,
            semanaCorresponda,
        }));
    }
    /**
     * Establece el estado de recuperarInformacion.
     * @param recuperarInformacion - El valor de recuperarInformacion.
     */
    public setRecuperarInformacion(recuperarInformacion: string) {
        this.update((state) => ({
            ...state,
            recuperarInformacion,
        }));
    }
    /**
     * Establece el estado de informacionArchivada.
     * @param informacionArchivada - El valor de informacionArchivada.
     */
    public setInformacionArchivada(informacionArchivada: string) {
        this.update((state) => ({
            ...state,
            informacionArchivada,
        }));
    }
    /**
     * Establece el estado de procesoDatos.
     * @param procesoDatos - El valor de procesoDatos.
     */
    public setProcesoDatos(procesoDatos: string) {
        this.update((state) => ({
            ...state,
            procesoDatos,
        }));
    }
    /**
     * Establece el estado de copiasSeguridad.
     * @param copiasSeguridad - El valor de copiasSeguridad.
     */
    public setCopiasSeguridad(copiasSeguridad: string) {
        this.update((state) => ({
            ...state,
            copiasSeguridad,
        }));
    }
    /**
     * Establece el estado de proteccionDeLaInformacion.
     * @param proteccionDeLaInformacion - El valor de proteccionDeLaInformacion.
     */
    public setProteccionDeLaInformacion(proteccionDeLaInformacion: string) {
        this.update((state) => ({
            ...state,
            proteccionDeLaInformacion,
        }));
    }
    /**
     * Establece el estado de perdidaDeLaInformacion.
     * @param perdidaDeLaInformacion - El valor de perdidaDeLaInformacion.
     */
    public setPerdidaDeLaInformacion(perdidaDeLaInformacion: string) {
        this.update((state) => ({
            ...state,
            perdidaDeLaInformacion,
        }));
    }
    /**
     * Establece el estado de controlanSistemas.
     * @param controlanSistemas - El valor de controlanSistemas.
     */
    public setControlanSistemas(controlanSistemas: string) {
        this.update((state) => ({
            ...state,
            controlanSistemas,
        }));
    }
    /**
     * Establece el estado de accionesDelResto.
     * @param accionesDelResto - El valor de accionesDelResto.
     */
    public setAccionesDelResto(accionesDelResto: string) {
        this.update((state) => ({
            ...state,
            accionesDelResto,
        }));
    }
    /**
     * Establece el estado de sistemasConfidenciales.
     * @param sistemasConfidenciales - El valor de sistemasConfidenciales.
     */
    public setSistemasConfidenciales(sistemasConfidenciales: string) {
        this.update((state) => ({
            ...state,
            sistemasConfidenciales,
        }));
    }
    /**
     * Establece el estado de proporcionaEsasContrasenas.
     * @param proporcionaEsasContrasenas - El valor de proporcionaEsasContrasenas.
     */
    public setProporcionaEsasContrasenas(proporcionaEsasContrasenas: string) {
        this.update((state) => ({
            ...state,
            proporcionaEsasContrasenas,
        }));
    }
    /**
     * Establece el estado de actualizacionesPeriodicas.
     * @param actualizacionesPeriodicas - El valor de actualizacionesPeriodicas.
     */
    public setActualizacionesPeriodicas(actualizacionesPeriodicas: string) {
        this.update((state) => ({
            ...state,
            actualizacionesPeriodicas,
        }));
    }
    /**
     * Establece el estado de falsificadosLicencias.
     * @param falsificadosLicencias - El valor de falsificadosLicencias.
     */
    public setFalsificadosLicencias(falsificadosLicencias: string) {
        this.update((state) => ({
            ...state,
            falsificadosLicencias,
        }));
    }
    /**
     * Establece el estado de procesoDeImportacion.
     * @param procesoDeImportacion - El valor de procesoDeImportacion.
     */
    public setProcesoDeImportacion(procesoDeImportacion: string) {
        this.update((state) => ({
            ...state,
            procesoDeImportacion,
        }));
    }
    /**
     * Establece el estado de telecomunicaciones.
     * @param telecomunicaciones - El valor de telecomunicaciones.
     */
    public setTelecomunicaciones(telecomunicaciones: string) {
        this.update((state) => ({
            ...state,
            telecomunicaciones,
        }));
    }
    /**
     * Establece el estado de sistemaComprometido.
     * @param sistemaComprometido - El valor de sistemaComprometido.
     */
    public setSistemaComprometido(sistemaComprometido: string) {
        this.update((state) => ({
            ...state,
            sistemaComprometido,
        }));
    }
    /**
     * Establece el estado de seguridadDeLaTecnologia.
     * @param seguridadDeLaTecnologia - El valor de seguridadDeLaTecnologia.
     */
    public setSeguridadDeLaTecnologia(seguridadDeLaTecnologia: string) {
        this.update((state) => ({
            ...state,
            seguridadDeLaTecnologia,
        }));
    }
    /**
     * Establece el estado de mediosTransporte.
     * @param mediosTransporte - El valor de mediosTransporte.
     */
    public setMediosTransporte(mediosTransporte: string) {
        this.update((state) => ({
            ...state,
            mediosTransporte,
        }));
    }
    /**
     * Establece el estado de estaDifusion.
     * @param estaDifusion - El valor de estaDifusion.
     */
    public setEstaDifusion(estaDifusion: string) {
        this.update((state) => ({
            ...state,
            estaDifusion,
        }));
    }
    /**
     * Establece el estado de enunciativaLimitativa.
     * @param enunciativaLimitativa - El valor de enunciativaLimitativa.
     */
    public setEnunciativaLimitativa(enunciativaLimitativa: string) {
        this.update((state) => ({
            ...state,
            enunciativaLimitativa,
        }));
    }
    /**
     * Establece el estado de procedimientosEmpresa.
     * @param procedimientosEmpresa - El valor de procedimientosEmpresa.
     */
    public setProcedimientosEmpresa(procedimientosEmpresa: string) {
        this.update((state) => ({
            ...state,
            procedimientosEmpresa,
        }));
    }
    /**
     * Establece el estado de mediosDeTransporte.
     * @param mediosDeTransporte - El valor de mediosDeTransporte.
     */
    public setMediosDeTransporte(mediosDeTransporte: string) {
        this.update((state) => ({
            ...state,
            mediosDeTransporte,
        }));
    }
    /**
     * Establece el estado de relacionadosSeguridad.
     * @param relacionadosSeguridad - El valor de relacionadosSeguridad.
     */
    public setRelacionadosSeguridad(relacionadosSeguridad: string) {
        this.update((state) => ({
            ...state,
            relacionadosSeguridad,
        }));
    }
    /**
     * Establece el estado de reportarIncidentes.
     * @param reportarIncidentes - El valor de reportarIncidentes.
     */
    public setReportarIncidentes(reportarIncidentes: string) {
        this.update((state) => ({
            ...state,
            reportarIncidentes,
        }));
    }
    /**
     * Establece el estado de actividadesSospechosas.
     * @param actividadesSospechosas - El valor de actividadesSospechosas.
     */
    public setActividadesSospechosas(actividadesSospechosas: string) {
        this.update((state) => ({
            ...state,
            actividadesSospechosas,
        }));
    }
    /**
     * Establece el estado de brevementeSonsiste.
     * @param brevementeSonsiste - El valor de brevementeSonsiste.
     */
    public setBrevementeSonsiste(brevementeSonsiste: string) {
        this.update((state) => ({
            ...state,
            brevementeSonsiste,
        }));
    }
    /**
     * Establece el estado de incidenteSeguridad.
     * @param incidenteSeguridad - El valor de incidenteSeguridad.
     */
    public setIncidenteSeguridad(incidenteSeguridad: string) {
        this.update((state) => ({
            ...state,
            incidenteSeguridad,
        }));
    }
    /**
     * Establece el estado de caboInvestigacion.
     * @param caboInvestigacion - El valor de caboInvestigacion.
     */
    public setCaboInvestigacion(caboInvestigacion: string) {
        this.update((state) => ({
            ...state,
            caboInvestigacion,
        }));
    }
    /**
     * Establece el estado de operacionCaboInvestigacion.
     * @param operacionCaboInvestigacion - El valor de operacionCaboInvestigacion.
     */
    public setOperacionCaboInvestigacion(operacionCaboInvestigacion: string) {
        this.update((state) => ({
            ...state,
            operacionCaboInvestigacion,
        }));
    }

} 
  