export interface AvisoGrupos {
    datosEmpresa: DatosEmpresa,
    // datosMercanica: DatosMercanica,
    // datosExporta: DatosExporta,
    // datosProductor: DatosProductor,
    // datosExportador: DatosExportador,
}

export interface DatosEmpresa {
    numero_programa: string,
    ano_programa: string,
    mes_corresponde_aviso: string,
    ano_corresponde_aviso: string,
}

export interface CargaTipo {
    carga_tipo: string,
}

export enum ActionType {
    FORM_ACTION = 'FORM_ACTION',
    TABLE_ACTION = 'TABLE_ACTION'
}

export interface TablaClomns {
    rfc: string,
    nombreComercial: string,
    entidadFederativa: string,
    alcaldioOMuncipio: string,
    colonia: string,
  }