/**
 * Interfaz que representa los datos de una fila en el trámite.
 */
export interface FilaData {
    id: number; // Identificador único de la fila.
    datosDelTramiteRealizar: {
        envasadoen: string; // Lugar donde se realizó el envasado.
        utilizoCafeComo: string; // Uso que se le dio al café.
        cantidadutilizada: string; // Cantidad de café utilizada.
        numerodepedimento: string; // Número de pedimento de importación/exportación.
        paisdeimportacion: string; // País de importación.
        fraccionarancelaria: string; // Fracción arancelaria correspondiente.
        cantidad: string; // Cantidad declarada.
        unidaddemedida: string; // Unidad de medida utilizada.
        precioapplicable: string; // Precio aplicable.
        dolar: string; // Valor en dólares.
        lote: string; // Número de lote.
        otrasmarcas: string; // Otras marcas relacionadas.
        elcafe: string; // Información adicional sobre el café.
        otrasCaracteristicas: string; // @description Otras características adicionales del domicilio, como referencias o detalles específicos.
        fechaexportacion: string; // Fecha de exportación.
        paisdetransbordo: string; // País de transbordo.
        mediodetransporte: string; // Medio de transporte utilizado.
        Identificadordel: string; // Identificador del trámite.
        observaciones: string; // Observaciones adicionales.
    };
}

/**
 * Interfaz que representa los datos adicionales de una fila en el trámite.
 */
export interface FilaData2 {
    id: number; // Identificador único de la fila.
    datosDelTramiteRealizar: {
        tipoPersona: string; // Tipo de persona (física o moral).
        denominacion: string; // Denominación o razón social.
        nombre: string; // Nombre de la persona.
        primerApellido: string; // Primer apellido (si aplica).
        segundoApellido: string; // Segundo apellido (si aplica).
        domicilio: string; // Dirección del domicilio.
        pais: string; // País de residencia.
        codigopostal: number; // Código postal.
        telefono: number; // Número de teléfono.
        correoelectronico: string; // Dirección de correo electrónico.
    };
      selected?: boolean; // Agregue esta propiedad a la selección de filas

}

