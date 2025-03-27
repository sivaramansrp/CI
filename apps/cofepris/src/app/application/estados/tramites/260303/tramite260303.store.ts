import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * Interfaz que representa el estado de Solicitud260303.
 */
export interface Solicitud260303State {
    /**
     * El valor de rfcResponsableSanitario.
     */
    denominacionRazon: string;
    /**
     * El valor de codigoPostal.
     */
    codigoPostal:string;
    /**
     * El valor de estado.
     */
    estado:string;
    /**
     * El valor de muncipio.
     */
    municipio:string;
    /**
     * El valor de localidad.
    */
    localidad:string;
    /**
     * El valor de colonia.
    */
    colonia:string;
    /**
     * El valor de calle.
    */
    calleYNumero:string;
    correoElecronico:string;
    /**
     * El valor de lada.
    */
    lada:string;
    /**
     * El valor de telefono.
    */
    telefono:string;
    /**
     * El valor de claveScianModal.
    */
    claveScianModal: string;
    avisoDeFuncionamiento: string;
    /**
     * El valor de claveDescripcionModal.
    */
    clave: string;
    descripcion: string;
    /**
     * El valor de avisoCheckbox.
    */
    avisoCheckbox: boolean;
    /**
     * El valor de licenciaSanitaria.
    */
    licenciaSanitaria: string;
    /**
     * El valor de regimen.
    */
    regimen: string;
    regimenDestinara: string;
    /**
     * El valor de aduanasEntradas.
    */
    aduana:string;
    /**
     * El valor de numeroPermiso.
    */
    numeroPermiso:string;
    losDatosNo: string;
    losDatosYes: string;
    nombreORazon: string;
    /**
     * El valor de clasificacion.
    */
    clasificacion:string;
    /**
     * El valor de especificarClasificacionProducto.
    */
    especificarClasificacionProducto:string;
    /**
     * El valor de denominacionEspecifica.
    */
    denominacionEspecifica:string;
    /**
     * El valor de denominacionDistintiva.
    */
    denominacionDistintiva:string;
    /**
     * El valor de denominacionComun.
    */
    denominacionComun:string;
    /**
     * El valor de tipoDeProducto.
    */
    tipoDeProducto:string;
    /**
     * El valor de estadoFisico.
    */
    estadoFisico:string;
    /**
     * El valor de fraccionArancelaria.
    */
    fraccionArancelaria:string;
    /**
     * El valor de descripcionFraccion.
    */
    descripcionFraccion:string;
    /**
     * El valor de cantidadUMT.
    */
    cantidadUMT:string;
    /**
     * El valor de UMT.
    */
    UMT:string;
    /**
     * El valor de cantidadUMC.
    */
    cantidadUMC:string;
    /**
     * El valor de UMC.
    */
    UMC:string;
    /**
     * El valor de presentacion.
    */
    presentacion:string;
    /**
     * El valor de numeroRegistro.
    */
    numeroRegistro:string;
    /**
     * El valor de fechaCaducidad.
    */
    fechaCaducidad:string;
    /**
     * El valor de cumplimiento.
    */
    cumplimiento:string;
    /**
     * El valor de rfc.
    */
    rfc:string;
    /**
     * El valor de nombre.
    */
    nombre:string;
    /**
     * El valor de apellidoPaterno.
    */
    apellidoPaterno:string;
    /**
     * El valor de apellidoMaterno.
    */
    apellidoMaterno:string;
    dci: string;
    marcaComercialODenominacionDistintiva: string;
    descripcionDeLaFraccion: string;
    numeroCas: string;
    cantidadDeLotes: string;
    kgOrPorLote: string;
    pais: string;
    paisDeProcedencia: string;
    detallarUso: string;
    numeroDePiezas: string;
    descripcionDelNumeroDePiezas: string;
    numeroDeRegistro: string;
    claveDeReferencia: string;
    cadenaDaLaDependencia: string;
    banco: string;
    laveDePago: string;
    fechaDePago: string;
    importeDePago: string;
    tipoDocumento: string;
    tercerosRelacionadosDenominacionSocial: string;
    tercerosRelacionadosTerceroNombre: string;
    tercerosRelacionadosNacional: string;
    tercerosRelacionadosExtranjero: string;
    tercerosRelacionadosFisica: string;
    tercerosRelacionadosMoral: string;
    tercerosRelacionadosNoContribuyente: string;
    tercerosRelacionadosRfc: string;
    tercerosRelacionadosCurp: string;
    tercerosRelacionadosRazonSocial: string;
    tercerosRelacionadosPais: string;
    tercerosRelacionadosEstado: string;
    tercerosRelacionadosCodigoPostal: string;
    tercerosRelacionadosCalle: string;
    tercerosRelacionadosNumeroExterior: string;
    tercerosRelacionadosNumeroInterior: string;
    tercerosRelacionadosLada: string;
    tercerosRelacionadosTelefono: string;
    tercerosRelacionadosCorreoElectronico: string;
}
/**
 * Función para crear el estado inicial de Solicitud260303State.
 * @returns {Solicitud260303State} El estado inicial de Solicitud260211State.
 */
