import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
}

/**
 * Estado inicial para la interfaz del trámite 32606.
 */
export interface Solicitud32606State {
  tipoRadio01: string,
  tipoRadio02: string,
  tipoRadio03: string,
  tipoRadio04: string,
  tipoRadio05: string,
  tipoRadio06: string,
  tipoRadio07: string,
  tipoRadio08: string,
  tipoRadio09: string,
  tipoRadio10: string,
  tipoRadio11: string,
  tipoRadio12: string
  tipoRadio13: string
  tipoRadio14: string
  tipoRadio15: string
  tipoRadio16: string
  tipoRadio17: string
  tipoRadio18: string
  tipoRadio19: string
  tipoRadio20: string
  tipoRadio21: string
  tipoRadio22: string
  tipoRadio23: string
  tipoRadio24: string
  tipoRadio25: string
  tipoRadio26: string,
  tipoRadio27: string,
  tipoRadio28: string,
  tipoRadio29: string,
  tipoRadio30: string,
  tipoRadio31: string,
  tipoRadio32: string,
  tipoRadio33: string,
  tipoRadio34: string,
  sectorProductivo: string,
  servicio: string,
  domicilio: string,
  biomestre: string,
  numeroEmpleados: string,
  domicillio: string,
  file1: string,
  file2: string,
  actualmente: string,
  actualmente2: string,
  sistemaIdentificacion: string,
  lugarRadicacion: string,
  sistemaControlInventarios: boolean,
  rfcTercero: string,
  rfc: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  telefono: string,
  correoElectronico: string,
  monto: string,
  operacionesBancarias: string,
  llavePago: string,
  modalidad: string,
  fechaRegistro: string,
  numeroAutorizacion: string,
  radioAutorizo: string,
  radioClasificacion: string,
  caracter: string,
  nacionalidad: string,
  fechaInicio: string,
  fechaPago: string,
  entidadFederativa : string,
  municipio: string,
  tipoDeInstalacion: string,
  registroSESAT: string,
  descripcion: string,
  codigoPostal: string
}

/**
 * Crea el estado inicial para la solicitud del trámite 32606.
 * @returns Estado inicial de tipo `Solicitud32606State`.
 */
