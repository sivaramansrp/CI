import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Choferesnacionales40103State {
  choferes: string[];
  choferesExtranjero: string[];
  vehiculos: string[];
  unidadesDeArrastre: string[];
  estado: Catalogo[];
  seccion: boolean[];
  formaValida: boolean[];
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  datosDelChoferNacional: any[];
  PagoDerechosLista:any[];
  curp: string;
  rfc: string;
  // Form Controls
  apellidoPaterno: string;
  apellidoMaternoCHN: string;
  gafete: string;
  vigenciagafete: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  ciudad: string;
  localidad: string;
  codigoPostal: string;
  paisChn: string;
  estadoControl: string;
  numerodelsegurosocial: string;
  entidadFederativaCHN: string;
  delegacionCHN: string;
  coloniaCHN: string;
  paisOrigenCHN: string;
  correo: string;
  telefono: string;
  apellidoMaternoCHE: string;
  nacionalidadCHE: string;
  nss: string;
  ideFiscal: string;
  paisCHE: string;
  entidadFederativaCHE: string;
  paisOrigenCHE: string;
  apellidoPaternos: string;
  nombres: string;
}

export function createChoferState(): Choferesnacionales40103State {
  const STORED_DATA = localStorage.getItem('choferesList');
  return {
    choferes: STORED_DATA ? JSON.parse(STORED_DATA) : [],
    choferesExtranjero: [],
    vehiculos: [],
    unidadesDeArrastre: [],
    estado: [],
    seccion: [],
    formaValida: [],
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    datosDelChoferNacional: [],
    PagoDerechosLista:[],
    curp: '',
    rfc: '',
    apellidoPaterno: '',
    apellidoMaternoCHN: '',
    gafete: '',
    vigenciagafete: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    ciudad: '',
    localidad: '',
    codigoPostal: '',
    paisChn: '',
    estadoControl: '',
    numerodelsegurosocial: '',
    entidadFederativaCHN: '',
    delegacionCHN: '',
    coloniaCHN: '',
    paisOrigenCHN: '',
    correo: '',
    telefono: '',
    apellidoMaternoCHE: '',
    nacionalidadCHE: '',
    nss: '',
    ideFiscal: '',
    paisCHE: '',
    entidadFederativaCHE: '',
    paisOrigenCHE: '',
    apellidoPaternos: '',
    nombres: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40103', resettable: true })
export class Chofer40103Store extends Store<Choferesnacionales40103State> {
  constructor() {
    super(createChoferState());
  }

  /**
   * Establece la lista de choferes nacionales.
   * @param nacionalArray La lista de choferes nacionales.
   */
  set(nacionalArray: string[]) {
    this.update((state) => ({
      ...state,
      choferes: nacionalArray,
    }));
  }

  public setCurp(curp: string): void {
    this.update((state) => ({
      ...state,
      curp,
    }));
  }

  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({ ...state, apellidoPaterno }));
  }

  public setApellidoMaternoCHN(apellidoMaternoCHN: string): void {
    this.update((state) => ({ ...state, apellidoMaternoCHN }));
  }

  public setGafete(gafete: string): void {
    this.update((state) => ({ ...state, gafete }));
  }

  public setVigenciaGafete(vigenciagafete: string): void {
    this.update((state) => ({ ...state, vigenciagafete }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({ ...state, calle }));
  }

  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({ ...state, numeroExterior }));
  }

  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({ ...state, numeroInterior }));
  }

  public setCiudad(ciudad: string): void {
    this.update((state) => ({ ...state, ciudad }));
  }

  public setLocalidad(localidad: string): void {
    this.update((state) => ({ ...state, localidad }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({ ...state, codigoPostal }));
  }

  public setPaisChn(paisChn: string): void {
    this.update((state) => ({ ...state, paisChn }));
  }

  public setEstadoControl(estadoControl: string): void {
    this.update((state) => ({ ...state, estadoControl }));
  }

  public setNumeroDelSeguroSocial(numerodelsegurosocial: string): void {
    this.update((state) => ({ ...state, numerodelsegurosocial }));
  }

  public setEntidadFederativaCHN(entidadFederativaCHN: string): void {
    this.update((state) => ({ ...state, entidadFederativaCHN }));
  }

  public setDelegacionCHN(delegacionCHN: string): void {
    this.update((state) => ({ ...state, delegacionCHN }));
  }

  public setColoniaCHN(coloniaCHN: string): void {
    this.update((state) => ({ ...state, coloniaCHN }));
  }

  public setPaisOrigenCHN(paisOrigenCHN: string): void {
    this.update((state) => ({ ...state, paisOrigenCHN }));
  }

  public setCorreo(correo: string): void {
    this.update((state) => ({ ...state, correo }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({ ...state, telefono }));
  }

  public setApellidoMaternoCHE(apellidoMaternoCHE: string): void {
    this.update((state) => ({ ...state, apellidoMaternoCHE }));
  }

  public setNacionalidadCHE(nacionalidadCHE: string): void {
    this.update((state) => ({ ...state, nacionalidadCHE }));
  }

  public setNss(nss: string): void {
    this.update((state) => ({ ...state, nss }));
  }

  public setIdeFiscal(ideFiscal: string): void {
    this.update((state) => ({ ...state, ideFiscal }));
  }

  public setPaisCHE(paisCHE: string): void {
    this.update((state) => ({ ...state, paisCHE }));
  }

  public setEntidadFederativaCHE(entidadFederativaCHE: string): void {
    this.update((state) => ({ ...state, entidadFederativaCHE }));
  }

  public setPaisOrigenCHE(paisOrigenCHE: string): void {
    this.update((state) => ({ ...state, paisOrigenCHE }));
  }

  public setApellidoPaternos(apellidoPaternos: string): void {
    this.update((state) => ({ ...state, apellidoPaternos }));
  }

  public setNombres(nombres: string): void {
    this.update((state) => ({ ...state, nombres }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({ ...state, nombre }));
  }

  /**
   * Establece la lista de vehículos.
   * @param vehiculosArray La lista de vehículos.
   */
  setVehiculos(vehiculosArray: string[]) {
    this.update((state) => ({
      ...state,
      vehiculos: [...vehiculosArray],
    }));
  }

  /**
   * Establece la lista de unidades de arrastre.
   * @param unidadesdearrastreArray La lista de unidades de arrastre.
   */
  setUnidadesdeArrastre(unidadesdearrastreArray: string[]) {
    this.update((state) => ({
      ...state,
      unidadesdearrastre: unidadesdearrastreArray,
    }));
  }

  /**
   * Establece el tipo de vehículo de la solicitud.
   * @param solicitudVehiculo El tipo de vehículo de la solicitud.
   */
  public setsolicitudVehiculoTipoVehiculo(solicitudVehiculo: string) {
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }

  /**
   * Establece el país emisor del vehículo de la solicitud.
   * @param solicitudVehiculo El país emisor del vehículo de la solicitud.
   */
  public setsolicitudVehiculoPaisEmisor(solicitudVehiculo: string) {
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }

  /**
   * Establece el color del vehículo de la solicitud.
   * @param vehiculoColor El color del vehículo de la solicitud.
   */
  public solicitudVehiculoColor(vehiculoColor: string) {
    this.update((state) => ({
      ...state,
      vehiculoColor,
    }));
  }

  /**
   * Establece el país emisor de la segunda placa del vehículo.
   * @param PaisEmisor2daPlaca El país emisor de la segunda placa del vehículo.
   */
  public VehiculoPaisEmisor2daPlaca(PaisEmisor2daPlaca: string) {
    this.update((state) => ({
      ...state,
      PaisEmisor2daPlaca,
    }));
  }

  /**
   * Establece el año del vehículo.
   * @param VehiculoVEH El año del vehículo.
   */
  public setanioVehiculoVEH(VehiculoVEH: string) {
    this.update((state) => ({
      ...state,
      VehiculoVEH,
    }));
  }

  /**
   * Establece la lista de estados.
   * @param estado La lista de estados.
   */
  setEstado(estado: Catalogo[]) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Guarda un elemento por cada sección que se encuentre.
   * @param seccion La validación de la sección.
   */
  public establecerSeccion(seccion: boolean[]) {
    this.update((state) => ({
      ...state,
      seccion,
    }));
  }

  /**
   * Agrega elementos por cada sección indicando si el formulario es válido o no.
   * @param formaValida La validación del formulario.
   */
  public establecerFormaValida(formaValida: boolean[]) {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }

  /**
   * Limpia la lista de choferes.
   */
  public clearChoferes(): void {
    this.reset();
  }
}