export function createInitialState(): Solicitud260303State {
    return {
        denominacionRazon: '',
        codigoPostal: '',
        estado: '',
        municipio: '',
        localidad: '',
        colonia: '',
        calleYNumero: '',
        correoElecronico: '',
        lada: '',
        telefono: '',
        claveScianModal: '',
        avisoDeFuncionamiento: '',
        clave: '',
        descripcion: '',
        avisoCheckbox: false,
        licenciaSanitaria: '',
        regimen: '',
        regimenDestinara: '',
        aduana: '',
        numeroPermiso: '',
        losDatosNo: '',
        losDatosYes: '',
        nombreORazon: '',
        clasificacion: '',
        especificarClasificacionProducto: '',
        denominacionEspecifica: '',
        denominacionDistintiva: '',
        denominacionComun: '',
        tipoDeProducto: '',
        estadoFisico: '',
        fraccionArancelaria: '',
        descripcionFraccion: '',
        cantidadUMT: '',
        UMT: '',
        cantidadUMC: '',
        UMC: '',
        presentacion: '',
        numeroRegistro: '',
        fechaCaducidad: '',
        cumplimiento: '',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dci: '',
        marcaComercialODenominacionDistintiva: '',
        descripcionDeLaFraccion: '',
        numeroCas: '',
        cantidadDeLotes: '',
        kgOrPorLote: '',
        pais: '',
        paisDeProcedencia: '',
        detallarUso: '',
        numeroDePiezas: '',
        descripcionDelNumeroDePiezas: '',
        numeroDeRegistro: '',
        claveDeReferencia: '',
        cadenaDaLaDependencia: '',
        banco: '',
        laveDePago: '',
        fechaDePago: '',
        importeDePago: '',
        tipoDocumento: '',
        tercerosRelacionadosDenominacionSocial: '',
        tercerosRelacionadosTerceroNombre: '',
        tercerosRelacionadosNacional: '',
        tercerosRelacionadosExtranjero: '',
        tercerosRelacionadosFisica: '',
        tercerosRelacionadosMoral: '',
        tercerosRelacionadosNoContribuyente: '',
        tercerosRelacionadosRfc: '',
        tercerosRelacionadosCurp: '',
        tercerosRelacionadosRazonSocial: '',
        tercerosRelacionadosPais: '',
        tercerosRelacionadosEstado: '',
        tercerosRelacionadosCodigoPostal: '',
        tercerosRelacionadosCalle: '',
        tercerosRelacionadosNumeroExterior: '',
        tercerosRelacionadosNumeroInterior: '',
        tercerosRelacionadosLada: '',
        tercerosRelacionadosTelefono: '',
        tercerosRelacionadosCorreoElectronico: '',
    };
}

 /**
 * Decorador Injectable para hacer que la tienda esté disponible a nivel raíz.
 */
