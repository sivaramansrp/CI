
interface TratadosAcuerdos {
    paisBloque: string;
    tratadoAcuerdo: string;
    criterioDeOrigen: string;
    norma: string;
    otrasInstancias: string;
    juegosSurtidos: string;
}

export const CONFIGURACION_ACCIONISTAS = [
    {
        encabezado: 'País/Bloque',
        clave: (ele: TratadosAcuerdos) => ele.paisBloque,
        orden: 1
    },
    {
        encabezado: 'Tratado/Acuerdo',
        clave: (ele: TratadosAcuerdos) => ele.tratadoAcuerdo,
        orden: 2
    },
    {
        encabezado: 'Criterio de origen',
        clave: (ele: TratadosAcuerdos) => ele.criterioDeOrigen,
        orden: 3
    },
    {
        encabezado: 'Norma',
        clave: (ele: TratadosAcuerdos) => ele.norma,
        orden: 4
    },
    {
        encabezado: 'Otras instancias',
        clave: (ele: TratadosAcuerdos) => ele.otrasInstancias,
        orden: 5
    },
    {
        encabezado: 'Juegos Surtidos',
        clave: (ele: TratadosAcuerdos) => ele.juegosSurtidos,
        orden: 6
    }
]
    
