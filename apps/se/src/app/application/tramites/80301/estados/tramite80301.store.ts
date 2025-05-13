
/** Importa las funcionalidades básicas del store de Akita */
import { Store, StoreConfig } from '@datorama/akita';

/** Importa el decorador Injectable de Angular */
import { Injectable } from '@angular/core';

/** Interfaz que representa un catálogo con id y descripción */
export interface Catalogo {
  /** Identificador único del elemento del catálogo */
  id: number;

  /** Descripción del elemento del catálogo */
  descripcion: string;
}
/** Interfaz que representa un catálogo con id y descripción */
export interface DatosModificacion {
  /** Identificador único del elemento del catálogo */
  rfc: string;

  /** Descripción del elemento del catálogo */
  federal: string;

  /** Descripción del elemento del catálogo */
  tipo: string;

  
  /** Descripción del elemento del catálogo */
  programa: string;
}



/** Interfaz que define el estado completo del trámite 80301 */
export interface Solicitud80301State {
    datosModificacion:DatosModificacion | null;
 
    /** Número de manifiesto de la solicitud */
    manifesto: string;
  
    /** Identificador único de la solicitud */
    idSolicitud: string;
  
    /** Tipo de solicitud realizada */
    tipoSolicitud: string;
  
    /** Lista de aduanas disponibles o seleccionadas */
    aduana: Catalogo[] | null;
  
    /** Lista de años disponibles o seleccionados */
    ano: Catalogo[] | null;
  
    /** Lista de países disponibles o seleccionados */
    pais: Catalogo[] | null;
  
    /** Lista de condiciones disponibles o seleccionadas */
    condicion: Catalogo[] | null;
  
    /** Lista de tipos de documento disponibles o seleccionados */
    tipoDocumento: Catalogo[] | null;
  
    /** Fechas que el usuario ha seleccionado */
    fechasSeleccionadas: Catalogo[] | null;
  
    /** Lista de fines seleccionados para la solicitud */
    finesElegidos: string[];
  
    /** Elementos elegidos por el usuario */
    elegidosSeleccionados: string[];
  
    /** Rango de días seleccionado por el usuario */
    selectRangoDias: string[];
  
    /** Fechas que forman parte de los datos ingresados */
    fechasDatos: string[];
  
    /** Fecha asignada a la solicitud */
    fecha: string | null;
  
    /** Fecha seleccionada actualmente por el usuario */
    fechaSeleccionada: string | null;
  
    /** Indica si la tabla de datos debe mostrarse */
    showTabla: boolean;
  
    /** Indica si el popup está abierto */
    isPopupOpen: boolean;
  
    /** Indica si el popup está cerrado */
    isPopupClose: boolean;
  
    /** Valor seleccionado en una lista desplegable u otro componente */
    valorSeleccionado: string | null;
  
    /** Nombre del solicitante */
    nombre: string;
  
    /** Tipo de mercancía incluida en la solicitud */
    tipoMercancia: string;
  
    /** Uso específico que se le dará a la mercancía */
    usoEspecifico: string;
  
    /** Marca de la mercancía */
    marca: string;
  
    /** Modelo de la mercancía */
    modelo: string;
  
    /** Número de serie de la mercancía */
    serie: string;
  
    /** Calle del domicilio del solicitante */
    calle: string;
  
    /** Número exterior del domicilio */
    numeroExterior: number;
  
    /** Número interior del domicilio */
    numeroInterior: number;
  
    /** Número de teléfono de contacto */
    telefono: number;
  
    /** Correo electrónico del solicitante */
    correoElectronico: string;
  
    /** Código postal del domicilio */
    codigoPostal: number;
  
    /** Identificador del estado (entidad federativa) */
    estado: number;
  
    /** Identificador de la colonia */
    colonia: number;
  
    /** Opción seleccionada para un campo específico */
    opcion: string;
  
