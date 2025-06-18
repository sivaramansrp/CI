/**
 * @module Agregar220401Store
 * @description Módulo que define el estado y las acciones para la solicitud 220401.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';

/**
 * @interface solicitud220401State
 * @description Interfaz que define la estructura del estado para la solicitud 220401.
 */

/**
 * Interfaz que define el estado de la solicitud 220401.
 */

export interface solicitud220401State {
  /** Certificación asociada a la solicitud. */
  certificada: string;

  /** Identificación del medio de transporte. */
  identificationDelTransporte: string;

  /** Estado seleccionado, obtenido de un catálogo de respuestas. */
  selectedEstado: CatalogoResponse | null;

  /** Número de contenedor para el transporte de la mercancía. */
  numerodeContenedor: string;

  /** Fecha de embarque de la mercancía. */
  fechdeEmbarque: string;

  /** Número de flejes de seguridad. */
  numerodeFlejes: string;

  /** Datos del certificado asociado a la solicitud. */
  datoscertificado: string;

  /** Fracción arancelaria correspondiente a la mercancía. */
  fraccionArancelaria: string;

  /** Fecha de caducidad de la mercancía o certificado. */
  fechaCaducidad: string;

  /** Nombre o identificación del animal o producto. */
  nombreIdentificacion: string;

  /** Raza del animal, en caso de aplicar. */
  raza: string;

  /** Edad del animal, si corresponde. */
  edadAnimal: string;

  /** Color del animal o producto, si aplica. */
  color: string;

  /** Número de autorización CITES, si es necesario. */
  numeroAutorizacionCITES: string;

  /** Aduana de ingreso o salida de la mercancía. */
  aduana: string;

  /** Código OSIA asociado a la solicitud. */
  osia: string;

  /** Sexo del animal, si aplica. */
  sexo: string;

  /** Otro dato relevante, si no existe un campo específico. */
  otro: string;

  /** Punto de ingreso al país o región. */
  puntoIngreso: string;

  /** Nombre del establecimiento donde se realiza la verificación. */
  nombreEstablecimientoCheck: string;

  /** Número de autorización del establecimiento. */
  numeroAutorizacionCheck: string;

  /** Tipo de actividad realizada en el establecimiento. */
  tipoActividadCheck: string;

  /** Otro dato relevante para la verificación. */
  otroCheck: string;

  /** Fecha estimada de arribo de la mercancía o animales. */
  fechaArribo: string;

  /** Justificación de la solicitud, si es necesaria. */
  Justificacion: string;

  /** Indica si la solicitud está exenta de pago. */
  exentoDePago: string;

  /** Llave o referencia del pago realizado. */
  llaveDePago: string;

  /** Fecha en la que se realizó el pago. */
  fechaPago: string;

  Banco:string;
  especie:string;
  funcionZootecnica:string;
  mercancia:string;
  paisDestino:string;
  nombreEstablecimiento:string;
  tipoActividad:string;
  aduanaSalida:string;
  oisaSalida:string;
  regimenMercancia:string;
  paisOrigen:string;
  exentoPago:string;
  tratamiento:string;
  presentacion:string;
  marcaEmbarque:string;
  
  /** Tipo de transporte utilizado para la mercancía o animales. */
  tipoDeTransporte: string;
}

/**
 * @function createInitialState
 * @description Función que crea el estado inicial para la solicitud 220401.
 * @returns {solicitud220401State} El estado inicial.
 */
