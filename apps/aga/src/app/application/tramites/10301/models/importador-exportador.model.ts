export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}

export interface ConsultaDatos {

  /** Identificador del manifiesto asociado al trámite */
  manifesto: string; 

  /** Identificador de la aduana */
  aduana: string; 

  /** Nombre de la empresa o persona que realiza la solicitud. */
  nombre: string;

  /** Tipo de mercancía involucrada en la solicitud. */
  tipoMercancia: string;

  /** Uso específico declarado para la mercancía. */
  usoEspecifico: string;

  /** Marca del artículo o producto. */
  marca: string;

  /** Modelo del artículo o producto. */
  modelo: string;

  /** Número de serie del artículo o producto. */
  serie: string;

  /** Nombre de la calle del domicilio fiscal u operativo. */
  calle: string;

  /** Número exterior del domicilio. */
  numeroExterior: number;

  /** Número interior del domicilio. */
  numeroInterior: number;

  /** Número telefónico de contacto principal. */
  telefono: number;

  /** Correo electrónico principal de contacto. */
  correoElectronico: string;

  /** Código postal del domicilio declarado. */
  codigoPostal: number;

  /** Identificador del estado o entidad federativa del domicilio. */
  estado: number;

  /** Identificador de la colonia del domicilio. */
  colonia: number;

  /** Opción seleccionada por el usuario (casilla, alternativa, etc.). */
  opcion: string;

}