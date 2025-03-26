/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud260603State {
  denominacion: string;
  correoElectronico: string;
  codigoPostal: string;
  estado: string;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  lada: string;
  telefono: string;
  scian: string;
  aviso: string;
  noLicenciaSanitaria: string;
  regimenDestinado: string;
  aduana: string;
  datosProducto: string;
  autorizacionIVAIEPS: string;
  claveScian: string;
  descripcionScian: string;
  clasificacionProducto: string;
  especificarClasificacion: string;
  marcaComercial: string;
  denominacionGenerica: string;
  tipoProducto: string;
  estadoFisico: string;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidadUMC: string;
  umc: string;
  porcentajeConcentracion: string;
  valorComercial: string;
  fechaMovimiento: string;
  presentacionFarmaceutica: string;
  paisDestino: string;
  paisProcedencia: string;
  rfc: string;
}

export function createInitialState(): Solicitud260603State {
  return {
    denominacion: '',
    correoElectronico: '',
    codigoPostal: '',
    estado: '',
    municipio: '',
    localidad: '',
    colonia: '',
    calle: '',
    lada: '',
    telefono: '',
    scian: '',
    aviso: '',
    noLicenciaSanitaria: '',
    regimenDestinado: '',
    aduana: '',
    datosProducto: '',
    autorizacionIVAIEPS: '',
    claveScian: '',
    descripcionScian: '',
    clasificacionProducto: '',
    especificarClasificacion: '',
    marcaComercial: '',
    denominacionGenerica: '',
    tipoProducto: '',
    estadoFisico: '',
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidadUMC: '',
    umc: '',
    porcentajeConcentracion: '',
    valorComercial: '',
    fechaMovimiento: '',
    presentacionFarmaceutica: '',
    paisDestino: '',
    paisProcedencia: '',
    rfc: ''
  };
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'solicitud260603' })
export class Tramite260603Store extends Store<Solicitud260603State> {
  constructor() {
    super(createInitialState());
  }


  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }
  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setCodigoPostal(codigoPostal: string) {
    this.update((state) => ({
      ...state,
      codigoPostal
    }));
  }

  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }
  public setMunicipio(municipio: string) {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }
  public setLocalidad(localidad: string) {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }
  public setColonia(colonia: string) {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setLada(lada: string) {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setScian(scian: string) {
    this.update((state) => ({
      ...state,
      scian,
    }));
  }

  public setAviso(aviso: string) {
    this.update((state) => ({
      ...state,
      aviso,
    }));
  }

  public setNoLicenciaSanitaria(noLicenciaSanitaria: string) {
    this.update((state) => ({
      ...state,
      noLicenciaSanitaria,
    }));
  }

  public setRegimenDestinado(regimenDestinado: string) {
    this.update((state) => ({
      ...state,
      regimenDestinado,
    }));
  }

  public setAduana(aduana: string) {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setDatosProducto(datosProducto: string) {
    this.update((state) => ({
      ...state,
      datosProducto,
    }));
  }

  public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string) {
    this.update((state) => ({
      ...state,
      autorizacionIVAIEPS,
    }));
  }

  public setClaveScian(claveScian: string) {
    this.update((state) => ({
      ...state,
      claveScian,
    }));
  }

  public setDescripcionScian(descripcionScian: string) {
    this.update((state) => ({
      ...state,
      descripcionScian,
    }));
  }
  public setClasificacionProducto(clasificacionProducto: string) {
    this.update((state) => ({
      ...state,
      clasificacionProducto,
    }));
  }

  public setEspecificarClasificacion(especificarClasificacion: string) {
    this.update((state) => ({
      ...state,
      especificarClasificacion,
    }));
  }

  public setMarcaComercial(marcaComercial: string) {
    this.update((state) => ({
      ...state,
      marcaComercial,
    }));
  }

  public setDenominacionGenerica(denominacionGenerica: string) {
    this.update((state) => ({
      ...state,
      denominacionGenerica,
    }));
  }

  public setTipoProducto(tipoProducto: string) {
    this.update((state) => ({
      ...state,
      tipoProducto,
    }));
  }

  public setEstadoFisico(estadoFisico: string) {
    this.update((state) => ({
      ...state,
      estadoFisico,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  public setCantidadUMC(cantidadUMC: string) {
    this.update((state) => ({
      ...state,
      cantidadUMC,
    }));
  }

  public setUmc(umc: string) {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  public setPorcentajeConcentracion(porcentajeConcentracion: string) {
    this.update((state) => ({
      ...state,
      porcentajeConcentracion,
    }));
  }

  public setValorComercial(valorComercial: string) {
    this.update((state) => ({
      ...state,
      valorComercial,
    }));
  }

  public setFechaMovimiento(fechaMovimiento: string) {
    this.update((state) => ({
      ...state,
      fechaMovimiento,
    }));
  }

  public setPresentacionFarmaceutica(presentacionFarmaceutica: string) {
    this.update((state) => ({
      ...state,
      presentacionFarmaceutica,
    }));
  }

  public setPaisDestino(paisDestino: string) {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  public setPaisProcedencia(paisProcedencia: string) {
    this.update((state) => ({
      ...state,
      paisProcedencia,
    }));
  }
  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }
  /**
* Limpia los datos de la solicitud
*/
  public limpiarSolicitud() {
    this.reset();
  }
}