    /** Documentos adjuntos o seleccionados para la solicitud */
    documentos: Catalogo[] | null;
  
    /** Valor que indica el estado del checkbox de la tabla */
    tableCheck: string;
  
    /** Indica si la solicitud es para donación */
    donacion: string;
  
    /** Tipo de persona (física o moral) que realiza la solicitud */
    persona: string;
  
    /** Campo para especificar otra opción no listada */
    otro: string;
  }
  

/** Función que devuelve el estado inicial del trámite 80301 */
export function createInitialState(): Solicitud80301State {
  return {
    datosModificacion: null,
    manifesto: '',
    idSolicitud: '',
    tipoSolicitud: '',
    aduana: null,
    ano: null,
    condicion: null,
    pais: null,
    tipoDocumento: null,
    fechasSeleccionadas: null,
    finesElegidos: [],
    elegidosSeleccionados: [],
    selectRangoDias: [],
    fechasDatos: [],
    fecha: null,
    fechaSeleccionada: null,
    showTabla: true,
    isPopupOpen: false,
    isPopupClose: true,
    valorSeleccionado: null,
    documentos: null,
    nombre: '',
    tipoMercancia: '',
    usoEspecifico: '',
    marca: '',
    modelo: '',
    serie: '',
    calle: '',
    numeroExterior: 0,
    numeroInterior: 0,
    telefono: 0,
    correoElectronico: '',
    codigoPostal: 0,
    estado: 0,
    colonia: 0,
    opcion: '',
    tableCheck: '',
    donacion: '',
    persona: '',
    otro: '',
  };
}

/** Decorador que indica que esta clase es inyectable y estará disponible en la raíz */
@Injectable({
  providedIn: 'root',
})

/** Decorador de configuración para el store, con nombre e indicación de que es reseteable */
@StoreConfig({ name: 'tramite10301', resettable: true })

/** Clase que extiende Store y maneja el estado de Solicitud80301 */
export class Tramite80301Store extends Store<Solicitud80301State> {

  /** Constructor que inicializa el store con el estado inicial */
  constructor() {
    super(createInitialState());
  }

  /** Establece el valor del campo tableCheck */
  public setTableCheck(tableCheck: string): void {
    this.update(state => ({ ...state, tableCheck }));
  }

  /** Establece el valor del campo donacion */
  public setDonacion(donacion: string): void {
    this.update(state => ({ ...state, donacion }));
  }

  /** Establece el valor del campo persona */
  public setPersona(persona: string): void {
    this.update(state => ({ ...state, persona }));
  }

  /** Establece el valor del campo otro */
  public setOtro(otro: string): void {
    this.update(state => ({ ...state, otro }));
  }

  /** Establece el valor del campo manifesto */
  public setManifesto(manifesto: string): void {
    this.update(state => ({ ...state, manifesto }));
  }

  /** Establece el catálogo de aduanas */
  public setAduana(aduana: Catalogo[]): void {
    this.update(state => ({ ...state, aduana }));
  }

  /** Establece el catálogo de documentos */
  public setDocumentos(documentos: Catalogo[]): void {
    this.update(state => ({ ...state, documentos }));
  }

  /** Establece el valor del campo nombre */
  public setNombre(nombre: string): void {
    this.update(state => ({ ...state, nombre }));
  }

  /** Establece el catálogo de años */
  public setAno(ano: Catalogo[]): void {
    this.update(state => ({ ...state, ano }));
  }

  /** Establece el catálogo de condiciones */
  public setCondicion(condicion: Catalogo[]): void {
    this.update(state => ({ ...state, condicion }));
  }

  /** Establece el catálogo de países */
  public setPais(pais: Catalogo[]): void {
    this.update(state => ({ ...state, pais }));
  }

  /** Establece el catálogo de tipo de documento */
  public setTipoDocumento(tipoDocumento: Catalogo[]): void {
    this.update(state => ({ ...state, tipoDocumento }));
  }