export function createInitialState(): Solicitud32606State {
  return {
    tipoRadio01: '',
    tipoRadio02: '',
    tipoRadio03: '',
    tipoRadio04: '',
    tipoRadio05: '',
    tipoRadio06: '',
    tipoRadio07: '',
    tipoRadio08: '',
    tipoRadio09: '',
    tipoRadio10: '',
    tipoRadio11: '',
    tipoRadio12: '',
    tipoRadio13: '',
    tipoRadio14: '',
    tipoRadio15: '',
    tipoRadio16: '',
    tipoRadio17: '',
    tipoRadio18: '',
    tipoRadio19: '',
    tipoRadio20: '',
    tipoRadio21: '',
    tipoRadio22: '',
    tipoRadio23: '',
    tipoRadio24: '',
    tipoRadio25: '',
    tipoRadio26: '',
    tipoRadio27: '',
    tipoRadio28: '',
    tipoRadio29: '',
    tipoRadio30: '',
    tipoRadio31: '',
    tipoRadio32: '',
    tipoRadio33: '',
    tipoRadio34: '',
    sectorProductivo: '',
    servicio: '', 
    domicilio: '', 
    biomestre: '',
    numeroEmpleados: '', 
    domicillio: '',
    file1: '', 
    file2: '', 
    actualmente: '', 
    actualmente2: '', 
    sistemaIdentificacion: '', 
    lugarRadicacion: '', 
    sistemaControlInventarios: false, 
    rfcTercero: '', 
    rfc: '', 
    nombre: '', 
    apellidoPaterno: '', 
    apellidoMaterno: '', 
    telefono: '', 
    correoElectronico: '', 
    monto: '', 
    operacionesBancarias: '',
    llavePago: '', 
    modalidad: '', 
    fechaRegistro: '', 
    numeroAutorizacion: '', 
    radioAutorizo: '',
    radioClasificacion: '', 
    caracter: '',
    nacionalidad: '',
    fechaInicio: '',
    fechaPago: '',
    entidadFederativa: '',
    municipio: '',
    tipoDeInstalacion: '',
    registroSESAT: '',
    descripcion: '',
    codigoPostal: ''
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 32606.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32606', resettable: true })
export class Tramite32606Store extends Store<Solicitud32606State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

public setTipoRadio01(tipoRadio01: string): void {
  this.update((state) => ({ ...state, tipoRadio01 }));
}

public setTipoRadio02(tipoRadio02: string): void {
  this.update((state) => ({ ...state, tipoRadio02 }));
}

public setTipoRadio03(tipoRadio03: string): void {
  this.update((state) => ({ ...state, tipoRadio03 }));
}

public setTipoRadio04(tipoRadio04: string): void {
  this.update((state) => ({ ...state, tipoRadio04 }));
}

public setTipoRadio05(tipoRadio05: string): void {
  this.update((state) => ({ ...state, tipoRadio05 }));
}

public setTipoRadio06(tipoRadio06: string): void {
  this.update((state) => ({ ...state, tipoRadio06 }));
}

public setTipoRadio07(tipoRadio07: string): void {
  this.update((state) => ({ ...state, tipoRadio07 }));
}

public setTipoRadio08(tipoRadio08: string): void {
  this.update((state) => ({ ...state, tipoRadio08 }));
}

public setTipoRadio09(tipoRadio09: string): void {
  this.update((state) => ({ ...state, tipoRadio09 }));
}

public setTipoRadio10(tipoRadio10: string): void {
  this.update((state) => ({ ...state, tipoRadio10 }));
}

public setTipoRadio11(tipoRadio11: string): void {
  this.update((state) => ({ ...state, tipoRadio11 }));
}

public setTipoRadio12(tipoRadio12: string): void {
  this.update((state) => ({ ...state, tipoRadio12 }));
}

public setTipoRadio13(tipoRadio13: string): void {
  this.update((state) => ({ ...state, tipoRadio13 }));
}

public setTipoRadio14(tipoRadio14: string): void {
  this.update((state) => ({ ...state, tipoRadio14 }));
}

public setTipoRadio15(tipoRadio15: string): void {
  this.update((state) => ({ ...state, tipoRadio15 }));
}

public setTipoRadio16(tipoRadio16: string): void {
  this.update((state) => ({ ...state, tipoRadio16 }));
}

public setTipoRadio17(tipoRadio17: string): void {
  this.update((state) => ({ ...state, tipoRadio17 }));
}

public setTipoRadio18(tipoRadio18: string): void {
  this.update((state) => ({ ...state, tipoRadio18 }));
}

public setTipoRadio19(tipoRadio19: string): void {
  this.update((state) => ({ ...state, tipoRadio19 }));
}

public setTipoRadio20(tipoRadio20: string): void {
  this.update((state) => ({ ...state, tipoRadio20 }));
}

public setTipoRadio21(tipoRadio21: string): void {
  this.update((state) => ({ ...state, tipoRadio21 }));
}

public setTipoRadio22(tipoRadio22: string): void {
  this.update((state) => ({ ...state, tipoRadio22 }));
}

public setTipoRadio23(tipoRadio23: string): void {
  this.update((state) => ({ ...state, tipoRadio23 }));
}

public setTipoRadio24(tipoRadio24: string): void {
  this.update((state) => ({ ...state, tipoRadio24 }));
}

public setTipoRadio25(tipoRadio25: string): void {
  this.update((state) => ({ ...state, tipoRadio25 }));
}

public setTipoRadio26(tipoRadio26: string): void {
  this.update((state) => ({ ...state, tipoRadio26 }));
}

public setTipoRadio27(tipoRadio27: string): void {
  this.update((state) => ({ ...state, tipoRadio27 }));
}

public setTipoRadio28(tipoRadio28: string): void {
  this.update((state) => ({ ...state, tipoRadio28 }));
}

public setTipoRadio29(tipoRadio29: string): void {
  this.update((state) => ({ ...state, tipoRadio29 }));
}

public setTipoRadio30(tipoRadio30: string): void {
  this.update((state) => ({ ...state, tipoRadio30 }));
}

public setTipoRadio31(tipoRadio31: string): void {
  this.update((state) => ({ ...state, tipoRadio31 }));
}

public setTipoRadio32(tipoRadio32: string): void {
  this.update((state) => ({ ...state, tipoRadio32 }));
}

public setTipoRadio33(tipoRadio33: string): void {
  this.update((state) => ({ ...state, tipoRadio33 }));
}

public setTipoRadio34(tipoRadio34: string): void {
  this.update((state) => ({ ...state, tipoRadio34 }));
}

public setSectorProductivo(sectorProductivo: string): void {
  this.update((state) => ({ ...state, sectorProductivo }));
}

public setServicio(servicio: string): void {
  this.update((state) => ({ ...state, servicio }));
}

public setDomicilio(domicilio: string): void {
  this.update((state) => ({ ...state, domicilio }));
}

public setBiomestre(biomestre: string): void {
  this.update((state) => ({ ...state, biomestre }));
}

public setNumeroEmpleados(numeroEmpleados: string): void {
  this.update((state) => ({ ...state, numeroEmpleados }));
}

public setDomicillio(domicillio: string): void {
  this.update((state) => ({ ...state, domicillio }));
}

public setFile1(file1: string): void {
  this.update((state) => ({ ...state, file1 }));
}

public setFile2(file2: string): void {
  this.update((state) => ({ ...state, file2 }));
}

public setActualmente(actualmente: string): void {
  this.update((state) => ({ ...state, actualmente }));
}

public setActualmente2(actualmente2: string): void {
  this.update((state) => ({ ...state, actualmente2 }));
}

public setSistemaIdentificacion(sistemaIdentificacion: string): void {
  this.update((state) => ({ ...state, sistemaIdentificacion }));
}

public setLugarRadicacion(lugarRadicacion: string): void {
  this.update((state) => ({ ...state, lugarRadicacion }));
}

public setSistemaControlInventarios(sistemaControlInventarios: boolean): void {
  this.update((state) => ({ ...state, sistemaControlInventarios }));
}

public setRfcTercero(rfcTercero: string): void {
  this.update((state) => ({ ...state, rfcTercero }));
}

public setRfc(rfc: string): void {
  this.update((state) => ({ ...state, rfc }));
}

public setNombre(nombre: string): void {
  this.update((state) => ({ ...state, nombre }));
}

public setApellidoPaterno(apellidoPaterno: string): void {
  this.update((state) => ({ ...state, apellidoPaterno }));
}

public setApellidoMaterno(apellidoMaterno: string): void {
  this.update((state) => ({ ...state, apellidoMaterno }));
}

public setTelefono(telefono: string): void {
  this.update((state) => ({ ...state, telefono }));
}

public setCorreoElectronico(correoElectronico: string): void {
  this.update((state) => ({ ...state, correoElectronico }));
}

public setMonto(monto: string): void {
  this.update((state) => ({ ...state, monto }));
}

public setOperacionesBancarias(operacionesBancarias: string): void {
  this.update((state) => ({ ...state, operacionesBancarias }));
}

public setLlavePago(llavePago: string): void {
  this.update((state) => ({ ...state, llavePago }));
}

public setModalidad(modalidad: string): void {
  this.update((state) => ({ ...state, modalidad }));
}

public setFechaRegistro(fechaRegistro: string): void {
  this.update((state) => ({ ...state, fechaRegistro }));
}

public setNumeroAutorizacion(numeroAutorizacion: string): void {
  this.update((state) => ({ ...state, numeroAutorizacion }));
}

public setRadioAutorizo(radioAutorizo: string): void {
  this.update((state) => ({ ...state, radioAutorizo }));
}

public setRadioClasificacion(radioClasificacion: string): void {
  this.update((state) => ({ ...state, radioClasificacion }));
}

public setCaracter(caracter: string): void {
  this.update((state) => ({ ...state, caracter }));
}

public setNacionalidad(nacionalidad: string): void {
  this.update((state) => ({ ...state, nacionalidad }));
}

public setFechaInicio(fechaInicio: string): void {
  this.update((state) => ({ ...state, fechaInicio }));
}

public setFechaPago(fechaPago: string): void {
  this.update((state) => ({ ...state, fechaPago }));
}

public setEntidadFederativa(entidadFederativa: string): void {
  this.update((state) => ({ ...state, entidadFederativa }));
}

public setMunicipio(municipio: string): void {
  this.update((state) => ({ ...state, municipio }));
}

public setTipoDeInstalacion(tipoDeInstalacion: string): void {
  this.update((state) => ({ ...state, tipoDeInstalacion }));
}

public setRegistroSESAT(registroSESAT: string): void {
  this.update((state) => ({ ...state, registroSESAT }));
}

public setDescripcion(descripcion: string): void {
  this.update((state) => ({ ...state, descripcion }));
}

public setCodigoPostal(codigoPostal: string): void {
  this.update((state) => ({ ...state, codigoPostal }));
}
/**
 * Restaura el estado al valor inicial.
 */
public limpiarSolicitud(): void {
  this.reset();
  }
}