export function createInitialState(): solicitud220401State {
  return {
  
   /** Certificación asociada a la solicitud. */
    certificada: '',

    /** Identificación del medio de transporte. */
    identificationDelTransporte: '',
  
    /** Estado seleccionado, obtenido de un catálogo de respuestas. */
    selectedEstado: null,
  
    /** Número de contenedor para el transporte de la mercancía. */
    numerodeContenedor: '',
  
    /** Fecha de embarque de la mercancía. */
    fechdeEmbarque: '',
  
    /** Número de flejes de seguridad. */
    numerodeFlejes: '',
  
    /** Datos del certificado asociado a la solicitud. */
    datoscertificado: '',
  
    /** Fracción arancelaria correspondiente a la mercancía. */
    fraccionArancelaria: '',
  
    /** Fecha de caducidad de la mercancía o certificado. */
    fechaCaducidad: '',
  
    /** Nombre o identificación del animal o producto. */
    nombreIdentificacion: '',
  
    /** Raza del animal, en caso de aplicar. */
    raza: '',
  
    /** Edad del animal, si corresponde. */
    edadAnimal: '',
  
    /** Color del animal o producto, si aplica. */
    color: '',
  
    /** Número de autorización CITES, si es necesario. */
    numeroAutorizacionCITES: '',
  
    /** Aduana de ingreso o salida de la mercancía. */
    aduana: '',
  
    /** Código OSIA asociado a la solicitud. */
    osia: '',
  
    /** Sexo del animal, si aplica. */
    sexo: '',
  
    /** Otro dato relevante, si no existe un campo específico. */
    otro: '',
  
    /** Punto de ingreso al país o región. */
    puntoIngreso: '',
  
    /** Nombre del establecimiento donde se realiza la verificación. */
    nombreEstablecimientoCheck: '',
  
    /** Número de autorización del establecimiento. */
    numeroAutorizacionCheck: '',
  
    /** Tipo de actividad realizada en el establecimiento. */
    tipoActividadCheck: '',
  
    /** Otro dato relevante para la verificación. */
    otroCheck: '',
  
    /** Fecha estimada de arribo de la mercancía o animales. */
    fechaArribo: '',
  
    /** Justificación de la solicitud, si es necesaria. */
    Justificacion: '',
  
    /** Indica si la solicitud está exenta de pago. */
    exentoDePago: '',
  
    /** Llave o referencia del pago realizado. */
    llaveDePago: '',
  
    /** Fecha en la que se realizó el pago. */
    fechaPago: '',
    Banco:'',
    especie:'',
    funcionZootecnica:'',
    mercancia:'',
    paisDestino:'',
    nombreEstablecimiento:'',
    tipoActividad:'',
    aduanaSalida:'',
    oisaSalida:'',
    regimenMercancia:'',
    paisOrigen:'',
    exentoPago:'',
    tipoDeTransporte:'',
    tratamiento:'',
    presentacion:'',
    marcaEmbarque:''
  };
  
}

