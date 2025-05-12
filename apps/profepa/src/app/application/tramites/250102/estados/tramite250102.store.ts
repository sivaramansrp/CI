import { Store, StoreConfig } from '@datorama/akita';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Detalle, Producto, TablaDatos} from '../models/flora-fauna.models';

/**
 * Estado del trámite con clave 250101. Contiene toda la información capturada
 * durante el proceso del trámite, incluyendo datos del destinatario, agente aduanal,
 * mercancía, y aspectos administrativos.
 */
export interface Tramite250102State {
  tipoMovimiento : string;
  /** Tipo de aduana seleccionada. */
  tipoAduana: CatalogoResponse | null;
  /** Tipo de inspectoría seleccionada. */
  tipoInspectoria: CatalogoResponse | null;
  /** Municipio correspondiente al trámite. */
  tipoMunicipio: CatalogoResponse | null;
  /** Denominación del destinatario. */
  destinatarioDenominacion: string;
  /** País del destinatario. */
  destinatarioPais: CatalogoResponse | null;
  /** Estado del destinatario. */
  destinatarioEstado: CatalogoResponse | null;
  /** Código postal del destinatario. */
  destinatarioCodigoPostal: string;
  /** Domicilio completo del destinatario. */
  destinatarioDomicilio: string;
  destinariociudad: string;
  /** Nombre del agente aduanal. */
  agenteAduanalNombre: string;
  /** Primer apellido del agente aduanal. */
  agenteAduanalPrimerApellido: string;
  /** Segundo apellido del agente aduanal. */
  agenteAduanalSegundoApellido: string;
  /** Número de patente del agente aduanal. */
  agenteAduanalPatente: string;
  /** Datos en tabla relacionados con el destinatario. */
  destinatarioRowData: TablaDatos[];
  /** Datos en tabla relacionados con el agente aduanal. */
  agenteAduanalRowData: TablaDatos[];
  /** Clave de identificación del trámite. */
  clave: string;
  /** Dependencia relacionada con el trámite. */
  dependencia: string;
  /** Banco relacionado al trámite o pago. */
  banco: string;
  /** Llave o folio del trámite. */
  llave: string;
  /** Fecha del trámite o captura. */
  fecha: string;
  /** Importe monetario relacionado. */
  importe: string;
  /** Documentos o elementos revisados. */
  revisados: string;
  /** Medio por el cual se realiza el trámite (ej. digital, físico). */
  medio: string;
  /** Tipo de identificación proporcionada. */
  identificacion: string;
  /** Número económico del vehículo. */
  economico: string;
  /** Placa del vehículo. */
  placa: string;
  /** Número del trámite o folio interno. */
  numero: string;
  /** Fechas adicionales relacionadas al trámite. */
  fechas: string;
  /** Requisitos solicitados o entregados. */
  requisito: string;
  /** Descripción general del trámite o mercancía. */
  descripcion: string;
  /** Fracción arancelaria de la mercancía. */
  fraccion: string;
  /** Descripción arancelaria. */
  arancelaria: string;
  /** Cantidad de mercancía. */
  cantidad: string;
  /** Unidad de medida de la mercancía. */
  medida: string;
  /** Género biológico de la especie. */
  genero: string;
  /** Especie biológica. */
  especie: string;
  /** Nombre común de la especie. */
  comun: string;
  /** Lugar de origen del producto. */
  origen: string;
  /** Lugar de procedencia del producto. */
  procedencia: string;
    /** Lista de productos agregados */
    productos: Producto[];
    /** Detalles de cada producto, almacenados como entradas de mapa */
    detalles: [number, Detalle[]][];
}
 
 
/**
 * Crea y retorna el estado inicial para el trámite 250101.
 *
 * Esta función se utiliza para inicializar todos los campos del estado
 * con valores por defecto (nulos, cadenas vacías o arreglos vacíos),
 * asegurando una estructura limpia para comenzar el flujo del trámite.
 *
 * @returns {Tramite250102State} Estado inicial del trámite.
 */
