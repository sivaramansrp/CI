import { ConfiguracionVisibilidad } from "../../../shared/models/datos-domicilio-legal.model";

/**
  * @constant ERROR_FORMA_ALERT
  * @type {string}
  * @description
  * Este mensaje de alerta informa al usuario sobre el proceso para agregar datos del traslado y la sede, 
  * indicando que a cada traslado le corresponde una sede con un máximo de dos itinerarios.
  */
export const ERROR_FORMA_ALERT =
`
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      <strong>¡Error de registro!</strong>
    </div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`;
 
export const DEFAULT_CONFIGURACION_VISIBILIDAD: ConfiguracionVisibilidad = {
  paisOrigen: true, // Indica si el país de origen es visible. Por defecto es `false`.
  paisFabrica: false, // Indica si el país de fabricación es visible. Por defecto es `true`.
  paisElaboracion: false, // Indica si el país de elaboración es visible. Por defecto es `true`.
  paisProveedor: false, // Indica si el país del proveedor es visible. Por defecto es `true`.
  paisProcedencia: true, // Indica si el país de procedencia es visible. Por defecto es `true`.
};