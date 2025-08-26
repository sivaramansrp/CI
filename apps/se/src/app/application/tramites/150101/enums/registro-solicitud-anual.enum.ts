/**
 * Constante que define los pasos del reporte anual.
 */
export const REPORTE_ANUAL_PASOS = [
  {
    /**
     * Índice del paso.
     */
    indice: 1,
    /**
     * Título del paso.
     */
    titulo: 'Capturar solicitud',
    /**
     * Indica si el paso está activo.
     */
    activo: true,
    /**
     * Indica si el paso está completado.
     */
    completado: false,
  },
  {
    /**
     * Índice del paso.
     */
    indice: 2,
    /**
     * Título del paso.
     */
    titulo: 'Firmar solicitud',
    /**
     * Indica si el paso está activo.
     */
    activo: false,
    /**
     * Indica si el paso está completado.
     */
    completado: false,
  }
];


/**
 * Mensaje de alerta que se muestra cuando hay errores de validación en los formularios.
 * 
 * Este mensaje se utiliza para informar al usuario que faltan campos por capturar
 * antes de poder continuar al siguiente paso del trámite.
 */
export const ERROR_FORMA_ALERT = `
<div class="d-flex justify-content-center text-center">
  <div class="col-md-12 p-3  border-danger  text-danger rounded">
    <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

    <div class="d-flex justify-content-start mb-1">
      <span class="me-2">1.</span>
      <span class="flex-grow-1 text-center">(Total exportaciones deben ser mayores o iguales a cero.) es un campo requerido</span>
    </div>

    <div class="d-flex justify-content-start">
      <span class="me-2">2.</span>
      <span class="flex-grow-1 text-center">(Ventas totales deben ser mayores o iguales a cero.) es un campo requerido</span>
    </div>
  </div>
</div>


`;
/**
 * Mensaje de alerta que se muestra cuando hay errores de validación en los formularios.
 * 
 * Este mensaje se utiliza para informar al usuario que faltan campos por capturar
 * antes de poder continuar al siguiente paso del trámite.
 */
export const ERROR_FORMA_ALERT_DOS = `
<div class="d-flex justify-content-center text-center">
  <div class="col-md-12 p-3  border-danger  text-danger rounded">
    <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

    <div class="d-flex justify-content-start mb-1">
      <span class="me-2">1.</span>
      <span class="flex-grow-1 text-center">(Ventas totales deben ser mayores o iguales a cero.) es un campo requerido</span>
    </div>

  </div>
</div>

`;
/**
 * Mensaje de alerta que se muestra cuando hay errores de validación en los formularios.
 * 
 * Este mensaje se utiliza para informar al usuario que faltan campos por capturar
 * antes de poder continuar al siguiente paso del trámite.
 */
export const ERROR_FORMA_ALERT_TRES= `

<div class="d-flex justify-content-center text-center">
  <div class="col-md-12 p-3  border-danger  text-danger rounded">
    <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

    <div class="d-flex justify-content-start mb-1">
      <span class="me-2">1.</span>
      <span class="flex-grow-1 text-center">(Las Ventas Totales deben ser mayores o iguales al Total de Exportaciones.) es un campo requerido
    </span>
    </div>

  </div>
</div>

`;
/**
 * Mensaje de alerta que se muestra cuando hay errores de validación en los formularios.
 * 
 * Este mensaje se utiliza para informar al usuario que faltan campos por capturar
 * antes de poder continuar al siguiente paso del trámite.
 */
export const ERROR_FORMA_ALERT_QUAD= `
<div class="d-flex justify-content-center text-center">
  <div class="col-md-12 p-3  border-danger  text-danger rounded">
    <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

    <div class="d-flex justify-content-start mb-1">
      <span class="me-2">1.</span>
      <span class="flex-grow-1 text-center">(Total exportaciones deben ser mayores o iguales a cero.) es un campo requerido </span>
    </div>

  </div>
</div>

`;