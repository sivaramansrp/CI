import { Store, StoreConfig } from '@datorama/akita';
import { ExpedirMonto } from '../../tramites/120202/models/expedicion-certificados-asignacion.model';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 120202
 * @returns ExpedicionCertificadosAsignacion120202State
 */
export interface ExpedicionCertificadosAsignacion120202State {
    /**
     * Clave del año de autorización.
     * @type {string}
     */
    cveAniosAutorizacion?: string;

    /**
     * Número de folio de asignación auxiliar.
     * @type {string}
     */
    numFolioAsignacionAux?: string;

    /**
     * Estado de la solicitud.
     * @type {string}
     */
    estado?: string;

    /**
     * Representación federal.
     * @type {string}
     */
    representacionFederal?: string;

    /**
     * Monto total aprobado.
     * @type {number | null}
     */
    sumaAprobada?: number | null;

    /**
     * Monto total expedido.
     * @type {number | null}
     */
    sumaExpedida?: number | null;

    /**
     * Monto disponible.
     * @type {number | null}
     */
    montoDisponible?: number | null;

    /**
     * Número de oficio.
     * @type {string}
     */
    numOficio?: string;

    /**
     * Fecha de inicio.
     * @type {string}
     */
    fechaInicio?: string;

    /**
     * Fecha de fin de vigencia aprobada.
     * @type {string}
     */
    fechaFinVigenciaAprobada?: string;

    /**
     * Régimen aduanero.
     * @type {string}
     */
    regimenAduanero?: string;

    /**
     * Descripción del producto.
     * @type {string}
     */
    descripcionProducto?: string;

    /**
     * Clasificación del subproducto.
     * @type {string}
     */
    clasificaionSubproducto?: string;

    /**
     * Unidad de medida oficial del cupo.
     * @type {string}
     */
    unidadMedidaOficialCupo?: string;

    /**
     * Fecha de inicio de vigencia.
     * @type {string}
     */
    fechaInicioVigencia?: string;

    /**
     * Fecha de fin de vigencia.
     * @type {string}
     */
    fechaFinVigencia?: string;

    /**
     * Mecanismo de asignación.
     * @type {string}
     */
    mecanismoAsignacion?: string;

    /**
     * Tratado.
     * @type {string}
     */
    tratado?: string;

    /**
     * Fracciones arancelarias.
     * @type {string}
     */
    fraccionesArancelarias?: string;

    /**
     * Países del cupo.
     * @type {string}
     */
    paisesCupo?: string;

    /**
     * Observaciones.
     * @type {string}
     */
    observaciones?: string;

    /**
     * Descripción del fundamento.
     * @type {string}
     */
    descripcionFundamento?: string;

    /**
     * Monto disponible de asignación.
     * @type {number | null}
     */
    montoDisponibleAsignacion?: number | null;

    /**
     * Monto a expedir.
     * @type {number | null}
     */
    montoExpedir?: number | null;

    /**
     * Total de monto a expedir.
     * @type {number}
     */
    totalExpedir?: number;

    /**
     * Cuerpo de la tabla.
     * @type {ExpedirMonto}
     */
    cuerpoTabla?: ExpedirMonto[];

    /**
     * Indica si se debe mostrar el detalle o no.
     * @type {boolean}
     */
    mostrarDetalle?: boolean;
}

/**
 * Crea el estado inicial del trámite 120202.
 * @returns Estado inicial de tipo `ExpedicionCertificadosAsignacion120202State`.
 */
export function createInitialState(): ExpedicionCertificadosAsignacion120202State {
    return {
        cveAniosAutorizacion: '-1',
        numFolioAsignacionAux: '',

        estado: '',
        representacionFederal: '',

        sumaAprobada: null,
        sumaExpedida: null,
        montoDisponible: null,

        numOficio: '',

        fechaInicio: '',
        fechaFinVigenciaAprobada: '',

        regimenAduanero: '',
        descripcionProducto: '',
        clasificaionSubproducto: '',
        unidadMedidaOficialCupo: '',
        fechaInicioVigencia: '',
        fechaFinVigencia: '',
        mecanismoAsignacion: '',
        tratado: '',
        fraccionesArancelarias: '',
        paisesCupo: '',
        observaciones: '',
        descripcionFundamento: '',

        montoDisponibleAsignacion: null,
        montoExpedir: null,

        totalExpedir: 0,

        cuerpoTabla: [],
        mostrarDetalle: false       
    };
}

