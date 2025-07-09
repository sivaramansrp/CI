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

  /**
   * Establece los datos de la tabla "Mencione" en el estado.
   * @param datosTablaMencione Los datos a establecer en la tabla "Mencione".
   */
  setMencioneTablaDatos(datosTablaMencione: MencioneConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      mencioneDatos: datosTablaMencione,
    }));
  }

  /**
   * Establece los datos de la tabla "Enlace" en el estado.
   * @param datosTablaEnlace Los datos a establecer en la tabla "Enlace".
   */
  setEnlaceTablaDatos(datosTablaEnlace: EnlaceConfiguracionItem[]): void {
    this.update((state) => ({
      ...state,
      enlaceDatos: datosTablaEnlace,
    }));
  }

  /**
   * Establece los datos de la tabla "Control de Inventarios" en el estado.
   * @param datosTablaControlInventarios Los datos a establecer en la tabla "Control de Inventarios".
   */
  setControlInventariosTablaDatos(datosTablaControlInventarios: ControlInventariosItem[]): void {
    this.update((state) => ({
      ...state,
      controlInventariosDatos: datosTablaControlInventarios,
    }));
  }

  /**
   * Agrega un miembro a la tabla de miembros seleccionados en el estado.
   * @param miembro El miembro a agregar.
   */
  agregarMiembrodelaempresaTable(miembro: Antecesor): void {
    this.update((state) => ({
      ...state,
      miembrosSeleccionados: [...state.miembrosSeleccionados, miembro],
    }));
  }

  /**
   * Elimina un miembro de la tabla de miembros seleccionados en el estado.
   * @param miembro El miembro a eliminar.
   */
  eliminarMiembrodelaempresaTable(miembro: Antecesor): void {
    this.update((state) => ({
      ...state,
      miembrosSeleccionados: state.miembrosSeleccionados.filter((m) => m !== miembro),
    }));
  }

  /**
 * Establece el tipo de persona del miembro.
 * @param tipoDePersonaMiembro - Tipo de persona del miembro.
 */
  public setTipoDePersonaMiembro(tipoDePersonaMiembro: string): void {
    this.update((state) => ({
      ...state,
      tipoDePersonaMiembro,
    }));
  }

  /**
 * Establece el nombre del miembro.
 * @param nombreMiembro - Nombre del miembro.
 */
  public setNombreMiembro(nombreMiembro: string): void {
    this.update((state) => ({
      ...state,
      nombreMiembro,
    }));
  }

  /**
 * Establece el apellido paterno del miembro.
 * @param apellidoPaternoMiembro - Apellido paterno del miembro.
 */
  public setApellidoPaternoMiembro(apellidoPaternoMiembro: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaternoMiembro,
    }));
  }

  /**
 * Establece el apellido materno del miembro.
 * @param apellidoMaternoMiembro - Apellido materno del miembro.
 */
  public setApellidoMaternoMiembro(apellidoMaternoMiembro: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaternoMiembro,
    }));
  }

  /**
 * Establece el nombre de la empresa del miembro.
 * @param nombreDeLaEmpresaMiembro - Nombre de la empresa del miembro.
 */
  public setNombreDeLaEmpresaMiembro(nombreDeLaEmpresaMiembro: string): void {
    this.update((state) => ({
      ...state,
      nombreDeLaEmpresaMiembro,
    }));
  }

  /**
 * Establece la autorización para IVA e IEPS.
 * @param autorizacionIVAIEPS - Autorización relacionada con IVA e IEPS.
 */
  public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string): void {
    this.update((state) => ({
      ...state,
      autorizacionIVAIEPS,
    }));
  }

/**
 * Establece el valor para el régimen 0.
 * @param regimen_0 - Indica si aplica régimen 0.
 */
  public setRegimen_0(regimen_0: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_0,
    }));
  }

/**
 * Establece el valor para el régimen 1.
 * @param regimen_1 - Indica si aplica régimen 1.
 */
  public setRegimen_1(regimen_1: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_1,
    }));
  }

/**
 * Establece el valor para el régimen 2.
 * @param regimen_2 - Indica si aplica régimen 2.
 */
  public setRegimen_2(regimen_2: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_2,
    }));
  }

/**
 * Establece el valor para el régimen 3.
 * @param regimen_3 - Indica si aplica régimen 3.
 */
  public setRegimen_3(regimen_3: boolean): void {
    this.update((state) => ({
      ...state,
      regimen_3,
    }));
  }

