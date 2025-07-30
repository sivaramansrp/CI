import { ClavesDeLotes } from '../models/claves-de-lotes.model';
import { Destinatario } from '../models/destinatario.model';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/mercancia.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado de la solicitud 260101.
 * Contiene toda la información necesaria relacionada con la solicitud, incluyendo datos personales, detalles de mercancías y pagos.
 */
export interface Solicitud260101State {
  /** Razón social del solicitante. */
  razonSocial: string;

  /** Dirección de correo electrónico del solicitante. */
  correoElectronico: string;

  /** Código postal del domicilio del solicitante. */
  codigoPostal: string;

  /** Identificador del estado asociado con el domicilio. */
  estado: number;

  /** Municipio donde reside el solicitante. */
  municipio: string;

  /** Localidad específica del domicilio del solicitante. */
  localidad: string;

  /** Colonia asociada al domicilio del solicitante. */
  colonia: string;

  /** Calle del domicilio del solicitante. */
  calle: string;

  /** Código LADA asociado al teléfono del solicitante. */
  lada: number;

  /** Número telefónico del solicitante. */
  telefono: number;

  /** Indicador sobre si existe aviso de funcionamiento. */
  avisoDeFuncionamiento: boolean;

  /** Información relacionada con la licencia sanitaria del solicitante. */
  licenciaSanitaria: string;

  /** Estado del producto: fresco, congelado o vivo. */
  liveFreshFrozen: boolean;

  /** Régimen fiscal asociado al solicitante. */
  regimen: number;

  /** Aduana asociada al trámite. */
  aduana: number;

  /** Acción relacionada con la solicitud ("hacerlos"). */
  hacerlos: string | number;

  /** Registro Federal de Contribuyentes (RFC) del solicitante. */
  rfc: string;

  /** Razón social del representante legal. */
  legalRazonSocial: string;

  /** Apellido paterno del solicitante. */
  apellidoPaterno: string;

  /** Apellido materno del solicitante. */
  apellidoMeterno: string;

  /** Lista de mercancías asociadas con la solicitud. */
  mercanciasDatos: Mercancia[];

  /** Indicador sobre si se ha presentado un manifiesto. */
  manifesto: boolean;

  /** Clasificación del producto asociado con la solicitud. */
  clasificaionProductos: string;

  /** Especificación del producto representada por un identificador numérico. */
  especificarProducto: number;

  /** Nombre específico del producto asociado con la solicitud. */
  nombreProductoEspecifico: string;

  /** Marca del producto. */
  marca: string;

  /** Tipo de producto representado por un identificador numérico. */
  tipoProducto: number;

  /** Fracción arancelaria del producto. */
  fraccionArancelaria: string;

  /** Descripción detallada de la fracción arancelaria. */
  descripcionFraccionArancelaria: string;

  /** Cantidad del producto medida en Unidad de Medida de Tarifa (UMT). */
  cantidadUMT: string;

  /** Unidad de Medida de Tarifa (UMT). */
  umt: string;

  /** Cantidad del producto medida en Unidad de Medida de Comercialización (UMC). */
  cantidadUMC: string;

  /** Unidad de Medida de Comercialización (UMC). */
  umc: number;

  /** Clave asociada a los lotes del producto. */
  claveDeLosLotes: string;

  /** Fecha de fabricación de los lotes del producto. */
  fechaFabricacion: string;

  /** Fecha de caducidad de los lotes del producto. */
  fechaCaducidad: string;

  /** Lista de claves de lotes del producto. */
  clavesDeLotes: ClavesDeLotes[];

  /** Tipo de persona: física o moral, representado por una cadena o número. */
  tipoPersona: string | number;

  /** Indicador para modificar el RFC del solicitante. */
  modificarRFC: string;

  /** Denominación social del solicitante. */
  denominacion: string;

  /**
   * Nombre propio de la persona física (denominación por nombre).
   */
  denominacionNombre: string;

  /**
   * Apellido paterno de la persona física.
   */
  denominacionApellidoPaterno: string;

  /**
   * Apellido materno de la persona física.
   */
  denominacionApellidoMaterno: string;

  /** Identificador del país asociado al domicilio del solicitante. */
  domicilioPais: number | string;

  /** Identificador del estado asociado al domicilio del solicitante. */
  domicilioEstado: number | string;

  /** Identificador del municipio asociado al domicilio del solicitante. */
  domicilioMunicipio: number | string;

  /** Identificador de la localidad asociada al domicilio del solicitante. */
  domicilioLocalidad: number | string;

  /** Código postal asociado al domicilio del solicitante. */
  domicilioCodigo: number | string;

  /** Identificador de la colonia asociada al domicilio del solicitante. */
  domicilioColonia: number | string;

  /** Calle asociada al domicilio del solicitante. */
  domiciliCalle: string;

  /** Número exterior del domicilio del solicitante. */
  domiciliNumeroExterior: string;

  /** Número interior del domicilio del solicitante. */
  domiciliNumeroInterior: string;

  /** Código LADA asociado al teléfono del domicilio. */
  domiciliLada: string;

