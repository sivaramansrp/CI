import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * Modelo de datos para la expedición y asignación
 */
export interface StoreValues {
  totalExpedir: number;
  montoExpedir: number;
  montoDisponibleAsignacion: number;
  cveAniosAutorizacion: string;
  numFolioAsignacionAux: string;
  cuerpoTabla: unknown[];
  mostrarDetalle: boolean;
  fechaFinVigencia: Date;
}
/** Modelo para la respuesta de la API de expedir monto
 * @interface ExpedirMonto
 */
export interface ExpedirMonto {
    /**
     * Monto a expedir
     * @type {number}
     */
    montoExpedir: number;
}

/** Modelo para la respuesta de la API de búsqueda de asignación
 * @interface BuscarAsignacionResponseItem
 */
export interface BuscarAsignacionResponseItem{
    estado?: { nombre: string };
      unidadAdministrativaRepresentacionFederal?: { nombre: string };
      asignacion?: {
        impTotalAprobado?: number;
        impTotalExpedido?: number;
        montoDisponible?: number;
        numFolioAsignacion?: string;
        fechaInicioVigencia?: string;
        fechaFinVigenciaAprobada?: string;
      };
      mecanismoAsignacion?: {
        regimen?: string;
        descClasificacionProducto?: string;
        nombreMecanismoAsignacion?: string;
        paisesCupo?: Array<{ pais: { nombre: string } }>;
      };
      unidadMedidaOficialCupo?: string;
      fechaInicioVigencia?: string;
      fechaFinVigencia?: string;
      tratado?: string;
      fraccionArancelaria?: Array<string>;
      observaciones?: string;
      descripcionFundamento?: string;
      montoDisponibleAsignacion?: number;
    
}
/** Modelo para la respuesta de la API de búsqueda de asignación
 * @interface BuscarAsignacionResponse
 */
export interface BuscarAsignacionResponse {
    datos: BuscarAsignacionResponseItem[];
  }

  /**
   * Constantes para la configuración de la tabla de expedición de certificados
   */
  export const CONFIGURACION_PARA_ENCABEZADO_DE_EXPEDIR_MONTO_TABLA: ConfiguracionColumna<ExpedirMonto>[] = [
    { encabezado: 'Monto a expedir', clave: (fila) => fila.montoExpedir, orden: 1 },
  ];


  /** Modelo para el estado de la sección de expedición de certificados para asignación
 */
  export interface StateExpedicionAsignacion {
asignacionOficioNumeroForm: {
    cveAniosAutorizacion?: string;
    numFolioAsignacionAux?: string;
  };

  representacionFederalForm: {
    estado?: string;
    representacionFederal?: string;
  };

  controlMontosAsignacionForm: {
    sumaAprobada?: number | null;
    sumaExpedida?: number | null;
    montoDisponible?: number | null;
  };

  asignacionDatosForm: {
    numOficio?: string;
    fechaInicio?: string;
    fechaFinVigenciaAprobada?: string;
  };

  cupoDescripcionForm: {
    regimenAduanero?: string;
    descripcionProducto?: string;
    clasificaionSubproducto?: string;
    unidadMedidaOficialCupo?: string;
    fechaInicioVigencia?: string;
    fechaFinVigencia?: string;
    mecanismoAsignacion?: string;
    tratado?: string;
    fraccionesArancelarias?: string;
    paisesCupo?: string;
    observaciones?: string;
    descripcionFundamento?: string;
  };

  distribucionSaldoForm: {
    montoDisponibleAsignacion?: number | null;
    montoExpedir?: number | null;
    totalExpedir?: number;
  };

  // Fields that do NOT belong to a formGroup:
  cuerpoTabla?: ExpedirMonto[];
  mostrarDetalle?: boolean;
  }