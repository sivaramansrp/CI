import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitudDatosService } from './solicitud-datos.service';
import { Solicitud260910Store } from '../estados/tramites260910.store';
import { ConsultaDatos } from '../models/solicitud-datos.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('SolicitudDatosService', () => {
  let service: SolicitudDatosService;
  let solicitudStoreMock: jest.Mocked<Solicitud260910Store>;
  let httpClient: jest.Mocked<HttpClient>;
  
  beforeEach(() => {
    // Create a fully mocked store with all required methods
    const mockStore = {
      setTipoOperacion: jest.fn(),
      setObservaciones: jest.fn(),
      setRfcSanitario: jest.fn(),
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setLiveFreshFrozen: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setClaveSCIAN: jest.fn(),
      setClaveSCIANDesc: jest.fn(),
      setHacerlos: jest.fn(),
      setRfc: jest.fn(),
      setLegalRazonSocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setMercanciasDatos: jest.fn(),
      setSCIANDatos: jest.fn(),
      setManifesto: jest.fn(),
      setClasificacionProductos: jest.fn(),
      setEspecificarProducto: jest.fn(),
      setNombreProductoEspecifico: jest.fn(),
      setDistintiva: jest.fn(),
      setCientifico: jest.fn(),
      setTipoProducto: jest.fn(),
      setFarmaceutica: jest.fn(),
      setFisico: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setDescripcionFraccionArancelaria: jest.fn(),
      setCantidadUMT: jest.fn(),
      setUmt: jest.fn(),
      setCantidadUMC: jest.fn(),
      setUmc: jest.fn(),
      setPresentacionFarmaceutica: jest.fn(),
      setRegistroSanitario: jest.fn(),
      setFechaCaducidad: jest.fn(),
      setTipoPersona: jest.fn(),
      setModificarRFC: jest.fn(),
      setDenominacion: jest.fn(),
      setDomicilioPais: jest.fn(),
      setDomicilioEstado: jest.fn(),
      setDomicilioMunicipio: jest.fn(),
      setDomicilioLocalidad: jest.fn(),
      setDomicilioCodigo: jest.fn(),
      setDomicilioColonia: jest.fn(),
      setDomicilioCalle: jest.fn(),
      setDomicilioNumeroExterior: jest.fn(),
      setDomicilioNumeroInterior: jest.fn(),
      setDomicilioLada: jest.fn(),
      setDomicilioTelefono: jest.fn(),
      setDomicilioCorreoElectronico: jest.fn(),
      setDestinatarioDatos: jest.fn(),
      setFabricanteDatos: jest.fn(),
      setProveedorDatos: jest.fn(),
      setFacturadorDatos: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setCadenaDeDependencia: jest.fn(),
      setBanco: jest.fn(),
      setLiaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
      setFolioDeDesistimiento: jest.fn(),
      setFolioOriginal: jest.fn(),
    } as unknown as jest.Mocked<Solicitud260910Store>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolicitudDatosService,
        { provide: Solicitud260910Store, useValue: mockStore },
      ],
    });

    service = TestBed.inject(SolicitudDatosService);
    solicitudStoreMock = TestBed.inject(Solicitud260910Store) as jest.Mocked<Solicitud260910Store>;
    httpClient = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;

    httpClient.get = jest.fn().mockReturnValue(of({}));
  });

  it('should update the store with all provided data', () => {
    const mockData: ConsultaDatos = {
      tipoOperacion: 'PRO',
      observaciones: 'Operación estándar con verificación de calidad',
      rfcSanitario: 'GODE861012ABC',
      razonSocial: 'FARMACÉUTICAS DEL SURESTE SA DE CV',
      correoElectronico: 'operaciones@farmaceuticassureste.com.mx',
      codigoPostal: '62100',
      estado: 1,
      municipio: 'Cuernavaca',
      localidad: 'Centro',
      colonia: 'Chapultepec',
      calle: 'Av. Morelos',
      lada: 777,
      telefono: 3123456,
      claveSCIAN: 325412,
      claveSCIANDesc: 325412,
      avisoDeFuncionamiento: true,
      licenciaSanitaria: 'SSA-987654321-MOR',
      liveFreshFrozen: true,
      regimen: 2,
      aduana: 2,
      hacerlos: 'No',
      rfc: 'FSU861012ABC',
      legalRazonSocial: 'FARMACÉUTICAS DEL SURESTE SA DE CV',
      apellidoPaterno: 'GÓMEZ',
      apellidoMaterno: 'DELGADO',
      mercanciasDatos: [{
        clasificaionProductos: 'Farmacéutico',
        especificarProducto: 3,
        nombreProductoEspecifico: 'Paracetamol 500mg',
        distintiva: 'Genérico',
        cientifico: 'N-acetyl-p-aminophenol',
        tipoProducto: 102,
        farmaceutica: 'Tableta',
        fisico: 'Sólido',
        fraccionArancelaria: '3004.90.99',
        descripcionFraccionArancelaria: 'Medicamentos para uso humano',
        cantidadUMT: '5000',
        umt: 'UN',
        cantidadUMC: '100',
        umc: 14,
        presentacionFarmaceutica: 'Blíster x 10 tabletas',
        registroSanitario: 987654321,
        fechaCaducidad: '2026-12-31',
        paisDeOrigen: 'México',
        paisDeProcedencia: 'México',
        usoEspecifico: 'Analgésico'
      }],
      SCIANDatos: [{
        claveSCIAN: '325412',
        claveSCIANDesc: 'Fabricación de productos farmacéuticos'
      }],
      manifesto: true,
      clasificaionProductos: 'Farmacéuticos',
      especificarProducto: 3,
      nombreProductoEspecifico: 'Paracetamol 500mg',
      distintiva: 'Genérico',
      cientifico: 'N-acetyl-p-aminophenol',
      tipoProducto: 102,
      farmaceutica: 1,
      fisico: 1,
      fraccionArancelaria: '3004.90.99',
      descripcionFraccionArancelaria: 'Medicamentos para uso humano',
      cantidadUMT: '5000',
      umt: 'UN',
      cantidadUMC: '100',
      umc: 14,
      presentacionFarmaceutica: 'Blíster x 10 tabletas',
      registroSanitario: 987654321,
      fechaCaducidad: '2026-12-31',
      tipoPersona: 'MORAL',
      modificarRFC: 'NO',
      denominacion: 'FARMACÉUTICAS DEL SURESTE',
      domicilioPais: 484,
      domicilioEstado: 17,
      domicilioMunicipio: 21,
      domicilioLocalidad: 15,
      domicilioCodigo: 62100,
      domicilioColonia: 45,
      domiciliCalle: 'Av. Morelos',
      domiciliNumeroExterior: '150',
      domiciliNumeroInterior: 'B',
      domiciliLada: '777',
      domiciliTelefono: '3123456',
      domiciliCorreoElectronioco: 'administracion@farmaceuticassureste.com.mx',
      destinatarioDatos: [{
        telefono: '7771234567',
        correoElectronico: 'compras@hospitalcuernavaca.gob.mx',
        calle: 'Av. Plan de Ayala',
        numeroExterior: 'S/N',
        numeroInterior: '',
        pais: 'México',
        colonia: 'Centro',
        localidad: 'Cuernavaca',
        codigoPostaloEquivalente: '62000',
        tipoPersona: '',
        estadoLocalidad: '',
        municipioAlcaldia: '',
        entidadFederativa: '',
        coloniaoEquivalente: '',
        lada: ''
      }],
      fabricanteDatos: [{
        nombre: 'LABORATORIOS FARMACOL SA DE CV',
        telefono: '5556789012',
        correoElectronico: 'produccion@farmacol.com.mx',
        calle: 'Calzada de Tlalpan',
        numeroExterior: '4500',
        numeroInterior: 'Piso 3',
        pais: 'México',
        colonia: 'Portales',
        localidad: 'Ciudad de México',
        codigoPostaloEquivalente: '03300',
        tercerosNacionalidad: '',
        tipoPersona: '',
        primerApellido: '',
        segundoApellido: '',
        extranjeroEstado: '',
        estadoLocalidad: '',
        municipioAlcaldia: '',
        entidadFederativa: '',
        coloniaoEquivalente: '',
        lada: ''
      }],
      proveedorDatos: [{
        telefono: '5551234567',
        correoElectronico: 'ventas@dismedna.com.mx',
        calle: 'Eje Central Lázaro Cárdenas',
        numeroExterior: '789',
        numeroInterior: '401',
        pais: 'México',
        coloniaoEquivalente: 'Nápoles',
        estado: 'Ciudad de México',
        codigoPostaloEquivalente: '03810',
        tipoPersona: '',
        lada: ''
      }],
      facturadorDatos: [{
        telefono: '5552345678',
        correoElectronico: 'facturacion@sfiscal.com.mx',
        calle: 'Paseo de la Reforma',
        numeroExterior: '222',
        numeroInterior: 'Piso 10',
        pais: 'México',
        coloniaoEquivalente: 'Juárez',
        estado: 'Ciudad de México',
        codigoPostaloEquivalente: '06600',
        tipoPersona: '',
        lada: ''
      }],
      claveDeReferencia: 'REF-2024-06-20-001',
      cadenaDeDependencia: 'FARMACOL>DISMEDNA>FARMASURESTE>HOSPITALCUERNAVACA',
      banco: 1,
      liaveDePago: 'PAGO-987654321',
      fechaDePago: '2024-06-19',
      importeDePago: '125000.00',
      folioDeDesistimiento: 'DES-2024-006543',
      folioOriginal: 'SOL-2024-001234'
    };

    service.actualizarEstadoFormulario(mockData);

    // Verify all store setters were called with correct data
    expect(solicitudStoreMock.setTipoOperacion).toHaveBeenCalledWith(mockData.tipoOperacion);
    expect(solicitudStoreMock.setObservaciones).toHaveBeenCalledWith(mockData.observaciones);
    expect(solicitudStoreMock.setRfcSanitario).toHaveBeenCalledWith(mockData.rfcSanitario);
    expect(solicitudStoreMock.setRazonSocial).toHaveBeenCalledWith(mockData.razonSocial);
    expect(solicitudStoreMock.setCorreoElectronico).toHaveBeenCalledWith(mockData.correoElectronico);
    expect(solicitudStoreMock.setCodigoPostal).toHaveBeenCalledWith(mockData.codigoPostal);
    expect(solicitudStoreMock.setEstado).toHaveBeenCalledWith(mockData.estado);
    expect(solicitudStoreMock.setMunicipio).toHaveBeenCalledWith(mockData.municipio);
    expect(solicitudStoreMock.setLocalidad).toHaveBeenCalledWith(mockData.localidad);
    expect(solicitudStoreMock.setColonia).toHaveBeenCalledWith(mockData.colonia);
    expect(solicitudStoreMock.setCalle).toHaveBeenCalledWith(mockData.calle);
    expect(solicitudStoreMock.setLada).toHaveBeenCalledWith(mockData.lada);
    expect(solicitudStoreMock.setTelefono).toHaveBeenCalledWith(mockData.telefono);
    expect(solicitudStoreMock.setAvisoDeFuncionamiento).toHaveBeenCalledWith(mockData.avisoDeFuncionamiento);
    expect(solicitudStoreMock.setLicenciaSanitaria).toHaveBeenCalledWith(mockData.licenciaSanitaria);
    expect(solicitudStoreMock.setLiveFreshFrozen).toHaveBeenCalledWith(mockData.liveFreshFrozen);
    expect(solicitudStoreMock.setRegimen).toHaveBeenCalledWith(mockData.regimen);
    expect(solicitudStoreMock.setAduana).toHaveBeenCalledWith(mockData.aduana);
    expect(solicitudStoreMock.setClaveSCIAN).toHaveBeenCalledWith(mockData.claveSCIAN);
    expect(solicitudStoreMock.setClaveSCIANDesc).toHaveBeenCalledWith(mockData.claveSCIANDesc);
    expect(solicitudStoreMock.setHacerlos).toHaveBeenCalledWith(mockData.hacerlos);
    expect(solicitudStoreMock.setRfc).toHaveBeenCalledWith(mockData.rfc);
    expect(solicitudStoreMock.setLegalRazonSocial).toHaveBeenCalledWith(mockData.legalRazonSocial);
    expect(solicitudStoreMock.setApellidoPaterno).toHaveBeenCalledWith(mockData.apellidoPaterno);
    expect(solicitudStoreMock.setApellidoMaterno).toHaveBeenCalledWith(mockData.apellidoMaterno);
    expect(solicitudStoreMock.setMercanciasDatos).toHaveBeenCalledWith(mockData.mercanciasDatos);
    expect(solicitudStoreMock.setSCIANDatos).toHaveBeenCalledWith(mockData.SCIANDatos);
    expect(solicitudStoreMock.setManifesto).toHaveBeenCalledWith(mockData.manifesto);
    expect(solicitudStoreMock.setClasificacionProductos).toHaveBeenCalledWith(mockData.clasificaionProductos);
    expect(solicitudStoreMock.setEspecificarProducto).toHaveBeenCalledWith(mockData.especificarProducto);
    expect(solicitudStoreMock.setNombreProductoEspecifico).toHaveBeenCalledWith(mockData.nombreProductoEspecifico);
    expect(solicitudStoreMock.setDistintiva).toHaveBeenCalledWith(mockData.distintiva);
    expect(solicitudStoreMock.setCientifico).toHaveBeenCalledWith(mockData.cientifico);
    expect(solicitudStoreMock.setTipoProducto).toHaveBeenCalledWith(mockData.tipoProducto);
    expect(solicitudStoreMock.setFarmaceutica).toHaveBeenCalledWith(mockData.farmaceutica);
    expect(solicitudStoreMock.setFisico).toHaveBeenCalledWith(mockData.fisico);
    expect(solicitudStoreMock.setFraccionArancelaria).toHaveBeenCalledWith(mockData.fraccionArancelaria);
    expect(solicitudStoreMock.setDescripcionFraccionArancelaria).toHaveBeenCalledWith(mockData.descripcionFraccionArancelaria);
    expect(solicitudStoreMock.setCantidadUMT).toHaveBeenCalledWith(mockData.cantidadUMT);
    expect(solicitudStoreMock.setUmt).toHaveBeenCalledWith(mockData.umt);
    expect(solicitudStoreMock.setCantidadUMC).toHaveBeenCalledWith(mockData.cantidadUMC);
    expect(solicitudStoreMock.setUmc).toHaveBeenCalledWith(mockData.umc);
    expect(solicitudStoreMock.setPresentacionFarmaceutica).toHaveBeenCalledWith(mockData.presentacionFarmaceutica);
    expect(solicitudStoreMock.setRegistroSanitario).toHaveBeenCalledWith(mockData.registroSanitario);
    expect(solicitudStoreMock.setFechaCaducidad).toHaveBeenCalledWith(mockData.fechaCaducidad);
    expect(solicitudStoreMock.setTipoPersona).toHaveBeenCalledWith(mockData.tipoPersona);
    expect(solicitudStoreMock.setModificarRFC).toHaveBeenCalledWith(mockData.modificarRFC);
    expect(solicitudStoreMock.setDenominacion).toHaveBeenCalledWith(mockData.denominacion);
    expect(solicitudStoreMock.setDomicilioPais).toHaveBeenCalledWith(mockData.domicilioPais);
    expect(solicitudStoreMock.setDomicilioEstado).toHaveBeenCalledWith(mockData.domicilioEstado);
    expect(solicitudStoreMock.setDomicilioMunicipio).toHaveBeenCalledWith(mockData.domicilioMunicipio);
    expect(solicitudStoreMock.setDomicilioLocalidad).toHaveBeenCalledWith(mockData.domicilioLocalidad);
    expect(solicitudStoreMock.setDomicilioCodigo).toHaveBeenCalledWith(mockData.domicilioCodigo);
    expect(solicitudStoreMock.setDomicilioColonia).toHaveBeenCalledWith(mockData.domicilioColonia);
    expect(solicitudStoreMock.setDomicilioCalle).toHaveBeenCalledWith(mockData.domiciliCalle);
    expect(solicitudStoreMock.setDomicilioNumeroExterior).toHaveBeenCalledWith(mockData.domiciliNumeroExterior);
    expect(solicitudStoreMock.setDomicilioNumeroInterior).toHaveBeenCalledWith(mockData.domiciliNumeroInterior);
    expect(solicitudStoreMock.setDomicilioLada).toHaveBeenCalledWith(mockData.domiciliLada);
    expect(solicitudStoreMock.setDomicilioTelefono).toHaveBeenCalledWith(mockData.domiciliTelefono);
    expect(solicitudStoreMock.setDomicilioCorreoElectronico).toHaveBeenCalledWith(mockData.domiciliCorreoElectronioco);
    expect(solicitudStoreMock.setDestinatarioDatos).toHaveBeenCalledWith(mockData.destinatarioDatos);
    expect(solicitudStoreMock.setFabricanteDatos).toHaveBeenCalledWith(mockData.fabricanteDatos);
    expect(solicitudStoreMock.setProveedorDatos).toHaveBeenCalledWith(mockData.proveedorDatos);
    expect(solicitudStoreMock.setFacturadorDatos).toHaveBeenCalledWith(mockData.facturadorDatos);
    expect(solicitudStoreMock.setClaveDeReferencia).toHaveBeenCalledWith(mockData.claveDeReferencia);
    expect(solicitudStoreMock.setCadenaDeDependencia).toHaveBeenCalledWith(mockData.cadenaDeDependencia);
    expect(solicitudStoreMock.setBanco).toHaveBeenCalledWith(mockData.banco);
    expect(solicitudStoreMock.setLiaveDePago).toHaveBeenCalledWith(mockData.liaveDePago);
    expect(solicitudStoreMock.setFechaDePago).toHaveBeenCalledWith(mockData.fechaDePago);
    expect(solicitudStoreMock.setImporteDePago).toHaveBeenCalledWith(mockData.importeDePago);
    expect(solicitudStoreMock.setFolioDeDesistimiento).toHaveBeenCalledWith(mockData.folioDeDesistimiento);
    expect(solicitudStoreMock.setFolioOriginal).toHaveBeenCalledWith(mockData.folioOriginal);
  });

  it('should call correct URL for obtenerDatosDeSolicitud', () => {
    service.obtenerDatosDeSolicitud().subscribe();

    expect(httpClient.get).toHaveBeenCalledWith(
      '../../../assets/json/260910/solicitud-datos.json'
    );
  });

  it('should call correct URL for obtenerSolicitud', () => {
    service.obtenerSolicitud().subscribe();

    expect(httpClient.get).toHaveBeenCalledWith(
      '../../../assets/json/260910/solicitud.json'
    );
  });

  it('should call correct URL for obtenerRegimenDestinaraListo', () => {
    service.obtenerRegimenDestinaraListo().subscribe();

    expect(httpClient.get).toHaveBeenCalledWith(
      '../../../assets/json/260910/regimen-destinaran.json'
    );
  });

  it('should call correct URL for obtenerAduanaListo', () => {
    service.obtenerAduanaListo().subscribe();

    expect(httpClient.get).toHaveBeenCalledWith(
      '../../../assets/json/260910/aduana.json'
    );
  });

  it('should call correct URL for obtenerEstadoCatalogo', () => {
    service.obtenerEstadoCatalogo().subscribe();

    expect(httpClient.get).toHaveBeenCalledWith(
      '../../../assets/json/260910/estado-catalogo.json'
    );
  });
});