/**
 * Servicio de estado global para gestionar el trámite 120202 con Akita.
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Configuración de la tienda Akita para el trámite 120202 con opción de reinicio.
 */
@StoreConfig({ name: 'tramite120202', resettable: true })
export class Tramite120202Store extends Store<ExpedicionCertificadosAsignacion120202State> {
    /**
     * Constructor que inicializa el estado con los valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el Año del oficio de autorización.
     * @param cveAniosAutorizacion - Clave del año de autorización.
     */
    public setAniosAutorizacion(cveAniosAutorizacion: string): void {
        this.update((state) => ({
            ...state,
            cveAniosAutorizacion,
        }));
    }

    /**
     * Establece el número de folio de asignación auxiliar.
     * @param numFolioAsignacionAux - Número de folio de asignación auxiliar.
     */
    public setNumFolioAsignacionAux(numFolioAsignacionAux: string): void {
        this.update((state) => ({
            ...state,
            numFolioAsignacionAux,
        }));
    }

    /**
     * Establece el estado de la solicitud.
     * @param estado - Estado de la solicitud.
     */
    public setEstado(estado: string): void {
        this.update((state) => ({
            ...state,
            estado,
        }));
    }

    /**
     * Establece la representación federal.
     * @param representacionFederal - Representación federal.
     */
    public setRepresentacionFederal(representacionFederal: string): void {
        this.update((state) => ({
            ...state,
            representacionFederal,
        }));
    }

    /**
     * Establece la suma aprobada.
     * @param sumaAprobada - Monto total aprobado.
     */
    public setSumaAprobada(sumaAprobada: number | null): void {
        this.update((state) => ({
            ...state,
            sumaAprobada,
        }));
    }

    /**
     * Establece la suma expedida.
     * @param sumaExpedida - Monto total expedido.
     */
    public setSumaExpedida(sumaExpedida: number | null): void {
        this.update((state) => ({
            ...state,
            sumaExpedida,
        }));
    }

    /**
     * Establece el monto disponible.
     * @param montoDisponible - Monto disponible.
     */
    public setMontoDisponible(montoDisponible: number | null): void {
        this.update((state) => ({
            ...state,
            montoDisponible,
        }));
    }

    /**
     * Establece el número de oficio.
     * @param numOficio - Número de oficio.
     */
    public setNumOficio(numOficio: string): void {
        this.update((state) => ({
            ...state,
            numOficio,
        }));
    }

    /**
     * Establece la fecha de inicio.
     * @param fechaInicio - Fecha de inicio.
     */
    public setFechaInicio(fechaInicio: string): void {
        this.update((state) => ({
            ...state,
            fechaInicio,
        }));
    }

    /**
     * Establece la fecha de fin de vigencia aprobada.
     * @param fechaFinVigenciaAprobada - Fecha de fin de vigencia aprobada.
     */
    public setFechaFinVigenciaAprobada(fechaFinVigenciaAprobada: string): void {
        this.update((state) => ({
            ...state,
            fechaFinVigenciaAprobada,
        }));
    }

    /**
     * Establece el régimen aduanero.
     * @param regimenAduanero - Régimen aduanero.
     * */
    public setRegimenAduanero(regimenAduanero: string): void {
        this.update((state) => ({
            ...state,
            regimenAduanero,
        }));
    }

    /**
     * Establece la descripción del producto.
     * @param descripcionProducto - Descripción del producto.
     */
    public setDescripcionProducto(descripcionProducto: string): void {
        this.update((state) => ({
            ...state,
            descripcionProducto,
        }));
    }

    /**
     * Establece la clasificación del subproducto.
     * @param clasificaionSubproducto - Clasificación del subproducto.
     */
    public setClasificaionSubproducto(clasificaionSubproducto: string): void {
        this.update((state) => ({
            ...state,
            clasificaionSubproducto,
        }));
    }

