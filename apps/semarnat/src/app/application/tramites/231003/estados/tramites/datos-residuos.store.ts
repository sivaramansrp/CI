import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Representa el estado completo del formulario de residuos.
 * Contiene los valores de los formularios de datos generales
 * y de residuos peligrosos, utilizados para su gestión en el store.
 */
export interface EstadoFormularioResiduo {
  /**
   * Datos del formulario relacionados con la materia prima.
   */
  formularioDatos: {
    /**
     * Número de identificación del registro de materia prima.
     */
    numero: string;

    /**
     * Nombre de la materia prima.
     */
    nombreMateriaPrima: string;

    /**
     * Cantidad numérica de materia prima.
     */
    cantidad: string;

    /**
     * Cantidad escrita con letra.
     */
    cantidadLetra: string;

    /**
     * Unidad de medida utilizada.
     */
    unidadDeMedida: string;

    /**
     * Fracción arancelaria correspondiente a la materia prima.
     */
    fraccionArancelaria: string;
  };

  /**
   * Datos del formulario relacionados con el residuo generado.
   */
  formularioResiduo: {
    /**
     * Fracción arancelaria correspondiente al residuo.
     */
    fraccionArancelaria: string;

    /**
     * Número de Identificación Comercial (NICO).
     */
    nico: string;

    /**
     * Acotación específica del residuo.
     */
    acotacion: string;

    /**
     * Indica si el residuo es peligroso.
     */
    residuoPeligroso: string;

    /**
     * Cantidad numérica del residuo.
     */
    cantidad: string;

    /**
     * Cantidad escrita con letra.
     */
    cantidadLetra: string;

    /**
     * Unidad de medida del residuo.
     */
    unidadMedida: string;

    /**
     * Clasificación del residuo.
     */
    clasificacion: string;

    /**
     * Clave identificadora del residuo.
     */
    claveResiduo: string;

    /**
     * Nombre del residuo.
     */
    nombre: string;

    /**
     * Descripción detallada del residuo.
     */
    descripcion: string;

    /**
     * Evaluación CRETI del residuo (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable).
     */
    creti: string;

    /**
     * Estado físico del residuo (sólido, líquido, etc.).
     */
    estadoFisico: string;

    /**
     * Tipo de contenedor usado para el residuo.
     */
    tipoContenedor: string;

    /**
     * Capacidad del contenedor.
     */
    capacidad: string;
  };
}


/**
 * Función que crea el estado inicial para el formulario de residuo.
 * 
 * Retorna un objeto con los valores por defecto de los campos del formularioDatos
 * y formularioResiduo, todos inicializados como cadenas vacías.
 * 
 * @returns EstadoFormularioResiduo - Estado inicial del formulario
 */
export function crearEstadoInicialFormularioResiduo(): EstadoFormularioResiduo {
  return {
    formularioDatos: {
      /** Número de identificación del registro de materia prima */
      numero: '',

      /** Nombre de la materia prima */
      nombreMateriaPrima: '',

      /** Cantidad numérica de materia prima */
      cantidad: '',

      /** Cantidad escrita con letra */
      cantidadLetra: '',

      /** Unidad de medida utilizada */
      unidadDeMedida: '',

      /** Fracción arancelaria correspondiente a la materia prima */
      fraccionArancelaria: '',
    },
    formularioResiduo: {
      /** Fracción arancelaria correspondiente al residuo */
      fraccionArancelaria: '',

      /** Número de Identificación Comercial (NICO) */
      nico: '',

      /** Acotación específica del residuo */
      acotacion: '',

      /** Indica si el residuo es peligroso */
      residuoPeligroso: '',

      /** Cantidad numérica del residuo */
      cantidad: '',

      /** Cantidad escrita con letra */
      cantidadLetra: '',

      /** Unidad de medida del residuo */
      unidadMedida: '',

      /** Clasificación del residuo */
      clasificacion: '',

      /** Clave identificadora del residuo */
      claveResiduo: '',

      /** Nombre del residuo */
      nombre: '',

      /** Descripción detallada del residuo */
      descripcion: '',

      /** Evaluación CRETI del residuo (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable) */
      creti: '',

      /** Estado físico del residuo (sólido, líquido, etc.) */
      estadoFisico: '',

      /** Tipo de contenedor usado para el residuo */
      tipoContenedor: '',

      /** Capacidad del contenedor */
      capacidad: '',
    }
  };
}

/**
 * Store de Akita para gestionar el estado del formulario de residuos peligrosos.
 * Utiliza la configuración de Akita con nombre 'formulario-residuo' y permite reiniciar el estado.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'formulario-residuo', resettable: true })
export class FormularioResiduoStore extends Store<EstadoFormularioResiduo> {
  /**
   * Constructor del store que inicializa el estado del formulario de residuo
   * con los valores por defecto definidos en la función `crearEstadoInicialFormularioResiduo`.
   */
  constructor() {
    super(crearEstadoInicialFormularioResiduo());
  }

  /**
   * Actualiza los datos del formulario relacionados con la materia prima.
   * @param datos - Objeto que contiene los datos de formularioDatos.
   */
  actualizarFormularioDatos(datos: EstadoFormularioResiduo['formularioDatos']): void {
    this.update(state => ({
      ...state,
      formularioDatos: { ...datos }
    }));
  }

  /**
   * Actualiza los datos del formulario relacionados con el residuo.
   * @param residuo - Objeto que contiene los datos de formularioResiduo.
   */
  actualizarFormularioResiduo(residuo: EstadoFormularioResiduo['formularioResiduo']): void {
    this.update(state => ({
      ...state,
      formularioResiduo: { ...residuo }
    }));
  }

  /**
   * Limpia todos los campos del formulario, reiniciándolos a su estado inicial.
   */
  limpiarFormulario(): void {
    this.reset();
  }

}
