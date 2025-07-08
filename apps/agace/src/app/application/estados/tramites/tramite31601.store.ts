import { Store, StoreConfig } from '@datorama/akita';
import { EnlaceConfiguracionItem } from '../../tramites/31601/enum/enlance-tabla.enum';
import { Injectable } from '@angular/core';
import { MencioneConfiguracionItem } from '../../tramites/31601/enum/mencione-tabla.enum';

import { Antecesor } from '../../tramites/31601/modelos/antecesor.modal';
import { ControlInventariosItem } from '../../tramites/31601/models/models31601.model';

/**
 * Interfaz que representa el estado de Solicitud31601.
 */
export interface Solicitud31601State {
  nombreCompleto: string;
  tipoDePersonaMiembro: string;
  nombreMiembro: string;
  apellidoPaternoMiembro: string;
  apellidoMaternoMiembro: string;
  nombreDeLaEmpresaMiembro: string;
  miembrosSeleccionados: Antecesor[];
  autorizacionIVAIEPS: string;
  regimen_0: boolean;
  regimen_1: boolean;
  regimen_2: boolean;
  regimen_3: boolean;
  sectorProductivo: string;
  servicio: string;
  preOperativo: boolean;
  indiqueSi: boolean;
  senale: boolean;
  empPropios: string;
  bimestre: string;
  senaleSi: boolean;
  seMomento: boolean;
  cumplir: boolean;
  indique: boolean;
  encuentra: boolean;
  delMismo: boolean;
  senaleMomento: boolean;
  enCaso: boolean;
  comboBimestresIDCSeleccione: string;
  ingresar: boolean;
  encuentraSus: boolean;
  registrosQue: string;
  registrosQue2: string;
  momentoIngresar: boolean;
  indiqueCuenta: boolean;
  nombreDel: string;
  lugarDeRadicacion: string;
  contabilidad: boolean;
  rmfRadio: boolean;
  vinculacionRegistroCancelado: boolean;
  proveedoresListadoSAT: boolean;
  indiqueCheck: boolean;
  resigtro: string;
  telefono: string;
  correo: string;
  manifieste: string;
  indiqueIva: string;
  empleados: boolean;
  infraestructura: boolean;
  monto: boolean;
  antiguedad: boolean;
  tipoDe: string;
  valorPesos: string;
  descripcion: string;
  haContado: string;
  enCasoIva: string;
  numeroOperacion: string;
  banco: string;
  llavePago: string;
  importaciones: string;
  infraestructuraIndique: string;
  ultimosMeses: string;
  operacionesmeses: string;
  valor: string;
  transferencias: number;
  transferenciasVir: number;
  retornos: number;
  retornosSe: number;
  constancias: number;
  constanciasDe: number;
  empleadosPropiosRegimen: string;
  numeroEmpleadosUno: number;
  numeroEmpleadosDos: number;
  numeroEmpleadosTres: number;
  comboBimestresUno: string;
  comboBimestresDos: string;
  comboBimestresTres: string;
  proveedorCumplimiento: string;
  declaracionISR: string;
  cancelacion: string;
  cumplimientoReglas: string;
  recintoFiscalizado: string;
  recintoEstrategico: string;
  cumplimientoLineamientos: string;
  squemaIntegral: string;
  sidoModificadas: string;
  ensucaracterde: string;
  rfc: string;
  obligadoaTributarenMexico: string;
  nacionalidad: string;
  registroFederaldeContribuyentes: string;
  resigtroReprestantante: string;
  rfcReprestantante: string;
  nombreReprestante: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  cuidad: string;
  cargo: string;
  telefonoReprestantante: string;
  correoReprestantante: string;
  suplente: string;
  estadoResidencia: string;
  tipoDocumento: string;
  mencioneDatos: MencioneConfiguracionItem[];
  enlaceDatos: EnlaceConfiguracionItem[];
  controlInventariosDatos: ControlInventariosItem[];
  cancelacionProcedimiento: string;
  cumpleLineamientos: string;
  fechaPago: string;
}
/**
 * Función para crear el estado inicial de Solicitud31601.
 * @returns {Solicitud31601State} El estado inicial de Solicitud31601.
 */
