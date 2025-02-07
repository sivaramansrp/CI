export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}
export interface RespuestaAPI<T> {
    code: number;
    data: Banco[];
    message: string;
}
export interface Banco { // Define an interface for your Banco objects
    id: number;
    value: string;
}