/**
 * Establece el sector productivo.
 * @param sectorProductivo - Sector productivo correspondiente.
 */
  public setSectorProductivo(sectorProductivo: string): void {
    this.update((state) => ({
      ...state,
      sectorProductivo,
    }));
  }

/**
 * Establece el servicio.
 * @param servicio - Servicio relacionado.
 */
  public setServicio(servicio: string): void {
    this.update((state) => ({
      ...state,
      servicio,
    }));
  }

/**
 * Establece si está en etapa preoperativa.
 * @param preOperativo - Indica si está en etapa preoperativa.
 */
  public setPreOperativo(preOperativo: boolean): void {
    this.update((state) => ({
      ...state,
      preOperativo,
    }));
  }

/**
 * Establece el valor de `indiqueSi` en el estado.
 * @param indiqueSi - Indica si se debe marcar "sí" (true/false).
 */
  public setIndiqueSi(indiqueSi: boolean): void {
    this.update((state) => ({
      ...state,
      indiqueSi,
    }));
  }

  /**
 * Establece el valor de `senale` en el estado.
 * @param senale - Indica si se debe señalar algo (true/false).
 */
  public setSenale(senale: boolean): void {
    this.update((state) => ({
      ...state,
      senale,
    }));
  }

/**
 * Establece el valor de `empPropios` en el estado.
 * @param empPropios - Información sobre empleados propios.
 */
  public setEmpPropios(empPropios: string): void {
    this.update((state) => ({
      ...state,
      empPropios,
    }));
  }

  /**
 * Establece el valor de `bimestre` en el estado.
 * @param bimestre - Bimestre seleccionado por el usuario.
 */
  public setBimestre(bimestre: string): void {
    this.update((state) => ({
      ...state,
      bimestre,
    }));
  }

  /**
 * Establece el valor de `senaleSi` en el estado.
 * @param senaleSi - Indica si se debe señalar afirmativamente.
 */
  public setSenaleSi(senaleSi: boolean): void {
    this.update((state) => ({
      ...state,
      senaleSi,
    }));
  }

  /**
 * Establece el valor de `seMomento` en el estado.
 * @param seMomento - Indica si es el momento adecuado (true/false).
 */
  public setSeMomento(seMomento: boolean): void {
    this.update((state) => ({
      ...state,
      seMomento,
    }));
  }

  /**
 * Establece el valor de `cumplir` en el estado.
 * @param cumplir - Indica si se cumple con el requisito.
 */
  public setCumplir(cumplir: boolean): void {
    this.update((state) => ({
      ...state,
      cumplir,
    }));
  }

  /**
 * Establece el valor de `indique` en el estado.
 * @param indique - Indica si se debe seleccionar una opción.
 */
  public setIndique(indique: boolean): void {
    this.update((state) => ({
      ...state,
      indique,
    }));
  }

  /**
 * Establece el valor de `encuentra` en el estado.
 * @param encuentra - Indica si se encuentra en cierta condición.
 */
  public setEncuentra(encuentra: boolean): void {
    this.update((state) => ({
      ...state,
      encuentra,
    }));
  }

  /**
 * Establece el valor de `delMismo` en el estado.
 * @param delMismo - Indica si es del mismo tipo o categoría.
 */
  public setDelMismo(delMismo: boolean): void {
    this.update((state) => ({
      ...state,
      delMismo,
    }));
  }

  /**
 * Establece el valor de `senaleMomento` en el estado.
 * @param senaleMomento - Indica si se debe señalar un momento específico.
 */
  public setSenaleMomento(senaleMomento: boolean): void {
    this.update((state) => ({
      ...state,
      senaleMomento,
    }));
  }

  
/**
 * Establece el valor de `enCaso` en el estado.
 * @param enCaso - Marca que aplica en caso de una condición.
 */
  public setEnCaso(enCaso: boolean): void {
    this.update((state) => ({
      ...state,
      enCaso,
    }));
  }

  /**
 * Establece el valor de `comboBimestresIDCSeleccione` en el estado.
 * @param comboBimestresIDCSeleccione - Selección de bimestre desde un combo.
 */
  public setComboBimestresIDCSeleccione(comboBimestresIDCSeleccione: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresIDCSeleccione,
    }));
  }

