import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { Antecesor } from '../../tramites/31601/modelos/antecesor.modal';


/**
 * Interfaz que representa el estado de Solicitud31601.
 */
export interface Solicitud31601State {
    /**
     * El nombre completo del miembro.
     */
    nombreCompleto: string;
    /**
     * El tipo de persona del miembro.
     */
    tipoDePersonaMiembro: string;

    /**
     * El nombre del miembro.
     */
    nombreMiembro: string;

    /**
     * El apellido paterno del miembro.
     */
    apellidoPaternoMiembro: string;

    /**
     * El apellido materno del miembro.
     */
    apellidoMaternoMiembro: string;

    /**
     * El nombre de la empresa del miembro.
     */
    nombreDeLaEmpresaMiembro: string;

    /**
     * Lista de miembros seleccionados.
     */
    miembrosSeleccionados: Antecesor[];
    /**
     * El valor de autorizacionIVAIEPS.
     */
    autorizacionIVAIEPS: string;

    /**
     * El valor de regimen_0.
     */
    regimen_0: boolean;

    /**
     * El valor de regimen_1.
     */
    regimen_1: boolean;

    /**
     * El valor de regimen_2.
     */
    regimen_2: boolean;

    /**
     * El valor de regimen_3.
     */
    regimen_3: boolean;

    /**
     * El valor de sectorProductivo.
     */
    sectorProductivo: string;

    /**
     * El valor de servicio.
     */
    servicio: string;

    /**
     * El valor de preOperativo.
     */
    preOperativo: boolean;

    /**
     * El valor de indiqueSi.
     */
    indiqueSi: boolean;

    /**
     * El valor de senale.
     */
    senale: boolean;

    /**
     * El valor de empPropios.
     */
    empPropios: string;

    /**
     * El valor de bimestre.
     */
    bimestre: string;

    /**
     * El valor de senaleSi.
     */
    senaleSi: boolean;

    /**
     * El valor de seMomento.
     */
    seMomento: boolean;

    /**
     * El valor de cumplir.
     */
    cumplir: boolean;

    /**
     * El valor de indique.
     */
    indique: boolean;

    /**
     * El valor de encuentra.
     */
    encuentra: boolean;

    /**
     * El valor de delMismo.
     */
    delMismo: boolean;

    /**
     * El valor de senaleMomento.
     */
    senaleMomento: boolean;

    /**
     * El valor de enCaso.
     */
    enCaso: boolean;

    /**
     * El valor de comboBimestresIDCSeleccione.
     */
    comboBimestresIDCSeleccione: string;

    /**
     * El valor de ingresar.
     */
    ingresar: boolean;

    /**
     * El valor de encuentraSus.
     */
    encuentraSus: boolean;

    /**
     * El valor de registrosQue.
     */
    registrosQue: string;

    /**
     * El valor de registrosQue2.
     */
    registrosQue2: string;

    /**
     * El valor de momentoIngresar.
     */
    momentoIngresar: boolean;

    /**
     * El valor de indiqueCuenta.
     */
    indiqueCuenta: boolean;

    /**
     * El valor de nombreDel.
     */
    nombreDel: string;

    /**
     * El valor de lugarDeRadicacion.
     */
    lugarDeRadicacion: string;

    /**
     * El valor de contabilidad.
     */
    contabilidad: boolean;

    /**
     * El valor de rmfRadio.
     */
    rmfRadio: boolean;

    /**
     * El valor de vinculacionRegistroCancelado.
     */
    vinculacionRegistroCancelado: boolean;

    /**
     * El valor de proveedoresListadoSAT.
     */
    proveedoresListadoSAT: boolean;

    /**
     * El valor de indiqueCheck.
     */
    indiqueCheck: boolean;

    /**
     * El valor de resigtro.
     */
    resigtro: string;

    /**
     * El valor de telefono.
     */
    telefono: string;

    /**
     * El valor de correo.
     */
    correo: string;

    /**
     * El valor de manifieste.
     */
    manifieste: string;

    /**
     * El valor de indiqueIva.
     */
    indiqueIva: string;

    /**
     * El valor de empleados.
     */
    empleados: boolean;

    /**
     * El valor de infraestructura.
     */
    infraestructura: boolean;

    /**
     * El valor de monto.
     */
    monto: boolean;

    /**
     * El valor de antiguedad.
     */
    antiguedad: boolean;

    /**
     * El valor de tipoDe.
     */
    tipoDe: string;

    /**
     * El valor de valorPesos.
     */
    valorPesos: string;

    /**
     * El valor de descripcion.
     */
    descripcion: string;

    /**
     * El valor de haContado.
     */
    haContado: string;

    /**
     * El valor de enCasoIva.
     */
    enCasoIva: string;

    /**
     * El valor de numeroOperacion.
     */
    numeroOperacion: string;

    /**
     * El valor de banco.
     */
    banco: string;

    /**
     * El valor de llavePago.
     */
    llavePago: string;

    /**
     * El valor de importaciones.
     */
    importaciones: string;

    /**
     * El valor de infraestructuraIndique.
     */
    infraestructuraIndique: string;

    /**
     * El valor de ultimosMeses.
     */
    ultimosMeses: string;

    /**
     * El valor de operacionesmeses.
     */
    operacionesmeses: string;

    /**
     * El valor de valor.
     */
    valor: string;

    /**
     * El valor de transferencias.
     */
    transferencias: number;

    /**
     * El valor de transferenciasVir.
     */
    transferenciasVir: number;