/**
 * @class Agregar220401Store
 * @extends {Store<solicitud220401State>}
 * @description Clase que maneja el estado y las acciones para la solicitud 220401.
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'agregar220401', resettable: true })
export class Agregar220401Store extends Store<solicitud220401State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setCertificada
   * @description Establece el valor de 'certificada'.
   * @param {string} certificada - El valor de 'certificada'.
   */
  public setCertificada(certificada: string) {
    this.update((state) => ({
      ...state,
      certificada,
    }));
  }

  /**
   * @method setidentificationDelTransporte
   * @description Establece el valor de 'identificationDelTransporte'.
   * @param {string} identificationDelTransporte - El valor de 'identificationDelTransporte'.
   */
  public setidentificationDelTransporte(identificationDelTransporte: string) {
    this.update((state) => ({
      ...state,
      identificationDelTransporte,
    }));
  }

  /**
   * @method setJustification
   * @description Establece el valor de 'selectedEstado'.
   * @param {CatalogoResponse} selectedEstado - El valor de 'selectedEstado'.
   */
  public setJustification(selectedEstado: CatalogoResponse) {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }

  /**
   * @method setnumerodeContenedor
   * @description Establece el valor de 'numerodeContenedor'.
   * @param {string} numerodeContenedor - El valor de 'numerodeContenedor'.
   */
  public setnumerodeContenedor(numerodeContenedor: string) {
    this.update((state) => ({
      ...state,
      
      numerodeContenedor,
    }));
  }

  /**
   * @method setfetchdeEmbarque
   * @description Establece el valor de 'fechdeEmbarque'.
   * @param {string} fechdeEmbarque - El valor de 'fechdeEmbarque'.
   */
  public setfetchdeEmbarque(fechdeEmbarque: string) {
    this.update((state) => ({
      ...state,
      fechdeEmbarque,
    }));
  }

  /**
   * @method setnumerodeFlejes
   * @description Establece el valor de 'numerodeFlejes'.
   * @param {string} numerodeFlejes - El valor de 'numerodeFlejes'.
   */
  public setnumerodeFlejes(numerodeFlejes: string) {
    this.update((state) => ({
      ...state,
      numerodeFlejes,
    }));
  }

  /**
   * @method setdatoscertificado
   * @description Establece el valor de 'datoscertificado'.
   * @param {string} datoscertificado - El valor de 'datoscertificado'.
   */
  public setdatoscertificado(datoscertificado: string) {
    this.update((state) => ({
      ...state,
      datoscertificado,
    }));
  }

  /**
   * @method setfraccionArancelaria
   * @description Establece el valor de 'fraccionArancelaria'.
   * @param {string} fraccionArancelaria - El valor de 'fraccionArancelaria'.
   */
  public setfraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * @method setfechaCaducidad
   * @description Establece el valor de 'fechaCaducidad'.
   * @param {string} fechaCaducidad - El valor de 'fechaCaducidad'.
   */
  public setfechaCaducidad(fechaCaducidad: string) {
    this.update((state) => ({
      ...state,
      fechaCaducidad,
    }));
  }

  /**
   * @method setnombreIdentificacion
   * @description Establece el valor de 'nombreIdentificacion'.
   * @param {string} nombreIdentificacion - El valor de 'nombreIdentificacion'.
   */
  public setnombreIdentificacion(nombreIdentificacion: string) {
    this.update((state) => ({
      ...state,
      nombreIdentificacion,
    }));
  }

  /**
   * @method setraza
   * @description Establece el valor de 'raza'.
   * @param {string} raza - El valor de 'raza'.
   */
  public setraza(raza: string) {
    this.update((state) => ({
      ...state,
      raza,
    }));
  }

  /**
   * @method setedadAnimal
   * @description Establece el valor de 'edadAnimal'.
   * @param {string} edadAnimal - El valor de 'edadAnimal'.
   */
  public setedadAnimal(edadAnimal: string) {
    this.update((state) => ({
      ...state,
      edadAnimal,
    }));
  }

  /**
   * @method setcolor
   * @description Establece el valor de 'color'.
   * @param {string} color - El valor de 'color'.
   */
  public setcolor(color: string) {
    this.update((state) => ({
      ...state,
      color,
    }));
  }

  /**
   * @method setnumeroAutorizacionCITES
   * @description Establece el valor de 'numeroAutorizacionCITES'.
   * @param {string} numeroAutorizacionCITES - El valor de 'numeroAutorizacionCITES'.
   */
  public setnumeroAutorizacionCITES(numeroAutorizacionCITES: string) {
    this.update((state) => ({
      ...state,
      numeroAutorizacionCITES,
    }));
  }

  /**
   * @method setaduana
   * @description Establece el valor de 'aduana'.
   * @param {string} aduana - El valor de 'aduana'.
   */
  public setaduana(aduana: string) {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
   * @method setosia
   * @description Establece el valor de 'osia'.
   * @param {string} osia - El valor de 'osia'.
   */
  public setosia(osia: string) {
    this.update((state) => ({
      ...state,
      osia,
    }));
  }

  /**
   * @method setsexo
   * @description Establece el valor de 'sexo'.
   * @param {string} sexo - El valor de 'sexo'.
   */
  public setsexo(sexo: string) {
    this.update((state) => ({
      ...state,
      sexo,
    }));
  }

  /**
   * @method setotro
   * @description Establece el valor de 'otro'.
   * @param {string} otro - El valor de 'otro'.
   */
  public setotro(otro: string) {
    this.update((state) => ({
      ...state,
      otro,
    }));
  }

  /**
   * @method setpuntoIngreso
   * @description Establece el valor de 'puntoIngreso'.
   * @param {string} puntoIngreso - El valor de 'puntoIngreso'.
   */
  public setpuntoIngreso(puntoIngreso: string) {
    this.update((state) => ({
      ...state,
      puntoIngreso,
    }));
  }

  /**
   * @method setnombreEstablecimientoCheck
   * @description Establece el valor de 'nombreEstablecimientoCheck'.
   * @param {string} nombreEstablecimientoCheck - El valor de 'nombreEstablecimientoCheck'.
   */
  public setnombreEstablecimientoCheck(nombreEstablecimientoCheck: string) {
    this.update((state) => ({
      ...state,
      nombreEstablecimientoCheck,
    }));
  }

  /**
   * @method setnumeroAutorizacionCheck
   * @description Establece el valor de 'numeroAutorizacionCheck'.
   * @param {string} numeroAutorizacionCheck - El valor de 'numeroAutorizacionCheck'.
   */
  public setnumeroAutorizacionCheck(numeroAutorizacionCheck: string) {
    this.update((state) => ({
      ...state,
      numeroAutorizacionCheck,
    }));
  }

  /**
   * @method settipoActividadCheck
   * @description Establece el valor de 'tipoActividadCheck'.
   * @param {string} tipoActividadCheck - El valor de 'tipoActividadCheck'.
   */
  public settipoActividadCheck(tipoActividadCheck: string) {
    this.update((state) => ({
      ...state,
      tipoActividadCheck,
    }));
  }

  /**
   * @method setotroCheck
   * @description Establece el valor de 'otroCheck'.
   * @param {string} otroCheck - El valor de 'otroCheck'.
   */
  public setotroCheck(otroCheck: string) {
    this.update((state) => ({
      ...state,
      otroCheck,
    }));
  }

  /**
   * @method setfechaArribo
   * @description Establece el valor de 'fechaArribo'.
   * @param {string} fechaArribo - El valor de 'fechaArribo'.
   */
  public setfechaArribo(fechaArribo: string) {
    this.update((state) => ({
      ...state,
      fechaArribo,
    }));
  }

  /**
   * @method setJustificacion
   * @description Establece el valor de 'Justificacion'.
   * @param {string} Justificacion - El valor de 'Justificacion'.
   */
  public setJustificacion(Justificacion: string) {
    this.update((state) => ({
      ...state,
      Justificacion,
    }));
  }

  /**
   * @method setexentoDePago
   * @description Establece el valor de 'exentoDePago'.
   * @param {string} exentoDePago - El valor de 'exentoDePago'.
   */
  public setexentoDePago(exentoDePago: string) {
    this.update((state) => ({
      ...state,
      exentoDePago,
    }));
  }

  /**
   * @method setllaveDePago
   * @description Establece el valor de 'llaveDePago'.
   * @param {string} llaveDePago - El valor de 'llaveDePago'.
   */
  public setllaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * @method setfechaPago
   * @description Establece el valor de 'fechaPago'.
   * @param {string} fechaPago - El valor de 'fechaPago'.
   */
  public setfechaPago(fechaPago: string) {
    this.update((state) => ({
      ...state,
      fechaPago,
    }));
  }
  public setBanco(Banco: string) {
    this.update((state) => ({
      ...state,
      Banco,
    }));
  }

  

  public setespecie(especie: string) {
    this.update((state) => ({
      ...state,
      especie,
    }));
  }
public setfuncionZootecnica(funcionZootecnica: string) {
    this.update((state) => ({
      ...state,
      funcionZootecnica,
    }));
  }

  public setmercancia(mercancia: string) {
    this.update((state) => ({
      ...state,
      mercancia,
    }));
  }

  public setpaisDestino(paisDestino: string) {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  public setnombreEstablecimiento(nombreEstablecimiento: string) {
    this.update((state) => ({
      ...state,
      nombreEstablecimiento,
    }));
  }

  public settipoActividad(tipoActividad: string) {
    this.update((state) => ({
      ...state,
      tipoActividad,
    }));
  }

  public setaduanaSalida(aduanaSalida: string) {
    this.update((state) => ({
      ...state,
      aduanaSalida,
    }));
  }
  public setoisaSalida(oisaSalida: string) {
    this.update((state) => ({
      ...state,
      oisaSalida,
    }));
  }

  public setregimenMercancia(regimenMercancia: string) {
    this.update((state) => ({
      ...state,
      regimenMercancia,
    }));
  }
  public setpaisOrigen(paisOrigen: string) {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }
  public setexentoPago(exentoPago: string) {
    this.update((state) => ({
      ...state,
      exentoPago,
    }));
  }
  public settipoDeTransporte(tipoDeTransporte:string) {
    this.update((state) => ({
      ...state,
      tipoDeTransporte,
    }));
  }
  public setTratamiento(tratamiento:string){
    this.update((state)=>({
      ...state,
      tratamiento,
    }))
  }

  public setPresentacion(presentacion:string){
    this.update((state)=>({
      ...state,
      presentacion,
    }))
  }

  public setMarcaEmbarque(marcaEmbarque:string){
    this.update((state)=>({
      ...state,
      marcaEmbarque
    }))
  }
}