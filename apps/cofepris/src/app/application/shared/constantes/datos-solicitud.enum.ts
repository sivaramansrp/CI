import {
  TablaMercanciasDatos,
  TablaOpcionConfig,
  TablaScianConfig,
} from '../models/datos-solicitud.model';

export const OPCION_TABLA = [
  {
    encabezado: 'Fecha creación',
    clave: (ele: TablaOpcionConfig): string => ele.fechaCreacion,
    orden: 1,
  },
  {
    encabezado: 'Mercancía',
    clave: (ele: TablaOpcionConfig): string => ele.mercancia,
    orden: 2,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: TablaOpcionConfig): string => ele.cantidad,
    orden: 3,
  },
  {
    encabezado: 'Proveedor',
    clave: (ele: TablaOpcionConfig): string => ele.proveedor,
    orden: 4,
  },
];

export const SCIAN_TABLA = [
  {
    encabezado: 'Clave S.C.I.A.N.',
    clave: (ele: TablaScianConfig): string => ele.clave,
    orden: 1,
  },
  {
    encabezado: 'Descripcion del S.C.I.A.N.',
    clave: (ele: TablaScianConfig): string => ele.descripcion,
    orden: 1,
  },
];
export const SCIAN_TABLA_DATA: TablaScianConfig[] = [
  { clave: '001', descripcion: 'Descripción 1' },
  { clave: '002', descripcion: 'Descripción 2' },
];
export const ALERTA_OPCIONS = `<p>Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.</p>`;

export const ALERTA_DE_MANIFESTO_Y_DECLARACIONES = `<div class="row">
    <div class="col-md-1 mt-4">
        <div class="form-check mt-4">
            <input class="form-check-input" type="checkbox" value="" id="manifiestosCasillaDeVerificacion">
            <label class="form-check-label" for="manifiestosCasillaDeVerificacion" (click)="manifestoSellecionado()">*
            </label>
        </div>
    </div>
    <div class="col-md-11">
        <p>Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su
            cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una
            autoridad. Asimismo acepto que la notificación de este tramite, sea a través de la Ventanilla Única de Comercio
            Exterior por los mecanismos de la misma.</p>
    </div>
</div>`;

/**
 * Represents a constant array `PRODUCTO_TABLA` that defines the structure of a product table.
 * Each object in the array contains the following properties:
 *
 * - `encabezado`: A string representing the header of the column.
 * - `clave`: A function that takes an object of type `TablaMercanciasDatos` and returns the value of the corresponding key.
 * - `orden`: A number representing the order of the column in the table.
 *
 * @constant
 * @type {Array<{ encabezado: string; clave: (ele: TablaMercanciasDatos) => any; orden: number }>}
 */
export const PRODUCTO_TABLA = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string => ele.clasificacionProducto, // Reemplaza 'ele.clasificacionProducto' con la clave correcta
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string =>
      ele.especificarClasificacionProducto, // Reemplaza 'ele.especificarClasificacionProducto' con la clave correcta
    orden: 2,
  },
  {
    encabezado: 'Denominación específica del producto',
    clave: (ele: TablaMercanciasDatos): string =>
      ele.denominacionEspecificaProducto, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Denominación distintiva',
    clave: (ele: TablaMercanciasDatos): string => ele.denominacionDistintiva, // Reemplaza 'ele.denominacionDistintiva' con la clave correcta
    orden: 4,
  },
  {
    encabezado: 'Denominación común, nombre común o nombre científico',
    clave: (ele: TablaMercanciasDatos): string => ele.denominacionComun, // Reemplaza 'ele.denominacionComun' con la clave correcta
    orden: 5,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: TablaMercanciasDatos): string => ele.formaFarmaceutica, // Reemplaza 'ele.formaFarmaceutica' con la clave correcta
    orden: 6,
  },
  {
    encabezado: 'Estado físico',
    clave: (ele: TablaMercanciasDatos): string => ele.estadoFisico, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 7,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: TablaMercanciasDatos): string => ele.fraccionArancelaria, // Reemplaza 'ele.fraccionArancelaria' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: TablaMercanciasDatos): string => ele.descripcionFraccion, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 9,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (ele: TablaMercanciasDatos): string =>
      ele.unidadMedidaComercializacion, // Reemplaza 'ele.unidadMedidaComercializacion' con la clave correcta
    orden: 10,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMC, // Reemplaza 'ele.cantidadUMC' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasDatos): string => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 13,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: TablaMercanciasDatos): string => ele.presentacion, // Reemplaza 'ele.presentacion' con la clave correcta
    orden: 14,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: TablaMercanciasDatos): string => ele.numeroRegistroSanitario, // Reemplaza 'ele.numeroRegistroSanitario' con la clave correcta
    orden: 15,
  },
  {
    encabezado: 'País de origen',
    clave: (ele: TablaMercanciasDatos): string => ele.paisOrigen, // Reemplaza 'ele.paisOrigen' con la clave correcta
    orden: 16,
  },
  {
    encabezado: 'País de procedencia',
    clave: (ele: TablaMercanciasDatos): string => ele.paisProcedencia, // Reemplaza 'ele.paisProcedencia' con la clave correcta
    orden: 17,
  },
  {
    encabezado: 'Tipo producto',
    clave: (ele: TablaMercanciasDatos): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 18,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasDatos): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 19,
  },
];