  /** Establece el catálogo de fechas seleccionadas */
  public setFechasSeleccionadas(fechasSeleccionadas: Catalogo[]): void {
    this.update(state => ({ ...state, fechasSeleccionadas }));
  }

  /** Establece los fines elegidos */
  public setFinesElegidos(finesElegidos: string[]): void {
    this.update(state => ({ ...state, finesElegidos }));
  }

  /** Establece los elementos seleccionados */
  public setElegidosSeleccionados(elegidosSeleccionados: string[]): void {
    this.update(state => ({ ...state, elegidosSeleccionados }));
  }

  /** Establece el rango de días seleccionados */
  public setSelectRangoDias(selectRangoDias: string[]): void {
    this.update(state => ({ ...state, selectRangoDias }));
  }

  /** Establece los datos de fechas */
  public setFechasDatos(fechasDatos: string[]): void {
    this.update(state => ({ ...state, fechasDatos }));
  }

  /** Establece la fecha */
  public setFecha(fecha: string): void {
    this.update(state => ({ ...state, fecha }));
  }

  /** Establece la fecha seleccionada */
  public setFechaSeleccionada(fechaSeleccionada: string): void {
    this.update(state => ({ ...state, fechaSeleccionada }));
  }

  /** Establece si se debe mostrar la tabla */
  public setShowTabla(showTabla: boolean): void {
    this.update(state => ({ ...state, showTabla }));
  }

  /** Establece si el popup está abierto */
  public setIsPopupOpen(isPopupOpen: boolean): void {
    this.update(state => ({ ...state, isPopupOpen }));
  }

  /** Establece si el popup está cerrado */
  public setIsPopupClose(isPopupClose: boolean): void {
    this.update(state => ({ ...state, isPopupClose }));
  }

  /** Establece el valor seleccionado */
  public setValorSeleccionado(valorSeleccionado: string): void {
    this.update(state => ({ ...state, valorSeleccionado }));
  }

  /** Establece el tipo de mercancía */
  public setTipoMercancia(tipoMercancia: string): void {
    this.update(state => ({ ...state, tipoMercancia }));
  }

  /** Establece el uso específico */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update(state => ({ ...state, usoEspecifico }));
  }

  /** Establece la marca */
  public setMarca(marca: string): void {
    this.update(state => ({ ...state, marca }));
  }

  /** Establece el modelo */
  public setModelo(modelo: string): void {
    this.update(state => ({ ...state, modelo }));
  }

  /** Establece la serie */
  public setSerie(serie: string): void {
    this.update(state => ({ ...state, serie }));
  }

  /** Establece la calle */
  public setCalle(calle: string): void {
    this.update(state => ({ ...state, calle }));
  }

  /** Establece el número exterior */
  public setNumeroExterior(numeroExterior: number): void {
    this.update(state => ({ ...state, numeroExterior }));
  }

  /** Establece el número interior */
  public setNumeroInterior(numeroInterior: number): void {
    this.update(state => ({ ...state, numeroInterior }));
  }

  /** Establece el teléfono */
  public setTelefono(telefono: number): void {
    this.update(state => ({ ...state, telefono }));
  }

  /** Establece el correo electrónico */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update(state => ({ ...state, correoElectronico }));
  }

  /** Establece el código postal */
  public setCodigoPostal(codigoPostal: number): void {
    this.update(state => ({ ...state, codigoPostal }));
  }

  /** Establece el estado */
  public setEstado(estado: number): void {
    this.update(state => ({ ...state, estado }));
  }

  /** Establece la colonia */
  public setColonia(colonia: number): void {
    this.update(state => ({ ...state, colonia }));
  }

  /** Establece la opción seleccionada */
  public setOpcion(opcion: string): void {
    this.update(state => ({ ...state, opcion }));
  }

  /** Reinicia el estado del store a su estado inicial */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