@Injectable({
    providedIn: 'root',
})
/**
 * Decorador StoreConfig para configurar la tienda con un nombre y una opción de restablecimiento.
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite260303', resettable: true })

export class Tramite260303Store extends Store<Solicitud260303State>{
    /**
     * Crea una instancia de Tramite260303Store.
     * Inicializa la tienda con el estado inicial.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el estado de denominacionRazon.
     * @param denominacionRazon - El valor de denominacionRazon.
     */
    public setDenominacionRazon(denominacionRazon: string) {
        this.update((state) => ({
            ...state,
            denominacionRazon,
        }));
    }
    /**
     * Establece el estado de denominacion.
     * @param denominacion - El valor de denominacion.
     */
    public setDenominacion(denominacion: string) {
        this.update((state) => ({
            ...state,
            denominacion,
        }));
    }
    /**
     * Establece el estado de correo.
     * @param correo - El valor de correo.
     */
    public setCorreo(correo: string) {
        this.update((state) => ({
            ...state,
            correo,
        }));
    }
    /**
     * Establece el estado de codigoPostal.
     * @param codigoPostal - El valor de codigoPostal.
     */
    public setCodigoPostal(codigoPostal: string) {
        this.update((state) => ({
            ...state,
            codigoPostal,
        }));
    }
    /**
     * Establece el estado de estado.
     * @param estado - El valor de estado.
     */
    public setEstado(estado: string) {
        this.update((state) => ({
            ...state,
            estado,
        }));
    }
    /**
     * Establece el muncipio de muncipio.
     * @param muncipio - El valor de muncipio.
     */
    public setMuncipio(muncipio: string) {
        this.update((state) => ({
            ...state,
            muncipio,
        }));
    }
    /**
     * Establece el localidad de localidad.
     * @param localidad - El valor de localidad.
     */
    public setLocalidad(localidad: string) {
        this.update((state) => ({
            ...state,
            localidad,
        }));
    }
    /**
     * Establece el estado de colonia.
     * @param colonia - El valor de colonia.
     */
    public setColonia(colonia: string) {
        this.update((state) => ({
            ...state,
            colonia,
        }));
    }
    /**
     * Establece el estado de calle.
     * @param calle - El valor de calle.
     */
    public setCalle(calle: string) {
        this.update((state) => ({
            ...state,
            calle,
        }));
    }
    /**
     * Establece el estado de lada.
     * @param lada - El valor de lada.
     */
    public setLada(lada: string) {  
        this.update((state) => ({
            ...state,
            lada,
        }));
    }
    /**
     * Establece el estado de telefono.
     * @param telefono - El valor de telefono.
     */
    public setTelefono(telefono: string) {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }
    /**
     * Establece el estado de claveScianModal.
     * @param claveScianModal - El valor de claveScianModal.
     */
    public setClaveScianModal(claveScianModal: string) {
        this.update((state) => ({
            ...state,
            claveScianModal,
        }));
    }
    /**
     * Establece el estado de claveDescripcionModal.
     * @param claveDescripcionModal - El valor de claveDescripcionModal.
     */
    public setClaveDescripcionModal(claveDescripcionModal: string) {
        this.update((state) => ({
            ...state,
            claveDescripcionModal,
        }));
    }
    /**
     * Establece el estado de avisoCheckbox.
     * @param avisoCheckbox - El valor de avisoCheckbox.
     */
    public setAvisoCheckbox(avisoCheckbox: boolean) {
        this.update((state) => ({
            ...state,
            avisoCheckbox,
        }));
    }
    /**
     * Establece el estado de licenciaSanitaria.
     * @param licenciaSanitaria - El valor de licenciaSanitaria.
     */
    public setLicenciaSanitaria(licenciaSanitaria: string) {
        this.update((state) => ({
            ...state,
            licenciaSanitaria,
        }));
    }
    /**
     * Establece el estado de regimen.
     * @param regimen - El valor de regimen.
     */
    public setRegimen(regimen: string) {
        this.update((state) => ({
            ...state,
            regimen,
        }));
    }
    /**
     * Establece el estado de aduanasEntradas.
     * @param aduanasEntradas - El valor de aduanasEntradas.
     */
    public setAduanasEntradas(aduanasEntradas: string) {
        this.update((state) => ({
            ...state,
            aduanasEntradas,
        }));
    }
    /**
     * Establece el estado de numeroPermiso.
     * @param numeroPermiso - El valor de numeroPermiso.
     */
    public setNumeroPermiso(numeroPermiso: string) {
        this.update((state) => ({
            ...state,
            numeroPermiso,
        }));
    }
    /**
     * Establece el estado de clasificacion.
     * @param clasificacion - El valor de clasificacion.
     */
    public setClasificacion(clasificacion: string) {
        this.update((state) => ({
            ...state,
            clasificacion,
        }));
    }
    /**
     * Establece el estado de especificar.
     * @param especificar - El valor de especificar.
     */
    public setEspecificarClasificacionProducto(especificarClasificacionProducto: string) {
        this.update((state) => ({
            ...state,
            especificarClasificacionProducto,
        }));
    }
    /**
     * Establece el estado de denominacionEspecifica.
     * @param denominacionEspecifica - El valor de denominacionEspecifica.
     */
    public setDenominacionEspecifica(denominacionEspecifica: string) {
        this.update((state) => ({
            ...state,
            denominacionEspecifica,
        }));
    }
    /**
     * Establece el estado de denominacionDistintiva.
     * @param denominacionDistintiva - El valor de denominacionDistintiva.
     */
    public setDenominacionDistintiva(denominacionDistintiva: string) {
        this.update((state) => ({
            ...state,
            denominacionDistintiva,
        }));
    }
    /**
     * Establece el estado de denominacionComun.
     * @param denominacionComun - El valor de denominacionComun.
     */
    public setDenominacionComun(denominacionComun: string) {
        this.update((state) => ({
            ...state,
            denominacionComun,
        }));
    }
    /**
     * Establece el estado de tipoDeProducto.
     * @param tipoDeProducto - El valor de tipoDeProducto.
     */
    public setTipoDeProducto(tipoDeProducto: string) {
        this.update((state) => ({
            ...state,
            tipoDeProducto,
        }));
    }
    /**
     * Establece el estado de estadoFisico.
     * @param estadoFisico - El valor de estadoFisico.
     */
    public setEstadoFisico(estadoFisico: string) {
        this.update((state) => ({
            ...state,
            estadoFisico,
        }));
    }
    /**
     * Establece el estado de fraccionArancelaria.
     * @param fraccionArancelaria - El valor de fraccionArancelaria.
     */
    public setFraccionArancelaria(fraccionArancelaria: string) {
        this.update((state) => ({
            ...state,
            fraccionArancelaria,
        }));
    }
    /**
     * Establece el estado de fraccionArancelaria.
     * @param fraccionArancelaria - El valor de fraccionArancelaria.
     */
    public setDescripcionFraccion(descripcionFraccion: string) {
        this.update((state) => ({
            ...state,
            descripcionFraccion,
        }));
    }
    /**
     * Establece el estado de cantidadUMT.
     * @param cantidadUMT - El valor de cantidadUMT.
     */
    public setCantidadUMT(cantidadUMT: string) {
        this.update((state) => ({
            ...state,
            cantidadUMT,
        }));
    }
    /**
     * Establece el estado de UMT.
     * @param UMT - El valor de UMT.
     */
    public setUMT(UMT: string) {
        this.update((state) => ({
            ...state,
            UMT,
        }));
    }
    /**
     * Establece el estado de cantidadUMC.
     * @param cantidadUMC - El valor de cantidadUMC.
     */
    public setCantidadUMC(cantidadUMC: string) {
        this.update((state) => ({
            ...state,
            cantidadUMC,
        }));
    }
    /**
     * Establece el estado de UMC.
     * @param UMC - El valor de UMC.
     */
    public setUMC(UMC: string) {
        this.update((state) => ({
            ...state,
            UMC,
        }));
    }
    /**
     * Establece el estado de presentacion.
     * @param presentacion - El valor de presentacion.
     */
    public setPresentacion(presentacion: string) {
        this.update((state) => ({
            ...state,
            presentacion,
        }));
    }
    /**
     * Establece el estado de numeroRegistro.
     * @param numeroRegistro - El valor de numeroRegistro.
     */
    public setNumeroRegistro(numeroRegistro: string) {
        this.update((state) => ({
            ...state,
            numeroRegistro,
        }));
    }
    /**
     * Establece el estado de fechaCaducidad.
     * @param fechaCaducidad - El valor de fechaCaducidad.
     */
    public setFechaCaducidad(fechaCaducidad: string) {
        this.update((state) => ({
            ...state,
            fechaCaducidad,
        }));
    }
    /**
     * Establece el estado de cumplimiento.
     * @param cumplimiento - El valor de cumplimiento.
     */
    public setCumplimiento(cumplimiento: string) {
        this.update((state) => ({
            ...state,
            cumplimiento,
        }));
    }
    /**
     * Establece el estado de rfc.
     * @param rfc - El valor de rfc.
     */
    public setRfc(rfc: string) {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }
    /**
     * Establece el estado de nombre.
     * @param nombre - El valor de nombre.
     */
    public setNombre(nombre: string) {
        this.update((state) => ({
            ...state,
            nombre,
        }));
    }
    /**
     * Establece el estado de apellidoPaterno.
     * @param apellidoPaterno - El valor de apellidoPaterno.
     */
    public setApellidoPaterno(apellidoPaterno: string) {
        this.update((state) => ({
            ...state,
            apellidoPaterno,
        }));
    }
    /**
     * Establece el estado de apellidoMaterno.
     * @param apellidoMaterno - El valor de apellidoMaterno.
     */
    public setApellidoMaterno(apellidoMaterno: string) {
        this.update((state) => ({
            ...state,
            apellidoMaterno,
        }));
    }

    public setDci(dci: string) {
        this.update((state) => ({
            ...state,
            dci,
        }));
    }

    public setMarcaComercialODenominacionDistintiva(marcaComercialODenominacionDistintiva: string) {
        this.update((state) => ({
            ...state,
            marcaComercialODenominacionDistintiva,
        }));
    }

    public setDescripcionDeLaFraccion(descripcionDeLaFraccion: string) {
        this.update((state) => ({
            ...state,
            descripcionDeLaFraccion,
        }));
    }

    public setNumeroCas(numeroCas: string) {
        this.update((state) => ({
            ...state,
            numeroCas,
        }));
    }

    public setCantidadDeLotes(cantidadDeLotes: string) {
        this.update((state) => ({
            ...state,
            cantidadDeLotes,
        }));
    }

    public setKgOrPorLote(kgOrPorLote: string) {
        this.update((state) => ({
            ...state,
            kgOrPorLote,
        }));
    }

    public setPais(pais: string) {
        this.update((state) => ({
            ...state,
            pais,
        }));
    }

    public setPaisDeProcedencia(paisDeProcedencia: string) {
        this.update((state) => ({
            ...state,
            paisDeProcedencia,
        }));
    }

    public setDetallarUso(detallarUso: string) {
        this.update((state) => ({
            ...state,
            detallarUso,
        }));
    }

    public setNumeroDePiezas(numeroDePiezas: string) {
        this.update((state) => ({
            ...state,
            numeroDePiezas,
        }));
    }

    public setDescripcionDelNumeroDePiezas(descripcionDelNumeroDePiezas: string) {
        this.update((state) => ({
            ...state,
            descripcionDelNumeroDePiezas,
        }));
    }

    public setNumeroDeRegistro(numeroDeRegistro: string) {
        this.update((state) => ({
            ...state,
            numeroDeRegistro,
        }));
    }

    public setNombreORazon(nombreORazon: string) {
        this.update((state) => ({
            ...state,
            nombreORazon,
        }));
    }

    public setLosDatosNo(losDatosNo: string) {
        this.update((state) => ({
            ...state,
            losDatosNo,
        }));
    }

    public setLosDatosYes(losDatosYes: string) {
        this.update((state) => ({
            ...state,
            losDatosYes,
        }));
    }

    public setAvisoDeFuncionamiento(avisoDeFuncionamiento: string) {
        this.update((state) => ({
            ...state,
            avisoDeFuncionamiento,
        }));
    }

    public setRegimenDestinara(regimenDestinara: string) {
        this.update((state) => ({
            ...state,
            regimenDestinara,
        }));
    }

    public setClave(clave: string) {
        this.update((state) => ({
            ...state,
            clave,
        }));
    }

    public setDescripcion(descripcion: string) {
        this.update((state) => ({
            ...state,
            descripcion,
        }));
    }

    public SetCalleYNumero(calleYNumero: string) { 
        this.update((state) => ({
            ...state,
            calleYNumero,
        }));
    }

    public SetCorreoElecronico(correoElecronico: string) {
        this.update((state) => ({
            ...state,
            correoElecronico,
        }));
    }

    public SetMunicipio(municipio: string) {
        this.update((state) => ({
            ...state,
            municipio,
        }));
    }

    public SetClaveDeReferencia(claveDeReferencia: string) {
        this.update((state) => ({
            ...state,
            claveDeReferencia,
        }));
    }

    public SetCadenaDaLaDependencia(cadenaDaLaDependencia: string) {
        this.update((state) => ({
            ...state,
            cadenaDaLaDependencia,
        }));
    }

    public SetBanco(banco: string) {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }

    public SetLaveDePago(laveDePago: string) {
        this.update((state) => ({
            ...state,
            laveDePago,
        }));
    }

    public SetFechaDePago(fechaDePago: string) {
        this.update((state) => ({
            ...state,
            fechaDePago,
        }));
    }

    public SetImporteDePago(importeDePago: string) {
        this.update((state) => ({
            ...state,
            importeDePago,
        }));
    }

    public SetTipoDocumento(tipoDocumento: string) {
        this.update((state) => ({
            ...state,
            tipoDocumento,
        }));
    }

    public SetTercerosRelacionadosDenominacionSocial(tercerosRelacionadosDenominacionSocial: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosDenominacionSocial,
        }));
    }

    public SetTercerosRelacionadosTerceroNombre(tercerosRelacionadosTerceroNombre: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosTerceroNombre,
        }));
    }

    public SetTercerosRelacionadosNacional(tercerosRelacionadosNacional: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosNacional,
        }));
    }

    public SetTercerosRelacionadosExtranjero(tercerosRelacionadosExtranjero: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosExtranjero,
        }));
    }

    public SetTercerosRelacionadosFisica(tercerosRelacionadosFisica: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosFisica,
        }));
    }

    public SetTercerosRelacionadosMoral(tercerosRelacionadosMoral: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosMoral,
        }));
    }

    public SetTercerosRelacionadosNoContribuyente(tercerosRelacionadosNoContribuyente: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosNoContribuyente,
        }));
    }

    public SetTercerosRelacionadosRfc(tercerosRelacionadosRfc: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosRfc,
        }));
    }

    public SetTercerosRelacionadosCurp(tercerosRelacionadosCurp: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosCurp,
        }));
    }

    public SetTercerosRelacionadosRazonSocial(tercerosRelacionadosRazonSocial: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosRazonSocial,
        }));
    }

    public SetTercerosRelacionadosPais(tercerosRelacionadosPais: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosPais,
        }));
    }

    public SetTercerosRelacionadosEstado(tercerosRelacionadosEstado: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosEstado,
        }));
    }

    public SetTercerosRelacionadosCodigoPostal(tercerosRelacionadosCodigoPostal: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosCodigoPostal,
        }));
    }

    public SetTercerosRelacionadosCalle(tercerosRelacionadosCalle: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosCalle,
        }));
    }

    public SetTercerosRelacionadosNumeroExterior(tercerosRelacionadosNumeroExterior: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosNumeroExterior,
        }));
    }

    public SetTercerosRelacionadosNumeroInterior(tercerosRelacionadosNumeroInterior: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosNumeroInterior,
        }));
    }

    public SetTercerosRelacionadosLada(tercerosRelacionadosLada: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosLada,
        }));
    }

    public SetTercerosRelacionadosTelefono(tercerosRelacionadosTelefono: string) {  
        this.update((state) => ({
            ...state,
            tercerosRelacionadosTelefono,
        }));
    }

    public SetTercerosRelacionadosCorreoElectronico(tercerosRelacionadosCorreoElectronico: string) {
        this.update((state) => ({
            ...state,
            tercerosRelacionadosCorreoElectronico,
        }));
    }
} 
  