/**
 * Establece el valor de `ingresar` en el estado.
 * @param ingresar - Indica si debe ingresar (true/false).
 */
  public setIngresar(ingresar: boolean): void {
    this.update((state) => ({
      ...state,
      ingresar,
    }));
  }

/**
 * Establece el valor de `encuentraSus` en el estado.
 * @param encuentraSus - Indica si se encuentra suscrito o registrado.
 */
  public setEncuentraSus(encuentraSus: boolean): void {
    this.update((state) => ({
      ...state,
      encuentraSus,
    }));
  }

/**
 * Establece el valor de `registrosQue` en el estado.
 * @param registrosQue - Texto relacionado con registros que aplica.
 */
  public setRegistrosQue(registrosQue: string): void {
    this.update((state) => ({
      ...state,
      registrosQue,
    }));
  }

/**
 * Establece el valor de `registrosQue2` en el estado.
 * @param registrosQue2 - Texto adicional sobre registros que aplica.
 */
  public setRegistrosQue2(registrosQue2: string): void {
    this.update((state) => ({
      ...state,
      registrosQue2,
    }));
  }

/**
 * Establece el valor de `momentoIngresar` en el estado.
 * @param momentoIngresar - Indica si debe ingresar en ese momento.
 */
  public setMomentoIngresar(momentoIngresar: boolean): void {
    this.update((state) => ({
      ...state,
      momentoIngresar,
    }));
  }

/**
 * Establece el valor de `indiqueCuenta` en el estado.
 * @param indiqueCuenta - Indica si se debe señalar una cuenta.
 */
  public setIndiqueCuenta(indiqueCuenta: boolean): void {
    this.update((state) => ({
      ...state,
      indiqueCuenta,
    }));
  }

/**
 * Establece el valor de `nombreDel` en el estado.
 * @param nombreDel - Nombre del responsable o entidad.
 */
  public setNombreDel(nombreDel: string): void {
    this.update((state) => ({
      ...state,
      nombreDel,
    }));
  }

/**
 * Establece el valor de `lugarDeRadicacion` en el estado.
 * @param lugarDeRadicacion - Lugar donde se realiza la radicación.
 */
  public setLugarDeRadicacion(lugarDeRadicacion: string): void {
    this.update((state) => ({
      ...state,
      lugarDeRadicacion,
    }));
  }

/**
 * Establece el valor de `contabilidad` en el estado.
 * @param contabilidad - Indica si se lleva contabilidad.
 */
  public setContabilidad(contabilidad: boolean): void {
    this.update((state) => ({
      ...state,
      contabilidad,
    }));
  }

/**
 * Establece el valor de `rmfRadio` en el estado.
 * @param rmfRadio - Opción seleccionada sobre la RMF.
 */
  public setRmfRadio(rmfRadio: boolean): void {
    this.update((state) => ({
      ...state,
      rmfRadio,
    }));
  }

/**
 * Establece el valor de `vinculacionRegistroCancelado` en el estado.
 * @param vinculacionRegistroCancelado - Indica si hay un registro cancelado vinculado.
 */
  public setVinculacionRegistroCancelado(vinculacionRegistroCancelado: boolean): void {
    this.update((state) => ({
      ...state,
      vinculacionRegistroCancelado,
    }));
  }

/**
 * Establece el valor de `proveedoresListadoSAT` en el estado.
 * @param proveedoresListadoSAT - Indica si está en el listado de proveedores del SAT.
 */
  public setProveedoresListadoSAT(proveedoresListadoSAT: boolean): void {
    this.update((state) => ({
      ...state,
      proveedoresListadoSAT,
    }));
  }

/**
 * Establece el valor de `indiqueCheck` en el estado.
 * @param indiqueCheck - Marca de verificación para indicar algo específico.
 */
  public setIndiqueCheck(indiqueCheck: boolean): void {
    this.update((state) => ({
      ...state,
      indiqueCheck,
    }));
  }

/**
 * Establece el valor de `resigtro` en el estado.
 * @param resigtro - Información de registro (posiblemente con error tipográfico).
 */
  public setResigtro(resigtro: string): void {
    this.update((state) => ({
      ...state,
      resigtro,
    }));
  }

/**
 * Establece el valor de `telefono` en el estado.
 * @param telefono - Número telefónico de contacto.
 */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

