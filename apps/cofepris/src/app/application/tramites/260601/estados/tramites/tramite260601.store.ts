import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 260601
 * @returns AvisoSanitario260601
 */
export interface AvisoSanitarioState {
    /** RFC del responsable sanitario. */
    RFCResponsableSanitario: string;

    /** Razón social del establecimiento. */
    razonSocial: string;

    /** Correo electrónico registrado. */
    correoElectronico: string;

    /** Código postal del establecimiento. */
    codigoPostal: string;

    /** Clave del estado. */
    cveEstado: string;

    /** Descripción del municipio. */
    descripcionMunicipio: string;

    /** Información adicional del domicilio. */
    informacionExtra: string;

    /** Descripción de la colonia. */
    descripcionColonia: string;

    /** Calle del domicilio. */
    calle: string;

    /** Código LADA del número telefónico. */
    lada: number | null;

    /** Número telefónico del establecimiento. */
    telefono: number | null;

    /** Clave SCIAN (Sistema de Clasificación Industrial). */
    cveSCIAN: string;

    /** Descripción de la clave SCIAN. */
    cveSCIANDescripcion: string;

    /** Indica si el aviso de funcionamiento está activo. */
    avisoFuncionamiento: boolean;

    /** Clave de regímenes fiscales aplicables. */
    cveRegimenes: string;

    /** Clave de aduanas relacionadas. */
    cveAduanas: string;

    /** Clasificación del producto. */
    cveProductoClasificacion: string;

    /** Clasificación específica del producto. */
    cveEspecificoProductoClasifi: string;

    /** Nombre del producto. */
    nombreProducto: string;

    /** Marca del producto. */
    marca: string;

    /** Tipo de producto. */
    cveTipoProducto: string;

    /** Fracción arancelaria asignada al producto. */
    fraccionArancelaria: string;

    /** Descripción de la fracción arancelaria. */
    fraccionArancelariaDescripcion: string;

    /** Modelo del producto. */
    modelo: string;

    /** Descripción general del producto. */
    productoDescripcion: string;

    /** Clave del país destino. */
    cvePaisDestino: string;

    /** Lista de manifiestos seleccionados. */
    seleccionadaManifiesto: boolean[];

    /** Información confidencial relacionada. */
    informacionConfidencial: string;

    /** RFC del representante legal. */
    rfc: string;

    /** Nombre o razón social del representante legal. */
    nombreOrazonsocial: string;

    /** Apellido paterno del representante legal. */
    apellidoPaterno: string;

    /** Apellido materno del representante legal. */
    apellidoMaterno: string;

    /** Nacionalidad de terceros relacionados. */
    tercerosNacionalidad: string;

    /** Tipo de persona de terceros relacionados. */
    tipoPersona: string;

    /** RFC del proveedor relacionado. */
    rfcProveedor: string;

    /** CURP del proveedor relacionado. */
    curp: string;

    /** Nombre del proveedor relacionado. */
    proveedorNombre: string;

    /** Primer apellido del proveedor relacionado. */
    proveedorPrimerApellido: string;

    /** Segundo apellido del proveedor relacionado. */
    proveedorSegundoApellido: string;

    /** Razón social del proveedor relacionado. */
    proveedorRazonSocial: string;

    /** Clave del país del domicilio. */
    cvePais: string;

    /** Estado del domicilio. */
    domicilioEstado: string;

    /** Alcaldía del domicilio. */
    alcaldia: string;

    /** Localidad del domicilio. */
    localidad: string;

    /** Código postal del domicilio. */
    domicilioCodigoPostal: string;

    /** Colonia del domicilio. */
    colonia: string;

    /** Calle del domicilio. */
    domicilioCalle: string;

    /** Número exterior del domicilio. */
    numeroExterior: string;

    /** Número interior del domicilio. */
    numeroInterior: string;

    /** LADA del número telefónico del domicilio. */
    domicilioLada: string;

    /** Teléfono del domicilio. */
    domicilioTelefono: string;

    /** Correo electrónico del domicilio. */
    domicilioCorreoElectronico: string;
}

