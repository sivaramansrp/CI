


/**
 * Interfaz que representa las licitaciones disponibles.
 */
export interface LicitacionesDisponibles {
    /**
     * ID de la asignación.
     */
    idAsignacion?: number;

    idSolicitud?: number;

    /**
     * Número de la licitación.
     */
    numeroLicitacion?: string;

    licitacionPublica?: {
      numeroLicitacion: string;
    };

    numeroFolioCertificado?: string;

    /**
     * Cantidad aprobada
     */
    cantidadAprobada?: number;

    /**
     * Suma aprobada
     */
    sumaAprobada?: number | null;

    /**
     * Suma expedida
     */
    sumaExpedida?: number | null;

    /**
     * Cantidad cancelada
     */
    cantidadCancelada?: number;

    /**
     * Estado activo
     */
    activa?: boolean;

    /**
     * Estado aprobado
     */
    aprobada?: boolean;

    /**
     * Fecha de autorización
     */
    fechaAutorizacion?: string;

    /**
     * Participante de la licitación
     */
    participante?: {
        participantePK?: {
            idLicitacionPublica: number;
            rfcParticipante: string;
        };
        rfc?: string | null;
        montoAdjudicado?: number;
        ganador?: boolean;
        tipoParticipante?: string;
        montoDisponible?: number | null;
        licitacionPublica?: {
            idLicitacion: number;
            anio: number;
            cantidadMaxima: number;
            fechaLimiteCalificacion: string;
            fechaConcurso: string;
            fechaInicioVigencia: string;
            fechaFinVigencia: string | null;
            fundamento: string;
            tipoConstancia: string;
            tipoLicitacion: string;
            unidadMedidaTarifaria: string | null;
            regimenAduanero: string | null;
            fechaInicio: string | null;
            observaciones: string | null;
            bloqueComercial: string | null;
            paises: string | null;
            numeroLicitacion: string;
            idMecanismoAsignacion: string | null;
            añoAutorizacion: string | null;
            fechaInicioVigenciaLicitacion: string | null;
        };
    };

    /**
     * Monto adjudicado en la licitación.
     */
    montoAdjudicado?: number;

    /**
     * Fecha de inicio de vigencia de la licitación.
     */
    fechaInicioVigencia?: string;

    /**
     * Fecha de fin de vigencia aprobada de la licitación.
     */
    fechaFinVigenciaAprobada?: string;

    /**
     * Nombre del producto.
     */
    nombreProducto?: string;

    /**
     * Fecha del concurso.
     */
    fechaConcurso?: string;

    // Campos mantenidos para compatibilidad con el código existente
    /**
     * Número de la licitación (alias para numeroLicitacion).
     * @deprecated Use numeroLicitacion instead
     */
    numeroDeLicitacion?: string;

    /**
     * Fecha de la licitación (alias para fechaConcurso).
     * @deprecated Use fechaConcurso instead
     */
    fechaDeLicitacion?: string;

    /**
     * Descripción de la licitación (alias para nombreProducto).
     * @deprecated Use nombreProducto instead
     */
    descripcion?: string;

    descripcionMercancia?: string;

    /**
     * Fecha de fin de vigencia de la licitación (alias para fechaFinVigenciaAprobada).
     * @deprecated Use fechaFinVigenciaAprobada instead
     */
    fechaFinVigencia?: string;

    fechaExpedicion?: string;

    cantidad?: number;

    certificadoAprobado?: string;

    comprobadoPedimento?: string;

    impTotalFc?: number;

    impDls?: number;
}

/**
 * Interfaz que representa la distribución de saldo para la expedición de un certificado.
 */
export interface DistribucionSaldo {
   
    /**
     * Monto que se desea expedir.
     * @type {string}
     */
    montoAExpedir: string;


    /**
     * Indicador booleano que verifica si el monto a expedir está seleccionado.
     * @type {boolean}
     */
    montoAExpedirCheck: boolean;

