import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interface representing the state of Solicitud31601.
 */
export interface Solicitud31601State {
    /**
     * The autorizacionIVAIEPS value.
     */
    autorizacionIVAIEPS: string;
    
    /**
     * The regimen_0 value.
     */
    regimen_0: boolean;
    
    /**
     * The regimen_1 value.
     */
    regimen_1: boolean;
    
    /**
     * The regimen_2 value.
     */
    regimen_2: boolean;
    
    /**
     * The regimen_3 value.
     */
    regimen_3: boolean;
    
    /**
     * The sectorProductivo value.
     */
    sectorProductivo: string;
    
    /**
     * The servicio value.
     */
    servicio: string;
    
    /**
     * The preOperativo value.
     */
    preOperativo: boolean;
    
    /**
     * The indiqueSi value.
     */
    indiqueSi: boolean;
    
    /**
     * The senale value.
     */
    senale: boolean;
    
    /**
     * The empPropios value.
     */
    empPropios: string;
    
    /**
     * The bimestre value.
     */
    bimestre: string;
    
    /**
     * The senaleSi value.
     */
    senaleSi: boolean;
    
    /**
     * The seMomento value.
     */
    seMomento: boolean;
    
    /**
     * The cumplir value.
     */
    cumplir: boolean;
    
    /**
     * The indique value.
     */
    indique: boolean;
    
    /**
     * The encuentra value.
     */
    encuentra: boolean;
    
    /**
     * The delMismo value.
     */
    delMismo: boolean;
    
    /**
     * The senaleMomento value.
     */
    senaleMomento: boolean;
    
    /**
     * The enCaso value.
     */
    enCaso: boolean;
    
    /**
     * The comboBimestresIDCSeleccione value.
     */
    comboBimestresIDCSeleccione: string;
    
    /**
     * The ingresar value.
     */
    ingresar: boolean;
    
    /**
     * The encuentraSus value.
     */
    encuentraSus: boolean;
    
    /**
     * The registrosQue value.
     */
    registrosQue: string;
    
    /**
     * The registrosQue2 value.
     */
    registrosQue2: string;
    
    /**
     * The momentoIngresar value.
     */
    momentoIngresar: boolean;
    
    /**
     * The indiqueCuenta value.
     */
    indiqueCuenta: boolean;
    
    /**
     * The nombreDel value.
     */
    nombreDel: string;
    
    /**
     * The lugarDeRadicacion value.
     */
    lugarDeRadicacion: string;
    
    /**
     * The contabilidad value.
     */
    contabilidad: boolean;
    
    /**
     * The rmfRadio value.
     */
    rmfRadio: boolean;
    
    /**
     * The vinculacionRegistroCancelado value.
     */
    vinculacionRegistroCancelado: boolean;
    
    /**
     * The proveedoresListadoSAT value.
     */
    proveedoresListadoSAT: boolean;
    
    /**
     * The indiqueCheck value.
     */
    indiqueCheck: boolean;
    
    /**
     * The resigtro value.
     */
    resigtro: string;
    
    /**
     * The telefono value.
     */
    telefono: string;
    
    /**
     * The correo value.
     */
    correo: string;
    
    /**
     * The manifieste value.
     */
    manifieste: string;
    
    /**
     * The indiqueIva value.
     */
    indiqueIva: string;
    
    /**
     * The empleados value.
     */
    empleados: boolean;
    
    /**
     * The infraestructura value.
     */
    infraestructura: boolean;
    
    /**
     * The monto value.
     */
    monto: boolean;
    
    /**
     * The antiguedad value.
     */
    antiguedad: boolean;
    
    /**
     * The tipoDe value.
     */
    tipoDe: string;
    
    /**
     * The valorPesos value.
     */
    valorPesos: string;
    
    /**
     * The descripcion value.
     */
    descripcion: string;
    
    /**
     * The haContado value.
     */
    haContado: string;
    
    /**
     * The enCasoIva value.
     */
    enCasoIva: string;
    
    /**
     * The numeroOperacion value.
     */
    numeroOperacion: string;
    
