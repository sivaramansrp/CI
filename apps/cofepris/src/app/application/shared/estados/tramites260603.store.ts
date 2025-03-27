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


  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal
    }));
  }

  public setEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }
  public setMunicipio(municipio: string): void {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }
  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setScian(scian: string): void {
    this.update((state) => ({
      ...state,
      scian,
    }));
  }

  public setAviso(aviso: string): void {
    this.update((state) => ({
      ...state,
      aviso,
    }));
  }

  public setNoLicenciaSanitaria(noLicenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      noLicenciaSanitaria,
    }));
  }

  public setRegimenDestinado(regimenDestinado: string): void {
    this.update((state) => ({
      ...state,
      regimenDestinado,
    }));
  }

  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setDatosProducto(datosProducto: string): void {
    this.update((state) => ({
      ...state,
      datosProducto,
    }));
  }

  public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string): void {
    this.update((state) => ({
      ...state,
      autorizacionIVAIEPS,
    }));
  }

  public setClaveScian(claveScian: string): void {
    this.update((state) => ({
      ...state,
      claveScian,
    }));
  }

  public setDescripcionScian(descripcionScian: string): void {
    this.update((state) => ({
      ...state,
      descripcionScian,
    }));
  }
  public setClasificacionProducto(clasificacionProducto: string): void {
    this.update((state) => ({
      ...state,
      clasificacionProducto,
    }));
  }

  public setEspecificarClasificacion(especificarClasificacion: string): void {
    this.update((state) => ({
      ...state,
      especificarClasificacion,
    }));
  }

  public setMarcaComercial(marcaComercial: string): void {
    this.update((state) => ({
      ...state,
      marcaComercial,
    }));
  }

  public setDenominacionGenerica(denominacionGenerica: string): void {
    this.update((state) => ({
      ...state,
      denominacionGenerica,
    }));
  }

  public setTipoProducto(tipoProducto: string): void {
    this.update((state) => ({
      ...state,
      tipoProducto,
    }));
  }

  public setEstadoFisico(estadoFisico: string): void {
    this.update((state) => ({
      ...state,
      estadoFisico,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC,
    }));
  }

  public setUmc(umc: string): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  public setPorcentajeConcentracion(porcentajeConcentracion: string): void {
    this.update((state) => ({
      ...state,
      porcentajeConcentracion,
    }));
  }

  public setValorComercial(valorComercial: string): void {
    this.update((state) => ({
      ...state,
      valorComercial,
    }));
  }

  public setFechaMovimiento(fechaMovimiento: string): void {
    this.update((state) => ({
      ...state,
      fechaMovimiento,
    }));
  }

  public setPresentacionFarmaceutica(presentacionFarmaceutica: string): void {
    this.update((state) => ({
      ...state,
      presentacionFarmaceutica,
    }));
  }

  public setPaisDestino(paisDestino: string): void {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  public setPaisProcedencia(paisProcedencia: string): void {
    this.update((state) => ({
      ...state,
      paisProcedencia,
    }));
  }
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }
  /**
* Limpia los datos de la solicitud
*/
  public limpiarSolicitud(): void {
    this.reset();
  }
}