  /** Número telefónico del domicilio. */
  domiciliTelefono: string;

  /** Correo electrónico asociado al domicilio del solicitante. */
  domiciliCorreoElectronioco: string;

  /**
   * Nacionalidad del tercero (puede ser un identificador numérico o descripción).
   */
  tercerosNacionalidad: string | number;

  /**
   * Tipo de persona del tercero (1: Moral, 2: Física, etc.).
   */
  tercerosTipoPersona: string | number;

  /**
   * RFC del tercero. Requerido para identificación fiscal en México.
   */
  tercerosRFC: string;

  /**
   * CURP del tercero. Relevante para personas físicas.
   */
  tercerosCurp: string;

  /**
   * Razón social o denominación del tercero (persona moral).
   */
  tercerosDenominacion: string;

  /**
   * Nombre del tercero (persona física).
   */
  tercerosDenominacionNombre: string;

  /**
   * Apellido paterno del tercero (persona física).
   */
  tercerosApellidoPaterno: string;

  /**
   * Apellido materno del tercero (persona física).
   */
  tercerosApellidoMaterno: string;

  /**
   * País de residencia del tercero.
   */
  tercerosPais: string | number;

  /**
   * Estado de residencia del tercero.
   */
  tercerosEstado: string | number;

  /**
   * Municipio de residencia del tercero.
   */
  tercerosMunicipio: string | number;

  /**
   * Localidad del tercero.
   */
  tercerosLocalidad: string | number;

  /**
   * Código postal del tercero.
   */
  tercerosCodigo: string | number;

  /**
   * Colonia o asentamiento del tercero.
   */
  tercerosColonia: string | number;

  /**
   * Calle del domicilio del tercero.
   */
  tercerosCalle: string;

  /**
   * Número exterior del domicilio.
   */
  tercerosNumeroExterior: string | number;

  /**
   * Número interior del domicilio (si aplica).
   */
  tercerosNumeroInterior: string | number;

  /**
   * Lada telefónica (clave de larga distancia).
   */
  tercerosLada: string | number;

  /**
   * Número de teléfono del tercero.
   */
  tercerosTelefono: string | number;

  /**
   * Correo electrónico del tercero.
   */
  tercerosCorreoElectronico: string;

  /** Lista de destinatarios relacionados con la solicitud. */
  destinatarioDatos: Destinatario[];

  /** Clave de referencia asociada al trámite. */
  claveDeReferencia: string;

  /** Cadena de dependencia asociada a la solicitud. */
  cadenaDeDependencia: string;

  /** Banco asociado al trámite, representado por un identificador numérico. */
  banco: number;

  /** Llave de pago asociada al trámite. */
  liaveDePago: string;

  /** Fecha en la que se realizó el pago relacionado con la solicitud. */
  fechaDePago: string;

  /** Importe del pago realizado para la solicitud. */
  importeDePago: string;

  /**
   * Indica si se está en modo de modificación para el destinatario.
   * Se utiliza para mostrar o preparar el formulario de edición.
   */
  modificarDestinatario: boolean;

  /**
   * Indica si se está en modo de modificación para el fabricante.
   * Se utiliza para mostrar o preparar el formulario de edición.
   */
  modificarFabricante: boolean;

  /**
   * Lista de identificadores seleccionados del catálogo SCIAN.
   * Usada para representar actividades económicas seleccionadas por el usuario.
   */
  scianSeleccionados: number[];

  /**
   * Lista de identificadores de mercancías seleccionadas.
   * Representa los productos o bienes que el usuario ha marcado para incluir.
   */
  mercanciasSeleccionados: number[];
}

/**
 * Función que crea el estado inicial para `Solicitud260101State`.
 * Establece valores predeterminados para todas las propiedades requeridas dentro de la solicitud.
 * @returns Un objeto con el estado inicial de la solicitud 260101.
 */