export function createInitialState(): Tramite250102State {
  return {
    tipoMovimiento  :'',
    /** Valor inicial para tipo de aduana (sin seleccionar). */
    tipoAduana: null,
    /** Valor inicial para tipo de inspectoría (sin seleccionar). */
    tipoInspectoria: null,
    /** Valor inicial para municipio (sin seleccionar). */
    tipoMunicipio: null,
    /** Denominación del destinatario (vacía). */
    destinatarioDenominacion: '',
    /** País del destinatario (sin seleccionar). */
    destinatarioPais: null,
    /** Estado del destinatario (sin seleccionar). */
    destinatarioEstado: null,
    /** Código postal del destinatario (vacío). */
    destinatarioCodigoPostal: '',
    /** Domicilio del destinatario (vacío). */
    destinatarioDomicilio: '',
 
    destinariociudad: '',
    /** Nombre del agente aduanal (vacío). */
    agenteAduanalNombre: '',
    /** Primer apellido del agente aduanal (vacío). */
    agenteAduanalPrimerApellido: '',
    /** Segundo apellido del agente aduanal (vacío). */
    agenteAduanalSegundoApellido: '',
    /** Patente del agente aduanal (vacía). */
    agenteAduanalPatente: '',
    /** Lista vacía para los datos del destinatario en tabla. */
    destinatarioRowData: [],
    /** Lista vacía para los datos del agente aduanal en tabla. */
    agenteAduanalRowData: [],
    /** Clave del trámite (vacía). */
    clave: '',
    /** Dependencia relacionada (vacía). */
    dependencia: '',
    /** Banco relacionado (vacío). */
    banco: '',
    /** Llave única del trámite (vacía). */
    llave: '',
    /** Fecha del trámite (vacía). */
    fecha: '',
    /** Importe monetario (vacío). */
    importe: '',
    /** Elementos revisados (vacío). */
    revisados: '',
    /** Medio por el cual se realiza el trámite (vacío). */
    medio: '',
    /** Identificación proporcionada (vacía). */
    identificacion: '',
    /** Número económico del vehículo (vacío). */
    economico: '',
    /** Placa del vehículo (vacía). */
    placa: '',
    /** Número interno o folio (vacío). */
    numero: '',
    /** Fechas relacionadas (vacío). */
    fechas: '',
    /** Requisitos entregados o solicitados (vacío). */
    requisito: '',
    /** Descripción general (vacía). */
    descripcion: '',
    /** Fracción arancelaria (vacía). */
    fraccion: '',
    /** Descripción arancelaria (vacía). */
    arancelaria: '',
    /** Cantidad de mercancía (vacía). */
    cantidad: '',
    /** Unidad de medida (vacía). */
    medida: '',
    /** Género biológico (vacío). */
    genero: '',
    /** Especie biológica (vacía). */
    especie: '',
    /** Nombre común (vacío). */
    comun: '',
    /** País o región de origen (vacío). */
    origen: '',
    /** Lugar de procedencia (vacío). */
    procedencia: '',
     /** Lista vacía para los productos */
     productos: [],
     /** Lista vacía para los detalles de productos */
     detalles: [],
  };
}
 
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite250102', resettable: true })
export class Tramite250102Store extends Store<Tramite250102State> {
  constructor() {
    super(createInitialState());
  }
  public establecerDatos(datos: Partial<Tramite250102State>): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
  }
  public establecerDestinatario(destinatarioRowData: TablaDatos[]): void {
      this.update((state) => ({ ...state, destinatarioRowData }));
    }
 
  public establecerAgenteAduanal(agenteAduanalRowData: TablaDatos[]): void {
    this.update((state) => ({ ...state, agenteAduanalRowData }));
  }

  
  /**
   * Actualiza el estado con la clave proporcionada.
   * @param {string} clave La clave a establecer.
   */
  public setClave(clave: string): void {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  /**
   * Actualiza el estado con la dependencia proporcionada.
   * @param {string} dependencia La dependencia a establecer.
   */
  public setDependencia(dependencia: string): void {
    this.update((state) => ({
      ...state,
      dependencia,
    }));
  }

  /**
   * Actualiza el estado con el banco proporcionado.
   * @param {string} banco El banco a establecer.
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Actualiza el estado con la llave proporcionada.
   * @param {string} llave La llave a establecer.
   */
  public setLlave(llave: string): void {
    this.update((state) => ({
      ...state,
      llave,
    }));
  }

  /**
   * Actualiza el estado con la fecha proporcionada.
   * @param {string} fecha La fecha a establecer.
   */
  public setFecha(fecha: string): void {
    this.update((state) => ({
      ...state,
      fecha,
    }));
  }

  /**
   * Actualiza el estado con el importe proporcionado.
   * @param {string} importe El importe a establecer.
   */
  public setImporte(importe: string): void {
    this.update((state) => ({
      ...state,
      importe,
    }));
  }
  /**
 * Actualiza el estado con el valor de 'revisados' proporcionado.
 * @param {string} revisados - El valor de revisados a establecer.
 */
public setRevisados(revisados: string): void {
  this.update((state) => ({
    ...state,
    revisados,
  }));
}

/**
 * Establece el medio en el estado.
 * @param {string} medio - El medio a establecer.
 */
public setMedio(medio: string): void {
  this.update((state) => ({
    ...state,
    medio,
  }));
}

/**
 * Establece la identificación en el estado.
 * @param {string} identificacion - La identificación a establecer.
 */
public setIdentificacion(identificacion: string): void {
  this.update((state) => ({
    ...state,
    identificacion,
  }));
}

/**
 * Establece el valor económico en el estado.
 * @param {string} economico - El valor económico a establecer.
 */
public setEconomico(economico: string): void {
  this.update((state) => ({
    ...state,
    economico,
  }));
}

/**
 * Establece la placa en el estado.
 * @param {string} placa - La placa a establecer.
 */
public setPlaca(placa: string): void {
  this.update((state) => ({
    ...state,
    placa,
  }));
}

/**
 * Establece el número en el estado.
 * @param {string} numero - El número a establecer.
 */
public setNumero(numero: string): void {
  this.update((state) => ({
    ...state,
    numero,
  }));
}

/**
 * Establece las fechas en el estado.
 * @param {string} fechas - Las fechas a establecer.
 */
public setFechas(fechas: string): void {
  this.update((state) => ({
    ...state,
    fechas,
  }));
}

/**
 * Establece el requisito en el estado.
 * @param {string} requisito - El requisito a establecer.
 */
public setRequisito(requisito: string): void {
  this.update((state) => ({
    ...state,
    requisito,
  }));
}

/**
 * Establece la fracción arancelaria en el estado.
 * @param {string} arancelaria - La fracción arancelaria a establecer.
 */
public setArancelaria(arancelaria: string): void {
  this.update((state) => ({
    ...state,
    arancelaria,
  }));
}

/**
 * Establece la cantidad en el estado.
 * @param {string} cantidad - La cantidad a establecer.
 */
public setCantidad(cantidad: string): void {
  this.update((state) => ({
    ...state,
    cantidad,
  }));
}

/**
 * Establece la medida en el estado.
 * @param {string} medida - La medida a establecer.
 */
public setMedida(medida: string): void {
  this.update((state) => ({
    ...state,
    medida,
  }));
}

/**
 * Establece el género en el estado.
 * @param {string} genero - El género a establecer.
 */
public setGenero(genero: string): void {
  this.update((state) => ({
    ...state,
    genero,
  }));
}

/**
 * Establece la especie en el estado.
 * @param {string} especie - La especie a establecer.
 */
public setEspecie(especie: string): void {
  this.update((state) => ({
    ...state,
    especie,
  }));
}

/**
 * Establece el nombre común en el estado.
 * @param {string} comun - El nombre común a establecer.
 */
public setComun(comun: string): void {
  this.update((state) => ({
    ...state,
    comun,
  }));
}

/**
 * Establece el origen en el estado.
 * @param {string} origen - El origen a establecer.
 */
public setOrigen(origen: string): void {
  this.update((state) => ({
    ...state,
    origen,
  }));
}

/**
 * Establece la procedencia en el estado.
 * @param {string} procedencia - La procedencia a establecer.
 */
public setProcedencia(procedencia: string): void {
  this.update((state) => ({
    ...state,
    procedencia,
  }));
}

/**
 * Establece la descripción en el estado.
 * @param {string} descripcion - La descripción a establecer.
 */
public setDescripcion(descripcion: string): void {
  this.update((state) => ({
    ...state,
    descripcion,
  }));
}

/**
 * Establece la fracción en el estado.
 * @param {string} fraccion - La fracción a establecer.
 */
public setFraccion(fraccion: string): void {
  this.update((state) => ({
    ...state,
    fraccion,
  }));
}

/**
   * Establece la lista de productos en el estado.
   * @param productos Lista de productos
   */
public setProductos(productos: Producto[]): void {
  this.update((state) => ({ ...state, productos }));
}

/**
 * Establece los detalles de los productos en el estado.
 * @param detalles Entradas de mapa con detalles de productos
 */
public setDetalles(detalles: [number, Detalle[]][]): void {
  this.update((state) => ({ ...state, detalles }));
}

/**
 * Restaura el estado inicial del store.
 */
public resetStore(): void {
  this.reset();
}

}
 