/**
 * Establece el valor de `correo` en el estado.
 * @param correo - Dirección de correo electrónico.
 */
  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

/**
 * Establece el valor de `manifieste` en el estado.
 * @param manifieste - Texto que manifiesta el usuario.
 */
  public setManifieste(manifieste: string): void {
    this.update((state) => ({
      ...state,
      manifieste,
    }));
  }
/**
 * Establece el valor de `indiqueIva` en el estado.
 * @param indiqueIva - Información relacionada con el IVA.
 */
  public setIndiqueIva(indiqueIva: string): void {
    this.update((state) => ({
      ...state,
      indiqueIva,
    }));
  }

 /**
 * Establece el valor de `empleados` en el estado.
 * @param empleados - Indica si hay empleados (true/false).
 */
  public setEmpleados(empleados: boolean): void {
    this.update((state) => ({
      ...state,
      empleados,
    }));
  }

 /**
 * Establece el valor de `infraestructura` en el estado.
 * @param infraestructura - Indica si hay infraestructura disponible (true/false).
 */
  public setInfraestructura(infraestructura: boolean): void {
    this.update((state) => ({
      ...state,
      infraestructura,
    }));
  }

 /**
 * Establece el valor de `monto` en el estado.
 * @param monto - Indica si se incluye monto (true/false).
 */
  public setMonto(monto: boolean): void {
    this.update((state) => ({
      ...state,
      monto,
    }));
  }

 /**
 * Establece el valor de `antiguedad` en el estado.
 * @param antiguedad - Indica si aplica antigüedad (true/false).
 */
  public setAntiguedad(antiguedad: boolean): void {
    this.update((state) => ({
      ...state,
      antiguedad,
    }));
  }

 /**
 * Establece el valor de `tipoDe` en el estado.
 * @param tipoDe - Tipo de categoría o clasificación.
 */
  public setTipoDe(tipoDe: string): void {
    this.update((state) => ({
      ...state,
      tipoDe,
    }));
  }

  /**
 * Establece el valor de `valorPesos` en el estado.
 * @param valorPesos - Valor en pesos ingresado por el usuario.
 */
  public setValorPesos(valorPesos: string): void {
    this.update((state) => ({
      ...state,
      valorPesos,
    }));
  }

  /**
 * Establece el valor de `descripcion` en el estado.
 * @param descripcion - Descripción proporcionada.
 */
  public setDescripcion(descripcion: string): void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  /**
 * Establece el valor de `haContado` en el estado.
 * @param haContado - Información sobre si ha contado con algo.
 */
  public setHaContado(haContado: string): void {
    this.update((state) => ({
      ...state,
      haContado,
    }));
  }

  /**
 * Establece el valor de `enCasoIva` en el estado.
 * @param enCasoIva - Detalle en caso de que aplique IVA.
 */
  public setEnCasoIva(enCasoIva: string): void {
    this.update((state) => ({
      ...state,
      enCasoIva,
    }));
  }

  /**
 * Establece el valor de `numeroOperacion` en el estado.
 * @param numeroOperacion - Número de operación bancaria.
 */
  public setNumeroOperacion(numeroOperacion: string): void {
    this.update((state) => ({
      ...state,
      numeroOperacion,
    }));
  }

/**
 * Establece el valor de `banco` en el estado.
 * @param banco - Nombre del banco utilizado.
 */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
 * Establece el valor de `llavePago` en el estado.
 * @param llavePago - Clave o llave de pago utilizada.
 */
  public setLlavePago(llavePago: string): void {
    this.update((state) => ({
      ...state,
      llavePago,
    }));
  }

  /**
 * Establece el valor de `importaciones` en el estado.
 * @param importaciones - Información sobre importaciones.
 */
  public setImportaciones(importaciones: string): void {
    this.update((state) => ({
      ...state,
      importaciones,
    }));
  }

 /**
 * Establece el valor de `infraestructuraIndique` en el estado.
 * @param infraestructuraIndique - Detalle sobre infraestructura.
 */
  public setInfraestructuraIndique(infraestructuraIndique: string): void {
    this.update((state) => ({
      ...state,
      infraestructuraIndique,
    }));
  }

 /**
 * Establece el valor de `ultimosMeses` en el estado.
 * @param ultimosMeses - Información de los últimos meses.
 */
  public setUltimosMeses(ultimosMeses: string): void {
    this.update((state) => ({
      ...state,
      ultimosMeses,
    }));
  }