    /**
     * El valor de retornos.
     */
    retornos: number;

    /**
     * El valor de retornosSe.
     */
    retornosSe: number;

    /**
     * El valor de constancias.
     */
    constancias: number;

    /**
     * El valor de constanciasDe.
     */
    constanciasDe: number;

    /**
     * El valor de empleadosPropiosRegimen.
     */
    empleadosPropiosRegimen: string;

    /**
     * El valor de numeroEmpleadosUno.
     */
    numeroEmpleadosUno: number;

    /**
     * El valor de numeroEmpleadosDos.
     */
    numeroEmpleadosDos: number;

    /**
     * El valor de numeroEmpleadosTres.
     */
    numeroEmpleadosTres: number;

    /**
     * El valor de comboBimestresUno.
     */
    comboBimestresUno: string;

    /**
     * El valor de comboBimestresDos.
     */
    comboBimestresDos: string;

    /**
     * El valor de comboBimestresTres.
     */
    comboBimestresTres: string;

    /**
     * El valor de proveedorCumplimiento.
     */
    proveedorCumplimiento: string;

    /**
     * El valor de declaracionISR.
     */
    declaracionISR: string;

    /**
     * El valor de cancelacion.
     */
    cancelacion: string;

    /**
     * El valor de cumplimientoReglas.
     */
    cumplimientoReglas: string;

    /**
     * El valor de recintoFiscalizado.
     */
    recintoFiscalizado: string;

    /**
     * El valor de recintoEstrategico.
     */
    recintoEstrategico: string;

    /**
     * El valor de cumplimientoLineamientos.
     */
    cumplimientoLineamientos: string;
    /**
     * El valor de squemaIntegral.
     */
    squemaIntegral: string;
    /**
     * El valor de sidoModificadas.
     */
    sidoModificadas: string;
    /**
     * El valor de ensucaracterde.
     */
    ensucaracterde: string;
    /**
     * El valor de rfc.
     */
    rfc: string;
    /**
     * El valor de obligadoaTributarenMéxico.
     */
    obligadoaTributarenMexico: string;
    /**
     * El valor de nacionalidad.
     */
    nacionalidad: string;
    /**
     * El valor de registroFederaldeContribuyentes.
     */
    registroFederaldeContribuyentes: string;
    /**
     * El valor de resigtroReprestantante.
     */
    resigtroReprestantante: string;
    /**
     * El valor de rfcReprestantante.
     */
    rfcReprestantante: string;
    /**
     * El valor de nombreReprestante.
     */
    nombreReprestante: string;
    /**
     * El valor de apellidoPaterno.
     */
    apellidoPaterno: string;
    /**
     * El valor de apellidoMaterno.
     */
    apellidoMaterno: string;
    /**
     * El valor de cuidad.
     */
    cuidad: string;
    /**
     * El valor de cargo.
     */
    cargo: string;
    /**
     * El valor de telefonoReprestantante.
     */
    telefonoReprestantante: string;
    /**
     * El valor de correoReprestantante.
     */
    correoReprestantante: string;
    /**
     * El valor de suplente.
     */
    suplente: string;
    /**
     * El valor de tipoDocumento.
     */
    tipoDocumento: string;

}
/**
 * Función para crear el estado inicial de Solicitud31601.
 * @returns {Solicitud31601State} El estado inicial de Solicitud31601.
 */
