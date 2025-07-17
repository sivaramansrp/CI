export interface Solicitud {
  /** Fecha de creación */
  fechaCreacion?: string;

  /** Nombre o identificador de la mercancía */
  mercancia?: string;

  /** Cantidad solicitada */
  cantidad?: string;

  /** Proveedor de la mercancía */
  proovedor?: string;

  /** Formas del café */
  formasdelcafe?: string;

  /** Tipos */
  tipos?: string;

  /** Calidad */
  calidad?: string;

  /** Procesos */
  procesos?: string;

  /** Certificaciones */
  certifications?: string;

  /** Aduana de salida */
  adunadesalida?: string;

  /** País destino */
  paisdestino?: string;

  /** Entidad de procedencia */
  entidaddeprocedencia?: string;

  /** Ciclo cafetalero */
  ciclocafetalero?: string;
}