     /**
     * Monto disponible para la expedición.
     * @type {string}
     */
     montoDisponible: string;


    /**
     * Total acumulado que se va a expedir.
     * @type {string}
     */
    totalAExpedir: string;
}

/**
 * Representa el detalle de una licitación.
 * 
 * @interface DetalledelaLicitacion
 * @property {string} numeraDelicitacion - Número de la licitación.
 * @property {string} fechaDelEventoDelicitacion - Fecha del evento de la licitación.
 * @property {string} descripcionDelProducto - Descripción del producto relacionado con la licitación.
 */
export interface DetalledelaLicitacion{
        numeraDelicitacion:string,
        fechaDelEventoDelicitacion:string,
        descripcionDelProducto:string,
        unidadMedidaTarifaria:string,
        montoAdjudicado:string,
        regimenAduanero:string,
        fraccionArancelaria:string,
        fechaInicioVigenciaCupo:string,
        fechaFinVigenciaCupo:string,
        observaciones:string,
        bloqueComercial:string,
        paises:string,
        fechaInicioVigencia:string
        mecanismoAsignacion: {
            observaciones: string;
        },
        montoDisponible: number,
}

/**
 * Configuración de la tabla para mostrar información de accionistas.
 * 
 * Cada objeto en el arreglo representa una columna de la tabla con las siguientes propiedades:
 * 
 * - `encabezado`: El título de la columna que se mostrará en la tabla.
 * - `clave`: Una función que toma un objeto de tipo `LicitacionesDisponibles` y devuelve el valor correspondiente a mostrar en la columna.
 * - `orden`: El orden en el que se mostrará la columna en la tabla.
 * 
 * Propiedades de las columnas:
 * 
 * 1. **Número de licitación**: Muestra el número de la licitación.
 * 2. **Fecha de evento de licitación pública**: Muestra la fecha del evento de licitación pública.
 * 3. **Descripción del producto**: Muestra la descripción del producto.
 * 4. **Monto adjudicado**: Muestra el monto adjudicado en la licitación.
 * 5. **Fecha inicio vigencia**: Muestra la fecha de inicio de vigencia.
 * 6. **Fecha fin vigencia**: Muestra la fecha de fin de vigencia.
 */
export const CONFIGURACION_ACCIONISTAS_TABLA = [
    {
        encabezado: 'Número de licitación',
        clave: (ele: LicitacionesDisponibles):string => ele.participante?.licitacionPublica?.numeroLicitacion || ele.licitacionPublica?.numeroLicitacion || ele.numeroFolioCertificado || '',
        orden: 1
      },
      {
        encabezado: 'Fecha de evento de licitación pública',
        clave: (ele: LicitacionesDisponibles):string => ele.participante?.licitacionPublica?.fechaConcurso || ele.fechaConcurso || ele.fechaExpedicion || '',
        orden: 2
      },
      {
        encabezado: 'Descripción del producto ',
        clave: (ele: LicitacionesDisponibles):string => ele.participante?.licitacionPublica?.fundamento || ele.nombreProducto || ele.descripcionMercancia || '',
        orden: 3
      },
      {
        encabezado: 'Monto adjudicado',
        clave: (ele: LicitacionesDisponibles):string => ele.participante?.montoAdjudicado?.toString() || ele.montoAdjudicado?.toString() || '0',
        orden: 4
      },
      {
        encabezado: 'Fecha inicio vigencia',
        clave: (ele: LicitacionesDisponibles):string => ele.fechaInicioVigencia || ele.participante?.licitacionPublica?.fechaInicioVigencia || ele.fechaExpedicion || '',
        orden: 5
      },
      {
        encabezado: 'Fecha fin vigencia',
        clave: (ele: LicitacionesDisponibles):string => ele.fechaFinVigenciaAprobada || ele.fechaFinVigencia || '',
        orden: 6
      }
]