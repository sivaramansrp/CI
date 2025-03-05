import {
  Personas,
  ResponsablesDespacho,
} from '@ng-mf/data-access-user';

import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

export interface Solicitud31601State {
    autorizacionIVAIEPS:string,
    regimen_0:boolean,
    regimen_1:boolean,
    regimen_2:boolean,
    regimen_3:boolean,
    sectorProductivo:string,
    servicio:string,
    preOperativo:boolean,
    indiqueSi:boolean,
    senale:boolean,
    empPropios:string,
    bimestre:string,
    senaleSi:boolean,
    seMomento:boolean,
    cumplir:boolean,
    indique:boolean,
    encuentra:boolean,
    delMismo:boolean,
    senaleMomento:boolean,
    enCaso:boolean,
    comboBimestresIDCSeleccione:string,
    ingresar:boolean,
    encuentraSus:boolean,
    registrosQue:string,
    registrosQue2:string,
    momentoIngresar:boolean,
    indiqueCuenta:boolean,
    nombreDel:string,
    lugarDeRadicacion:string,
    contabilidad:boolean,
    rmfRadio:boolean,
    vinculacionRegistroCancelado:boolean,
    proveedoresListadoSAT:boolean,
    indiqueCheck:boolean,

    resigtro:string,
    telefono:string,
    correo:string,

    manifieste:string,
    indiqueIva:string,
    empleados:boolean,
    infraestructura:boolean,
    monto:boolean,
    antiguedad:boolean,
    tipoDe: string,
    valorPesos: string,
    descripcion: string,
    haContado:string,
    enCasoIva:string,
    numeroOperacion:string,
    banco:string,
    llavePago:string
}

export function createInitialState(): Solicitud31601State {
    return {
        autorizacionIVAIEPS:'',
        regimen_0:false,
        regimen_1:false,
        regimen_2:false,
        regimen_3:false,
        sectorProductivo:'',
        servicio:'',
        preOperativo:false,
        indiqueSi:false,
        senale:false,
        empPropios:'',
        bimestre:'',
        senaleSi:false,
        seMomento:false,
        cumplir:false,
        indique:false,
        encuentra:false,
        delMismo:false,
        senaleMomento:false,
        enCaso:false,
        comboBimestresIDCSeleccione:'',
        ingresar:false,
        encuentraSus:false,
        registrosQue:'',
        registrosQue2:'',
        momentoIngresar:false,
        indiqueCuenta:false,
        nombreDel:'',
        lugarDeRadicacion:'',
        contabilidad:false,
        rmfRadio:false,
        vinculacionRegistroCancelado:false,
        proveedoresListadoSAT:false,
        indiqueCheck:false,
        
        resigtro:'HEUE780514BVA',
        telefono:'56457970',
        correo:'VUCEMcbp@vuem2_5@hotmail.com.com',

        manifieste:'Si',
        indiqueIva:'Si',
        empleados:false,
        infraestructura:false,
        monto:false,
        antiguedad:false,
        tipoDe: '',
        valorPesos: '',
        descripcion: '',
        haContado:'Si',
        enCasoIva:'Si',
        numeroOperacion:'OP456',
        banco:'',
        llavePago:'PAY789'
    };
  }

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite31601', resettable: true })