    /**
     * Establece la unidad de medida oficial del cupo.
     * @param unidadMedidaOficialCupo - Unidad de medida oficial del cupo.
     */
    public setUnidadMedidaOficialCupo(unidadMedidaOficialCupo: string): void {
        this.update((state) => ({
            ...state,
            unidadMedidaOficialCupo,
        }));
    }

    /**
     * Establece la fecha de inicio de vigencia.
     * @param fechaInicioVigencia - Fecha de inicio de vigencia.
     */
    public setFechaInicioVigencia(fechaInicioVigencia: string): void {
        this.update((state) => ({
            ...state,
            fechaInicioVigencia,
        }));
    }

    /**
     * Establece la fecha de fin de vigencia.
     * @param fechaFinVigencia - Fecha de fin de vigencia.
     */
    public setFechaFinVigencia(fechaFinVigencia: string): void {
        this.update((state) => ({
            ...state,
            fechaFinVigencia,
        }));
    }

    /**
     * Establece el mecanismo de asignación.
     * @param mecanismoAsignacion - Mecanismo de asignación.
     */
    public setMecanismoAsignacion(mecanismoAsignacion: string): void {
        this.update((state) => ({
            ...state,
            mecanismoAsignacion,
        }));
    }

    /**
     * Establece el tratado.
     * @param tratado - Tratado.
     */
    public setTratado(tratado: string): void {
        this.update((state) => ({
            ...state,
            tratado,
        }));
    }

    /**
     * Establece las fracciones arancelarias.
     * @param fraccionesArancelarias - Fracciones arancelarias.
     */
    public setFraccionesArancelarias(fraccionesArancelarias: string): void {
        this.update((state) => ({
            ...state,
            fraccionesArancelarias,
        }));
    }

    /**
     * Establece los países del cupo.
     * @param paisesCupo - Países del cupo.
     */
    public setPaisesCupo(paisesCupo: string): void {
        this.update((state) => ({
            ...state,
            paisesCupo,
        }));
    }

    /**
     * Establece las observaciones.
     * @param observaciones - Observaciones.
     */
    public setObservaciones(observaciones: string): void {
        this.update((state) => ({
            ...state,
            observaciones,
        }));
    }

    /**
     * Establece la descripción del fundamento.
     * @param descripcionFundamento - Descripción del fundamento.
     */
    public setDescripcionFundamento(descripcionFundamento: string): void {
        this.update((state) => ({
            ...state,
            descripcionFundamento,
        }));
    }

    /**
     * Establece el monto disponible de asignación.
     * @param montoDisponibleAsignacion - Monto disponible de asignación.
     */
    public setMontoDisponibleAsignacion(montoDisponibleAsignacion: number | null): void {
        this.update((state) => ({
            ...state,
            montoDisponibleAsignacion,
        }));
    }

    /**
     * Establece el monto a expedir.
     * @param montoExpedir - Monto a expedir.
     */
    public setMontoExpedir(montoExpedir: number | null): void {
        this.update((state) => ({
            ...state,
            montoExpedir,
        }));
    }

    /**
     * Establece el total de monto a expedir.
     * @param totalExpedir - Total de monto a expedir.
     */
    public setTotalExpedir(totalExpedir: number): void {
        this.update((state) => ({
            ...state,
            totalExpedir,
        }));
    }

    /**
     * Establece el cuerpo de la tabla.
     * @param cuerpoTabla - Cuerpo de la tabla.
     */
    public setCuerpoTabla(cuerpoTabla: ExpedirMonto[]): void {
        this.update((state) => ({
            ...state,
            cuerpoTabla,
        }));
    }

    /**
     * Este método actualiza el estado de la propiedad `mostrarDetalle` en el store.
     * @param mostrarDetalle - Indica si se debe mostrar el detalle o no.
     */
    public setMostrarDetalle(mostrarDetalle: boolean): void {
        this.update((state) => ({
            ...state,
            mostrarDetalle,
        }));
    }

    /**
     * Actualiza el estado de la consulta de persona física.
     * @param nuevoDatos - Nuevo estado de la consulta de persona física.
     */
    public setConsultaPersonaFisicaState(nuevoDatos: ExpedicionCertificadosAsignacion120202State): void {
        this.update(nuevoDatos);
    }
}