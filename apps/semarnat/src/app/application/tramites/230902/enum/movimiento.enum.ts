import { CONTINUAR } from "./permiso-cites.enum";

export const MOVIMIENTO_LABEL = {
    tituluDeLaIzquierda: 'Movimientos disponibles',
    derecha: 'Movimientos seleccionadas',
}


export const MOVIMIENTO_BOTONS = [
    {
        btnNombre: 'Agregar selección',
        class: 'btn-default fixed-width-button',
        funcion: () => agregar(CONTINUAR),
    },
    {
        btnNombre: 'Restar selección',
        class: 'btn-danger fixed-width-button',
        funcion: () => quitar(''),
    },
    {
        btnNombre: 'Restar todos',
        class: 'btn-default fixed-width-button',
        funcion: () => quitar(CONTINUAR),
    },
];

function agregar(tipo: string): void {
    if (tipo === CONTINUAR) {
        // do nothing.
    }
}

function quitar(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
        // do nothing.
    }
}