/**
 * Ejemplo de configuración para mostrar cómo implementar la lógica condicional
 * para los campos de fecha en el formulario de dictamen
 */

import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';

/**
 * Configuración del formulario de dictamen con campos condicionales
 * Este es un ejemplo de cómo debería configurarse el formulario
 */
export const DICTAMEN_FORM_CONFIG: ModeloDeFormaDinamica[] = [
  {
    id: 'sentido_dictamen',
    labelNombre: 'Sentido dictamen',
    campo: 'sentido_dictamen',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: 'aceptado',
    marginTop: 0,
    opciones: [
      {
        label: 'Aceptado',
        value: 'aceptado',
      },
      {
        label: 'Rechazado',
        value: 'rechazado',
      },
    ],
    mostrar: true,
  },
  {
    id: 'justificacion_dictamen',
    labelNombre: 'Justificación del dictamen',
    campo: 'justificacion_dictamen',
    clase: 'col-md-12',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Ingrese la justificación del dictamen',
    marginTop: 3,
    mostrar: true,
  },
  {
    id: 'fecha_inicio_vigencia_autorizada',
    labelNombre: 'Fecha de inicio de vigencia autorizada',
    campo: 'fecha_inicio_vigencia_autorizada',
    clase: 'col-md-6',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marginTop: 3,
    mostrar: true, // Este campo debe ser condicional basado en sentido_dictamen
  },
  {
    id: 'fecha_fin_vigencia_autorizada',
    labelNombre: 'Fecha de fin de vigencia autorizada',
    campo: 'fecha_fin_vigencia_autorizada',
    clase: 'col-md-6',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marginTop: 3,
    mostrar: true, // Este campo debe ser condicional basado en sentido_dictamen
  },
];

/**
 * Función para actualizar la visibilidad de los campos de fecha
 * basado en el valor del sentido dictamen
 */
export function actualizarVisibilidadCamposFecha(
  formConfig: ModeloDeFormaDinamica[], 
  sentidoDictamen: string
): ModeloDeFormaDinamica[] {
  return formConfig.map(campo => {
    // Si es uno de los campos de fecha de vigencia autorizada
    if (campo.campo === 'fecha_inicio_vigencia_autorizada' || 
        campo.campo === 'fecha_fin_vigencia_autorizada') {
      // Solo mostrar si el sentido del dictamen es "aceptado"
      campo.mostrar = sentidoDictamen === 'aceptado';
    }
    return campo;
  });
}

/**
 * Ejemplo de cómo manejar los cambios de valor en el componente
 */
export class EjemploDictamenComponent {
  public dictamenFormData: ModeloDeFormaDinamica[] = [...DICTAMEN_FORM_CONFIG];

  /**
   * Método que maneja los cambios de valor en el formulario
   * Se llama cuando el evento emitirCambioDeValor es emitido desde formas-dinamicas
   */
  public manejarCambioDeValor(event: { campo: string; valor: string }): void {
    if (event.campo === 'sentido_dictamen') {
      // Actualizar la visibilidad de los campos de fecha
      this.dictamenFormData = actualizarVisibilidadCamposFecha(
        this.dictamenFormData, 
        event.valor
      );
    }
  }
}