/**
 * Función que crea el estado inicial para el trámite 260601.
 * 
 * @returns Estado inicial predefinido.
 */
export function createInitialState(): AvisoSanitarioState {
    return {
        RFCResponsableSanitario: '',
        razonSocial: '',
        correoElectronico: '',
        codigoPostal: '',
        cveEstado: '',
        descripcionMunicipio: '',
        informacionExtra: '',
        descripcionColonia: '',
        calle: '',
        lada: null,
        telefono: null,
        cveSCIAN: '',
        cveSCIANDescripcion: '',
        avisoFuncionamiento: false,
        cveRegimenes: '',
        cveAduanas: '',
        cveProductoClasificacion: '',
        cveEspecificoProductoClasifi: '',
        nombreProducto: '',
        marca: '',
        cveTipoProducto: '',
        fraccionArancelaria: '',
        fraccionArancelariaDescripcion: '',
        modelo: '',
        productoDescripcion: '',
        cvePaisDestino: '',
        seleccionadaManifiesto: [false],
        informacionConfidencial: '',
        rfc: '',
        nombreOrazonsocial: '',
        apellidoPaterno: '',
        apellidoMaterno: '',

        tercerosNacionalidad: '',
        tipoPersona: '',
        rfcProveedor: '',
        curp: '',

        proveedorNombre: '',
        proveedorPrimerApellido: '',
        proveedorSegundoApellido: '',
        proveedorRazonSocial: '',

        cvePais: '',
        domicilioEstado: '',
        alcaldia: '',
        localidad: '',
        domicilioCodigoPostal: '',
        colonia: '',
        domicilioCalle: '',
        numeroExterior: '',
        numeroInterior: '',
        domicilioLada: '',
        domicilioTelefono: '',
        domicilioCorreoElectronico: '',
    }
}