export function createInitialState(): Solicitud31601State {
    return {
        /**
         * El nombre completo del miembro.
         * */
        nombreCompleto: '',
        /**
         * El tipo de persona del miembro.
         */
        tipoDePersonaMiembro: '',
        /**
         * El nombre del miembro.
         */
        nombreMiembro: '',
        /**
         * El apellido paterno del miembro.
         */
        apellidoPaternoMiembro: '',
        /**
         * El apellido materno del miembro.
         */
        apellidoMaternoMiembro: '',
        /**
         * El nombre de la empresa del miembro.
         */
        nombreDeLaEmpresaMiembro: '',
        /**
         * Lista de miembros seleccionados.
         */
        miembrosSeleccionados: [],
        /**
         * El valor de autorizacionIVAIEPS.
         */
        autorizacionIVAIEPS: '',

        /**
         * El valor de regimen_0.
         */
        regimen_0: false,

        /**
         * El valor de regimen_1.
         */
        regimen_1: false,

        /**
         * El valor de regimen_2.
         */
        regimen_2: false,

        /**
         * El valor de regimen_3.
         */
        regimen_3: false,

        /**
         * El valor de sectorProductivo.
         */
        sectorProductivo: '',

        /**
         * El valor de servicio.
         */
        servicio: '',

        /**
         * El valor de preOperativo.
         */
        preOperativo: false,

        /**
         * El valor de indiqueSi.
         */
        indiqueSi: false,

        /**
         * El valor de senale.
         */
        senale: false,

        /**
         * El valor de empPropios.
         */
        empPropios: '',

        /**
         * El valor de bimestre.
         */
        bimestre: '',

        /**
         * El valor de senaleSi.
         */
        senaleSi: false,

        /**
         * El valor de seMomento.
         */
        seMomento: false,

        /**
         * El valor de cumplir.
         */
        cumplir: false,

        /**
         * El valor de indique.
         */
        indique: false,

        /**
         * El valor de encuentra.
         */
        encuentra: false,

        /**
         * El valor de delMismo.
         */
        delMismo: false,

        /**
         * El valor de senaleMomento.
         */
        senaleMomento: false,

        /**
         * El valor de enCaso.
         */
        enCaso: false,

        /**
         * El valor de comboBimestresIDCSeleccione.
         */
        comboBimestresIDCSeleccione: '',

        /**
         * El valor de ingresar.
         */
        ingresar: false,

        /**
         * El valor de encuentraSus.
         */
        encuentraSus: false,

        /**
         * El valor de registrosQue.
         */
        registrosQue: '',

        /**
         * El valor de registrosQue2.
         */
        registrosQue2: '',

        /**
         * El valor de momentoIngresar.
         */
        momentoIngresar: false,

        /**
         * El valor de indiqueCuenta.
         */
        indiqueCuenta: false,

        /**
         * El valor de nombreDel.
         */
        nombreDel: '',

        /**
         * El valor de lugarDeRadicacion.
         */
        lugarDeRadicacion: '',

        /**
         * El valor de contabilidad.
         */
        contabilidad: false,

        /**
         * El valor de rmfRadio.
         */
        rmfRadio: false,

        /**
         * El valor de vinculacionRegistroCancelado.
         */
        vinculacionRegistroCancelado: false,

        /**
         * El valor de proveedoresListadoSAT.
         */
        proveedoresListadoSAT: false,

        /**
         * El valor de indiqueCheck.
         */
        indiqueCheck: false,

        /**
         * El valor de resigtro.
         */
        resigtro: '',

        /**
         * El valor de telefono.
         */
        telefono: '',

        /**
         * El valor de correo.
         */
        correo: '',

        /**
         * El valor de manifieste.
         */
        manifieste: '',

        /**
         * El valor de indiqueIva.
         */
        indiqueIva: '',

        /**
         * El valor de empleados.
         */
        empleados: false,

        /**
         * El valor de infraestructura.
         */
        infraestructura: false,

        /**
         * El valor de monto.
         */
        monto: false,

        /**
         * El valor de antiguedad.
         */
        antiguedad: false,

        /**
         * El valor de tipoDe.
         */
        tipoDe: '',

        /**
         * El valor de valorPesos.
         */
        valorPesos: '',

        /**
         * El valor de descripcion.
         */
        descripcion: '',

        /**
         * El valor de haContado.
         */
        haContado: '',

        /**
         * El valor de enCasoIva.
         */
        enCasoIva: '',

        /**
         * El valor de numeroOperacion.
         */
        numeroOperacion: '',

        /**
         * El valor de banco.
         */
        banco: '',

        /**
         * El valor de llavePago.
         */
        llavePago: '',

        /**
         * El valor de importaciones.
         */
        importaciones: '',

        /**
         * El valor de infraestructuraIndique.
         */
        infraestructuraIndique: '',

        /**
         * El valor de ultimosMeses.
         */
        ultimosMeses: '',

        /**
         * El valor de operacionesmeses.
         */
        operacionesmeses: '',

        /**
         * El valor de valor.
         */
        valor: '',

        /**
         * El valor de transferencias.
         */
        transferencias: 0,

        /**
         * El valor de transferenciasVir.
         */
        transferenciasVir: 0,

        /**
         * El valor de retornos.
         */
        retornos: 0,

        /**
         * El valor de retornosSe.
         */
        retornosSe: 0,

        /**
         * El valor de constancias.
         */
        constancias: 0,

        /**
         * El valor de constanciasDe.
         */
        constanciasDe: 0,

        /**
         * El valor de empleadosPropiosRegimen.
         */
        empleadosPropiosRegimen: '',

        /**
         * El valor de numeroEmpleadosUno.
         */
        numeroEmpleadosUno: 1,

        /**
         * El valor de numeroEmpleadosDos.
         */
        numeroEmpleadosDos: 1,

        /**
         * El valor de numeroEmpleadosTres.
         */
        numeroEmpleadosTres: 1,

        /**
         * El valor de comboBimestresUno.
         */
        comboBimestresUno: '',

        /**
         * El valor de comboBimestresDos.
         */
        comboBimestresDos: '',

        /**
         * El valor de comboBimestresTres.
         */
        comboBimestresTres: '',

        /**
         * El valor de proveedorCumplimiento.
         */
        proveedorCumplimiento: '',

        /**
         * El valor de declaracionISR.
         */
        declaracionISR: '',

        /**
         * El valor de cancelacion.
         */
        cancelacion: '',

        /**
         * El valor de cumplimientoReglas.
         */
        cumplimientoReglas: '',

        /**
         * El valor de recintoFiscalizado.
         */
        recintoFiscalizado: '',

        /**
         * El valor de recintoEstrategico.
         */
        recintoEstrategico: '',

        /**
         * El valor de cumplimientoLineamientos.
         */
        cumplimientoLineamientos: '',

        /**
         * El valor de squemaIntegral.
         */
        squemaIntegral: '',

        /**
         * El valor de sidoModificadas.
         */
        sidoModificadas: '',
        /**
         * El valor de ensucaracterde.
         */
        ensucaracterde: '',
        /**
         * El valor de rfc.
         */
        rfc: '',
        /**
         * El valor de obligadoaTributarenMéxico.
         */
        obligadoaTributarenMexico: '',

        /**
         * El valor de nacionalidad.
         */
        nacionalidad: '',

        /**
         * El valor de registroFederaldeContribuyentes.
         */
        registroFederaldeContribuyentes: '',
        /**
         * El valor de resigtroReprestantante.
         */
        resigtroReprestantante: '',

        /**
         * El valor de rfcReprestantante.
         */
        rfcReprestantante: '',

        /**
         * El valor de nombreReprestante.
         */
        nombreReprestante: '',
        /**
         * El valor de apellidoPaterno.
         */
        apellidoPaterno: '',

        /**
         * El valor de apellidoMaterno.
         */
        apellidoMaterno: '',

        /**
         * El valor de cuidad.
         */
        cuidad: '',

        /**
         * El valor de cargo.
         */
        cargo: '',

        /**
         * El valor de telefonoReprestantante.
         */
        telefonoReprestantante: '',

        /**
         * El valor de correoReprestantante.
         */
        correoReprestantante: '',

        /**
         * El valor de suplente.
         */
        suplente: '',
        /**
         * El valor de tipoDocumento.
         */
        tipoDocumento: '',
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
@StoreConfig({ name: 'tramite31601', resettable: true })

export class Tramite31601Store extends Store<Solicitud31601State> {
    /**
     * Crea una instancia de Tramite31601Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    public agregarMiembrodelaempresaTable(miembro: Antecesor): void {
        this.update((state) => ({
            ...state,
            miembrosSeleccionados: [...state.miembrosSeleccionados, miembro],
        }));
    }
    public eliminarMiembrodelaempresaTable(miembro: Antecesor): void {
        this.update((state) => ({
            ...state,
            miembrosSeleccionados: state.miembrosSeleccionados.filter(m => m !== miembro),
        }));
    }

    /**
     * Establece el estado de tipoDePersonaMiembro.
     * @param tipoDePersonaMiembro - El valor de tipoDePersonaMiembro.
     */
    public setTipoDePersonaMiembro(tipoDePersonaMiembro: string): void {
        this.update((state) => ({
            ...state,
            tipoDePersonaMiembro,
        }));
    }

    /**
     * Establece el estado de nombreMiembro.
     * @param nombreMiembro - El valor de nombreMiembro.
     */
    public setNombreMiembro(nombreMiembro: string): void {
        this.update((state) => ({
            ...state,
            nombreMiembro,
        }));
    }

    /**
     * Establece el estado de apellidoPaternoMiembro.
     * @param apellidoPaternoMiembro - El valor de apellidoPaternoMiembro.
     */
    public setApellidoPaternoMiembro(apellidoPaternoMiembro: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaternoMiembro,
        }));
    }

    /**
     * Establece el estado de apellidoMaternoMiembro.
     * @param apellidoMaternoMiembro - El valor de apellidoMaternoMiembro.
     */
    public setApellidoMaternoMiembro(apellidoMaternoMiembro: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaternoMiembro,
        }));
    }

    /**
     * Establece el estado de nombreDeLaEmpresaMiembro.
     * @param nombreDeLaEmpresaMiembro - El valor de nombreDeLaEmpresaMiembro.
     */
    public setNombreDeLaEmpresaMiembro(nombreDeLaEmpresaMiembro: string): void {
        this.update((state) => ({
            ...state,
            nombreDeLaEmpresaMiembro,
        }));
    }

    /**
     * Establece el estado de autorizacionIVAIEPS.
     * @param autorizacionIVAIEPS - El valor de autorizacionIVAIEPS.
     */
    public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string) {
        this.update((state) => ({
            ...state,
            autorizacionIVAIEPS,
        }));
    }

    /**
     * Establece el estado de regimen_0.
     * @param regimen_0 - El valor de regimen_0.
     */
    public setRegimen_0(regimen_0: boolean) {
        this.update((state) => ({
            ...state,
            regimen_0,
        }));
    }

    /**
     * Establece el estado de regimen_1.
     * @param regimen_1 - El valor de regimen_1.
     */
    public setRegimen_1(regimen_1: boolean) {
        this.update((state) => ({
            ...state,
            regimen_1,
        }));
    }

    /**
     * Establece el estado de regimen_2.
     * @param regimen_2 - El valor de regimen_2.
     */
    public setRegimen_2(regimen_2: boolean) {
        this.update((state) => ({
            ...state,
            regimen_2,
        }));
    }

    /**
     * Establece el estado de regimen_3.
     * @param regimen_3 - El valor de regimen_3.
     */
    public setRegimen_3(regimen_3: boolean) {
        this.update((state) => ({
            ...state,
            regimen_3,
        }));
    }

    /**
     * Establece el estado de sectorProductivo.
     * @param sectorProductivo - El valor de sectorProductivo.
     */
    public setSectorProductivo(sectorProductivo: string) {
        this.update((state) => ({
            ...state,
            sectorProductivo,
        }));
    }

    /**
     * Establece el estado de servicio.
     * @param servicio - El valor de servicio.
     */
    public setServicio(servicio: string) {
        this.update((state) => ({
            ...state,
            servicio,
        }));
    }

    /**
     * Establece el estado de preOperativo.
     * @param preOperativo - El valor de preOperativo.
     */
    public setPreOperativo(preOperativo: boolean) {
        this.update((state) => ({
            ...state,
            preOperativo,
        }));
    }

    /**
     * Establece el estado de indiqueSi.
     * @param indiqueSi - El valor de indiqueSi.
     */
    public setIndiqueSi(indiqueSi: boolean) {
        this.update((state) => ({
            ...state,
            indiqueSi,
        }));
    }

    /**
     * Establece el estado de senale.
     * @param senale - El valor de senale.
     */
    public setSenale(senale: boolean) {
        this.update((state) => ({
            ...state,
            senale,
        }));
    }

    /**
     * Establece el estado de empPropios.
     * @param empPropios - El valor de empPropios.
     */
    public setEmpPropios(empPropios: string) {
        this.update((state) => ({
            ...state,
            empPropios,
        }));
    }

    /**
     * Establece el estado de bimestre.
     * @param bimestre - El valor de bimestre.
     */
    public setBimestre(bimestre: string) {
        this.update((state) => ({
            ...state,
            bimestre,
        }));
    }

    /**
     * Establece el estado de senaleSi.
     * @param senaleSi - El valor de senaleSi.
     */
    public setSenaleSi(senaleSi: boolean) {
        this.update((state) => ({
            ...state,
            senaleSi,
        }));
    }

    /**
     * Establece el estado de seMomento.
     * @param seMomento - El valor de seMomento.
     */
    public setSeMomento(seMomento: boolean) {
        this.update((state) => ({
            ...state,
            seMomento,
        }));
    }

    /**
     * Establece el estado de cumplir.
     * @param cumplir - El valor de cumplir.
     */
    public setCumplir(cumplir: boolean) {
        this.update((state) => ({
            ...state,
            cumplir,
        }));
    }

    /**
     * Establece el estado de indique.
     * @param indique - El valor de indique.
     */
    public setIndique(indique: boolean) {
        this.update((state) => ({
            ...state,
            indique,
        }));
    }

    /**
     * Establece el estado de encuentra.
     * @param encuentra - El valor de encuentra.
     */
    public setEncuentra(encuentra: boolean) {
        this.update((state) => ({
            ...state,
            encuentra,
        }));
    }

    /**
     * Establece el estado de delMismo.
     * @param delMismo - El valor de delMismo.
     */
    public setDelMismo(delMismo: boolean) {
        this.update((state) => ({
            ...state,
            delMismo,
        }));
    }

    /**
     * Establece el estado de senaleMomento.
     * @param senaleMomento - El valor de senaleMomento.
     */
    public setSenaleMomento(senaleMomento: boolean) {
        this.update((state) => ({
            ...state,
            senaleMomento,
        }));
    }

    /**
     * Establece el estado de enCaso.
     * @param enCaso - El valor de enCaso.
     */
    public setEnCaso(enCaso: boolean) {
        this.update((state) => ({
            ...state,
            enCaso,
        }));
    }

    /**
     * Establece el estado de comboBimestresIDCSeleccione.
     * @param comboBimestresIDCSeleccione - El valor de comboBimestresIDCSeleccione.
     */
    public setComboBimestresIDCSeleccione(comboBimestresIDCSeleccione: string) {
        this.update((state) => ({
            ...state,
            comboBimestresIDCSeleccione,
        }));
    }

    /**
     * Establece el estado de ingresar.
     * @param ingresar - El valor de ingresar.
     */
    public setIngresar(ingresar: boolean) {
        this.update((state) => ({
            ...state,
            ingresar,
        }));
    }

    /**
     * Establece el estado de encuentraSus.
     * @param encuentraSus - El valor de encuentraSus.
     */
    public setEncuentraSus(encuentraSus: boolean) {
        this.update((state) => ({
            ...state,
            encuentraSus,
        }));
    }

    /**
     * Establece el estado de registrosQue.
     * @param registrosQue - El valor de registrosQue.
     */
    public setRegistrosQue(registrosQue: string) {
        this.update((state) => ({
            ...state,
            registrosQue,
        }));
    }

    /**
     * Establece el estado de registrosQue2.
     * @param registrosQue2 - El valor de registrosQue2.
     */
    public setRegistrosQue2(registrosQue2: string) {
        this.update((state) => ({
            ...state,
            registrosQue2,
        }));
    }

    /**
     * Establece el estado de momentoIngresar.
     * @param momentoIngresar - El valor de momentoIngresar.
     */
    public setMomentoIngresar(momentoIngresar: boolean) {
        this.update((state) => ({
            ...state,
            momentoIngresar,
        }));
    }

    /**
     * Establece el estado de indiqueCuenta.
     * @param indiqueCuenta - El valor de indiqueCuenta.
     */
    public setIndiqueCuenta(indiqueCuenta: boolean) {
        this.update((state) => ({
            ...state,
            indiqueCuenta,
        }));
    }

    /**
     * Establece el estado de nombreDel.
     * @param nombreDel - El valor de nombreDel.
     */
    public setNombreDel(nombreDel: string) {
        this.update((state) => ({
            ...state,
            nombreDel,
        }));
    }

    /**
     * Establece el estado de lugarDeRadicacion.
     * @param lugarDeRadicacion - El valor de lugarDeRadicacion.
     */
    public setLugarDeRadicacion(lugarDeRadicacion: string) {
        this.update((state) => ({
            ...state,
            lugarDeRadicacion,
        }));
    }

    /**
     * Establece el estado de contabilidad.
     * @param contabilidad - El valor de contabilidad.
     */
    public setContabilidad(contabilidad: boolean) {
        this.update((state) => ({
            ...state,
            contabilidad,
        }));
    }

    /**
     * Establece el estado de rmfRadio.
     * @param rmfRadio - El valor de rmfRadio.
     */
    public setRmfRadio(rmfRadio: boolean) {
        this.update((state) => ({
            ...state,
            rmfRadio,
        }));
    }

    /**
     * Establece el estado de vinculacionRegistroCancelado.
     * @param vinculacionRegistroCancelado - El valor de vinculacionRegistroCancelado.
     */
    public setVinculacionRegistroCancelado(vinculacionRegistroCancelado: boolean) {
        this.update((state) => ({
            ...state,
            vinculacionRegistroCancelado,
        }));
    }

    /**
     * Establece el estado de proveedoresListadoSAT.
     * @param proveedoresListadoSAT - El valor de proveedoresListadoSAT.
     */
    public setProveedoresListadoSAT(proveedoresListadoSAT: boolean) {
        this.update((state) => ({
            ...state,
            proveedoresListadoSAT,
        }));
    }

    /**
     * Establece el estado de indiqueCheck.
     * @param indiqueCheck - El valor de indiqueCheck.
     */
    public setIndiqueCheck(indiqueCheck: boolean) {
        this.update((state) => ({
            ...state,
            indiqueCheck,
        }));
    }

    /**
     * Establece el estado de resigtro.
     * @param resigtro - El valor de resigtro.
     */
    public setResigtro(resigtro: string) {
        this.update((state) => ({
            ...state,
            resigtro,
        }));
    }

    /**
     * Establece el estado de telefono.
     * @param telefono - El valor de telefono.
     */
    public setTelefono(telefono: string) {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }

    /**
     * Establece el estado de correo.
     * @param correo - El valor de correo.
     */
    public setCorreo(correo: string) {
        this.update((state) => ({
            ...state,
            correo,
        }));
    }

    /**
     * Establece el estado de manifieste.
     * @param manifieste - El valor de manifieste.
     */
    public setManifieste(manifieste: string) {
        this.update((state) => ({
            ...state,
            manifieste,
        }));
    }

    /**
     * Establece el estado de indiqueIva.
     * @param indiqueIva - El valor de indiqueIva.
     */
    public setIndiqueIva(indiqueIva: string) {
        this.update((state) => ({
            ...state,
            indiqueIva,
        }));
    }

    /**
     * Establece el estado de empleados.
     * @param empleados - El valor de empleados.
     */
    public setEmpleados(empleados: boolean) {
        this.update((state) => ({
            ...state,
            empleados,
        }));
    }

    /**
     * Establece el estado de infraestructura.
     * @param infraestructura - El valor de infraestructura.
     */
    public setInfraestructura(infraestructura: boolean) {
        this.update((state) => ({
            ...state,
            infraestructura,
        }));
    }

    /**
     * Establece el estado de monto.
     * @param monto - El valor de monto.
     */
    public setMonto(monto: boolean) {
        this.update((state) => ({
            ...state,
            monto,
        }));
    }

    /**
     * Establece el estado de antiguedad.
     * @param antiguedad - El valor de antiguedad.
     */
    public setAntiguedad(antiguedad: boolean) {
        this.update((state) => ({
            ...state,
            antiguedad,
        }));
    }

    /**
     * Establece el estado de tipoDe.
     * @param tipoDe - El valor de tipoDe.
     */
    public setTipoDe(tipoDe: string) {
        this.update((state) => ({
            ...state,
            tipoDe,
        }));
    }

    /**
     * Establece el estado de valorPesos.
     * @param valorPesos - El valor de valorPesos.
     */
    public setValorPesos(valorPesos: string) {
        this.update((state) => ({
            ...state,
            valorPesos,
        }));
    }

    /**
     * Establece el estado de descripcion.
     * @param descripcion - El valor de descripcion.
     */
    public setDescripcion(descripcion: string) {
        this.update((state) => ({
            ...state,
            descripcion,
        }));
    }

    /**
     * Establece el estado de haContado.
     * @param haContado - El valor de haContado.
     */
    public setHaContado(haContado: string) {
        this.update((state) => ({
            ...state,
            haContado,
        }));
    }

    /**
     * Establece el estado de enCasoIva.
     * @param enCasoIva - El valor de enCasoIva.
     */
    public setEnCasoIva(enCasoIva: string) {
        this.update((state) => ({
            ...state,
            enCasoIva,
        }));
    }

    /**
     * Establece el estado de numeroOperacion.
     * @param numeroOperacion - El valor de numeroOperacion.
     */
    public setNumeroOperacion(numeroOperacion: string) {
        this.update((state) => ({
            ...state,
            numeroOperacion,
        }));
    }

    /**
     * Establece el estado de banco.
     * @param banco - El valor de banco.
     */
    public setBanco(banco: string) {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }

    /**
     * Establece el estado de llavePago.
     * @param llavePago - El valor de llavePago.
     */
    public setLlavePago(llavePago: string) {
        this.update((state) => ({
            ...state,
            llavePago,
        }));
    }

    /**
     * Establece el estado de importaciones.
     * @param importaciones - El valor de importaciones.
     */
    public setImportaciones(importaciones: string) {
        this.update((state) => ({
            ...state,
            importaciones,
        }));
    }

    /**
     * Establece el estado de infraestructuraIndique.
     * @param infraestructuraIndique - El valor de infraestructuraIndique.
     */
    public setInfraestructuraIndique(infraestructuraIndique: string) {
        this.update((state) => ({
            ...state,
            infraestructuraIndique,
        }));
    }

    /**
     * Establece el estado de ultimosMeses.
     * @param ultimosMeses - El valor de ultimosMeses.
     */
    public setUltimosMeses(ultimosMeses: string) {
        this.update((state) => ({
            ...state,
            ultimosMeses,
        }));
    }

    /**
     * Establece el estado de operacionesmeses.
     * @param operacionesmeses - El valor de operacionesmeses.
     */
    public setOperacionesmeses(operacionesmeses: string) {
        this.update((state) => ({
            ...state,
            operacionesmeses,
        }));
    }

    /**
     * Establece el estado de valor.
     * @param valor - El valor de valor.
     */
    public setValor(valor: string) {
        this.update((state) => ({
            ...state,
            valor,
        }));
    }

    /**
     * Establece el estado de transferencias.
     * @param transferencias - El valor de transferencias.
     */
    public setTransferencias(transferencias: number) {
        this.update((state) => ({
            ...state,
            transferencias,
        }));
    }

    /**
     * Establece el estado de transferenciasVir.
     * @param transferenciasVir - El valor de transferenciasVir.
     */
    public setTransferenciasVir(transferenciasVir: number) {
        this.update((state) => ({
            ...state,
            transferenciasVir,
        }));
    }

    /**
     * Establece el estado de retornos.
     * @param retornos - El valor de retornos.
     */
    public setRetornos(retornos: number) {
        this.update((state) => ({
            ...state,
            retornos,
        }));
    }

    /**
     * Establece el estado de retornosSe.
     * @param retornosSe - El valor de retornosSe.
     */
    public setRetornosSe(retornosSe: number) {
        this.update((state) => ({
            ...state,
            retornosSe,
        }));
    }

    /**
     * Establece el estado de constancias.
     * @param constancias - El valor de constancias.
     */
    public setConstancias(constancias: number) {
        this.update((state) => ({
            ...state,
            constancias,
        }));
    }

    /**
     * Establece el estado de constanciasDe.
     * @param constanciasDe - El valor de constanciasDe.
     */
    public setConstanciasDe(constanciasDe: number) {
        this.update((state) => ({
            ...state,
            constanciasDe,
        }));
    }

    /**
     * Establece el estado de empleadosPropiosRegimen.
     * @param empleadosPropiosRegimen - El valor de empleadosPropiosRegimen.
     */
    public setEmpleadosPropiosRegimen(empleadosPropiosRegimen: string) {
        this.update((state) => ({
            ...state,
            empleadosPropiosRegimen,
        }));
    }

    /**
 * Establece el estado de numeroEmpleadosUno.
 * @param numeroEmpleadosUno - El valor de numeroEmpleadosUno.
 */
    public setNumeroEmpleadosUno(numeroEmpleadosUno: number) {
        this.update((state) => ({
            ...state,
            numeroEmpleadosUno,
        }));
    }

    /**
     * Establece el estado de numeroEmpleadosDos.
     * @param numeroEmpleadosDos - El valor de numeroEmpleadosDos.
     */
    public setNumeroEmpleadosDos(numeroEmpleadosDos: number) {
        this.update((state) => ({
            ...state,
            numeroEmpleadosDos,
        }));
    }

    /**
     * Establece el estado de numeroEmpleadosTres.
     * @param numeroEmpleadosTres - El valor de numeroEmpleadosTres.
     */
    public setNumeroEmpleadosTres(numeroEmpleadosTres: number) {
        this.update((state) => ({
            ...state,
            numeroEmpleadosTres,
        }));
    }

    /**
     * Establece el estado de comboBimestresUno.
     * @param comboBimestresUno - El valor de comboBimestresUno.
     */
    public setComboBimestresUno(comboBimestresUno: string) {
        this.update((state) => ({
            ...state,
            comboBimestresUno,
        }));
    }

    /**
     * Establece el estado de comboBimestresDos.
     * @param comboBimestresDos - El valor de comboBimestresDos.
     */
    public setComboBimestresDos(comboBimestresDos: string) {
        this.update((state) => ({
            ...state,
            comboBimestresDos,
        }));
    }

    /**
     * Establece el estado de comboBimestresTres.
     * @param comboBimestresTres - El valor de comboBimestresTres.
     */
    public setComboBimestresTres(comboBimestresTres: string) {
        this.update((state) => ({
            ...state,
            comboBimestresTres,
        }));
    }

    /**
     * Establece el estado de proveedorCumplimiento.
     * @param proveedorCumplimiento - El valor de proveedorCumplimiento.
     */
    public setProveedorCumplimiento(proveedorCumplimiento: string) {
        this.update((state) => ({
            ...state,
            proveedorCumplimiento,
        }));
    }

    /**
     * Establece el estado de declaracionISR.
     * @param declaracionISR - El valor de declaracionISR.
     */
    public setDeclaracionISR(declaracionISR: string) {
        this.update((state) => ({
            ...state,
            declaracionISR,
        }));
    }

    /**
     * Establece el estado de cancelacion.
     * @param cancelacion - El valor de cancelacion.
     */
    public setCancelacion(cancelacion: string) {
        this.update((state) => ({
            ...state,
            cancelacion,
        }));
    }

    /**
     * Establece el estado de cumplimientoReglas.
     * @param cumplimientoReglas - El valor de cumplimientoReglas.
     */
    public setCumplimientoReglas(cumplimientoReglas: string) {
        this.update((state) => ({
            ...state,
            cumplimientoReglas,
        }));
    }

    /**
     * Establece el estado de recintoFiscalizado.
     * @param recintoFiscalizado - El valor de recintoFiscalizado.
     */
    public setRecintoFiscalizado(recintoFiscalizado: string) {
        this.update((state) => ({
            ...state,
            recintoFiscalizado,
        }));
    }

    /**
     * Establece el estado de recintoEstrategico.
     * @param recintoEstrategico - El valor de recintoEstrategico.
     */
    public setRecintoEstrategico(recintoEstrategico: string) {
        this.update((state) => ({
            ...state,
            recintoEstrategico,
        }));
    }

    /**
     * Establece el estado de cumplimientoLineamientos.
     * @param cumplimientoLineamientos - El valor de cumplimientoLineamientos.
     */
    public setCumplimientoLineamientos(cumplimientoLineamientos: string) {
        this.update((state) => ({
            ...state,
            cumplimientoLineamientos,
        }));
    }

    /**
     * Establece el estado de squemaIntegral.
     * @param squemaIntegral - El valor de squemaIntegral.
     */
    public setSquemaIntegral(squemaIntegral: string) {
        this.update((state) => ({
            ...state,
            squemaIntegral,
        }));
    }

    /**
     * Establece el estado de sidoModificadas.
     * @param sidoModificadas - El valor de sidoModificadas.
     */
    public setSidoModificadas(sidoModificadas: string) {
        this.update((state) => ({
            ...state,
            sidoModificadas,
        }));
    }
    /**
     * Establece el estado de ensucaracterde.
     * @param ensucaracterde - El valor de ensucaracterde.
     */
    public setEnsucaracterde(ensucaracterde: string) {
        this.update((state) => ({
            ...state,
            ensucaracterde,
        }));
    }
    /**
     * Establece el estado de rfc.
     * @param rfc - El valor de rfc.
     */
    public setRfc(rfc: string) {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }
    /**
     * Establece el estado de obligadoaTributarenMéxico.
     * @param obligadoaTributarenMéxico - El valor de obligadoaTributarenMéxico.
     */
    public setObligadoaTributarenMexico(obligadoaTributarenMexico: string) {
        this.update((state) => ({
            ...state,
            obligadoaTributarenMexico,
        }));
    }

    /**
     * Establece el estado de nacionalidad.
     * @param nacionalidad - El valor de nacionalidad.
     */
    public setNacionalidad(nacionalidad: string) {
        this.update((state) => ({
            ...state,
            nacionalidad,
        }));
    }

    /**
     * Establece el estado de registroFederaldeContribuyentes.
     * @param registroFederaldeContribuyentes - El valor de registroFederaldeContribuyentes.
     */
    public setRegistroFederaldeContribuyentes(registroFederaldeContribuyentes: string) {
        this.update((state) => ({
            ...state,
            registroFederaldeContribuyentes,
        }));
    }
    /**
     * Establece el estado de resigtroReprestantante.
     * @param resigtroReprestantante - El valor de resigtroReprestantante.
     */
    public setResigtroReprestantante(resigtroReprestantante: string) {
        this.update((state) => ({
            ...state,
            resigtroReprestantante,
        }));
    }

    /**
     * Establece el estado de rfcReprestantante.
     * @param rfcReprestantante - El valor de rfcReprestantante.
     */
    public setRfcReprestantante(rfcReprestantante: string) {
        this.update((state) => ({
            ...state,
            rfcReprestantante,
        }));
    }

    /**
     * Establece el estado de nombreReprestante.
     * @param nombreReprestante - El valor de nombreReprestante.
     */
    public setNombreReprestante(nombreReprestante: string) {
        this.update((state) => ({
            ...state,
            nombreReprestante,
        }));
    }
    /**
     * Establece el estado de apellidoPaterno.
     * @param apellidoPaterno - El valor de apellidoPaterno.
     */
    public setApellidoPaterno(apellidoPaterno: string) {
        this.update((state) => ({
            ...state,
            apellidoPaterno,
        }));
    }

    /**
     * Establece el estado de apellidoMaterno.
     * @param apellidoMaterno - El valor de apellidoMaterno.
     */
    public setApellidoMaterno(apellidoMaterno: string) {
        this.update((state) => ({
            ...state,
            apellidoMaterno,
        }));
    }

    /**
     * Establece el estado de cuidad.
     * @param cuidad - El valor de cuidad.
     */
    public setCuidad(cuidad: string) {
        this.update((state) => ({
            ...state,
            cuidad,
        }));
    }

    /**
     * Establece el estado de cargo.
     * @param cargo - El valor de cargo.
     */
    public setCargo(cargo: string) {
        this.update((state) => ({
            ...state,
            cargo,
        }));
    }

    /**
     * Establece el estado de telefonoReprestantante.
     * @param telefonoReprestantante - El valor de telefonoReprestantante.
     */
    public setTelefonoReprestantante(telefonoReprestantante: string) {
        this.update((state) => ({
            ...state,
            telefonoReprestantante,
        }));
    }

    /**
     * Establece el estado de correoReprestantante.
     * @param correoReprestantante - El valor de correoReprestantante.
     */
    public setCorreoReprestantante(correoReprestantante: string) {
        this.update((state) => ({
            ...state,
            correoReprestantante,
        }));
    }

    /**
     * Establece el estado de suplente.
     * @param suplente - El valor de suplente.
     */
    public setSuplente(suplente: string) {
        this.update((state) => ({
            ...state,
            suplente,
        }));
    }
    /**
     * Establece el estado de tipoDocumento.
     * @param tipoDocumento - El valor de tipoDocumento.
     */
    public setTipoDocumento(tipoDocumento: string) {
        this.update((state) => ({
            ...state,
            tipoDocumento,
        }));
    }
}