export function createInitialState(): Solicitud31601State {
  return {
    nombreCompleto: '',
    tipoDePersonaMiembro: '',
    nombreMiembro: '',
    apellidoPaternoMiembro: '',
    apellidoMaternoMiembro: '',
    nombreDeLaEmpresaMiembro: '',
    miembrosSeleccionados: [],
    autorizacionIVAIEPS: '',
    regimen_0: false,
    regimen_1: false,
    regimen_2: false,
    regimen_3: false,
    sectorProductivo: '',
    servicio: '',
    preOperativo: false,
    indiqueSi: false,
    senale: false,
    empPropios: '',
    bimestre: '',
    senaleSi: false,
    seMomento: false,
    cumplir: false,
    indique: false,
    encuentra: false,
    delMismo: false,
    senaleMomento: false,
    enCaso: false,
    comboBimestresIDCSeleccione: '',
    ingresar: false,
    encuentraSus: false,
    registrosQue: '',
    registrosQue2: '',
    momentoIngresar: false,
    indiqueCuenta: false,
    nombreDel: '',
    lugarDeRadicacion: '',
    contabilidad: false,
    rmfRadio: false,
    vinculacionRegistroCancelado: false,
    proveedoresListadoSAT: false,
    indiqueCheck: false,
    resigtro: '',
    telefono: '',
    correo: '',
    manifieste: '',
    indiqueIva: '',
    empleados: false,
    infraestructura: false,
    monto: false,
    antiguedad: false,
    tipoDe: '',
    valorPesos: '',
    descripcion: '',
    haContado: '',
    enCasoIva: '',
    numeroOperacion: '',
    banco: '',
    llavePago: '',
    importaciones: '',
    infraestructuraIndique: '',
    ultimosMeses: '',
    operacionesmeses: '',
    valor: '',
    transferencias: 0,
    transferenciasVir: 0,
    retornos: 0,
    retornosSe: 0,
    constancias: 0,
    constanciasDe: 0,
    empleadosPropiosRegimen: '',
    numeroEmpleadosUno: 1,
    numeroEmpleadosDos: 1,
    numeroEmpleadosTres: 1,
    comboBimestresUno: '',
    comboBimestresDos: '',
    comboBimestresTres: '',
    proveedorCumplimiento: '',
    declaracionISR: '',
    cancelacion: '',
    cumplimientoReglas: '',
    recintoFiscalizado: '',
    recintoEstrategico: '',
    cumplimientoLineamientos: '',
    squemaIntegral: '',
    sidoModificadas: '',
    ensucaracterde: '',
    rfc: '',
    obligadoaTributarenMexico: '',
    nacionalidad: '',
    registroFederaldeContribuyentes: '',
    resigtroReprestantante: '',
    rfcReprestantante: '',
    nombreReprestante: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    cuidad: '',
    cargo: '',
    telefonoReprestantante: '',
    correoReprestantante: '',
    suplente: '',
    estadoResidencia: '',
    tipoDocumento: '',
    mencioneDatos: [],
    enlaceDatos: [],
    controlInventariosDatos: [],
    cancelacionProcedimiento: '',
    cumpleLineamientos: '',
    fechaPago:''
  };
}
/**
 * Decorador Injectable para hacer que la tienda esté disponible a nivel raíz.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31601', resettable: true })
export class Tramite31601Store extends Store<Solicitud31601State> {
  constructor() {
    super(createInitialState());
  }

  setMencioneTablaDatos(datosTablaMencione: MencioneConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mencioneDatos: datosTablaMencione,
    }));
  }

  setEnlaceTablaDatos(datosTablaEnlace: EnlaceConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      enlaceDatos: datosTablaEnlace,
    }));
  }

  setControlInventariosTablaDatos(datosTablaControlInventarios: ControlInventariosItem[]): void {
    this.update((state) => ({
      ...state,
      controlInventariosDatos: datosTablaControlInventarios,
    }));
  }

  agregarMiembrodelaempresaTable(miembro: Antecesor): void {
    this.update((state) => ({
      ...state,
      miembrosSeleccionados: [...state.miembrosSeleccionados, miembro],
    }));
  }

  eliminarMiembrodelaempresaTable(miembro: Antecesor): void {
    this.update((state) => ({
      ...state,
      miembrosSeleccionados: state.miembrosSeleccionados.filter((m) => m !== miembro),
    }));
  }

  public setTipoDePersonaMiembro(tipoDePersonaMiembro: string): void {
    this.update((state) => ({
      ...state,
      tipoDePersonaMiembro,
    }));
  }

  public setNombreMiembro(nombreMiembro: string): void {
    this.update((state) => ({
      ...state,
      nombreMiembro,
    }));
  }

  public setApellidoPaternoMiembro(apellidoPaternoMiembro: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaternoMiembro,
    }));
  }

  public setApellidoMaternoMiembro(apellidoMaternoMiembro: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaternoMiembro,
    }));
  }

  public setNombreDeLaEmpresaMiembro(nombreDeLaEmpresaMiembro: string): void {
    this.update((state) => ({
      ...state,
      nombreDeLaEmpresaMiembro,
    }));
  }

  public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string): void {
    this.update((state) => ({
      ...state,
      autorizacionIVAIEPS,
    }));
  }

  public setRegimen_0(regimen_0: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_0,
    }));
  }

  public setRegimen_1(regimen_1: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_1,
    }));
  }

  public setRegimen_2(regimen_2: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_2,
    }));
  }

  public setRegimen_3(regimen_3: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_3,
    }));
  }

  public setSectorProductivo(sectorProductivo: string): void {
    this.update((state) => ({
      ...state,
      sectorProductivo,
    }));
  }

  public setServicio(servicio: string): void {
    this.update((state) => ({
      ...state,
      servicio,
    }));
  }

  public setPreOperativo(preOperativo: boolean): void {
    this.update((state) => ({
      ...state,
      preOperativo,
    }));
  }

  public setIndiqueSi(indiqueSi: boolean): void {
    this.update((state) => ({
      ...state,
      indiqueSi,
    }));
  }

  public setSenale(senale: boolean): void {
    this.update((state) => ({
      ...state,
      senale,
    }));
  }

  public setEmpPropios(empPropios: string): void {
    this.update((state) => ({
      ...state,
      empPropios,
    }));
  }

  public setBimestre(bimestre: string): void {
    this.update((state) => ({
      ...state,
      bimestre,
    }));
  }

  public setSenaleSi(senaleSi: boolean): void {
    this.update((state) => ({
      ...state,
      senaleSi,
    }));
  }

  public setSeMomento(seMomento: boolean): void {
    this.update((state) => ({
      ...state,
      seMomento,
    }));
  }

  public setCumplir(cumplir: boolean): void {
    this.update((state) => ({
      ...state,
      cumplir,
    }));
  }

  public setIndique(indique: boolean): void {
    this.update((state) => ({
      ...state,
      indique,
    }));
  }

  public setEncuentra(encuentra: boolean): void {
    this.update((state) => ({
      ...state,
      encuentra,
    }));
  }

  public setDelMismo(delMismo: boolean): void {
    this.update((state) => ({
      ...state,
      delMismo,
    }));
  }

  public setSenaleMomento(senaleMomento: boolean): void {
    this.update((state) => ({
      ...state,
      senaleMomento,
    }));
  }

  public setEnCaso(enCaso: boolean): void {
    this.update((state) => ({
      ...state,
      enCaso,
    }));
  }

  public setComboBimestresIDCSeleccione(comboBimestresIDCSeleccione: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresIDCSeleccione,
    }));
  }

  public setIngresar(ingresar: boolean): void {
    this.update((state) => ({
      ...state,
      ingresar,
    }));
  }

  public setEncuentraSus(encuentraSus: boolean): void {
    this.update((state) => ({
      ...state,
      encuentraSus,
    }));
  }

  public setRegistrosQue(registrosQue: string): void {
    this.update((state) => ({
      ...state,
      registrosQue,
    }));
  }

  public setRegistrosQue2(registrosQue2: string): void {
    this.update((state) => ({
      ...state,
      registrosQue2,
    }));
  }

  public setMomentoIngresar(momentoIngresar: boolean): void {
    this.update((state) => ({
      ...state,
      momentoIngresar,
    }));
  }

  public setIndiqueCuenta(indiqueCuenta: boolean): void {
    this.update((state) => ({
      ...state,
      indiqueCuenta,
    }));
  }

  public setNombreDel(nombreDel: string): void {
    this.update((state) => ({
      ...state,
      nombreDel,
    }));
  }

  public setLugarDeRadicacion(lugarDeRadicacion: string): void {
    this.update((state) => ({
      ...state,
      lugarDeRadicacion,
    }));
  }

  public setContabilidad(contabilidad: boolean): void {
    this.update((state) => ({
      ...state,
      contabilidad,
    }));
  }

  public setRmfRadio(rmfRadio: boolean): void {
    this.update((state) => ({
      ...state,
      rmfRadio,
    }));
  }

  public setVinculacionRegistroCancelado(vinculacionRegistroCancelado: boolean): void {
    this.update((state) => ({
      ...state,
      vinculacionRegistroCancelado,
    }));
  }

  public setProveedoresListadoSAT(proveedoresListadoSAT: boolean): void {
    this.update((state) => ({
      ...state,
      proveedoresListadoSAT,
    }));
  }

  public setIndiqueCheck(indiqueCheck: boolean): void {
    this.update((state) => ({
      ...state,
      indiqueCheck,
    }));
  }

  public setResigtro(resigtro: string): void {
    this.update((state) => ({
      ...state,
      resigtro,
    }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

  public setManifieste(manifieste: string): void {
    this.update((state) => ({
      ...state,
      manifieste,
    }));
  }

  public setIndiqueIva(indiqueIva: string): void {
    this.update((state) => ({
      ...state,
      indiqueIva,
    }));
  }

  public setEmpleados(empleados: boolean): void {
    this.update((state) => ({
      ...state,
      empleados,
    }));
  }

  public setInfraestructura(infraestructura: boolean): void {
    this.update((state) => ({
      ...state,
      infraestructura,
    }));
  }

  public setMonto(monto: boolean): void {
    this.update((state) => ({
      ...state,
      monto,
    }));
  }

  public setAntiguedad(antiguedad: boolean): void {
    this.update((state) => ({
      ...state,
      antiguedad,
    }));
  }

  public setTipoDe(tipoDe: string): void {
    this.update((state) => ({
      ...state,
      tipoDe,
    }));
  }

  public setValorPesos(valorPesos: string): void {
    this.update((state) => ({
      ...state,
      valorPesos,
    }));
  }

  public setDescripcion(descripcion: string): void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  public setHaContado(haContado: string): void {
    this.update((state) => ({
      ...state,
      haContado,
    }));
  }

  public setEnCasoIva(enCasoIva: string): void {
    this.update((state) => ({
      ...state,
      enCasoIva,
    }));
  }

  public setNumeroOperacion(numeroOperacion: string): void {
    this.update((state) => ({
      ...state,
      numeroOperacion,
    }));
  }

  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  public setLlavePago(llavePago: string): void {
    this.update((state) => ({
      ...state,
      llavePago,
    }));
  }

  public setImportaciones(importaciones: string): void {
    this.update((state) => ({
      ...state,
      importaciones,
    }));
  }

  public setInfraestructuraIndique(infraestructuraIndique: string): void {
    this.update((state) => ({
      ...state,
      infraestructuraIndique,
    }));
  }

  public setUltimosMeses(ultimosMeses: string): void {
    this.update((state) => ({
      ...state,
      ultimosMeses,
    }));
  }

  public setOperacionesmeses(operacionesmeses: string): void {
    this.update((state) => ({
      ...state,
      operacionesmeses,
    }));
  }

  public setValor(valor: string): void {
    this.update((state) => ({
      ...state,
      valor,
    }));
  }

  public setTransferencias(transferencias: number): void {
    this.update((state) => ({
      ...state,
      transferencias,
    }));
  }

  public setTransferenciasVir(transferenciasVir: number): void {
    this.update((state) => ({
      ...state,
      transferenciasVir,
    }));
  }

  public setRetornos(retornos: number): void {
    this.update((state) => ({
      ...state,
      retornos,
    }));
  }

  public setRetornosSe(retornosSe: number): void {
    this.update((state) => ({
      ...state,
      retornosSe,
    }));
  }

  public setConstancias(constancias: number): void {
    this.update((state) => ({
      ...state,
      constancias,
    }));
  }

  public setConstanciasDe(constanciasDe: number): void {
    this.update((state) => ({
      ...state,
      constanciasDe,
    }));
  }

  public setEmpleadosPropiosRegimen(empleadosPropiosRegimen: string): void {
    this.update((state) => ({
      ...state,
      empleadosPropiosRegimen,
    }));
  }

  public setNumeroEmpleadosUno(numeroEmpleadosUno: number): void {
    this.update((state) => ({
      ...state,
      numeroEmpleadosUno,
    }));
  }

  public setNumeroEmpleadosDos(numeroEmpleadosDos: number): void {
    this.update((state) => ({
      ...state,
      numeroEmpleadosDos,
    }));
  }

  public setNumeroEmpleadosTres(numeroEmpleadosTres: number): void {
    this.update((state) => ({
      ...state,
      numeroEmpleadosTres,
    }));
  }

  public setComboBimestresUno(comboBimestresUno: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresUno,
    }));
  }

  public setComboBimestresDos(comboBimestresDos: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresDos,
    }));
  }

  public setComboBimestresTres(comboBimestresTres: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresTres,
    }));
  }

  public setProveedorCumplimiento(proveedorCumplimiento: string): void {
    this.update((state) => ({
      ...state,
      proveedorCumplimiento,
    }));
  }

  public setDeclaracionISR(declaracionISR: string): void {
    this.update((state) => ({
      ...state,
      declaracionISR,
    }));
  }

  public setCancelacion(cancelacion: string): void {
    this.update((state) => ({
      ...state,
      cancelacion,
    }));
  }

  public setCumplimientoReglas(cumplimientoReglas: string): void {
    this.update((state) => ({
      ...state,
      cumplimientoReglas,
    }));
  }

  public setRecintoFiscalizado(recintoFiscalizado: string): void {
    this.update((state) => ({
      ...state,
      recintoFiscalizado,
    }));
  }

  public setRecintoEstrategico(recintoEstrategico: string): void {
    this.update((state) => ({
      ...state,
      recintoEstrategico,
    }));
  }

  public setCumplimientoLineamientos(cumpleLineamientos: string): void {
    this.update((state) => ({
      ...state,
      cumpleLineamientos,
    }));
  }

  public setSquemaIntegral(squemaIntegral: string): void {
    this.update((state) => ({
      ...state,
      squemaIntegral,
    }));
  }

  public setSidoModificadas(sidoModificadas: string): void {
    this.update((state) => ({
      ...state,
      sidoModificadas,
    }));
  }

  public setEnsucaracterde(ensucaracterde: string): void {
    this.update((state) => ({
      ...state,
      ensucaracterde,
    }));
  }

  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setObligadoaTributarenMexico(obligadoaTributarenMexico: string): void {
    this.update((state) => ({
      ...state,
      obligadoaTributarenMexico,
    }));
  }

  public setNacionalidad(nacionalidad: string): void {
    this.update((state) => ({
      ...state,
      nacionalidad,
    }));
  }

  public setRegistroFederaldeContribuyentes(registroFederaldeContribuyentes: string): void {
    this.update((state) => ({
      ...state,
      registroFederaldeContribuyentes,
    }));
  }

  public setResigtroReprestantante(resigtroReprestantante: string): void {
    this.update((state) => ({
      ...state,
      resigtroReprestantante,
    }));
  }

  public setRfcReprestantante(rfcReprestantante: string): void {
    this.update((state) => ({
      ...state,
      rfcReprestantante,
    }));
  }

  public setNombreReprestante(nombreReprestante: string): void {
    this.update((state) => ({
      ...state,
      nombreReprestante,
    }));
  }

  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  public setCuidad(cuidad: string): void {
    this.update((state) => ({
      ...state,
      cuidad,
    }));
  }

  public setCargo(cargo: string): void {
    this.update((state) => ({
      ...state,
      cargo,
    }));
  }

  public setTelefonoReprestantante(telefonoReprestantante: string): void {
    this.update((state) => ({
      ...state,
      telefonoReprestantante,
    }));
  }

  public setCorreoReprestantante(correoReprestantante: string): void {
    this.update((state) => ({
      ...state,
      correoReprestantante,
    }));
  }

  public setSuplente(suplente: string): void {
    this.update((state) => ({
      ...state,
      suplente,
    }));
  }

  public setEstadoResidencia(estadoResidencia: string): void {
    this.update((state) => ({
      ...state,
      estadoResidencia,
    }));
  }

  public setTipoDocumento(tipoDocumento: string): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }

  public setCancelacionProcedimiento(cancelacionProcedimiento: string): void {
    this.update((state) => ({
      ...state,
      cancelacionProcedimiento,
    }));
  }

  public setCumpleLineamientos(cumpleLineamientos: string): void {
    this.update((state) => ({
      ...state,
      cumpleLineamientos,
    }));
  }
  
  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }
}