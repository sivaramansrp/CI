import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface EstadoFormularioResiduo {
  formularioDatos: {
    /** Número de identificación del registro de materia prima */
    numero: string;

    /** Nombre de la materia prima */
    nombreMateriaPrima: string;

    /** Cantidad numérica de materia prima */
    cantidad: string;

    /** Cantidad escrita con letra */
    cantidadLetra: string;

    /** Unidad de medida utilizada */
    unidadDeMedida: string;

    /** Fracción arancelaria correspondiente a la materia prima */
    fraccionArancelaria: string;
  };

  formularioResiduo: {
    /** Fracción arancelaria correspondiente al residuo */
    fraccionArancelaria: string;

    /** Número de Identificación Comercial (NICO) */
    nico: string;

    /** Acotación específica del residuo */
    acotacion: string;

    /** Indica si el residuo es peligroso */
    residuoPeligroso: string;

    /** Cantidad numérica del residuo */
    cantidad: string;

    /** Cantidad escrita con letra */
    cantidadLetra: string;

    /** Unidad de medida del residuo */
    unidadMedida: string;

    /** Clasificación del residuo */
    clasificacion: string;

    /** Clave identificadora del residuo */
    claveResiduo: string;

    /** Nombre del residuo */
    nombre: string;

    /** Descripción detallada del residuo */
    descripcion: string;

    /** Evaluación CRETI del residuo (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable) */
    creti: string;

    /** Estado físico del residuo (sólido, líquido, etc.) */
    estadoFisico: string;

    /** Tipo de contenedor usado para el residuo */
    tipoContenedor: string;

    /** Capacidad del contenedor */
    capacidad: string;
  };
}


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


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'formulario-residuo', resettable: true })
export class FormularioResiduoStore extends Store<EstadoFormularioResiduo> {
  constructor() {
    // Inicializa el store con el estado inicial del formulario de residuo
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