    /**
     * The banco value.
     */
    banco: string;
    
    /**
     * The llavePago value.
     */
    llavePago: string;
    
    /**
     * The importaciones value.
     */
    importaciones: string;
    
    /**
     * The infraestructuraIndique value.
     */
    infraestructuraIndique: string;
    
    /**
     * The ultimosMeses value.
     */
    ultimosMeses: string;
    
    /**
     * The operacionesmeses value.
     */
    operacionesmeses: string;
    
    /**
     * The valor value.
     */
    valor: string;
    
    /**
     * The transferencias value.
     */
    transferencias: number;
    
    /**
     * The transferenciasVir value.
     */
    transferenciasVir: number;
    
    /**
     * The retornos value.
     */
    retornos: number;
    
    /**
     * The retornosSe value.
     */
    retornosSe: number;
    
    /**
     * The constancias value.
     */
    constancias: number;
    
    /**
     * The constanciasDe value.
     */
    constanciasDe: number;
    
    /**
     * The empleadosPropios value.
     */
    empleadosPropios: string;
    
    /**
     * The numeroEmpleados value.
     */
    numeroEmpleados: number;
    
    /**
     * The numeroEmpleadosDos value.
     */
    numeroEmpleadosDos: number;
    
    /**
     * The numeroEmpleadosTres value.
     */
    numeroEmpleadosTres: number;
    
    /**
     * The comboBimestresUno value.
     */
    comboBimestresUno: string;
    
    /**
     * The comboBimestresDos value.
     */
    comboBimestresDos: string;
    
    /**
     * The comboBimestresTres value.
     */
    comboBimestresTres: string;
    
    /**
     * The proveedorCumplimiento value.
     */
    proveedorCumplimiento: string;
    
    /**
     * The declaracionISR value.
     */
    declaracionISR: string;
    
    /**
     * The cancelacion value.
     */
    cancelacion: string;
    
    /**
     * The cumplimientoReglas value.
     */
    cumplimientoReglas: string;
    
    /**
     * The recintoFiscalizado value.
     */
    recintoFiscalizado: string;
    
    /**
     * The recintoEstrategico value.
     */
    recintoEstrategico: string;
    
    /**
     * The cumplimientoLineamientos value.
     */
    cumplimientoLineamientos: string;
}
/**
 * Function to create the initial state of Solicitud31601.
 * @returns {Solicitud31601State} The initial state of Solicitud31601.
 */
