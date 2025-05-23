import { ItemTransporte } from "../models/shared/agregar-trasnporte.model";

export const HEADER_TABLA_CARRETERO: ItemTransporte[] = [
    {
        llave: 'empTransportista',
        valor: 'Empresa transportista'
    },
    {
        llave: 'numeroPorte',
        valor: 'Número carta porte'
    },
    {
        llave: 'fechaPorte',
        valor: 'Fecha carta porte'
    },
    {
        llave: 'marcaTransporte',
        valor: 'Marca'
    },
    {
        llave: 'modeloTransporte',
        valor: 'Modelo'
    },
    {
        llave: 'placasTransporte',
        valor: 'Placas'
    },
    {
        llave: 'contenedorTransporte',
        valor: 'Contenedor(es)'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
];

export const HEADER_TABLA_FERROVIARIO: ItemTransporte[] = [
    {
        llave: 'numeroBL',
        valor: 'Número BL'
    },
    {
        llave: 'tipoEquipo',
        valor: 'Tipo de Equipo'
    },
    {
        llave: 'inicialesEquipo',
        valor: 'Iniciales Equipo'
    },
    {
        llave: 'numeroEquipo',
        valor: 'Número de Equipo'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
];

export const HEADER_TABLA_PEATONAL: ItemTransporte[] = [
    {
        llave: 'empTransportista',
        valor: 'Empresa transportista'
    },

    {
        llave: 'rfcEmpresa',
        valor: 'RFC empresa responsable'
    },
    {
        llave: 'nombreTransportista',
        valor: 'Nombre transportista'
    },
    {
        llave: 'numGafete',
        valor: 'ID de gafete'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
]

export const HEADER_TABLA_OTRO: ItemTransporte[] = [
    {
        llave: 'empTransportista',
        valor: 'Empresa transportista'
    },
    {
        llave: 'tipoTransporteDes',
        valor: 'Tipo de transporte'
    },    
    {
        llave: 'datosTransporte',
        valor: 'Datos de transporte'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
]

export const HEADER_TABLA_MARITIMO: ItemTransporte[] = [
    {
        llave: 'guiaBLMaritimo',
        valor: 'Guía BL'
    },
    {
        llave: 'guiaHouseMaritimo',
        valor: 'Guía house'
    },
    {
        llave: 'nombreBuqueMaritimo',
        valor: 'Nombre del buque'
    },
    {
        llave: 'contenedorMaritimo',
        valor: 'Contenedor(es)'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
]

export const HEADER_TABLA_AEREO: ItemTransporte[] = [
    {
        llave: 'arriboPendienteAereo',
        valor: 'Arribo pendiente'
    },
    {
        llave: 'guiaMasterAereo',
        valor: 'Guía master'
    },
    {
        llave: 'guiaHouseAereo',
        valor: 'Guía house'
    },
    {
        llave: 'fechaArriboAereo',
        valor: 'Fecha de arribo'
    },
    {
        llave: 'horaArriboAereo',
        valor: 'Hora de arribo'
    },
    {
        llave: 'guiaValida',
        valor: 'Guía válida'
    },
    {
        llave: 'observaciones',
        valor: 'Observaciones'
    }
]

export const LABEL_HORA_ARRIBO = 'Hora llegada (aprox)';