export function createInitialState(): Solicitud260101State {
  return {
    /** Razón social del solicitante. */
    razonSocial: '',

    /** Correo electrónico del solicitante. */
    correoElectronico: '',

    /** Código postal del domicilio del solicitante. */
    codigoPostal: '',

    /** Identificador del estado asociado al domicilio. */
    estado: 0,

    /** Municipio donde reside el solicitante. */
    municipio: '',

    /** Localidad específica del domicilio del solicitante. */
    localidad: '',

    /** Colonia asociada al domicilio del solicitante. */
    colonia: '',

    /** Calle del domicilio del solicitante. */
    calle: '',

    /** Código LADA asociado al teléfono del solicitante. */
    lada: 0,

    /** Número telefónico del solicitante. */
    telefono: 0,

    /** Indicador de si existe aviso de funcionamiento. */
    avisoDeFuncionamiento: false,

    /** Licencia sanitaria asociada al solicitante. */
    licenciaSanitaria: '',

    /** Indicador del estado del producto (fresco, congelado o vivo). */
    liveFreshFrozen: false,

    /** Régimen fiscal asociado al solicitante. */
    regimen: 0,

    /** Aduana asociada al trámite. */
    aduana: 0,

    /** Acción relacionada con la solicitud ("hacerlos"). */
    hacerlos: '',

    /** Registro Federal de Contribuyentes (RFC) del solicitante. */
    rfc: '',

    /** Razón social del representante legal del solicitante. */
    legalRazonSocial: '',

    /** Apellido paterno del solicitante. */
    apellidoPaterno: '',

    /** Apellido materno del solicitante. */
    apellidoMeterno: '',

    /** Lista de mercancías asociadas con la solicitud. */
    mercanciasDatos: [],

    /** Indicador de si se ha presentado un manifiesto. */
    manifesto: false,

    /** Clasificación del producto relacionado con la solicitud. */
    clasificaionProductos: '',

    /** Especificación del producto identificada numéricamente. */
    especificarProducto: 0,

    /** Nombre específico del producto. */
    nombreProductoEspecifico: '',

    /** Marca del producto. */
    marca: '',

    /** Tipo de producto identificado numéricamente. */
    tipoProducto: 0,

    /** Fracción arancelaria del producto. */
    fraccionArancelaria: '',

    /** Descripción de la fracción arancelaria. */
    descripcionFraccionArancelaria: '',

    /** Cantidad del producto medida en la Unidad de Medida de Tarifa (UMT). */
    cantidadUMT: '',

    /** Unidad de Medida de Tarifa (UMT). */
    umt: '',

    /** Cantidad del producto medida en la Unidad de Medida de Comercialización (UMC). */
    cantidadUMC: '',

    /** Unidad de Medida de Comercialización (UMC). */
    umc: 0,

    /** Clave de los lotes asociados con el producto. */
    claveDeLosLotes: '',

    /** Fecha de fabricación de los lotes del producto. */
    fechaFabricacion: '',

    /** Fecha de caducidad de los lotes del producto. */
    fechaCaducidad: '',

    /** Lista de claves de los lotes relacionados con el producto. */
    clavesDeLotes: [],

    /** Tipo de persona (física o moral). */
    tipoPersona: '',

    /** Indicador para modificar el RFC del solicitante. */
    modificarRFC: '',

    /** Denominación social del solicitante. */
    denominacion: '',

    /**
     * Nombre de la persona física. Solo se aplica si el tipo de persona es física.
     */
    denominacionNombre: '',
    /**
     * Apellido paterno de la persona física. Solo se aplica si el tipo de persona es física.
     */
    denominacionApellidoPaterno: '',

    /**
     * Apellido materno de la persona física. Solo se aplica si el tipo de persona es física.
     */
    denominacionApellidoMaterno: '',

    /** Identificador del país asociado al domicilio del solicitante. */
    domicilioPais: '',

    /** Identificador del estado asociado al domicilio del solicitante. */
    domicilioEstado: '',

    /** Identificador del municipio asociado al domicilio del solicitante. */
    domicilioMunicipio: '',

    /** Identificador de la localidad asociada al domicilio del solicitante. */
    domicilioLocalidad: '',

    /** Código postal asociado al domicilio del solicitante. */
    domicilioCodigo: '',

    /** Identificador de la colonia asociada al domicilio del solicitante. */
    domicilioColonia: '',

    /** Calle del domicilio del solicitante. */
    domiciliCalle: '',

    /** Número exterior del domicilio del solicitante. */
    domiciliNumeroExterior: '',

    /** Número interior del domicilio del solicitante. */
    domiciliNumeroInterior: '',

    /** Código LADA del teléfono del domicilio del solicitante. */
    domiciliLada: '',

    /** Número telefónico del domicilio del solicitante. */
    domiciliTelefono: '',

    /** Correo electrónico del domicilio del solicitante. */
    domiciliCorreoElectronioco: '',

    /**
     * Nacionalidad del tercero (ID del catálogo correspondiente).
     */
    tercerosNacionalidad: 0,
    /** Tipo de persona (física o moral) del tercero. */
    tercerosTipoPersona: 0,
    /** RFC del tercero. */
    tercerosRFC: '',
    /** CURP del tercero. */
    tercerosCurp: '',
    /** Denominación del tercero. */
    tercerosDenominacion: '',
    /** Nombre del tercero. */
    tercerosDenominacionNombre: '',
    /**
     * Apellido paterno del tercero.
     */
    tercerosApellidoPaterno: '',
    /**
     * Apellido materno del tercero.
     */
    tercerosApellidoMaterno: '',
    /**
     * País del tercero.
     */
    tercerosPais: '',
    /**
     * Estado del tercero.
     */
    tercerosEstado: '',
    /**
     * Municipio del tercero.
     */
    tercerosMunicipio: '',
    /**
     * Localidad del tercero.
     */
    tercerosLocalidad: '',
    /**
     * Código postal del tercero.
     */
    tercerosCodigo: '',
    /**
     * Colonia del tercero.
     */
    tercerosColonia: '',
    /** Calle del domicilio del tercero. */
    tercerosCalle: '',
    /** Número exterior del domicilio del tercero. */
    tercerosNumeroExterior: '',
    /** Número interior del domicilio del tercero. */
    tercerosNumeroInterior: '',
    /** Código LADA del teléfono del tercero. */
    tercerosLada: '',
    /** Número telefónico del tercero. */
    tercerosTelefono: '',
    /** Correo electrónico del tercero. */
    tercerosCorreoElectronico: '',

    /** Lista de destinatarios relacionados con la solicitud. */
    destinatarioDatos: [],

    /** Clave de referencia asociada con la solicitud. */
    claveDeReferencia: '',

    /** Cadena de dependencia asociada con la solicitud. */
    cadenaDeDependencia: '',

    /** Banco asociado al trámite. */
    banco: 0,

    /** Llave de pago asociada al trámite. */
    liaveDePago: '',

    /** Fecha en que se realizó el pago. */
    fechaDePago: '',

    /** Importe del pago realizado. */
    importeDePago: '',

    /** Indicador para modificar destinatario. */
    modificarDestinatario: false,

    /** Indicador para modificar fabricante. */
    modificarFabricante: false,

    /** Lista de identificadores seleccionados del catálogo SCIAN. */
    scianSeleccionados: [],

    /** Lista de identificadores seleccionados del catálogo de mercancías. */
    mercanciasSeleccionados: [],
  };
}