/**
 * Establece el valor de `operacionesmeses` en el estado.
 * @param operacionesmeses - Número de operaciones recientes.
 */
  public setOperacionesmeses(operacionesmeses: string): void {
    this.update((state) => ({
      ...state,
      operacionesmeses,
    }));
  }

/**
 * Establece el valor de `valor` en el estado.
 * @param valor - Valor general ingresado.
 */
  public setValor(valor: string): void {
    this.update((state) => ({
      ...state,
      valor,
    }));
  }

/**
 * Establece el valor de `transferencias` en el estado.
 * @param transferencias - Cantidad de transferencias realizadas.
 */
  public setTransferencias(transferencias: number): void {
    this.update((state) => ({
      ...state,
      transferencias,
    }));
  }

/**
 * Establece el valor de `transferenciasVir` en el estado.
 * @param transferenciasVir - Cantidad de transferencias virtuales.
 */
  public setTransferenciasVir(transferenciasVir: number): void {
    this.update((state) => ({
      ...state,
      transferenciasVir,
    }));
  }

/**
 * Establece el valor de `retornos` en el estado.
 * @param retornos - Cantidad de retornos registrados.
 */
  public setRetornos(retornos: number): void {
    this.update((state) => ({
      ...state,
      retornos,
    }));
  }

 /**
 * Establece el valor de `retornosSe` en el estado.
 * @param retornosSe - Cantidad de retornos SE registrados.
 */
  public setRetornosSe(retornosSe: number): void {
    this.update((state) => ({
      ...state,
      retornosSe,
    }));
  }

 /**
 * Establece el valor de `constancias` en el estado.
 * @param constancias - Número de constancias registradas.
 */
  public setConstancias(constancias: number): void {
    this.update((state) => ({
      ...state,
      constancias,
    }));
  }

  /**
 * Establece el valor de `constanciasDe` en el estado.
 *
 * @param constanciasDe - Número de constancias a asignar.
 */
  public setConstanciasDe(constanciasDe: number): void {
    this.update((state) => ({
      ...state,
      constanciasDe,
    }));
  }

 /**
 * Establece el valor de `empleadosPropiosRegimen` en el estado.
 *
 * @param empleadosPropiosRegimen - Régimen de los empleados propios a asignar.
 */
  public setEmpleadosPropiosRegimen(empleadosPropiosRegimen: string): void {
    this.update((state) => ({
      ...state,
      empleadosPropiosRegimen,
    }));
  }
  
  /**
 * Establece el valor de `numeroEmpleadosUno` en el estado.
 *
 * @param numeroEmpleadosUno - Número de empleados a asignar.
 */
  public setNumeroEmpleadosUno(numeroEmpleadosUno: number): void {
    this.update((state) => ({
      ...state,
      numeroEmpleadosUno,
    }));
  }

  /**
   * Establece el valor de `numeroEmpleadosDos` en el estado.
   *
   * @param numeroEmpleadosDos - El nuevo número de empleados a asignar.
   */
  public setNumeroEmpleadosDos(numeroEmpleadosDos: number): void {
    this.update((state) => ({
      ...state,
      numeroEmpleadosDos,
    }));
  }

  /**
   * Establece el valor de 'numeroEmpleadosTres' en el estado.
   *
   * @param numeroEmpleadosTres - El nuevo número de empleados para el tercer campo.
   */
  public setNumeroEmpleadosTres(numeroEmpleadosTres: number): void {
    this.update((state) => ({
      ...state,
      numeroEmpleadosTres,
    }));
  }

  /**
   * Establece el valor de `comboBimestresUno` en el estado.
   *
   * @param comboBimestresUno - El nuevo valor para `comboBimestresUno`.
   */
  public setComboBimestresUno(comboBimestresUno: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresUno,
    }));
  }

  /**
   * Establece el valor de `comboBimestresDos` en el estado de la tienda.
   *
   * @param comboBimestresDos - El nuevo valor para el campo `comboBimestresDos`.
   */
  public setComboBimestresDos(comboBimestresDos: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresDos,
    }));
  }

  /**
   * Establece el valor de `comboBimestresTres` en el estado.
   *
   * @param comboBimestresTres - El nuevo valor para `comboBimestresTres`.
   */
  public setComboBimestresTres(comboBimestresTres: string): void {
    this.update((state) => ({
      ...state,
      comboBimestresTres,
    }));
  }

  /**
   * Establece el valor de la propiedad "proveedorCumplimiento" en el estado.
   * @param proveedorCumplimiento El valor a establecer para "proveedorCumplimiento".
   */
  public setProveedorCumplimiento(proveedorCumplimiento: string): void {
    this.update((state) => ({
      ...state,
      proveedorCumplimiento,
    }));
  }

  /**
   * Establece el valor de la propiedad "declaracionISR" en el estado.
   * @param declaracionISR El valor a establecer para "declaracionISR".
   */
  public setDeclaracionISR(declaracionISR: string): void {
    this.update((state) => ({
      ...state,
      declaracionISR,
    }));
  }

  /**
   * Establece el valor de la propiedad `cancelacion` en el estado.
   *
   * @param cancelacion - El nuevo valor para la cancelación.
   */
  public setCancelacion(cancelacion: string): void {
    this.update((state) => ({
      ...state,
      cancelacion,
    }));
  }

  /**
   * Establece el valor de la propiedad "cumplimientoReglas" en el estado.
   * @param cumplimientoReglas El valor a establecer para "cumplimientoReglas".
   */
  public setCumplimientoReglas(cumplimientoReglas: string): void {
    this.update((state) => ({
      ...state,
      cumplimientoReglas,
    }));
  }

  /**
   * Establece el valor de `recintoFiscalizado` en el estado de la tienda.
   *
   * @param recintoFiscalizado - El nuevo valor para el campo `recintoFiscalizado`.
   */
  public setRecintoFiscalizado(recintoFiscalizado: string): void {
    this.update((state) => ({
      ...state,
      recintoFiscalizado,
    }));
  }

  /**
   * Establece el valor de `recintoEstrategico` en el estado de la tienda.
   *
   * @param recintoEstrategico - El nuevo valor para el campo `recintoEstrategico`.
   */
  public setRecintoEstrategico(recintoEstrategico: string): void {
    this.update((state) => ({
      ...state,
      recintoEstrategico,
    }));
  }

  /**
   * Establece el valor de la propiedad "cumplimientoLineamientos" en el estado.
   * @param cumpleLineamientos El valor a establecer para "cumplimientoLineamientos".
   */
  public setCumplimientoLineamientos(cumpleLineamientos: string): void {
    this.update((state) => ({
      ...state,
      cumpleLineamientos,
    }));
  }

  /**
   * Actualiza el estado con el valor proporcionado de squemaIntegral.
   *
   * @param squemaIntegral - El nuevo valor para la propiedad squemaIntegral.
   */
  public setSquemaIntegral(squemaIntegral: string): void {
    this.update((state) => ({
      ...state,
      squemaIntegral,
    }));
  }

  /**
   * Establece el valor de la propiedad `sidoModificadas` en el estado.
   *
   * @param sidoModificadas - El nuevo valor para la propiedad `sidoModificadas`.
   */
  public setSidoModificadas(sidoModificadas: string): void {
    this.update((state) => ({
      ...state,
      sidoModificadas,
    }));
  }

  /**
   * Establece el valor de "ensucaracterde" en el estado.
   * @param ensucaracterde El valor a establecer para "ensucaracterde".
   */
  public setEnsucaracterde(ensucaracterde: string): void {
    this.update((state) => ({
      ...state,
      ensucaracterde,
    }));
  }

  /**
   * Establece el valor del RFC en el estado.
   * @param rfc El RFC a establecer en el estado.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece el valor de la propiedad 'obligadoaTributarenMexico' en el estado.
   *
   * @param obligadoaTributarenMexico - El nuevo valor que indica si está obligado a tributar en México.
   */
  public setObligadoaTributarenMexico(obligadoaTributarenMexico: string): void {
    this.update((state) => ({
      ...state,
      obligadoaTributarenMexico,
    }));
  }

  /**
   * Establece el valor de la nacionalidad en el estado.
   *
   * @param nacionalidad - La nacionalidad que se va a asignar al estado.
   */
  public setNacionalidad(nacionalidad: string): void {
    this.update((state) => ({
      ...state,
      nacionalidad,
    }));
  }

  /**
   * Establece el valor de "registroFederaldeContribuyentes" en el estado.
   * @param registroFederaldeContribuyentes El valor a establecer para "registroFederaldeContribuyentes".
   */
  public setRegistroFederaldeContribuyentes(registroFederaldeContribuyentes: string): void {
    this.update((state) => ({
      ...state,
      registroFederaldeContribuyentes,
    }));
  }

  /**
   * Establece el valor de "resigtroReprestantante" en el estado.
   * @param resigtroReprestantante El valor a establecer para "resigtroReprestantante".
   */
  public setResigtroReprestantante(resigtroReprestantante: string): void {
    this.update((state) => ({
      ...state,
      resigtroReprestantante,
    }));
  }

  /**
   * Establece el valor del RFC del representante en el estado de la tienda.
   *
   * @param rfcReprestantante - El RFC del representante que se va a asignar al estado.
   */
  public setRfcReprestantante(rfcReprestantante: string): void {
    this.update((state) => ({
      ...state,
      rfcReprestantante,
    }));
  }

  /**
   * Establece el valor de "nombreReprestante" en el estado.
   * @param nombreReprestante El valor a establecer para "nombreReprestante".
   */
  public setNombreReprestante(nombreReprestante: string): void {
    this.update((state) => ({
      ...state,
      nombreReprestante,
    }));
  }

  /**
   * Establece el valor del apellido paterno en el estado.
   *
   * @param apellidoPaterno - El nuevo valor para el apellido paterno.
   */
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  /**
   * Establece el valor del apellido materno en el estado.
   *
   * @param apellidoMaterno - El nuevo valor para el apellido materno.
   */
  public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  /**
   * Establece el valor de la propiedad 'cuidad' en el estado.
   *
   * @param cuidad - El nombre de la ciudad a establecer en el estado.
   */
  public setCuidad(cuidad: string): void {
    this.update((state) => ({
      ...state,
      cuidad,
    }));
  }

  /**
   * Establece el valor del campo `cargo` en el estado de la tienda.
   *
   * @param cargo - El nuevo valor para el campo `cargo`.
   */
  public setCargo(cargo: string): void {
    this.update((state) => ({
      ...state,
      cargo,
    }));
  }

  /**
   * Establece el número de teléfono del representante en el estado de la tienda.
   *
   * @param telefonoReprestantante - El número de teléfono del representante a asignar.
   */
  public setTelefonoReprestantante(telefonoReprestantante: string): void {
    this.update((state) => ({
      ...state,
      telefonoReprestantante,
    }));
  }

  /**
   * Establece el valor de "correoReprestantante" en el estado.
   * @param correoReprestantante El valor a establecer para "correoReprestantante".
   */
  public setCorreoReprestantante(correoReprestantante: string): void {
    this.update((state) => ({
      ...state,
      correoReprestantante,
    }));
  }

  /**
   * Establece el valor de "suplente" en el estado.
   * @param suplente El valor a establecer para "suplente".
   */
  public setSuplente(suplente: string): void {
    this.update((state) => ({
      ...state,
      suplente,
    }));
  }

  /**
   * Establece el valor de "estadoResidencia" en el estado.
   * @param estadoResidencia El valor a establecer para "estadoResidencia".
   */
  public setEstadoResidencia(estadoResidencia: string): void {
    this.update((state) => ({
      ...state,
      estadoResidencia,
    }));
  }

  /**
   * Establece el valor de "tipoDocumento" en el estado.
   * @param tipoDocumento El valor a establecer para "tipoDocumento".
   */
  public setTipoDocumento(tipoDocumento: string): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }

  /**
   * Establece el valor de "cancelacionProcedimiento" en el estado.
   * @param cancelacionProcedimiento El valor a establecer para "cancelacionProcedimiento".
   */
  public setCancelacionProcedimiento(cancelacionProcedimiento: string): void {
    this.update((state) => ({
      ...state,
      cancelacionProcedimiento,
    }));
  }

  /**
   * Establece el valor de "cumpleLineamientos" en el estado.
   * @param cumpleLineamientos El valor a establecer para "cumpleLineamientos".
   */
  public setCumpleLineamientos(cumpleLineamientos: string): void {
    this.update((state) => ({
      ...state,
      cumpleLineamientos,
    }));
  }
  
  /**
   * Establece el valor de la fecha de pago en el estado.
   * @param fechaPago La fecha de pago a establecer.
   */
  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }
}