export function createInitialState(): Solicitud31601State {
    return {
        /**
         * The autorizacionIVAIEPS value.
         */
        autorizacionIVAIEPS: '',
        
        /**
         * The regimen_0 value.
         */
        regimen_0: false,
        
        /**
         * The regimen_1 value.
         */
        regimen_1: false,
        
        /**
         * The regimen_2 value.
         */
        regimen_2: false,
        
        /**
         * The regimen_3 value.
         */
        regimen_3: false,
        
        /**
         * The sectorProductivo value.
         */
        sectorProductivo: '',
        
        /**
         * The servicio value.
         */
        servicio: '',
        
        /**
         * The preOperativo value.
         */
        preOperativo: false,
        
        /**
         * The indiqueSi value.
         */
        indiqueSi: false,
        
        /**
         * The senale value.
         */
        senale: false,
        
        /**
         * The empPropios value.
         */
        empPropios: '',
        
        /**
         * The bimestre value.
         */
        bimestre: '',
        
        /**
         * The senaleSi value.
         */
        senaleSi: false,
        
        /**
         * The seMomento value.
         */
        seMomento: false,
        
        /**
         * The cumplir value.
         */
        cumplir: false,
        
        /**
         * The indique value.
         */
        indique: false,
        
        /**
         * The encuentra value.
         */
        encuentra: false,
        
        /**
         * The delMismo value.
         */
        delMismo: false,
        
        /**
         * The senaleMomento value.
         */
        senaleMomento: false,
        
        /**
         * The enCaso value.
         */
        enCaso: false,
        
        /**
         * The comboBimestresIDCSeleccione value.
         */
        comboBimestresIDCSeleccione: '',
        
        /**
         * The ingresar value.
         */
        ingresar: false,
        
        /**
         * The encuentraSus value.
         */
        encuentraSus: false,
        
        /**
         * The registrosQue value.
         */
        registrosQue: '',
        
        /**
         * The registrosQue2 value.
         */
        registrosQue2: '',
        
        /**
         * The momentoIngresar value.
         */
        momentoIngresar: false,
        
        /**
         * The indiqueCuenta value.
         */
        indiqueCuenta: false,
        
        /**
         * The nombreDel value.
         */
        nombreDel: '',
        
        /**
         * The lugarDeRadicacion value.
         */
        lugarDeRadicacion: '',
        
        /**
         * The contabilidad value.
         */
        contabilidad: false,
        
        /**
         * The rmfRadio value.
         */
        rmfRadio: false,
        
        /**
         * The vinculacionRegistroCancelado value.
         */
        vinculacionRegistroCancelado: false,
        
        /**
         * The proveedoresListadoSAT value.
         */
        proveedoresListadoSAT: false,
        
        /**
         * The indiqueCheck value.
         */
        indiqueCheck: false,
        
        /**
         * The resigtro value.
         */
        resigtro: 'HEUE780514BVA',
        
        /**
         * The telefono value.
         */
        telefono: '56457970',
        
        /**
         * The correo value.
         */
        correo: 'VUCEMcbp@vuem2_5@hotmail.com.com',
        
        /**
         * The manifieste value.
         */
        manifieste: 'Si',
        
        /**
         * The indiqueIva value.
         */
        indiqueIva: 'Si',
        
        /**
         * The empleados value.
         */
        empleados: false,
        
        /**
         * The infraestructura value.
         */
        infraestructura: false,
        
        /**
         * The monto value.
         */
        monto: false,
        
        /**
         * The antiguedad value.
         */
        antiguedad: false,
        
        /**
         * The tipoDe value.
         */
        tipoDe: '',
        
        /**
         * The valorPesos value.
         */
        valorPesos: '',
        
        /**
         * The descripcion value.
         */
        descripcion: '',
        
        /**
         * The haContado value.
         */
        haContado: 'Si',
        
        /**
         * The enCasoIva value.
         */
        enCasoIva: 'Si',
        
        /**
         * The numeroOperacion value.
         */
        numeroOperacion: 'OP456',
        
        /**
         * The banco value.
         */
        banco: '',
        
        /**
         * The llavePago value.
         */
        llavePago: 'PAY789',
        
        /**
         * The importaciones value.
         */
        importaciones: 'Yes',
        
        /**
         * The infraestructuraIndique value.
         */
        infraestructuraIndique: 'Yes',
        
        /**
         * The ultimosMeses value.
         */
        ultimosMeses: 'Yes',
        
        /**
         * The operacionesmeses value.
         */
        operacionesmeses: 'Yes',
        
        /**
         * The valor value.
         */
        valor: '',
        
        /**
         * The transferencias value.
         */
        transferencias: 80,
        
        /**
         * The transferenciasVir value.
         */
        transferenciasVir: 80,
        
        /**
         * The retornos value.
         */
        retornos: 10,
        
        /**
         * The retornosSe value.
         */
        retornosSe: 10,
        
        /**
         * The constancias value.
         */
        constancias: 10,
        
        /**
         * The constanciasDe value.
         */
        constanciasDe: 10,
        
        /**
         * The empleadosPropios value.
         */
        empleadosPropios: 'Yes',
        
        /**
         * The numeroEmpleados value.
         */
        numeroEmpleados: 1,
        
        /**
         * The numeroEmpleadosDos value.
         */
        numeroEmpleadosDos: 1,
        
        /**
         * The numeroEmpleadosTres value.
         */
        numeroEmpleadosTres: 1,
        
        /**
         * The comboBimestresUno value.
         */
        comboBimestresUno: '',
        
        /**
         * The comboBimestresDos value.
         */
        comboBimestresDos: '',
        
        /**
         * The comboBimestresTres value.
         */
        comboBimestresTres: '',
        
        /**
         * The proveedorCumplimiento value.
         */
        proveedorCumplimiento: 'Yes',
        
        /**
         * The declaracionISR value.
         */
        declaracionISR: 'Yes',
        
        /**
         * The cancelacion value.
         */
        cancelacion: 'Yes',
        
        /**
         * The cumplimientoReglas value.
         */
        cumplimientoReglas: 'Yes',
        
        /**
         * The recintoFiscalizado value.
         */
        recintoFiscalizado: 'Yes',
        
        /**
         * The recintoEstrategico value.
         */
        recintoEstrategico: 'Yes',
        
        /**
         * The cumplimientoLineamientos value.
         */
        cumplimientoLineamientos: 'Yes'
    };
}

 /**
 * Injectable decorator to make the store available at the root level.
 */
