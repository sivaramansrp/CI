/**
 * Modelo que representa la información de un destinatario.
 * Contiene los datos personales y de contacto del destinatario.
 */
export interface Destinatario {
    /**
     * Nombre completo del destinatario.
     */
    nombre: string;
  
    /**
     * Registro Federal de Contribuyentes (RFC) del destinatario.
     */
    rfc: string;
  
    /**
     * Clave Única de Registro de Población (CURP) del destinatario.
     */
    curp: string;
  
    /**
     * Número de teléfono del destinatario.
     */
    telefono: string;
  
    /**
     * Correo electrónico del destinatario.
     */
    correoElectronico: string;
  
    /**
     * Calle donde reside el destinatario.
     */
    calle: string;
  
    /**
     * Número exterior del domicilio del destinatario.
     */
    numeroExterior: string;
  
    /**
     * Número interior del domicilio del destinatario.
     */
    numeroInterior: string;
  
    /**
     * País donde reside el destinatario.
     */
    pais: string;
  
    /**
     * Colonia donde reside el destinatario.
     */
    colonia: string;
  
    /**
     * Municipio donde reside el destinatario.
     */
    municipio: string;
  
    /**
     * Localidad donde reside el destinatario.
     */
    localidad: string;
  
    /**
     * Estado donde reside el destinatario.
     */
    estado: string;
  
    /**
     * Código postal del domicilio del destinatario.
     */
    codigoPostal: string;
  }
  
  /**
   * Modelo que representa la información de un fabricante.
   * Contiene los datos personales y de contacto del fabricante.
   */
  export interface Fabricante {
    /**
     * Nombre completo del fabricante.
     */
    nombre: string;
  
    /**
     * Registro Federal de Contribuyentes (RFC) del fabricante.
     */
    rfc: string;
  
    /**
     * Clave Única de Registro de Población (CURP) del fabricante.
     */
    curp: string;
  
    /**
     * Número de teléfono del fabricante.
     */
    telefono: string;
  
    /**
     * Correo electrónico del fabricante.
     */
    correoElectronico: string;
  
    /**
     * Calle donde reside el fabricante.
     */
    calle: string;
  
    /**
     * Número exterior del domicilio del fabricante.
     */
    numeroExterior: string;
  
    /**
     * Número interior del domicilio del fabricante.
     */
    numeroInterior: string;
  
    /**
     * País donde reside el fabricante.
     */
    pais: string;
  
    /**
     * Colonia donde reside el fabricante.
     */
    colonia: string;
  
    /**
     * Municipio donde reside el fabricante.
     */
    municipio: string;
  
    /**
     * Localidad donde reside el fabricante.
     */
    localidad: string;
  
    /**
     * Estado donde reside el fabricante.
     */
    estado: string;
  
    /**
     * Código postal del domicilio del fabricante.
     */
    codigoPostal: string;
  }