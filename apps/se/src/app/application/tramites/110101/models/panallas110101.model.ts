
/**
 * Representa una fila de la tabla de registro de solicitudes.
 *
 * @property pais - El país relacionado con la solicitud.
 * @property tratado - El tratado asociado a la solicitud.
 * @property origen - El origen de la solicitud.
 */
export interface RegistroDeSolicitudesTabla {
    pais?: string;
    tratado?: string;
    origen?: string;
}

/**
 * Representa una fila de la tabla de tratados.
 */
export interface TratadosTabla {
    pais: string;
    tratado: string;
    origen: string;
    normaOrigen: string;
    requisitoEspecifico: string;
    calificacionSistema: string;
    calificacionDictaminad: string;
    otrasInstancias: string;
    procesoTransformacion: string;
}
/**
 * Representa una fila de la tabla de insumos.
 *
 * @property nombreTecnico - Nombre técnico del insumo.
 * @property proveedor - Proveedor del insumo.
 * @property fabricanteOProductor - Fabricante o productor del insumo.
 * @property rfc - RFC del proveedor o fabricante.
 * @property fraccionArancelaria - Fracción arancelaria correspondiente.
 * @property valorDeTransaccion - Valor de transacción del insumo.
 */
export interface InsumosTabla {
    nombreTecnico: string;
    proveedor: string;
    fabricanteOProductor: string;
    rfc: string;
    fraccionArancelaria: string;
    valorDeTransaccion: number;
}

/**
 * Representa una fila de la tabla de envases.
 *
 * @property nombreTecnico - Nombre técnico del envase.
 * @property proveedor - Proveedor del envase.
 * @property fabricanteOProductor - Fabricante o productor del envase.
 * @property fraccionArancelaria - Fracción arancelaria correspondiente.
 * @property valorEnDolares - Valor en dólares del envase.
 * @property paisDeOrigen - País de origen del envase.
 */
export interface EnvasesTabla {
    nombreTecnico: string;
    proveedor: string;
    fabricanteOProductor: string;
    fraccionArancelaria: string;
    valorEnDolares: number;
    paisDeOrigen: string;
}

/**
 * Representa una fila de la tabla modal de mercancías.
 *
 * @property tratado - Nombre del tratado o acuerdo comercial.
 * @property pais - País o bloque relacionado.
 */
export interface DatosMercanciaModalTabla {
    tratado: string;
    pais: string;
}