@Injectable({
    providedIn: 'root',
})
/**
 * StoreConfig decorator to configure the store with a name and resettable option.
 * @param {Object} config - The configuration object.
 * @param {string} config.name - The name of the store.
 * @param {boolean} config.resettable - Indicates if the store is resettable.
 */
@StoreConfig({ name: 'tramite31601', resettable: true })

export class Tramite31601Store extends Store<Solicitud31601State>{
    /**
     * Creates an instance of Tramite31601Store.
     * Initializes the store with the initial state.
     */
    constructor() {
        super(createInitialState());
    }
    /**
     * Sets the autorizacionIVAIEPS state.
     * @param autorizacionIVAIEPS - The autorizacionIVAIEPS value.
     */
    public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string) {
        this.update((state) => ({
            ...state,
            autorizacionIVAIEPS,
        }));
    }

    /**
     * Sets the regimen_0 state.
     * @param regimen_0 - The regimen_0 value.
     */
    public setRegimen_0(regimen_0: boolean) {
        this.update((state) => ({
            ...state,
            regimen_0,
        }));
    }

    /**
     * Sets the regimen_1 state.
     * @param regimen_1 - The regimen_1 value.
     */
    public setRegimen_1(regimen_1: boolean) {
        this.update((state) => ({
            ...state,
            regimen_1,
        }));
    }

    /**
     * Sets the regimen_2 state.
     * @param regimen_2 - The regimen_2 value.
     */
    public setRegimen_2(regimen_2: boolean) {
        this.update((state) => ({
            ...state,
            regimen_2,
        }));
    }

    /**
     * Sets the regimen_3 state.
     * @param regimen_3 - The regimen_3 value.
     */
    public setRegimen_3(regimen_3: boolean) {
        this.update((state) => ({
            ...state,
            regimen_3,
        }));
    }

    /**
     * Sets the sectorProductivo state.
     * @param sectorProductivo - The sectorProductivo value.
     */
    public setSectorProductivo(sectorProductivo: string) {
        this.update((state) => ({
            ...state,
            sectorProductivo,
        }));
    }

    /**
     * Sets the servicio state.
     * @param servicio - The servicio value.
     */
    public setServicio(servicio: string) {
        this.update((state) => ({
            ...state,
            servicio,
        }));
    }

    /**
     * Sets the preOperativo state.
     * @param preOperativo - The preOperativo value.
     */
    public setPreOperativo(preOperativo: boolean) {
        this.update((state) => ({
            ...state,
            preOperativo,
        }));
    }

    /**
     * Sets the indiqueSi state.
     * @param indiqueSi - The indiqueSi value.
     */
    public setIndiqueSi(indiqueSi: boolean) {
        this.update((state) => ({
            ...state,
            indiqueSi,
        }));
    }

    /**
     * Sets the senale state.
     * @param senale - The senale value.
     */
    public setSenale(senale: boolean) {
        this.update((state) => ({
            ...state,
            senale,
        }));
    }

    /**
     * Sets the empPropios state.
     * @param empPropios - The empPropios value.
     */
    public setEmpPropios(empPropios: string) {
        this.update((state) => ({
            ...state,
            empPropios,
        }));
    }

    /**
     * Sets the bimestre state.
     * @param bimestre - The bimestre value.
     */
    public setBimestre(bimestre: string) {
        this.update((state) => ({
            ...state,
            bimestre,
        }));
    }

    /**
     * Sets the senaleSi state.
     * @param senaleSi - The senaleSi value.
     */
    public setSenaleSi(senaleSi: boolean) {
        this.update((state) => ({
            ...state,
            senaleSi,
        }));
    }

    /**
     * Sets the seMomento state.
     * @param seMomento - The seMomento value.
     */
    public setSeMomento(seMomento: boolean) {
        this.update((state) => ({
            ...state,
            seMomento,
        }));
    }

    /**
     * Sets the cumplir state.
     * @param cumplir - The cumplir value.
     */
    public setCumplir(cumplir: boolean) {
        this.update((state) => ({
            ...state,
            cumplir,
        }));
    }

    /**
     * Sets the indique state.
     * @param indique - The indique value.
     */
    public setIndique(indique: boolean) {
        this.update((state) => ({
            ...state,
            indique,
        }));
    }

    /**
     * Sets the encuentra state.
     * @param encuentra - The encuentra value.
     */
    public setEncuentra(encuentra: boolean) {
        this.update((state) => ({
            ...state,
            encuentra,
        }));
    }

    /**
     * Sets the delMismo state.
     * @param delMismo - The delMismo value.
     */
    public setDelMismo(delMismo: boolean) {
        this.update((state) => ({
            ...state,
            delMismo,
        }));
    }

    /**
     * Sets the senaleMomento state.
     * @param senaleMomento - The senaleMomento value.
     */
    public setSenaleMomento(senaleMomento: boolean) {
        this.update((state) => ({
            ...state,
            senaleMomento,
        }));
    }

    /**
     * Sets the enCaso state.
     * @param enCaso - The enCaso value.
     */
    public setEnCaso(enCaso: boolean) {
        this.update((state) => ({
            ...state,
            enCaso,
        }));
    }

    /**
     * Sets the comboBimestresIDCSeleccione state.
     * @param comboBimestresIDCSeleccione - The comboBimestresIDCSeleccione value.
     */
    public setComboBimestresIDCSeleccione(comboBimestresIDCSeleccione: string) {
        this.update((state) => ({
            ...state,
            comboBimestresIDCSeleccione,
        }));
    }

    /**
     * Sets the ingresar state.
     * @param ingresar - The ingresar value.
     */
    public setIngresar(ingresar: boolean) {
        this.update((state) => ({
            ...state,
            ingresar,
        }));
    }

    /**
     * Sets the encuentraSus state.
     * @param encuentraSus - The encuentraSus value.
     */
    public setEncuentraSus(encuentraSus: boolean) {
        this.update((state) => ({
            ...state,
            encuentraSus,
        }));
    }

    /**
     * Sets the registrosQue state.
     * @param registrosQue - The registrosQue value.
     */
    public setRegistrosQue(registrosQue: string) {
        this.update((state) => ({
            ...state,
            registrosQue,
        }));
    }

    /**
     * Sets the registrosQue2 state.
     * @param registrosQue2 - The registrosQue2 value.
     */
    public setRegistrosQue2(registrosQue2: string) {
        this.update((state) => ({
            ...state,
            registrosQue2,
        }));
    }

    /**
     * Sets the momentoIngresar state.
     * @param momentoIngresar - The momentoIngresar value.
     */
    public setMomentoIngresar(momentoIngresar: boolean) {
        this.update((state) => ({
            ...state,
            momentoIngresar,
        }));
    }

    /**
     * Sets the indiqueCuenta state.
     * @param indiqueCuenta - The indiqueCuenta value.
     */
    public setIndiqueCuenta(indiqueCuenta: boolean) {
        this.update((state) => ({
            ...state,
            indiqueCuenta,
        }));
    }

    /**
     * Sets the nombreDel state.
     * @param nombreDel - The nombreDel value.
     */
    public setNombreDel(nombreDel: string) {
        this.update((state) => ({
            ...state,
            nombreDel,
        }));
    }

    /**
     * Sets the lugarDeRadicacion state.
     * @param lugarDeRadicacion - The lugarDeRadicacion value.
     */
    public setLugarDeRadicacion(lugarDeRadicacion: string) {
        this.update((state) => ({
            ...state,
            lugarDeRadicacion,
        }));
    }

    /**
     * Sets the contabilidad state.
     * @param contabilidad - The contabilidad value.
     */
    public setContabilidad(contabilidad: boolean) {
        this.update((state) => ({
            ...state,
            contabilidad,
        }));
    }

    /**
     * Sets the rmfRadio state.
     * @param rmfRadio - The rmfRadio value.
     */
    public setRmfRadio(rmfRadio: boolean) {
        this.update((state) => ({
            ...state,
            rmfRadio,
        }));
    }

    /**
     * Sets the vinculacionRegistroCancelado state.
     * @param vinculacionRegistroCancelado - The vinculacionRegistroCancelado value.
     */
    public setVinculacionRegistroCancelado(vinculacionRegistroCancelado: boolean) {
        this.update((state) => ({
            ...state,
            vinculacionRegistroCancelado,
        }));
    }

    /**
     * Sets the proveedoresListadoSAT state.
     * @param proveedoresListadoSAT - The proveedoresListadoSAT value.
     */
    public setProveedoresListadoSAT(proveedoresListadoSAT: boolean) {
        this.update((state) => ({
            ...state,
            proveedoresListadoSAT,
        }));
    }

    /**
     * Sets the indiqueCheck state.
     * @param indiqueCheck - The indiqueCheck value.
     */
    public setIndiqueCheck(indiqueCheck: boolean) {
        this.update((state) => ({
            ...state,
            indiqueCheck,
        }));
    }

    /**
     * Sets the resigtro state.
     * @param resigtro - The resigtro value.
     */
    public setResigtro(resigtro: string) {
        this.update((state) => ({
            ...state,
            resigtro,
        }));
    }

    /**
     * Sets the telefono state.
     * @param telefono - The telefono value.
     */
    public setTelefono(telefono: string) {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }

    /**
     * Sets the correo state.
     * @param correo - The correo value.
     */
    public setCorreo(correo: string) {
        this.update((state) => ({
            ...state,
            correo,
        }));
    }

    /**
     * Sets the manifieste state.
     * @param manifieste - The manifieste value.
     */
    public setManifieste(manifieste: string) {
        this.update((state) => ({
            ...state,
            manifieste,
        }));
    }

    /**
     * Sets the indiqueIva state.
     * @param indiqueIva - The indiqueIva value.
     */
    public setIndiqueIva(indiqueIva: string) {
        this.update((state) => ({
            ...state,
            indiqueIva,
        }));
    }

    /**
     * Sets the empleados state.
     * @param empleados - The empleados value.
     */
    public setEmpleados(empleados: boolean) {
        this.update((state) => ({
            ...state,
            empleados,
        }));
    }

    /**
     * Sets the infraestructura state.
     * @param infraestructura - The infraestructura value.
     */
    public setInfraestructura(infraestructura: boolean) {
        this.update((state) => ({
            ...state,
            infraestructura,
        }));
    }

    /**
     * Sets the monto state.
     * @param monto - The monto value.
     */
    public setMonto(monto: boolean) {
        this.update((state) => ({
            ...state,
            monto,
        }));
    }

    /**
     * Sets the antiguedad state.
     * @param antiguedad - The antiguedad value.
     */
    public setAntiguedad(antiguedad: boolean) {
        this.update((state) => ({
            ...state,
            antiguedad,
        }));
    }

    /**
     * Sets the tipoDe state.
     * @param tipoDe - The tipoDe value.
     */
    public setTipoDe(tipoDe: string) {
        this.update((state) => ({
            ...state,
            tipoDe,
        }));
    }

    /**
     * Sets the valorPesos state.
     * @param valorPesos - The valorPesos value.
     */
    public setValorPesos(valorPesos: string) {
        this.update((state) => ({
            ...state,
            valorPesos,
        }));
    }

    /**
     * Sets the descripcion state.
     * @param descripcion - The descripcion value.
     */
    public setDescripcion(descripcion: string) {
        this.update((state) => ({
            ...state,
            descripcion,
        }));
    }

    /**
     * Sets the haContado state.
     * @param haContado - The haContado value.
     */
    public setHaContado(haContado: string) {
        this.update((state) => ({
            ...state,
            haContado,
        }));
    }

    /**
     * Sets the enCasoIva state.
     * @param enCasoIva - The enCasoIva value.
     */
    public setEnCasoIva(enCasoIva: string) {
        this.update((state) => ({
            ...state,
            enCasoIva,
        }));
    }

    /**
     * Sets the numeroOperacion state.
     * @param numeroOperacion - The numeroOperacion value.
     */
    public setNumeroOperacion(numeroOperacion: string) {
        this.update((state) => ({
            ...state,
            numeroOperacion,
        }));
    }

    /**
     * Sets the banco state.
     * @param banco - The banco value.
     */
    public setBanco(banco: string) {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }

    /**
     * Sets the llavePago state.
     * @param llavePago - The llavePago value.
     */
    public setLlavePago(llavePago: string) {
        this.update((state) => ({
            ...state,
            llavePago,
        }));
    }

    /**
     * Sets the importaciones state.
     * @param importaciones - The importaciones value.
     */
    public setImportaciones(importaciones: string) {
        this.update((state) => ({
            ...state,
            importaciones,
        }));
    }

    /**
     * Sets the infraestructuraIndique state.
     * @param infraestructuraIndique - The infraestructuraIndique value.
     */
    public setInfraestructuraIndique(infraestructuraIndique: string) {
        this.update((state) => ({
            ...state,
            infraestructuraIndique,
        }));
    }

    /**
     * Sets the ultimosMeses state.
     * @param ultimosMeses - The ultimosMeses value.
     */
    public setUltimosMeses(ultimosMeses: string) {
        this.update((state) => ({
            ...state,
            ultimosMeses,
        }));
    }

    /**
     * Sets the operacionesmeses state.
     * @param operacionesmeses - The operacionesmeses value.
     */
    public setOperacionesmeses(operacionesmeses: string) {
        this.update((state) => ({
            ...state,
            operacionesmeses,
        }));
    }

    /**
     * Sets the valor state.
     * @param valor - The valor value.
     */
    public setValor(valor: string) {
        this.update((state) => ({
            ...state,
            valor,
        }));
    }

    /**
     * Sets the transferencias state.
     * @param transferencias - The transferencias value.
     */
    public setTransferencias(transferencias: number) {
        this.update((state) => ({
            ...state,
            transferencias,
        }));
    }

    /**
     * Sets the transferenciasVir state.
     * @param transferenciasVir - The transferenciasVir value.
     */
    public setTransferenciasVir(transferenciasVir: number) {
        this.update((state) => ({
            ...state,
            transferenciasVir,
        }));
    }

    /**
     * Sets the retornos state.
     * @param retornos - The retornos value.
     */
    public setRetornos(retornos: number) {
        this.update((state) => ({
            ...state,
            retornos,
        }));
    }

    /**
     * Sets the retornosSe state.
     * @param retornosSe - The retornosSe value.
     */
    public setRetornosSe(retornosSe: number) {
        this.update((state) => ({
            ...state,
            retornosSe,
        }));
    }

    /**
     * Sets the constancias state.
     * @param constancias - The constancias value.
     */
    public setConstancias(constancias: number) {
        this.update((state) => ({
            ...state,
            constancias,
        }));
    }

    /**
     * Sets the constanciasDe state.
     * @param constanciasDe - The constanciasDe value.
     */
    public setConstanciasDe(constanciasDe: number) {
        this.update((state) => ({
            ...state,
            constanciasDe,
        }));
    }

    /**
     * Sets the empleadosPropios state.
     * @param empleadosPropios - The empleadosPropios value.
     */
    public setEmpleadosPropios(empleadosPropios: string) {
        this.update((state) => ({
            ...state,
            empleadosPropios,
        }));
    }

    /**
     * Sets the numeroEmpleados state.
     * @param numeroEmpleados - The numeroEmpleados value.
     */
    public setNumeroEmpleados(numeroEmpleados: number) {
        this.update((state) => ({
            ...state,
            numeroEmpleados,
        }));
    }

    /**
     * Sets the numeroEmpleadosDos state.
     * @param numeroEmpleadosDos - The numeroEmpleadosDos value.
     */
    public setNumeroEmpleadosDos(numeroEmpleadosDos: number) {
        this.update((state) => ({
            ...state,
            numeroEmpleadosDos,
        }));
    }

    /**
     * Sets the numeroEmpleadosTres state.
     * @param numeroEmpleadosTres - The numeroEmpleadosTres value.
     */
    public setNumeroEmpleadosTres(numeroEmpleadosTres: number) {
        this.update((state) => ({
            ...state,
            numeroEmpleadosTres,
        }));
    }
    /**
 * Sets the comboBimestresUno state.
 * @param comboBimestresUno - The comboBimestresUno value.
 */
    public setComboBimestresUno(comboBimestresUno: string) {
        this.update((state) => ({
            ...state,
            comboBimestresUno,
        }));
    }

    /**
     * Sets the comboBimestresDos state.
     * @param comboBimestresDos - The comboBimestresDos value.
     */
    public setComboBimestresDos(comboBimestresDos: string) {
        this.update((state) => ({
            ...state,
            comboBimestresDos,
        }));
    }

    /**
     * Sets the comboBimestresTres state.
     * @param comboBimestresTres - The comboBimestresTres value.
     */
    public setComboBimestresTres(comboBimestresTres: string) {
        this.update((state) => ({
            ...state,
            comboBimestresTres,
        }));
    }

    /**
     * Sets the proveedorCumplimiento state.
     * @param proveedorCumplimiento - The proveedorCumplimiento value.
     */
    public setProveedorCumplimiento(proveedorCumplimiento: string) {
        this.update((state) => ({
            ...state,
            proveedorCumplimiento,
        }));
    }

    /**
     * Sets the declaracionISR state.
     * @param declaracionISR - The declaracionISR value.
     */
    public setDeclaracionISR(declaracionISR: string) {
        this.update((state) => ({
            ...state,
            declaracionISR,
        }));
    }

    /**
     * Sets the cancelacion state.
     * @param cancelacion - The cancelacion value.
     */
    public setCancelacion(cancelacion: string) {
        this.update((state) => ({
            ...state,
            cancelacion,
        }));
    }

    /**
     * Sets the cumplimientoReglas state.
     * @param cumplimientoReglas - The cumplimientoReglas value.
     */
    public setCumplimientoReglas(cumplimientoReglas: string) {
        this.update((state) => ({
            ...state,
            cumplimientoReglas,
        }));
    }

    /**
     * Sets the recintoFiscalizado state.
     * @param recintoFiscalizado - The recintoFiscalizado value.
     */
    public setRecintoFiscalizado(recintoFiscalizado: string) {
        this.update((state) => ({
            ...state,
            recintoFiscalizado,
        }));
    }

    /**
     * Sets the recintoEstrategico state.
     * @param recintoEstrategico - The recintoEstrategico value.
     */
    public setRecintoEstrategico(recintoEstrategico: string) {
        this.update((state) => ({
            ...state,
            recintoEstrategico,
        }));
    }

    /**
     * Sets the cumplimientoLineamientos state.
     * @param cumplimientoLineamientos - The cumplimientoLineamientos value.
     */
    public setCumplimientoLineamientos(cumplimientoLineamientos: string) {
        this.update((state) => ({
            ...state,
            cumplimientoLineamientos,
        }));
    }
} 
  