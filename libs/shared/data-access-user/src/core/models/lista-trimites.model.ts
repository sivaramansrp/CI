export interface Tabulaciones {
    titulo: string;
    id: string;
    disabled: boolean
}
export interface AccuseComponentes {
    tramite: number;
    procedureUrl: string;
    procedureRegresorUrl: string;
    listaComponentes: ListaComponentes[];
}
export interface ListaComponentes {
    id: string;
    componentPath: () => Promise<unknown>;
    componentName: string;
}
export interface DetallesDelTramite {
    numFolioTramite: string;
    tipoTramite: string;
}