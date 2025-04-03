import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ClavesDeLotes, Destinatario, Mercancia } from '../models/consulta.model';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;

  /** Descripción del catálogo. */
  descripcion: string;
}

export interface Solicitud260704State {
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
 
   /** Identificador del país asociado al domicilio del solicitante. */
   domicilioPais: number;
 
   /** Identificador del estado asociado al domicilio del solicitante. */
   domicilioEstado: number;
 
   /** Identificador del municipio asociado al domicilio del solicitante. */
   domicilioMunicipio: number;
 
   /** Identificador de la localidad asociada al domicilio del solicitante. */
   domicilioLocalidad: number;
 
   /** Código postal asociado al domicilio del solicitante. */
   domicilioCodigo: number;
 
   /** Identificador de la colonia asociada al domicilio del solicitante. */
   domicilioColonia: number;
 
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
}

/**
 * Crea el estado inicial para la solicitud del trámite 260704.
 * @returns Estado inicial de tipo `Solicitud260704State`.
 */
export function createInitialState(): Solicitud260704State {
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

    /** Identificador del país asociado al domicilio del solicitante. */
    domicilioPais: 0,

    /** Identificador del estado asociado al domicilio del solicitante. */
    domicilioEstado: 0,

    /** Identificador del municipio asociado al domicilio del solicitante. */
    domicilioMunicipio: 0,

    /** Identificador de la localidad asociada al domicilio del solicitante. */
    domicilioLocalidad: 0,

    /** Código postal asociado al domicilio del solicitante. */
    domicilioCodigo: 0,

    /** Identificador de la colonia asociada al domicilio del solicitante. */
    domicilioColonia: 0,

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
  };
}

/**
 * Clase que representa el almacén de datos para el trámite 260704.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260704', resettable: true })
export class Tramite260704Store extends Store<Solicitud260704State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }
  public setAvisoDeFuncionamiento(avisoDeFuncionamiento: boolean): void {
    this.update((state) => ({
      ...state,
      avisoDeFuncionamiento,
    }));
  }
  public setLicenciaSanitaria(licenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      licenciaSanitaria,
    }));
  }

  public setClaveDeLosLotes(claveDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      claveDeLosLotes,
    }));
  }

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
}