export interface MencioneConfiguracionItem {
    id: string;
    social: string;
    rfc: string;
    noumero: string;
    bimestre: string
}

export const MENCIONE_TABLA_CONFIGURACION = [
    {
        encabezado: 'Denominacion Social',
        clave: (item: MencioneConfiguracionItem): string => item.social,
        orden: 1,
    },
    {
        encabezado: 'RFC',
        clave: (item: MencioneConfiguracionItem): string => item.rfc,
        orden: 2,
    },
    {
        encabezado: 'Numero de Empleados',
        clave: (item: MencioneConfiguracionItem): string => item.noumero,
        orden: 3,
    },
    {
        encabezado: 'Bimestre',
        clave: (item: MencioneConfiguracionItem): string => item.bimestre,
        orden: 4,
    }
    
];