export class Tramite31601Store extends Store<Solicitud31601State>{
    constructor() {
        super(createInitialState());
    }
    public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string) {
    this.update((state) => ({
        ...state,
        autorizacionIVAIEPS,
    }));
    }
    public setRegimen_0(regimen_0: boolean) {
    this.update((state) => ({
        ...state,
        regimen_0,
    }));
    }
    public setRegimen_1(regimen_1: boolean) {
    this.update((state) => ({
        ...state,
        regimen_1,
    }));
    }
    public setRegimen_2(regimen_2: boolean) {
    this.update((state) => ({
        ...state,
        regimen_2,
    }));
    }
    public setRegimen_3(regimen_3: boolean) {
    this.update((state) => ({
        ...state,
        regimen_3,
    }));
    }
    public setSectorProductivo(sectorProductivo: string) {
    this.update((state) => ({
        ...state,
        sectorProductivo,
    }));
    }
    public setServicio(servicio: string) {
    this.update((state) => ({
        ...state,
        servicio,
    }));
    }
    public setPreOperativo(preOperativo: boolean) {
    this.update((state) => ({
        ...state,
        preOperativo,
    }));
    }
    public setIndiqueSi(indiqueSi: boolean) {
    this.update((state) => ({
        ...state,
        indiqueSi,
    }));
    }
    public setSenale(senale: boolean) {
    this.update((state) => ({
        ...state,
        senale,
    }));
    }
    public setEmpPropios(empPropios: string) {
    this.update((state) => ({
        ...state,
        empPropios,
    }));
    }
    public setBimestre(bimestre: string) {
    this.update((state) => ({
        ...state,
        bimestre,
    }));
    }
    public setSenaleSi(senaleSi: boolean) {
    this.update((state) => ({
        ...state,
        senaleSi,
    }));
    }
    public setSeMomento(seMomento: boolean) {
    this.update((state) => ({
        ...state,
        seMomento,
    }));
    }
    public setCumplir(cumplir: boolean) {
    this.update((state) => ({
        ...state,
        cumplir,
    }));
    }
    public setIndique(indique: boolean) {
    this.update((state) => ({
        ...state,
        indique,
    }));
    }
    public setEncuentra(encuentra: boolean) {
    this.update((state) => ({
        ...state,
        encuentra,
    }));
    }
    public setDelMismo(delMismo: boolean) {
    this.update((state) => ({
        ...state,
        delMismo,
    }));
    }
    public setSenaleMomento(senaleMomento: boolean) {
    this.update((state) => ({
        ...state,
        senaleMomento,
    }));
    }
    public setEnCaso(enCaso: boolean) {
    this.update((state) => ({
        ...state,
        enCaso,
    }));
    }
    public setComboBimestresIDCSeleccione(comboBimestresIDCSeleccione: string) {
    this.update((state) => ({
        ...state,
        comboBimestresIDCSeleccione,
    }));
    }
    public setIngresar(ingresar: boolean) {
    this.update((state) => ({
        ...state,
        ingresar,
    }));
    }
    public setEncuentraSus(encuentraSus: boolean) {
    this.update((state) => ({
        ...state,
        encuentraSus,
    }));
    }
    public setRegistrosQue(registrosQue: string) {
    this.update((state) => ({
        ...state,
        registrosQue,
    }));
    }
    public setRegistrosQue2(registrosQue2: string) {
    this.update((state) => ({
        ...state,
        registrosQue2,
    }));
    }
    public setMomentoIngresar(momentoIngresar: boolean) {
    this.update((state) => ({
        ...state,
        momentoIngresar,
    }));
    }
    public setIndiqueCuenta(indiqueCuenta: boolean) {
    this.update((state) => ({
        ...state,
        indiqueCuenta,
    }));
    }
    public setNombreDel(nombreDel: string) {
    this.update((state) => ({
        ...state,
        nombreDel,
    }));
    }
    public setLugarDeRadicacion(lugarDeRadicacion: string) {
    this.update((state) => ({
        ...state,
        lugarDeRadicacion,
    }));
    }
    public setContabilidad(contabilidad: boolean) {
    this.update((state) => ({
        ...state,
        contabilidad,
    }));
    }
    public setRmfRadio(rmfRadio: boolean) {
    this.update((state) => ({
        ...state,
        rmfRadio,
    }));
    }
    public setVinculacionRegistroCancelado(vinculacionRegistroCancelado: boolean) {
    this.update((state) => ({
        ...state,
        vinculacionRegistroCancelado,
    }));
    }
    public setProveedoresListadoSAT(proveedoresListadoSAT: boolean) {
    this.update((state) => ({
        ...state,
        proveedoresListadoSAT,
    }));
    }
    public setIndiqueCheck(indiqueCheck: boolean) {
    this.update((state) => ({
        ...state,
        indiqueCheck,
    }));
    }

    public setResigtro(resigtro: string) {
    this.update((state) => ({
        ...state,
        resigtro,
    }));
    }
    public setTelefono(telefono: string) {
        this.update((state) => ({
        ...state,
        telefono,
        }));
    }
    public setCorreo(correo: string) {
        this.update((state) => ({
        ...state,
        correo,
        }));
    }
    public setManifieste(manifieste: string) {
        this.update((state) => ({
            ...state,
            manifieste,
        }));
    }
    public setIndiqueIva(indiqueIva: string) {
        this.update((state) => ({
            ...state,
            indiqueIva,
        }));
    }
    public setEmpleados(empleados: boolean) {
        this.update((state) => ({
            ...state,
            empleados,
        }));
    }
    public setInfraestructura(infraestructura: boolean) {
        this.update((state) => ({
            ...state,
            infraestructura,
        }));
    }
    public setMonto(monto: boolean) {
        this.update((state) => ({
            ...state,
            monto,
        }));
    }
    public setAntiguedad(antiguedad: boolean) {
        this.update((state) => ({
            ...state,
            antiguedad,
        }));
    }
    public setTipoDe(tipoDe: string) {
        this.update((state) => ({
            ...state,
            tipoDe,
        }));
    }
    public setValorPesos(valorPesos: string) {
        this.update((state) => ({
            ...state,
            valorPesos,
        }));
    }
    public setDescripcion(descripcion: string) {
        this.update((state) => ({
            ...state,
            descripcion,
        }));
    }
    public setHaContado(haContado: string) {
        this.update((state) => ({
            ...state,
            haContado,
        }));
    }
    public setEnCasoIva(enCasoIva: string) {
        this.update((state) => ({
            ...state,
            enCasoIva,
        }));
    }
    public setNumeroOperacion(numeroOperacion: string) {
        this.update((state) => ({
            ...state,
            numeroOperacion,
        }));
    }
    public setBanco(banco: string) {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }
    public setLlavePago(llavePago: string) {
        this.update((state) => ({
            ...state,
            llavePago,
        }));
    }
} 
  