export const PRODUCTO_TABLA_DATA: TablaMercanciasDatos[] = [
  {
    clasificacionProducto: '1',
    especificarClasificacionProducto: '',
    denominacionEspecificaProducto: 'QA',
    denominacionDistintiva: 'QA',
    denominacionComun: 'QA',
    formaFarmaceutica: '',
    estadoFisico: '',
    fraccionArancelaria: '',
    descripcionFraccion: '',
    unidadMedidaComercializacion: '',
    cantidadUMC: '',
    unidadMedidaTarifa: '',
    cantidadUMT: '',
    presentacion: '',
    numeroRegistroSanitario: '',
    paisOrigen: '',
    paisProcedencia: '',
    tipoProducto: '',
    usoEspecifico: '',
  },
];

/** "t" se utiliza para continuar el botón que se usa globalmente para el procedimiento 230401 */
export const CONTINUAR: string = 't';

export const CROSLISTA_DE_PAISES: string[] = [
  'AFGANISTÁN (EMIRATO ISLÁMICO)',
  'ALBANIA (REPÚBLICA DE)',
  'ALEMANIA (REPÚBLICA FEDERAL DE)',
  'ANDORRA (PRINCIPADO DE)',
  'ANGOLA (REPÚBLICA DE)',
  'ANGUILLA',
  'ANTIGUA Y BARBUDA',
  'ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)',
  'ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)',
  'ARGENTINA (REPÚBLICA)',
  'AUSTRALIA (COMMONWEALTH OF)',
  'AUSTRIA (REPUBLIC OF)',
  'BAHAMAS (COMMONWEALTH OF THE)',
  'BAHRAIN (KINGDOM OF)',
  "BANGLADESH (PEOPLE'S REPUBLIC OF)",
  'BARBADOS',
  'BELGIUM (KINGDOM OF)',
  'BELIZE',
  'BENIN (REPUBLIC OF)',
  'BHUTAN (KINGDOM OF)',
];

export const TABLA_OPCION_DATA: TablaOpcionConfig[] = [
  {
    fechaCreacion: '2025-02-19 11:26:55.0',
    mercancia:
      'Los demás. Únicamente: Los que no sean estupefacientes o psicotrópicos, o contengan dichas sustancias...',
    cantidad: '0.5',
    proveedor: 'TramitesVUCEM SA de CV',
  },
  {
    fechaCreacion: '2024-11-08 13:02:58.0',
    mercancia:
      'Los demás. Únicamente: Los que no sean estupefacientes o psicotrópicos, o contengan',
    cantidad: '0.5',
    proveedor: 'TramitesVUCEM SA de CV',
  },
];

export const PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE=[260214,260216, 260205]

export enum NUMERO_TRAMITE {
  TRAMITE_260205 = 260205
}

export const REGIMEN_DATOS = [
  {
    id: 101,
    descripcion: "Definitivos",  
  },
  {
    id: 101,
    descripcion: "Depósito Fiscal",  
  },
  {
    id: 102,
    descripcion: "Temporales",  
  },
 
]

export const ADUNAS_DE_ENTRADAS_DATOS = [
  {
    id: 101,
    descripcion: "ALTAMIRA",  
  },
  {
    id: 101,
    descripcion: "CD. JUAREZ",  
  },
]