/**
 * Servicio `Solicitud260101Store`.
 * Este servicio gestiona el estado de la solicitud 260101 usando Akita.
 * Permite actualizar valores individuales, agregar o eliminar elementos y limpiar la sección.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud260101Store', resettable: true })
export class Solicitud260101Store extends Store<Solicitud260101State> {
  /**
   * Constructor del servicio `Solicitud260101Store`.
   * Inicializa el estado con los valores predeterminados mediante la función `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }
  /**
   * Actualiza la razón social en el estado.
   * @param razonSocial - Nuevo valor para la razón social.
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  /**
   * Actualiza el correo electrónico en el estado.
   * @param correoElectronico - Nuevo valor para el correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Actualiza el código postal en el estado.
   * @param codigoPostal - Nuevo valor para el código postal.
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * Actualiza el estado asociado al domicilio.
   * @param estado - Nuevo identificador para el estado.
   */
  public setEstado(estado: number): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Actualiza el municipio asociado al domicilio.
   * @param municipio - Nuevo valor para el municipio.
   */
  public setMunicipio(municipio: string): void {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }

  /**
   * Actualiza la localidad asociada al domicilio.
   * @param localidad - Nuevo valor para la localidad.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * Actualiza la colonia asociada al domicilio.
   * @param colonia - Nuevo valor para la colonia.
   */
  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  /**
   * Actualiza la calle asociada al domicilio.
   * @param calle - Nuevo valor para la calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Actualiza el código LADA del número telefónico.
   * @param lada - Nuevo valor para el código LADA.
   */
  public setLada(lada: number): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * Actualiza el número telefónico.
   * @param telefono - Nuevo valor para el número telefónico.
   */
  public setTelefono(telefono: number): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * Actualiza el indicador de aviso de funcionamiento.
   * @param avisoDeFuncionamiento - Nuevo estado para el aviso de funcionamiento.
   */
  public setAvisoDeFuncionamiento(avisoDeFuncionamiento: boolean): void {
    this.update((state) => ({
      ...state,
      avisoDeFuncionamiento,
    }));
  }

  /**
   * Actualiza la licencia sanitaria en el estado.
   * @param licenciaSanitaria - Nuevo valor para la licencia sanitaria.
   */
  public setLicenciaSanitaria(licenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      licenciaSanitaria,
    }));
  }

  /**
   * Actualiza el estado del producto (fresco, congelado o vivo).
   * @param liveFreshFrozen - Nuevo estado para el producto.
   */
  public setLiveFreshFrozen(liveFreshFrozen: boolean): void {
    this.update((state) => ({
      ...state,
      liveFreshFrozen,
    }));
  }

  /**
   * Actualiza el régimen fiscal asociado al trámite.
   * @param regimen - Nuevo identificador para el régimen fiscal.
   */
  public setRegimen(regimen: number): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Actualiza la aduana asociada al trámite.
   * @param aduana - Nuevo identificador para la aduana.
   */
  public setAduana(aduana: number): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
   * Actualiza el valor relacionado con la acción "hacerlos".
   * @param hacerlos - Nuevo valor para "hacerlos" (cadena o número).
   */
  public setHacerlos(hacerlos: string | number): void {
    this.update((state) => ({
      ...state,
      hacerlos,
    }));
  }

  /**
   * Actualiza el RFC asociado al trámite.
   * @param rfc - Nuevo valor para el RFC.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }
  /**
   * Actualiza la razón social legal en el estado.
   * @param legalRazonSocial - Nuevo valor para la razón social legal.
   */
  public setLegalRazonSocial(legalRazonSocial: string): void {
    this.update((state) => ({
      ...state,
      legalRazonSocial,
    }));
  }

  /**
   * Actualiza el apellido paterno en el estado.
   * @param apellidoPaterno - Nuevo valor para el apellido paterno.
   */
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  /**
   * Actualiza el apellido materno en el estado.
   * @param apellidoMeterno - Nuevo valor para el apellido materno.
   */
  public setApellidoMeterno(apellidoMeterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMeterno,
    }));
  }

  /**
   * Actualiza los datos de mercancías en el estado.
   * @param mercanciasDatos - Nuevo arreglo con los datos de mercancías.
   */
  public setMercanciasDatos(mercanciasDatos: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos,
    }));
  }

  /**
   * Agrega una nueva mercancía al estado.
   * @param newMercancia - Objeto de mercancía que será añadido.
   */
  public addMercanciasDatos(newMercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos: [...state.mercanciasDatos, newMercancia],
    }));
  }

  /**
   * Elimina una mercancía específica del estado.
   * @param mercanciaToRemove - Objeto de mercancía que será eliminado.
   */
  public removeMercanciaDatos(mercanciaToRemove: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos: state.mercanciasDatos.filter(
        (mercancia) =>
          mercancia.nombreProductoEspecifico !==
          mercanciaToRemove.nombreProductoEspecifico
      ),
    }));
  }

  /**
   * Actualiza la clasificación de productos en el estado.
   * @param clasificaionProductos - Nuevo valor para la clasificación de productos.
   */
  public setClasificacionProductos(clasificaionProductos: string): void {
    this.update((state) => ({
      ...state,
      clasificaionProductos,
    }));
  }

  /**
   * Actualiza el identificador del producto especificado en el estado.
   * @param especificarProducto - Nuevo identificador para el producto.
   */
  public setEspecificarProducto(especificarProducto: number): void {
    this.update((state) => ({
      ...state,
      especificarProducto,
    }));
  }

  /**
   * Actualiza el nombre específico del producto en el estado.
   * @param nombreProductoEspecifico - Nuevo nombre para el producto específico.
   */
  public setNombreProductoEspecifico(nombreProductoEspecifico: string): void {
    this.update((state) => ({
      ...state,
      nombreProductoEspecifico,
    }));
  }

  /**
   * Actualiza la marca del producto en el estado.
   * @param marca - Nueva marca del producto.
   */
  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  /**
   * Actualiza el tipo de producto en el estado.
   * @param tipoProducto - Nuevo identificador para el tipo de producto.
   */
  public setTipoProducto(tipoProducto: number): void {
    this.update((state) => ({
      ...state,
      tipoProducto,
    }));
  }

  /**
   * Actualiza la fracción arancelaria del producto en el estado.
   * @param fraccionArancelaria - Nuevo valor para la fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Actualiza la descripción de la fracción arancelaria en el estado.
   * @param descripcionFraccionArancelaria - Nueva descripción de la fracción arancelaria.
   */
  public setDescripcionFraccionArancelaria(
    descripcionFraccionArancelaria: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  /**
   * Actualiza la cantidad UMT (Unidad de Medida de Tarifa) en el estado.
   * @param cantidadUMT - Nuevo valor para la cantidad UMT.
   */
  public setCantidadUMT(cantidadUMT: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMT,
    }));
  }

  /**
   * Actualiza la unidad UMT en el estado.
   * @param umt - Nuevo valor para la unidad UMT.
   */
  public setUmt(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }

  /**
   * Actualiza la cantidad UMC (Unidad de Medida de Comercialización) en el estado.
   * @param cantidadUMC - Nuevo valor para la cantidad UMC.
   */
  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC,
    }));
  }

  /**
   * Actualiza la unidad UMC en el estado.
   * @param umc - Nuevo identificador para la unidad UMC.
   */
  public setUmc(umc: number): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  /**
   * Actualiza la clave de los lotes en el estado.
   * @param claveDeLosLotes - Nuevo valor para la clave de los lotes.
   */
  public setClaveDeLosLotes(claveDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      claveDeLosLotes,
    }));
  }

  /**
   * Actualiza la fecha de fabricación en el estado.
   * @param fechaFabricacion - Nuevo valor para la fecha de fabricación.
   */
  public setFechaFabricacion(fechaFabricacion: string): void {
    this.update((state) => ({
      ...state,
      fechaFabricacion,
    }));
  }

  /**
   * Actualiza la fecha de caducidad en el estado.
   * @param fechaCaducidad - Nuevo valor para la fecha de caducidad.
   */
  public setFechaCaducidad(fechaCaducidad: string): void {
    this.update((state) => ({
      ...state,
      fechaCaducidad,
    }));
  }

  /**
   * Actualiza las claves de los lotes en el estado.
   * @param clavesDeLotes - Nuevo arreglo con las claves de los lotes.
   */
  public setClavesDeLotes(clavesDeLotes: ClavesDeLotes[]): void {
    this.update((state) => ({
      ...state,
      clavesDeLotes,
    }));
  }

  /**
   * Agrega una nueva clave de lote al estado.
   * @param newClaveDeLote - Objeto que representa la nueva clave de lote.
   */
  public addClaveDeLote(newClaveDeLote: ClavesDeLotes): void {
    this.update((state) => {
      const ISEXISTING = state.clavesDeLotes.some(
        (lote) => lote.lotes === newClaveDeLote.lotes
      );

      return {
        ...state,
        clavesDeLotes: ISEXISTING
          ? state.clavesDeLotes
          : [...state.clavesDeLotes, newClaveDeLote],
      };
    });
  }

  /**
   * Elimina una clave de lote específica del estado.
   * @param claveToRemove - Objeto que contiene la clave a eliminar.
   */
  public removeClaveDeLote(claveToRemove: { lotes: string }): void {
    this.update((state) => ({
      ...state,
      clavesDeLotes: state.clavesDeLotes.filter(
        (clave) => clave.lotes !== claveToRemove.lotes
      ),
    }));
  }

  /**
   * Actualiza el tipo de persona en el estado.
   * @param tipoPersona - Nuevo valor para el tipo de persona (cadena o número).
   */
  public setTipoPersona(tipoPersona: string | number): void {
    this.update((state) => ({
      ...state,
      tipoPersona,
    }));
  }

  /**
   * Actualiza el RFC modificado en el estado.
   * @param modificarRFC - Nuevo valor para el RFC modificado.
   */
  public setModificarRFC(modificarRFC: string): void {
    this.update((state) => ({
      ...state,
      modificarRFC,
    }));
  }

  /**
   * Actualiza la denominación del destinatario en el estado.
   * @param denominacion - Nuevo valor para la denominación.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  public setDenominacionNombre(denominacionNombre: string): void {
    this.update((state) => ({
      ...state,
      denominacionNombre,
    }));
  }

  public setDenominacionApellidoPaterno(
    denominacionApellidoPaterno: string
  ): void {
    this.update((state) => ({
      ...state,
      denominacionApellidoPaterno,
    }));
  }

  public setDenominacionApellidoMaterno(
    denominacionApellidoMaterno: string
  ): void {
    this.update((state) => ({
      ...state,
      denominacionApellidoMaterno,
    }));
  }

  /**
   * Actualiza el país del domicilio en el estado.
   * @param domicilioPais - Nuevo identificador para el país.
   */
  public setDomicilioPais(domicilioPais: number | string): void {
    this.update((state) => ({
      ...state,
      domicilioPais,
    }));
  }

  /**
   * Actualiza el estado asociado al domicilio en el estado.
   * @param domicilioEstado - Nuevo identificador para el estado.
   */
  public setDomicilioEstado(domicilioEstado: number | string): void {
    this.update((state) => ({
      ...state,
      domicilioEstado,
    }));
  }

  /**
   * Actualiza el municipio asociado al domicilio en el estado.
   * @param domicilioMunicipio - Nuevo identificador para el municipio.
   */
  public setDomicilioMunicipio(domicilioMunicipio: number | string): void {
    this.update((state) => ({
      ...state,
      domicilioMunicipio,
    }));
  }

  /**
   * Actualiza la localidad asociada al domicilio en el estado.
   * @param domicilioLocalidad - Nuevo identificador para la localidad.
   */
  public setDomicilioLocalidad(domicilioLocalidad: number | string): void {
    this.update((state) => ({
      ...state,
      domicilioLocalidad,
    }));
  }

  /**
   * Actualiza el código postal asociado al domicilio en el estado.
   * @param domicilioCodigo - Nuevo identificador para el código postal.
   */
  public setDomicilioCodigo(domicilioCodigo: number | string): void {
    this.update((state) => ({
      ...state,
      domicilioCodigo,
    }));
  }

  /**
   * Actualiza la colonia asociada al domicilio en el estado.
   * @param domicilioColonia - Nuevo identificador para la colonia.
   */
  public setDomicilioColonia(domicilioColonia: number | string): void {
    this.update((state) => ({
      ...state,
      domicilioColonia,
    }));
  }

  /**
   * Actualiza la calle asociada al domicilio en el estado.
   * @param domiciliCalle - Nuevo valor para la calle.
   */
  public setDomicilioCalle(domiciliCalle: string): void {
    this.update((state) => ({
      ...state,
      domiciliCalle,
    }));
  }

  /**
   * Actualiza el número exterior del domicilio en el estado.
   * @param domiciliNumeroExterior - Nuevo valor para el número exterior.
   */
  public setDomicilioNumeroExterior(domiciliNumeroExterior: string): void {
    this.update((state) => ({
      ...state,
      domiciliNumeroExterior,
    }));
  }

  /**
   * Actualiza el número interior del domicilio en el estado.
   * @param domiciliNumeroInterior - Nuevo valor para el número interior.
   */
  public setDomicilioNumeroInterior(domiciliNumeroInterior: string): void {
    this.update((state) => ({
      ...state,
      domiciliNumeroInterior,
    }));
  }

  /**
   * Actualiza el código LADA del domicilio en el estado.
   * @param domiciliLada - Nuevo valor para el código LADA.
   */
  public setDomicilioLada(domiciliLada: string): void {
    this.update((state) => ({
      ...state,
      domiciliLada,
    }));
  }

  /**
   * Actualiza el número telefónico del domicilio en el estado.
   * @param domiciliTelefono - Nuevo valor para el número telefónico.
   */
  public setDomicilioTelefono(domiciliTelefono: string): void {
    this.update((state) => ({
      ...state,
      domiciliTelefono,
    }));
  }

  /**
   * Actualiza el correo electrónico del domicilio en el estado.
   * @param domiciliCorreoElectronioco - Nuevo valor para el correo electrónico.
   */
  public setDomicilioCorreoElectronico(
    domiciliCorreoElectronioco: string
  ): void {
    this.update((state) => ({
      ...state,
      domiciliCorreoElectronioco,
    }));
  }

  /**
   * Actualiza la nacionalidad del tercero en el estado.
   * @param tercerosNacionalidad - Nuevo identificador para la nacionalidad.
   */
  public setTercerosNacionalidad(tercerosNacionalidad: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosNacionalidad,
    }));
  }

  /**
   * Actualiza el tipo de persona del tercero en el estado.
   * @param tercerosTipoPersona - Nuevo valor para el tipo de persona (cadena o número).
   */
  public setTercerosTipoPersona(tercerosTipoPersona: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosTipoPersona,
    }));
  }

  /**
   * Actualiza el RFC del tercero en el estado.
   * @param tercerosRFC - Nuevo valor para el RFC del tercero.
   */
  public setTercerosRFC(tercerosRFC: string): void {
    this.update((state) => ({
      ...state,
      tercerosRFC,
    }));
  }

  /**
   * Actualiza el CURP del tercero en el estado.
   * @param tercerosCurp - Nuevo valor para el CURP del tercero.
   */
  public setTercerosCurp(tercerosCurp: string): void {
    this.update((state) => ({
      ...state,
      tercerosCurp,
    }));
  }

  /**
   * Actualiza la denominación del tercero en el estado.
   * @param tercerosDenominacion - Nuevo valor para la denominación del tercero.
   */
  public setTercerosDenominacion(tercerosDenominacion: string): void {
    this.update((state) => ({
      ...state,
      tercerosDenominacion,
    }));
  }

  /**
   * Actualiza el nombre del tercero en el estado.
   * @param tercerosDenominacionNombre - Nuevo valor para el nombre del tercero.
   */
  public setTercerosDenominacionNombre(
    tercerosDenominacionNombre: string
  ): void {
    this.update((state) => ({
      ...state,
      tercerosDenominacionNombre,
    }));
  }

  /**
   * Actualiza el apellido paterno del tercero en el estado.
   * @param tercerosApellidoPaterno - Nuevo valor para el apellido paterno del tercero.
   */
  public setTercerosApellidoPaterno(tercerosApellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      tercerosApellidoPaterno,
    }));
  }

  /**
   * Actualiza el apellido materno del tercero en el estado.
   * @param tercerosApellidoMaterno - Nuevo valor para el apellido materno del tercero.
   */
  public setTercerosApellidoMaterno(tercerosApellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      tercerosApellidoMaterno,
    }));
  }

  /**
   * Actualiza el país del tercero en el estado.
   * @param tercerosPais - Nuevo identificador para el país del tercero.
   */
  public setTercerosPais(tercerosPais: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosPais,
    }));
  }

  /**
   * Actualiza el estado del tercero en el estado.
   * @param tercerosEstado - Nuevo identificador para el estado del tercero.
   */
  public setTercerosEstado(tercerosEstado: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosEstado,
    }));
  }

  /**
   * Actualiza el municipio del tercero en el estado.
   * @param tercerosMunicipio - Nuevo identificador para el municipio del tercero.
   */
  public setTercerosMunicipio(tercerosMunicipio: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosMunicipio,
    }));
  }

  /**
   * Actualiza la localidad del tercero en el estado.
   * @param tercerosLocalidad - Nuevo identificador para la localidad del tercero.
   */
  public setTercerosLocalidad(tercerosLocalidad: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosLocalidad,
    }));
  }

  /**
   * Actualiza el código postal del tercero en el estado.
   * @param tercerosCodigo - Nuevo identificador para el código postal del tercero.
   */
  public setTercerosCodigo(tercerosCodigo: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosCodigo,
    }));
  }

  /**
   * Actualiza la colonia del tercero en el estado.
   * @param tercerosColonia - Nuevo identificador para la colonia del tercero.
   */
  public setTercerosColonia(tercerosColonia: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosColonia,
    }));
  }

  /**
   * Actualiza la calle del tercero en el estado.
   * @param tercerosCalle - Nuevo valor para la calle del tercero.
   */
  public setTercerosCalle(tercerosCalle: string): void {
    this.update((state) => ({
      ...state,
      tercerosCalle,
    }));
  }

  /**
   * Actualiza el número exterior del tercero en el estado.
   * @param tercerosNumeroExterior - Nuevo valor para el número exterior del tercero.
   */
  public setTercerosNumeroExterior(
    tercerosNumeroExterior: string | number
  ): void {
    this.update((state) => ({
      ...state,
      tercerosNumeroExterior,
    }));
  }

  /**
   * Actualiza el número interior del tercero en el estado.
   * @param tercerosNumeroInterior - Nuevo valor para el número interior del tercero.
   */
  public setTercerosNumeroInterior(
    tercerosNumeroInterior: string | number
  ): void {
    this.update((state) => ({
      ...state,
      tercerosNumeroInterior,
    }));
  }

  /**
   * Actualiza el código LADA del tercero en el estado.
   * @param tercerosLada - Nuevo valor para el código LADA del tercero.
   */
  public setTercerosLada(tercerosLada: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosLada,
    }));
  }

  /**
   * Actualiza el teléfono del tercero en el estado.
   * @param tercerosTelefono - Nuevo valor para el teléfono del tercero.
   */
  public setTercerosTelefono(tercerosTelefono: string | number): void {
    this.update((state) => ({
      ...state,
      tercerosTelefono,
    }));
  }

  /**
   * Actualiza el correo electrónico del tercero en el estado.
   * @param tercerosCorreoElectronico - Nuevo valor para el correo electrónico del tercero.
   */
  public setTercerosCorreoElectronico(tercerosCorreoElectronico: string): void {
    this.update((state) => ({
      ...state,
      tercerosCorreoElectronico,
    }));
  }

  /**
   * Actualiza los datos de destinatarios en el estado.
   * @param destinatarioDatos - Nuevo arreglo con los datos de destinatarios.
   */
  public setDestinatarioDatos(destinatarioDatos: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos,
    }));
  }

  /**
   * Elimina un destinatario específico del estado.
   * @param destinatarioToRemove - Objeto del destinatario a eliminar.
   */
  public removeDestinatarioDato(destinatarioToRemove: Destinatario): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos: state.destinatarioDatos.filter(
        (destinatario) => destinatario.rfc !== destinatarioToRemove.rfc
      )
    }));
  }

  /**
   * Agrega un nuevo destinatario al estado.
   * @param newDestinatario - Objeto que representa el nuevo destinatario.
   */
  public addDestinatarioDato(newDestinatario: Destinatario): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos: [...state.destinatarioDatos, newDestinatario],
    }));
  }

  /**
   * Actualiza la clave de referencia en el estado.
   * @param claveDeReferencia - Nuevo valor para la clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Actualiza la cadena de dependencia en el estado.
   * @param cadenaDeDependencia - Nuevo valor para la cadena de dependencia.
   */
  public setCadenaDeDependencia(cadenaDeDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDeDependencia,
    }));
  }

  /**
   * Actualiza el banco asociado al trámite en el estado.
   * @param banco - Nuevo identificador para el banco.
   */
  public setBanco(banco: number): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Actualiza la llave de pago en el estado.
   * @param liaveDePago - Nuevo valor para la llave de pago.
   */
  public setLiaveDePago(liaveDePago: string): void {
    this.update((state) => ({
      ...state,
      liaveDePago,
    }));
  }

  /**
   * Actualiza la fecha del pago en el estado.
   * @param fechaDePago - Nuevo valor para la fecha del pago.
   */
  public setFechaDePago(fechaDePago: string): void {
    this.update((state) => ({
      ...state,
      fechaDePago,
    }));
  }

  /**
   * Actualiza el importe del pago en el estado.
   * @param importeDePago - Nuevo valor para el importe del pago.
   */
  public setImporteDePago(importeDePago: string): void {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }

  /**
   * Actualiza el estado del manifiesto en el estado.
   * @param manifesto - Nuevo valor para el estado del manifiesto.
   */
  public setManifesto(manifesto: boolean): void {
    this.update((state) => ({
      ...state,
      manifesto,
    }));
  }

  /**
   * Actualiza si se debe modificar el destinatario en el estado.
   * @param modificarDestinatario - Nuevo valor para la opción de modificar destinatario.
   */
  public setModificarDestinatario(modificarDestinatario: boolean): void {
    this.update((state) => ({
      ...state,
      modificarDestinatario,
    }));
  }

  /**
   * Actualiza si se debe modificar el fabricante en el estado.
   * @param modificarFabricante - Nuevo valor para la opción de modificar fabricante.
   */
  public setModificarFabricante(modificarFabricante: boolean): void {
    this.update((state) => ({
      ...state,
      modificarFabricante,
    }));
  }

  /**
   * Actualiza los códigos SCIAN seleccionados en el estado.
   * @param scianSeleccionados - Nuevo arreglo de códigos SCIAN seleccionados.
   */
  public setScianSeleccionados(scianSeleccionados: number[]): void {
    this.update((state) => ({
      ...state,
      scianSeleccionados: [...scianSeleccionados],
    }));
  }

  /**
   * Actualiza las mercancías seleccionadas en el estado.
   * @param mercanciasSeleccionados - Nuevo arreglo de identificadores de mercancías seleccionadas.
   */
  public setMercanciasSeleccionados(mercanciasSeleccionados: number[]): void {
    this.update((state) => ({
      ...state,
      mercanciasSeleccionados: [...mercanciasSeleccionados],
    }));
  }

  /**
   * Limpia todos los valores en el estado mediante la configuración `reset`.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
