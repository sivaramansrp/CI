import { Chofer, ChoferesExtranjeros, DatosDelChoferNacional } from '../models/registro-muestras-mercancias.model';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que define el estado de los choferes nacionales y extranjeros.
 */
export interface Choferesnacionales40101State {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  datosDelChoferNacionalAlta: DatosDelChoferNacional[];
  datosDelChoferNacionalModification: DatosDelChoferNacional[];
  datosDelChoferNacionalRetirada: DatosDelChoferNacional[];

  datosDelChoferExtranjerosAlta: ChoferesExtranjeros[];
  datosDelChoferExtranjerosModification: ChoferesExtranjeros[];
  datosDelChoferExtranjerosRetirada: ChoferesExtranjeros[];
}

/**
 * Crea el estado inicial de los choferes nacionales y extranjeros.
 * @returns El estado inicial.
 */
export function createChoferState(): Choferesnacionales40101State {
  return {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',

    datosDelChoferNacionalAlta: [],
    datosDelChoferNacionalModification: [],
    datosDelChoferNacionalRetirada: [],

    datosDelChoferExtranjerosAlta: [],
    datosDelChoferExtranjerosModification: [],
    datosDelChoferExtranjerosRetirada: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40101', resettable: true })
export class Chofer40101Store extends Store<Choferesnacionales40101State> {
  constructor() {
    super(createChoferState());
  }

  /**
   * Establece la lista de choferes nacionales.
   * @param nacionalArray La lista de choferes nacionales.
   * @returns void
   */
  set(nacionalArray: Chofer[]): void {
    this.update((state) => ({
      ...state,
      choferes: nacionalArray,
    }));
  }

  /**
   * Establece el CURP del chofer.
   * @param curp El CURP del chofer.
   * @returns void
   */
  public setCurp(curp: string): void {
    this.update((state) => ({
      ...state,
      curp,
    }));
  }

  public setMunicipioAlcaldia(municipioAlcaldia: string): void {
    this.update((state) => ({
      ...state,
      municipioAlcaldia,
    }));
  }

  /**
   * Establece el primer apellido del chofer.
   * @param primerApellido El primer apellido del chofer.
   * @returns void
   */
  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  /**
   * Establece el RFC del chofer.
   * @param rfc El RFC del chofer.
   * @returns void
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece el correo electrónico del chofer.
   * @param correoElectronico El correo electrónico del chofer.
   * @returns void
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Establece el país de residencia del chofer.
   * @param paisDeResidencia El país de residencia del chofer.
   * @returns void
   */
  public setPaisDeResidencia(paisDeResidencia: string): void {
    this.update((state) => ({
      ...state,
      paisDeResidencia,
    }));
  }

  /**
   * Establece el segundo apellido del chofer.
   * @param segundoApellido El segundo apellido del chofer.
   * @returns void
   */
  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  /**
   * Establece el apellido paterno del chofer.
   * @param apellidoPaterno El apellido paterno del chofer.
   * @returns void
   */
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({ ...state, apellidoPaterno }));
  }

  /**
   * Establece el apellido materno del chofer nacional.
   * @param apellidoMaternoCHN El apellido materno del chofer nacional.
   * @returns void
   */
  public setApellidoMaternoCHN(apellidoMaternoCHN: string): void {
    this.update((state) => ({ ...state, apellidoMaternoCHN }));
  }

  /**
   * Establece el gafete del chofer.
   * @param gafete El gafete del chofer.
   * @returns void
   */
  public setGafete(gafete: string): void {
    this.update((state) => ({ ...state, gafete }));
  }

  /**
   * Establece la vigencia del gafete del chofer.
   * @param vigenciagafete La vigencia del gafete.
   * @returns void
   */
  public setVigenciaGafete(vigenciagafete: string): void {
    this.update((state) => ({ ...state, vigenciagafete }));
  }

  /**
   * Establece la calle del domicilio del chofer.
   * @param calle La calle del domicilio.
   * @returns void
   */
  public setCalle(calle: string): void {
    this.update((state) => ({ ...state, calle }));
  }

  /**
   * Establece el número exterior del domicilio del chofer.
   * @param numeroExterior El número exterior del domicilio.
   * @returns void
   */
  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({ ...state, numeroExterior }));
  }

  /**
   * Establece el número interior del domicilio del chofer.
   * @param numeroInterior El número interior del domicilio.
   * @returns void
   */
  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({ ...state, numeroInterior }));
  }

  /**
   * Establece la ciudad del domicilio del chofer.
   * @param ciudad La ciudad del domicilio.
   * @returns void
   */
  public setCiudad(ciudad: string): void {
    this.update((state) => ({ ...state, ciudad }));
  }

  /**
   * Establece la localidad del domicilio del chofer.
   * @param localidad La localidad del domicilio.
   * @returns void
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({ ...state, localidad }));
  }

  /**
   * Establece el código postal del domicilio del chofer.
   * @param codigoPostal El código postal del domicilio.
   * @returns void
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({ ...state, codigoPostal }));
  }

  /**
   * Establece el país del chofer nacional.
   * @param paisChn El país del chofer nacional.
   * @returns void
   */
  public setPaisChn(paisChn: string): void {
    this.update((state) => ({ ...state, paisChn }));
  }

  /**
   * Establece el estado del control del chofer.
   * @param estadoControl El estado del control.
   * @returns void
   */
  public setEstadoControl(estadoControl: string): void {
    this.update((state) => ({ ...state, estadoControl }));
  }

  /**
   * Establece el número del seguro social del chofer.
   * @param numerodelsegurosocial El número del seguro social.
   * @returns void
   */
  public setNumeroDelSeguroSocial(numerodelsegurosocial: string): void {
    this.update((state) => ({ ...state, numerodelsegurosocial }));
  }

  /**
   * Establece la entidad federativa del chofer nacional.
   * @param entidadFederativaCHN La entidad federativa del chofer nacional.
   * @returns void
   */
  public setEntidadFederativaCHN(entidadFederativaCHN: string): void {
    this.update((state) => ({ ...state, entidadFederativaCHN }));
  }

  /**
   * Establece la delegación del chofer nacional.
   * @param delegacionCHN La delegación del chofer nacional.
   * @returns void
   */
  public setDelegacionCHN(delegacionCHN: string): void {
    this.update((state) => ({ ...state, delegacionCHN }));
  }

  /**
   * Establece la colonia del chofer nacional.
   * @param coloniaCHN La colonia del chofer nacional.
   * @returns void
   */
  public setColoniaCHN(coloniaCHN: string): void {
    this.update((state) => ({ ...state, coloniaCHN }));
  }

  /**
   * Establece el país de origen del chofer nacional.
   * @param paisOrigenCHN El país de origen del chofer nacional.
   * @returns void
   */
  public setPaisOrigenCHN(paisOrigenCHN: string): void {
    this.update((state) => ({ ...state, paisOrigenCHN }));
  }

  /**
   * Establece el correo electrónico del chofer.
   * @param correo El correo electrónico del chofer.
   * @returns void
   */
  public setCorreo(correo: string): void {
    this.update((state) => ({ ...state, correo }));
  }

  /**
   * Establece el número de teléfono del chofer.
   * @param telefono El número de teléfono del chofer.
   * @returns void
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({ ...state, telefono }));
  }

  /**
   * Establece el apellido materno del chofer extranjero.
   * @param apellidoMaternoCHE El apellido materno del chofer extranjero.
   * @returns void
   */
  public setApellidoMaternoCHE(apellidoMaternoCHE: string): void {
    this.update((state) => ({ ...state, apellidoMaternoCHE }));
  }

  /**
   * Establece la nacionalidad del chofer extranjero.
   * @param nacionalidadCHE La nacionalidad del chofer extranjero.
   * @returns void
   */
  public setNacionalidadCHE(nacionalidadCHE: string): void {
    this.update((state) => ({ ...state, nacionalidadCHE }));
  }

  /**
   * Establece el número de seguro social del chofer extranjero.
   * @param nss El número de seguro social del chofer extranjero.
   * @returns void
   */
  public setNss(nss: string): void {
    this.update((state) => ({ ...state, nss }));
  }

  /**
   * Establece el identificador fiscal del chofer extranjero.
   * @param ideFiscal El identificador fiscal del chofer extranjero.
   * @returns void
   */
  public setIdeFiscal(ideFiscal: string): void {
    this.update((state) => ({ ...state, ideFiscal }));
  }

  /**
   * Establece el país del chofer extranjero.
   * @param paisCHE El país del chofer extranjero.
   * @returns void
   */
  public setPaisCHE(paisCHE: string): void {
    this.update((state) => ({ ...state, paisCHE }));
  }

  /**
   * Establece la entidad federativa del chofer extranjero.
   * @param entidadFederativaCHE La entidad federativa del chofer extranjero.
   * @returns void
   */
  public setEntidadFederativaCHE(entidadFederativaCHE: string): void {
    this.update((state) => ({ ...state, entidadFederativaCHE }));
  }

  /**
   * Establece el país de origen del chofer extranjero.
   * @param paisOrigenCHE El país de origen del chofer extranjero.
   * @returns void
   */
  public setPaisOrigenCHE(paisOrigenCHE: string): void {
    this.update((state) => ({ ...state, paisOrigenCHE }));
  }

  /**
   * Establece el apellido paterno del chofer.
   * @param apellidoPaternos El apellido paterno del chofer.
   * @returns void
   */
  public setApellidoPaternos(apellidoPaternos: string): void {
    this.update((state) => ({ ...state, apellidoPaternos }));
  }

  /**
   * Establece los nombres del chofer.
   * @param nombres Los nombres del chofer.
   * @returns void
   */
  public setNombres(nombres: string): void {
    this.update((state) => ({ ...state, nombres }));
  }

  /**
   * Establece el nombre del chofer.
   * @param nombre El nombre del chofer.
   * @returns void
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({ ...state, nombre }));
  }

  /**
   * Establece la lista de vehículos.
   * @param vehiculosArray La lista de vehículos.
   * @returns void
   */
  setVehiculos(vehiculosArray: string[]): void {
    this.update((state) => ({
      ...state,
      vehiculos: [...vehiculosArray],
    }));
  }

  /**
   * Establece la lista de unidades de arrastre.
   * @param unidadesdearrastreArray La lista de unidades de arrastre.
   * @returns void
   */
  setUnidadesdeArrastre(unidadesdearrastreArray: string[]): void {
    this.update((state) => ({
      ...state,
      unidadesdearrastre: unidadesdearrastreArray,
    }));
  }

  /**
   * Establece el tipo de vehículo de la solicitud.
   * @param solicitudVehiculo El tipo de vehículo de la solicitud.
   * @returns void
   */
  public setsolicitudVehiculoTipoVehiculo(solicitudVehiculo: string): void {
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }

  /**
   * Establece el país emisor del vehículo de la solicitud.
   * @param solicitudVehiculo El país emisor del vehículo de la solicitud.
   * @returns void
   */
  public setsolicitudVehiculoPaisEmisor(solicitudVehiculo: string): void {
    this.update((state) => ({
      ...state,
      solicitudVehiculo,
    }));
  }

  /**
   * Establece el color del vehículo de la solicitud.
   * @param vehiculoColor El color del vehículo de la solicitud.
   * @returns void
   */
  public solicitudVehiculoColor(vehiculoColor: string): void {
    this.update((state) => ({
      ...state,
      vehiculoColor,
    }));
  }

  /**
   * Establece el país emisor de la segunda placa del vehículo.
   * @param PaisEmisor2daPlaca El país emisor de la segunda placa del vehículo.
   * @returns void
   */
  public VehiculoPaisEmisor2daPlaca(PaisEmisor2daPlaca: string): void {
    this.update((state) => ({
      ...state,
      PaisEmisor2daPlaca,
    }));
  }

  /**
   * Establece el año del vehículo.
   * @param VehiculoVEH El año del vehículo.
   * @returns void
   */
  public setanioVehiculoVEH(VehiculoVEH: string): void {
    this.update((state) => ({
      ...state,
      VehiculoVEH,
    }));
  }

  /**
   * Establece la lista de estados.
   * @param estado La lista de estados.
   * @returns void
   */
  setEstado(estado: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Guarda un elemento por cada sección que se encuentre.
   * @param seccion La validación de la sección.
   * @returns void
   */
  public establecerSeccion(seccion: boolean[]): void {
    this.update((state) => ({
      ...state,
      seccion,
    }));
  }

  /**
   * Agrega elementos por cada sección indicando si el formulario es válido o no.
   * @param formaValida La validación del formulario.
   * @returns void
   */
  public establecerFormaValida(formaValida: boolean[]): void {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }

  /**
   * Limpia la lista de choferes.
   * @returns void
   */
  public clearChoferes(): void {
    this.reset();
  }
}
