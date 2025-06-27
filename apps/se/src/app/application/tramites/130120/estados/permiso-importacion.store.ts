import { DatosGrupos, createDatosGruposState } from '../models/permiso-importacion-modification.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class PermisoImportacionStore extends Store<DatosGrupos> {
    /**
     * Inicializa el store con el estado inicial de los datos de grupos.
     */
    constructor() {
        super(createDatosGruposState());
    }

    /**
     * Actualiza el store con la información del solicitante.
     * @param params Datos agrupados del formulario.
     */
    public actualizarDatosGrupos(params: Partial<DatosGrupos>): void {
        this.update(state => ({
            ...state,
            ...params,
        }));
    }

    /**
     * @method setrégimen
     * @description Actualiza el valor de la entidad federativa.
     * @param {string} entidadFederativa - Lista de entidades federativas.
     */


    public setrégimen(régimen: string): void {
        this.update((state) => ({
        ...state,
        régimen,
        }));
    }

    /**
     * @method setclassifición_régimen
     * @description Actualiza el valor de la clasificación del régimen.
     * @param {string} classifición_régimen - Clasificación del régimen.
     */
    public setclassifición_régimen(classifición_régimen: string): void {
        this.update((state) => ({
        ...state,
        classifición_régimen,
        }));
    }

    /**
     * @method setDescripcion
     * @description Actualiza el valor de la descripción.
     * @param {string} descripción - Descripción del régimen.
     */
    public setDescripcion(descripción: string): void {
        this.update((state) => ({
        ...state,
        descripción,
        }));
    }
    
    
    /**
     * @method setmarca
     * @description Actualiza el valor de la marca de la mercancía.
     * @param {string} marca - Marca(s) comercial(es) y modelo(s).
     */
    public setMarca(marca: string): void {
        this.update((state) => ({
            ...state,
            marca,
        }));
    }

    /**
     * @method settipo_entrada
     * @description Actualiza el tipo de aduana de entrada.
     * @param {string} tipo_entrada - Tipo de aduana de entrada.
     */
    public setTipoEntrada(tipoEntrada: string): void {
        this.update((state) => ({
            ...state,
            tipo_entrada: tipoEntrada,
        }));
    }

    /**
     * @method setfracción
     * @description Actualiza la fracción arancelaria.
     * @param {string} fracción - Fracción arancelaria.
     */
    public setFraccion(fraccion: string): void {
        this.update((state) => ({
            ...state,
            fracción: fraccion,
        }));
    }

    /**
     * @method setnico
     * @description Actualiza el valor de NICO.
     * @param {string} nico - NICO.
     */
    public setNico(nico: string): void {
        this.update((state) => ({
            ...state,
            nico,
        }));
    }

    /**
     * @method setumt
     * @description Actualiza la unidad de medida la tarifa (UMT).
     * @param {string} umt - Unidad de medida la tarifa.
     */
    public setUmt(umt: string): void {
        this.update((state) => ({
            ...state,
            umt,
        }));
    }

    /**
     * @method setfactura_número
     * @description Actualiza el número de factura.
     * @param {string} factura_número - Número de factura.
     */
    public setFacturaNumero(facturaNumero: string): void {
        this.update((state) => ({
            ...state,
            factura_número: facturaNumero,
        }));
    }

    /**
     * @method setfactura_fecha
     * @description Actualiza la fecha de factura.
     * @param {string} factura_fecha - Fecha de factura.
     */
    public setFacturaFecha(facturaFecha: string): void {
        this.update((state) => ({
            ...state,
            datosMercanica: {
                ...state.datosMercanica,
                factura_fecha: facturaFecha,
            }
        }));
    }

    /**
     * @method setumc
     * @description Actualiza la unidad de medida de comercialización (UMC).
     * @param {string} umc - Unidad de medida de comercialización.
     */
    public setUmc(umc: string): void {
        this.update((state) => ({
            ...state,
            umc,
        }));
    }

    /**
     * @method setotro_umc
     * @description Actualiza el valor de otro UMC.
     * @param {string} otro_umc - Otro UMC.
     */
    public setOtroUmc(otroUmc: string): void {
        this.update((state) => ({
            ...state,
            otro_umc: otroUmc,
        }));
    }

    /**
     * @method setcantidad_umc
     * @description Actualiza la cantidad UMC.
     * @param {string} cantidad_umc - Cantidad UMC.
     */
    public setCantidadUmc(cantidadUmc: string): void {
        this.update((state) => ({
            ...state,
            cantidad_umc: cantidadUmc,
        }));
    }

    /**
     * @method setfactor_conversión
     * @description Actualiza el factor de conversión.
     * @param {string} factor_conversión - Factor de conversión.
     */
    public setFactorConversion(factorConversion: string): void {
        this.update((state) => ({
            ...state,
            factor_conversión: factorConversion,
        }));
    }

    /**
     * @method setcantidad_umt
     * @description Actualiza la cantidad UMT.
     * @param {string} cantidad_umt - Cantidad UMT.
     */
    public setCantidadUmt(cantidadUmt: string): void {
        this.update((state) => ({
            ...state,
            cantidad_umt: cantidadUmt,
        }));
    }

    /**
     * @method setvalor_factura
     * @description Actualiza el valor de la factura de la mercancía a importar en términos de la Moneda de Comercialización.
     * @param {string} valor_factura - Valor de la factura.
     */
    public setValorFactura(valorFactura: string): void {
        this.update((state) => ({
            ...state,
            valor_factura: valorFactura,
        }));
    }

    /**
     * @method setmoneda_comercialización
     * @description Actualiza la moneda de comercialización.
     * @param {string} moneda_comercialización - Moneda de comercialización.
     */
    public setMonedaComercializacion(monedaComercializacion: string): void {
        this.update((state) => ({
            ...state,
            moneda_comercialización: monedaComercializacion,
        }));
    }

    /**
     * @method setvalor_factura_usd
     * @description Actualiza el valor de la factura en USD de la mercancía a importar.
     * @param {string} valor_factura_usd - Valor de la factura en USD.
     */
    public setValorFacturaUsd(valorFacturaUsd: string): void {
        this.update((state) => ({
            ...state,
            valor_factura_usd: valorFacturaUsd,
        }));
    }

    /**
     * @method setprecio_unitario_usd
     * @description Actualiza el precio unitario en USD.
     * @param {string} precio_unitario_usd - Precio unitario en USD.
     */
    public setPrecioUnitarioUsd(precioUnitarioUsd: string): void {
        this.update((state) => ({
            ...state,
            precio_unitario_usd: precioUnitarioUsd,
        }));
    }

    /**
     * @method setpaís_exportador
     * @description Actualiza el país exportador.
     * @param {string} país_exportador - País exportador.
     */
    public setPaisExportador(paisExportador: string): void {
        this.update((state) => ({
            ...state,
            país_exportador: paisExportador,
        }));
    }

    /**
     * @method setpaís_origen
     * @description Actualiza el país de origen.
     * @param {string} país_origen - País de origen.
     */
    public setPaisOrigen(paisOrigen: string): void {
        this.update((state) => ({
            ...state,
            país_origen: paisOrigen,
        }));
    }

    /**
     * @method setvalor_total_factura
     * @description Actualiza el valor total de la factura en términos de la Moneda de Comercialización.
     * @param {string} valor_total_factura - Valor total de la factura.
     */
    public setValorTotalFactura(valorTotalFactura: string): void {
        this.update((state) => ({
            ...state,
            valor_total_factura: valorTotalFactura,
        }));
    }

    /**
     * @method setvalor_total_factura_usd
     * @description Actualiza el valor total de la factura USD de la mercancía a importar.
     * @param {string} valor_total_factura_usd - Valor total de la factura en USD.
     */
    public setValorTotalFacturaUsd(valorTotalFacturaUsd: string): void {
        this.update((state) => ({
            ...state,
            valor_total_factura_usd: valorTotalFacturaUsd,
        }));
    }

    /**
     * @method setNumero_documento
     * @description Actualiza el número de documento de exportación.
     * @param {string} número_documento - Número de documento.
     */
    public setNumero_documento(número_documento: string): void {
        this.update((state) => ({
            ...state,
            número_documento,
        }));
    }

    /**
     * @method setFecha_documento
     * @description Actualiza la fecha del documento de exportación.
     * @param {string} fecha_documento - Fecha del documento.
     */
    public setFecha_documento(fechaDocumento: string): void {
    this.update((state) => ({
        ...state,
        datosExporta: {
            ...state.datosExporta,
            fecha_documento: fechaDocumento,
        }
    }));
}

    /**
     * @method setDescripcionExportacion
     * @description Actualiza la descripción de la mercancía de exportación.
     * @param {string} descripción - Descripción de la mercancía.
     */
    public setDescripcionExportacion(descripción: string): void {
        this.update((state) => ({
            ...state,
            descripción,
        }));
    }

    /**
     * @method setCodigo_arancelario
     * @description Actualiza el código arancelario.
     * @param {string} código_arancelario - Código arancelario.
     */
    public setCodigo_arancelario(código_arancelario: string): void {
        this.update((state) => ({
            ...state,
            código_arancelario,
        }));
    }

    /**
     * @method setCantidad_umt
     * @description Actualiza la cantidad en la unidad de medida señalada.
     * @param {string} cantidad_umt - Cantidad UMT.
     */
    public setCantidad_umt(cantidad_umt: string): void {
        this.update((state) => ({
            ...state,
            cantidad_umt,
        }));
    }

    /**
     * @method setValor_usd
     * @description Actualiza el valor en USD de la mercancía a importar.
     * @param {string} valor_usd - Valor USD.
     */
    public setValor_usd(valor_usd: string): void {
        this.update((state) => ({
            ...state,
            valor_usd,
        }));
    }

    /**
     * @method setPrecio_unitario_usd
     * @description Actualiza el precio unitario en USD.
     * @param {string} precio_unitario_usd - Precio unitario USD.
     */
    public setPrecio_unitario_usd(precio_unitario_usd: string): void {
        this.update((state) => ({
            ...state,
            precio_unitario_usd,
        }));
    }

    /**
     * @method setPersona_tipo
     * @description Actualiza el tipo de persona.
     * @param {string} persona_tipo - Tipo de persona.
     */
    public setPersona_tipo(persona_tipo: string): void {
        this.update((state) => ({
            ...state,
            datosProductor: {
                ...state.datosProductor,
                persona_tipo,
            }
        }));
    }

    /**
     * @method setPersonales_nombre
     * @description Actualiza el nombre de las personas.
     * @param {string} personales_nombre - Nombre(s) de la(s) persona(s).
     */
    public setPersonales_nombre(personales_nombre: string): void {
        this.update((state) => ({
            ...state,
            datosProductor: {
                ...state.datosProductor,
                personales_nombre,
            }
        }));
    }

    /**
     * @method setPrimer_apellido
     * @description Actualiza el primer apellido.
     * @param {string} primer_apellido - Primer apellido.
     */
    public setPrimer_apellido(primer_apellido: string): void {
        this.update((state) => ({
            ...state,
            datosProductor: {
                ...state.datosProductor,
                primer_apellido,
            }
        }));
    }

    /**
     * @method setSegundo_apellido
     * @description Actualiza el segundo apellido.
     * @param {string} segundo_apellido - Segundo apellido.
     */
    public setSegundo_apellido(segundo_apellido: string): void {
        this.update((state) => ({
            ...state,
            datosProductor: {
                ...state.datosProductor,
                segundo_apellido,
            }
        }));
    }

    /**
     * @method setDenominación_razón_social
     * @description Actualiza la denominación o razón social.
     * @param {string} denominación_razón_social - Denominación o razón social.
     */
    public setDenominación_razón_social(denominación_razón_social: string): void {
        this.update((state) => ({
            ...state,
            datosProductor: {
                ...state.datosProductor,
                denominación_razón_social,
            }
        }));
    }

    /**
     * @method setDomicilio
     * @description Actualiza el domicilio.
     * @param {string} domicilio - Domicilio.
     */
    public setDomicilio(domicilio: string): void {
        this.update((state) => ({
            ...state,
            datosProductor: {
                ...state.datosProductor,
                domicilio,
            }
        }));
    }

    /**
     * @method setExportadorPersona_tipo
     * @description Actualiza el tipo de persona del exportador.
     * @param {string} persona_tipo - Tipo de persona.
     */
    public setExportadorPersona_tipo(persona_tipo: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                persona_tipo,
            }
        }));
    }

    /**
     * @method setExportadorPersonales_nombre
     * @description Actualiza el nombre de las personas del exportador.
     * @param {string} personales_nombre - Nombre(s) de la(s) persona(s).
     */
    public setExportadorPersonales_nombre(personales_nombre: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                personales_nombre,
            }
        }));
    }

    /**
     * @method setExportadorPrimer_apellido
     * @description Actualiza el primer apellido del exportador.
     * @param {string} primer_apellido - Primer apellido.
     */
    public setExportadorPrimer_apellido(primer_apellido: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                primer_apellido,
            }
        }));
    }

    /**
     * @method setExportadorSegundo_apellido
     * @description Actualiza el segundo apellido del exportador.
     * @param {string} segundo_apellido - Segundo apellido.
     */
    public setExportadorSegundo_apellido(segundo_apellido: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                segundo_apellido,
            }
        }));
    }

    /**
     * @method setExportadorDenominación_razón_social
     * @description Actualiza la denominación o razón social del exportador.
     * @param {string} denominación_razón_social - Denominación o razón social.
     */
    public setExportadorDenominación_razón_social(denominación_razón_social: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                denominación_razón_social,
            }
        }));
    }

    /**
     * @method setExportadorDomicilio
     * @description Actualiza el domicilio del exportador.
     * @param {string} domicilio - Domicilio.
     */
    public setExportadorDomicilio(domicilio: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                domicilio,
            }
        }));
    }

    /**
     * @method setExportadorObservaciones
     * @description Actualiza las observaciones del exportador.
     * @param {string} observaciones - Observaciones.
     */
    public setExportadorObservaciones(observaciones: string): void {
        this.update((state) => ({
            ...state,
            datosExportador: {
                ...state.datosExportador,
                observaciones,
            }
        }));
    }

    /**
     * @description Resets the store to its initial state.
     */
    public limpiarFormulario(): void {
        this.reset();
    }

    /**
     * Actualiza la entidad federativa en el estado federal.
     * @param entidad_federativa Nombre de la entidad federativa.
     */
    public setEntidad_federativa(entidad_federativa: string): void {
        this.update((state) => ({
            ...state,
            datosFederal: {
                ...state.datosFederal,
                entidad_federativa,
            }
        }));
    }

    /**
     * Actualiza la representación federal en el estado federal.
     * @param representacion_federal Nombre de la representación federal.
     */
    public setRepresentacion_federal(representacion_federal: string): void {
        this.update((state) => ({
            ...state,
            datosFederal: {
                ...state.datosFederal,
                representacion_federal,
            }
        }));
    }
}