/**
 * Clase de la tienda (store) para gestionar el estado del trámite 260601.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite260601', resettable: true })
export class Tramite260601Store extends Store<AvisoSanitarioState> {
    /**
     * Constructor de la clase `Tramite260601Store`.
     * Inicializa el estado con los valores definidos por `createInitialState`.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Actualiza el RFC del responsable sanitario.
     * 
     * @param RFCResponsableSanitario Nuevo valor del RFC.
     */
    public setRFCResponsableSanitario(RFCResponsableSanitario: string): void {
        this.update((state) => ({
            ...state,
            RFCResponsableSanitario
        }));
    }

    /**
     * Actualiza la razón social.
     * 
     * @param razonSocial Nuevo valor de la razón social.
     */
    public setRazonSocial(razonSocial: string): void {
        this.update((state) => ({
            ...state,
            razonSocial,
        }));
    }

    /**
     * Actualiza el correo electrónico.
     * 
     * @param correoElectronico Nuevo valor del correo electrónico.
     */
    public setCorreoElectronico(correoElectronico: string): void {
        this.update((state) => ({
            ...state,
            correoElectronico,
        }));
    }

    /**
     * Actualiza el código  postal.
     * 
     * @param codigoPostal Nuevo valor del código  postal.
     */
    public setCodigoPostal(codigoPostal: string): void {
        this.update((state) => ({
            ...state,
            codigoPostal,
        }));
    }

    /**
     * Actualiza el estado.
     * 
     * @param cveEstado Nuevo valor del estado.
     */
    public setEstado(cveEstado: string): void {
        this.update((state) => ({
            ...state,
            cveEstado,
        }));
    }

    /**
     * Actualiza el descripción municipio.
     * 
     * @param descripcionMunicipio Nuevo valor del descripción municipio.
     */
    public setDescripcionMunicipio(descripcionMunicipio: string): void {
        this.update((state) => ({
            ...state,
            descripcionMunicipio
        }));
    }

    /**
     * Actualiza el información extra.
     * 
     * @param informacionExtra Nuevo valor del información extra.
     */
    public setInformacionExtra(informacionExtra: string): void {
        this.update((state) => ({
            ...state,
            informacionExtra
        }));
    }

    /**
     * Actualiza el descripción colonia.
     * 
     * @param descripcionColonia Nuevo valor del descripción colonia.
     */
    public setDescripcionColonia(descripcionColonia: string): void {
        this.update((state) => ({
            ...state,
            descripcionColonia
        }));
    }

    /**
     * Actualiza el calle.
     * 
     * @param calle Nuevo valor del calle.
     */
    public setCalle(calle: string): void {
        this.update((state) => ({
            ...state,
            calle
        }));
    }

    /**
     * Actualiza el lada.
     * 
     * @param lada Nuevo valor del lada.
     */
    public setLada(lada: number): void {
        this.update((state) => ({
            ...state,
            lada,
        }));
    }

    /**
     * Actualiza el teléfono.
     * 
     * @param telefono Nuevo valor del teléfono.
     */
    public setTelefono(telefono: number): void {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }

    /**
     * Actualiza el SCIAN.
     * 
     * @param cveSCIAN Nuevo valor del SCIAN.
     */
    public setClaveScian(cveSCIAN: string): void {
        this.update((state) => ({
            ...state,
            cveSCIAN,
        }));
    }

    /**
     * Actualiza el SCIAN descripción.
     * 
     * @param cveSCIANDescripcion Nuevo valor del SCIAN descripción.
     */
    public setDescripcionScian(cveSCIANDescripcion: string): void {
        this.update((state) => ({
            ...state,
            cveSCIANDescripcion,
        }));
    }

    /**
     * Actualiza el aviso funcionamiento.
     * 
     * @param avisoFuncionamiento Nuevo valor del aviso funcionamiento.
     */
    public setAvisoFuncionamiento(avisoFuncionamiento: boolean): void {
        this.update((state) => ({
            ...state,
            avisoFuncionamiento,
        }));
    }

    /**
     * Actualiza el régimen.
     * 
     * @param cveRegimenes Nuevo valor del régimen.
     */
    public setCveRegimenes(cveRegimenes: string): void {
        this.update((state) => ({
            ...state,
            cveRegimenes,
        }));
    }

    /**
     * Actualiza el aduanas.
     * 
     * @param cveAduanas Nuevo valor del aduanas.
     */
    public setCveAduanas(cveAduanas: string): void {
        this.update((state) => ({
            ...state,
            cveAduanas,
        }));
    }

    /**
     * Actualiza el producto clasificación.
     * 
     * @param cveProductoClasificacion Nuevo valor del producto clasificación.
     */
    public setProductoClasificacion(cveProductoClasificacion: string): void {
        this.update((state) => ({
            ...state,
            cveProductoClasificacion,
        }));
    }

    /**
     * Actualiza el específico producto clasificación.
     * 
     * @param cveEspecificoProductoClasifi Nuevo valor del específico producto clasificación.
     */
    public setEspecificoProductoClasificacion(cveEspecificoProductoClasifi: string): void {
        this.update((state) => ({
            ...state,
            cveEspecificoProductoClasifi,
        }));
    }

    /**
     * Actualiza el nombre producto.
     * 
     * @param nombreProducto Nuevo valor del nombre producto.
     */
    public setNombreProducto(nombreProducto: string): void {
        this.update((state) => ({
            ...state,
            nombreProducto,
        }));
    }

    /**
     * Actualiza el marca.
     * 
     * @param marca Nuevo valor del marca.
     */
    public setMarca(marca: string): void {
        this.update((state) => ({
            ...state,
            marca,
        }));
    }

    /**
     * Actualiza el tipo de producto.
     * 
     * @param cveTipoProducto Nuevo valor del tipo de producto.
     */
    public setTipoProducto(cveTipoProducto: string): void {
        this.update((state) => ({
            ...state,
            cveTipoProducto,
        }));
    }

    /**
     * Actualiza el fracción arancelaria.
     * 
     * @param fraccionArancelaria Nuevo valor del fracción arancelaria.
     */
    public setFraccionArancelaria(fraccionArancelaria: string): void {
        this.update((state) => ({
            ...state,
            fraccionArancelaria,
        }));
    }

    /**
     * Actualiza el fracción arancelaria descripción.
     * 
     * @param fraccionArancelariaDescripcion Nuevo valor del fracción arancelaria descripción.
     */
    public setFraccionArancelariaDescripcion(fraccionArancelariaDescripcion: string): void {
        this.update((state) => ({
            ...state,
            fraccionArancelariaDescripcion,
        }));
    }

    /**
     * Actualiza el modelo.
     * 
     * @param modelo Nuevo valor del modelo.
     */
    public setModelo(modelo: string): void {
        this.update((state) => ({
            ...state,
            modelo,
        }));
    }

    /**
     * Actualiza el producto descripción.
     * 
     * @param productoDescripcion Nuevo valor del producto descripción.
     */
    public setProductoDescripcion(productoDescripcion: string): void {
        this.update((state) => ({
            ...state,
            productoDescripcion,
        }));
    }

    /**
     * Actualiza el país destino.
     * 
     * @param correoElectronico Nuevo valor del país destino.
     */
    public setPaisDestino(cvePaisDestino: string): void {
        this.update((state) => ({
            ...state,
            cvePaisDestino,
        }));
    }

    /**
     * Actualiza el seleccionada manifiesto.
     * 
     * @param seleccionadaManifiesto Nuevo valor del seleccionada manifiesto.
     */
    public setSeleccionadaManifiesto(seleccionadaManifiesto: []): void {
        this.update((state) => ({
            ...state,
            seleccionadaManifiesto
        }));
    }

    /**
     * Actualiza el información confidencial.
     * 
     * @param informacionConfidencial Nuevo valor del información confidencial.
     */
    public setInformacionConfidencial(informacionConfidencial: string): void {
        this.update((state) => ({
            ...state,
            informacionConfidencial,
        }));
    }

    /**
     * Actualiza el rfc.
     * 
     * @param rfc Nuevo valor del rfc.
     */
    public setRfc(rfc: string): void {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }

    /**
     * Actualiza el nombre o razón social.
     * 
     * @param nombreOrazonsocial Nuevo valor del nombre o razón social.
     */
    public setNombreOrazonsocial(nombreOrazonsocial: string): void {
        this.update((state) => ({
            ...state,
            nombreOrazonsocial,
        }));
    }

    /**
     * Actualiza el apellido paterno.
     * 
     * @param apellidoPaterno Nuevo valor del apellido paterno.
     */
    public setApellidoPaterno(apellidoPaterno: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaterno,
        }));
    }

    /**
     * Actualiza el apellido materno.
     * 
     * @param apellidoMaterno Nuevo valor del apellido materno.
     */
    public setApellidoMaterno(apellidoMaterno: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaterno,
        }));
    }

    /**
     * Actualiza el terceros nacionalidad.
     * 
     * @param tercerosNacionalidad Nuevo valor del terceros nacionalidad.
     */
    public setTercerosNacionalidad(tercerosNacionalidad: string): void {
        this.update((state) => ({
            ...state,
            tercerosNacionalidad,
        }));
    }

    /**
     * Actualiza el tipo persona.
     * 
     * @param tipoPersona Nuevo valor del tipo persona.
     */
    public setTipoPersona(tipoPersona: string): void {
        this.update((state) => ({
            ...state,
            tipoPersona,
        }));
    }

    /**
     * Actualiza el rfc proveedor.
     * 
     * @param rfcProveedor Nuevo valor del rfc proveedor.
     */
    public setRfcProveedor(rfcProveedor: string): void {
        this.update((state) => ({
            ...state,
            rfcProveedor,
        }));
    }

    /**
     * Actualiza el curp.
     * 
     * @param curp Nuevo valor del curp.
     */
    public setCurp(curp: string): void {
        this.update((state) => ({
            ...state,
            curp,
        }));
    }

    /**
     * Actualiza el proveedor nombre.
     * 
     * @param proveedorNombre Nuevo valor del proveedor nombre.
     */
    public setProveedorNombre(proveedorNombre: string): void {
        this.update((state) => ({
            ...state,
            proveedorNombre,
        }));
    }

    /**
     * Actualiza el proveedor primer apellido.
     * 
     * @param proveedorPrimerApellido Nuevo valor del proveedor primer apellido.
     */
    public setProveedorPrimerApellido(proveedorPrimerApellido: string): void {
        this.update((state) => ({
            ...state,
            proveedorPrimerApellido,
        }));
    }

    /**
     * Actualiza el proveedor segundo apellido.
     * 
     * @param proveedorSegundoApellido Nuevo valor proveedor segundo apellido.
     */
    public setProveedorSegundoApellido(proveedorSegundoApellido: string): void {
        this.update((state) => ({
            ...state,
            proveedorSegundoApellido,
        }));
    }

    /**
     * Actualiza el proveedor razón social.
     * 
     * @param proveedorRazonSocial Nuevo valor del proveedor razón social.
     */
    public setProveedorRazonSocial(proveedorRazonSocial: string): void {
        this.update((state) => ({
            ...state,
            proveedorRazonSocial,
        }));
    }

    /**
     * Actualiza el país.
     * 
     * @param cvePais Nuevo valor del país.
     */
    public setPais(cvePais: string): void {
        this.update((state) => ({
            ...state,
            cvePais,
        }));
    }

    /**
     * Actualiza el domicilio estado.
     * 
     * @param domicilioEstado Nuevo valor del domicilio estado.
     */
    public setDomicilioEstado(domicilioEstado: string): void {
        this.update((state) => ({
            ...state,
            domicilioEstado,
        }));
    }

    /**
     * Actualiza el alcaldía.
     * 
     * @param alcaldia Nuevo valor del alcaldía.
     */
    public setAlcaldia(alcaldia: string): void {
        this.update((state) => ({
            ...state,
            alcaldia,
        }));
    }

    /**
     * Actualiza el localidad.
     * 
     * @param localidad Nuevo valor del localidad.
     */
    public setLocalidad(localidad: string): void {
        this.update((state) => ({
            ...state,
            localidad,
        }));
    }

    /**
     * Actualiza el domicilio código postal.
     * 
     * @param domicilioCodigoPostal Nuevo valor del domicilio código postal.
     */
    public setDomicilioCodigoPostal(domicilioCodigoPostal: string): void {
        this.update((state) => ({
            ...state,
            domicilioCodigoPostal,
        }));
    }

    /**
     * Actualiza el ccolonia.
     * 
     * @param colonia Nuevo valor del colonia.
     */
    public setColonia(colonia: string): void {
        this.update((state) => ({
            ...state,
            colonia,
        }));
    }

    /**
     * Actualiza el domicilio calle.
     * 
     * @param domicilioCalle Nuevo valor del domicilio calle.
     */
    public setDomicilioCalle(domicilioCalle: string): void {
        this.update((state) => ({
            ...state,
            domicilioCalle,
        }));
    }

    /**
     * Actualiza el número exterior.
     * 
     * @param numeroExterior Nuevo valor del número exterior.
     */
    public setNumeroExterior(numeroExterior: string): void {
        this.update((state) => ({
            ...state,
            numeroExterior,
        }));
    }

    /**
     * Actualiza el número interior.
     * 
     * @param numeroInterior Nuevo valor del número interior.
     */
    public setNumeroInterior(numeroInterior: string): void {
        this.update((state) => ({
            ...state,
            numeroInterior,
        }));
    }

    /**
     * Actualiza el domicilio lada.
     * 
     * @param domicilioLada Nuevo valor del domicilio lada.
     */
    public setDomicilioLada(domicilioLada: string): void {
        this.update((state) => ({
            ...state,
            domicilioLada,
        }));
    }

    /**
     * Actualiza el domicilio teléfono.
     * 
     * @param domicilioTelefono Nuevo valor del domicilio teléfono.
     */
    public setDomicilioTelefono(domicilioTelefono: string): void {
        this.update((state) => ({
            ...state,
            domicilioTelefono,
        }));
    }

    /**
     * Actualiza el domicilio correo electrónico.
     * 
     * @param domicilioCorreoElectronico Nuevo valor del domicilio correo electrónico.
     */
    public setDomicilioCorreoElectronico(domicilioCorreoElectronico: string): void {
        this.update((state) => ({
            ...state,
            domicilioCorreoElectronico,
        }));
    }
}