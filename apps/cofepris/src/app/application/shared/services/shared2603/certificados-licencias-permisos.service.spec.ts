import { CertificadosLicenciasPermisosService } from './certificados-licencias-permisos.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('CertificadosLicenciasPermisosService', () => {
  let service: CertificadosLicenciasPermisosService;
  let httpMock: jest.Mocked<HttpClient>;
  let storeMock: any;

    beforeEach(() => {
      httpMock = {
        get: jest.fn(),
      } as any;

      // Mock all store methods used in actualizarEstadoFormulario
      storeMock = {};
      [
        'setDenominacionRazon',
        'setCodigoPostal',
        'setEstado',
        'setMunicipio',
        'setLocalidad',
        'setColonia',
        'setCalleYNumero',
        'setCorreoElecronico',
        'setLada',
        'setTelefono',
        'setClaveScianModal',
        'setAvisoDeFuncionamiento',
        'setClave',
        'setDescripcion',
        'setAvisoCheckbox',
        'setLicenciaSanitaria',
        'setRegimen',
        'setRegimenDestinara',
        'setAduanasEntradas',
        'setNumeroPermiso',
        'setLosDatosNo',
        'setLosDatosYes',
        'setNombreORazon',
        'setClasificacion',
        'setEspecificarClasificacionProducto',
        'setDenominacionEspecifica',
        'setDenominacionDistintiva',
        'setDenominacionComun',
        'setTipoDeProducto',
        'setEspecifique',
        'setEstadoFisico',
        'setFraccionArancelaria',
        'setDescripcionFraccion',
        'setCantidadUMT',
        'setUMT',
        'setCantidadUMC',
        'setUMC',
        'setPresentacion',
        'setNumeroRegistro',
        'setFechaCaducidad',
        'setCumplimiento',
        'setRfc',
        'setNombre',
        'setApellidoPaterno',
        'setApellidoMaterno',
        'setDci',
        'setMarcaComercialODenominacionDistintiva',
        'setDescripcionDeLaFraccion',
        'setNumeroCas',
        'setCantidadDeLotes',
        'setKgOrPorLote',
        'setPais',
        'setPaisDeProcedencia',
        'setDetallarUso',
        'setNumeroDePiezas',
        'setDescripcionDelNumeroDePiezas',
        'setNumeroDeRegistro',
        'setClaveDeReferencia',
        'setCadenaDaLaDependencia',
        'setBanco',
        'setLaveDePago',
        'setFechaDePago',
        'setImporteDePago',
        'setTipoDocumento',
        'setTercerosRelacionadosDenominacionSocial',
        'setTercerosRelacionadosTerceroNombre',
        'setTercerosRelacionadosNacional',
        'setTercerosRelacionadosExtranjero',
        'setTercerosRelacionadosFisica',
        'setTercerosRelacionadosMoral',
        'setTercerosRelacionadosNoContribuyente',
        'setTercerosRelacionadosRfc',
        'setTercerosRelacionadosCurp',
        'setTercerosRelacionadosRazonSocial',
        'setTercerosRelacionadosPais',
        'setTercerosRelacionadosEstado',
        'setTercerosRelacionadosCodigoPostal',
        'setTercerosRelacionadosCalle',
        'setTercerosRelacionadosNumeroExterior',
        'setTercerosRelacionadosNumeroInterior',
        'setTercerosRelacionadosLada',
        'setTercerosRelacionadosTelefono',
        'setTercerosRelacionadosCorreoElectronico',
        'setManifiestos',
        'setTercerosNacionalidad',
        'setTipoPersona',
      ].forEach((method) => {
        storeMock[method] = jest.fn();
      });

      service = new CertificadosLicenciasPermisosService(httpMock, storeMock);
    });

    it('debe crearse', () => {
      expect(service).toBeTruthy();
    });

    describe('Métodos de obtención de catálogos', () => {
      const endpoints = [
        { method: 'getEstadoDatos', url: 'assets/json/2603/estado-catalog.json', type: 'EstadoCatalogResponse' },
        { method: 'getScianDatos', url: 'assets/json/2603/scian-tabla.json', type: 'ScianDatos[]' },
        { method: 'getClaveDatos', url: 'assets/json/2603/clave-catalog.json', type: 'EstadoCatalogResponse' },
        { method: 'getRegimenDatos', url: 'assets/json/2603/regimen-catalog.json', type: 'EstadoCatalogResponse' },
        { method: 'getMercanciasDatos', url: 'assets/json/2603/mercancias-tabla.json', type: 'MercanciasDatos[]' },
        { method: 'getTipoDeProductoDatos', url: 'assets/json/2603/tipo-de-producto-catalog.json', type: 'EstadoCatalogResponse' },
        { method: 'getPaisDeProcedenciaDatos', url: 'assets/json/2603/pais-de-procedencia-catalog.json', type: 'EstadoCatalogResponse' },
        { method: 'getFabricanteDatos', url: 'assets/json/2603/fabricante-tabla.json', type: 'Fabricante[]' },
        { method: 'getFacturadorDatos', url: 'assets/json/2603/facturador-tabla.json', type: 'Fabricante[]' },
        { method: 'getProveedorDatos', url: 'assets/json/2603/proveedor-tabla.json', type: 'Fabricante[]' },
        { method: 'getCertificadoDatos', url: 'assets/json/2603/certificado-analitico-tabla.json', type: 'Fabricante[]' },
        { method: 'getOtrosDatos', url: 'assets/json/2603/otros-tabla.json', type: 'Otros[]' },
        { method: 'getBancoDatos', url: 'assets/json/2603/banco-catalog.json', type: 'JSONResponse' },
        { method: 'getTipoDeDocumentoDatos', url: 'assets/json/2603/tipo-de-documento.json', type: 'JSONResponse' },
        { method: 'getFormularioData', url: 'assets/json/2603/inicializar-formulario.json', type: 'Solicitud2603State' },
      ];

      endpoints.forEach(({ method, url }) => {
        it(`debe obtener datos correctamente para ${method}`, (done) => {
          const mockResponse = { test: 'ok' };
          httpMock.get.mockReturnValueOnce(of(mockResponse));
          (service as any)[method]().subscribe((resp: any) => {
            expect(resp).toEqual(mockResponse);
            expect(httpMock.get).toHaveBeenCalledWith(url);
            done();
          });
        });

        it(`debe propagar error si ocurre en ${method}`, (done) => {
          const error = new Error('fail');
          httpMock.get.mockReturnValueOnce(throwError(() => error));
          (service as any)[method]().subscribe({
            next: () => {},
            error: (err: any) => {
              expect(err).toBe(error);
              done();
            },
          });
        });
      });

        it('debe obtener datos correctamente para getClaveCatalogDatos', (done) => {
          const mockResponse = { clave: 'test' };
          httpMock.get.mockReturnValueOnce(of(mockResponse));
          service.getClaveCatalogDatos().subscribe((resp) => {
            expect(resp).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith('assets/json/2603/clasificacion-del-producto.json');
            done();
          });
        });
    });

    it('debe actualizar correctamente el estado del formulario en el store', () => {
      const mockData: any = {
        denominacionRazon: 'Empresa XYZ',
        codigoPostal: '12345',
        estado: 'Estado1',
        municipio: 'Municipio1',
        localidad: 'Localidad1',
        colonia: 'Colonia1',
        calleYNumero: 'Calle 123',
        correoElecronico: 'email@test.com',
        lada: '55',
        telefono: '5555555555',
        claveScianModal: 'ABC123',
        avisoDeFuncionamiento: 'Sí',
        clave: 'Clave123',
        descripcion: 'Descripción',
        avisoCheckbox: true,
        licenciaSanitaria: 'Licencia123',
        regimen: 'Regimen1',
        regimenDestinara: 'Destinara1',
        aduana: 'Aduana1',
        numeroPermiso: 'Permiso123',
        manifiestos: 'Manifiesto1',
        losDatosNo: false,
        nombreORazon: 'Nombre Razon',
        clasificacion: 'Clasificación',
        especificarClasificacionProducto: 'Detalle Clasificación',
        denominacionEspecifica: 'Denominación Específica',
        denominacionDistintiva: 'Distintiva',
        denominacionComun: 'Común',
        tipoDeProducto: 'Tipo1',
        estadoFisico: 'Físico',
        fraccionArancelaria: '1234.56',
        descripcionFraccion: 'Descripción Fracción',
        cantidadUMT: '100',
        UMT: 'KG',
        cantidadUMC: '50',
        UMC: 'L',
        presentacion: 'Caja',
        numeroRegistro: 'Registro123',
        fechaCaducidad: '2025-12-31',
        cumplimiento: 'Cumple',
        rfc: 'RFC123456',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'López',
        dci: 'DCI1',
        marcaComercialODenominacionDistintiva: 'Marca123',
        descripcionDeLaFraccion: 'Desc Fracción',
        numeroCas: 'CAS123',
        cantidadDeLotes: '10',
        kgOrPorLote: '100KG',
        pais: 'México',
        paisDeProcedencia: 'USA',
        detallarUso: 'Uso específico',
        numeroDePiezas: '20',
        descripcionDelNumeroDePiezas: '20 piezas',
        numeroDeRegistro: 'Reg123',
        claveDeReferencia: 'ClaveRef123',
        cadenaDaLaDependencia: 'CadenaDependencia',
        banco: 'Banco1',
        laveDePago: 'ClavePago123',
        fechaDePago: '2025-06-30',
        importeDePago: '5000',
        tipoDocumento: 'Documento1',
        tercerosRelacionadosDenominacionSocial: 'TerceroSocial',
        tercerosRelacionadosTerceroNombre: 'TerceroNombre',
        tercerosNacionalidad: 'Mexicana',
        tipoPersona: 'Moral',
        tercerosRelacionadosRfc: 'RFC987654',
        tercerosRelacionadosCurp: 'CURP987654',
        tercerosRelacionadosRazonSocial: 'RazonSocial3',
        tercerosRelacionadosPais: 'México',
        tercerosRelacionadosEstado: 'Estado3',
        tercerosRelacionadosCodigoPostal: '54321',
        tercerosRelacionadosCalle: 'Calle Secundaria',
        tercerosRelacionadosNumeroExterior: '12',
        tercerosRelacionadosNumeroInterior: 'A',
        tercerosRelacionadosLada: '33',
        tercerosRelacionadosTelefono: '3333333333',
        tercerosRelacionadosCorreoElectronico: 'tercero@test.com',
      };

      service.actualizarEstadoFormulario(mockData);

      expect(storeMock.setDenominacionRazon).toHaveBeenCalledWith('Empresa XYZ');
      expect(storeMock.setCodigoPostal).toHaveBeenCalledWith('12345');
      expect(storeMock.setCorreoElecronico).toHaveBeenCalledWith(
        'email@test.com'
      );
      expect(storeMock.setFraccionArancelaria).toHaveBeenCalledWith('1234.56');
      expect(storeMock.setClaveDeReferencia).toHaveBeenCalledWith('ClaveRef123');
      expect(storeMock.setImporteDePago).toHaveBeenCalledWith('5000');
      expect(
        storeMock.setTercerosRelacionadosDenominacionSocial
      ).toHaveBeenCalledWith('TerceroSocial');
    });

    it('debe propagar el error si getFormularioData falla', (done) => {
      const error = new Error('Network Error');
      httpMock.get.mockReturnValueOnce(throwError(() => error));
      service.getFormularioData().subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toBe(error);
          done();
        },
      });
    });

    it('debe obtener datos correctamente para getPaisDatos', (done) => {
      const mockResponse = [{ id: 1, nombre: 'México' }];
      httpMock.get.mockReturnValueOnce(of(mockResponse));
      service.getPaisDatos().subscribe((resp) => {
        expect(resp).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith('assets/json/2603/pais.json');
        done();
      });
    });

    it('debe propagar error si ocurre en getPaisDatos', (done) => {
      const error = new Error('fail');
      httpMock.get.mockReturnValueOnce(throwError(() => error));
      service.getPaisDatos().subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toBe(error);
          done();
        },
      });
    });

    it('debe cubrir la línea 332: getPaisDatos error branch', (done) => {
      // This test ensures the error branch for getPaisDatos is covered (line 332)
      const error = new Error('Test error for coverage');
      httpMock.get.mockReturnValueOnce(throwError(() => error));
      service.getPaisDatos().subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toBe(error);
          done();
        },
      });
    });
    describe('CertificadosLicenciasPermisosService - Coverage Additions', () => {
    let service: CertificadosLicenciasPermisosService;
    let httpMock: jest.Mocked<HttpClient>;
    let storeMock: any;

    beforeEach(() => {
      httpMock = {
        get: jest.fn(),
      } as any;
      storeMock = {};
      [
        'setDenominacionRazon',
        'setCodigoPostal',
        'setEstado',
        'setMunicipio',
        'setLocalidad',
        'setColonia',
        'setCalleYNumero',
        'setCorreoElecronico',
        'setLada',
        'setTelefono',
        'setClaveScianModal',
        'setAvisoDeFuncionamiento',
        'setClave',
        'setDescripcion',
        'setAvisoCheckbox',
        'setLicenciaSanitaria',
        'setRegimen',
        'setRegimenDestinara',
        'setAduanasEntradas',
        'setNumeroPermiso',
        'setLosDatosNo',
        'setLosDatosYes',
        'setNombreORazon',
        'setClasificacion',
        'setEspecificarClasificacionProducto',
        'setDenominacionEspecifica',
        'setDenominacionDistintiva',
        'setDenominacionComun',
        'setTipoDeProducto',
        'setEspecifique',
        'setEstadoFisico',
        'setFraccionArancelaria',
        'setDescripcionFraccion',
        'setCantidadUMT',
        'setUMT',
        'setCantidadUMC',
        'setUMC',
        'setPresentacion',
        'setNumeroRegistro',
        'setFechaCaducidad',
        'setCumplimiento',
        'setRfc',
        'setNombre',
        'setApellidoPaterno',
        'setApellidoMaterno',
        'setDci',
        'setMarcaComercialODenominacionDistintiva',
        'setDescripcionDeLaFraccion',
        'setNumeroCas',
        'setCantidadDeLotes',
        'setKgOrPorLote',
        'setPais',
        'setPaisDeProcedencia',
        'setDetallarUso',
        'setNumeroDePiezas',
        'setDescripcionDelNumeroDePiezas',
        'setNumeroDeRegistro',
        'setClaveDeReferencia',
        'setCadenaDaLaDependencia',
        'setBanco',
        'setLaveDePago',
        'setFechaDePago',
        'setImporteDePago',
        'setTipoDocumento',
        'setTercerosRelacionadosDenominacionSocial',
        'setTercerosRelacionadosTerceroNombre',
        'setTercerosRelacionadosNacional',
        'setTercerosRelacionadosExtranjero',
        'setTercerosRelacionadosFisica',
        'setTercerosRelacionadosMoral',
        'setTercerosRelacionadosNoContribuyente',
        'setTercerosRelacionadosRfc',
        'setTercerosRelacionadosCurp',
        'setTercerosRelacionadosRazonSocial',
        'setTercerosRelacionadosPais',
        'setTercerosRelacionadosEstado',
        'setTercerosRelacionadosCodigoPostal',
        'setTercerosRelacionadosCalle',
        'setTercerosRelacionadosNumeroExterior',
        'setTercerosRelacionadosNumeroInterior',
        'setTercerosRelacionadosLada',
        'setTercerosRelacionadosTelefono',
        'setTercerosRelacionadosCorreoElectronico',
        'setManifiestos',
        'setTercerosNacionalidad',
        'setTipoPersona',
      ].forEach((method) => {
        storeMock[method] = jest.fn();
      });
      service = new CertificadosLicenciasPermisosService(httpMock, storeMock);
    });

    // Test all catalog fetchers for success and error
    const catalogMethods = [
      { method: 'getEstadoDatos', url: 'assets/json/2603/estado-catalog.json' },
      { method: 'getScianDatos', url: 'assets/json/2603/scian-tabla.json' },
      { method: 'getClaveDatos', url: 'assets/json/2603/clave-catalog.json' },
      { method: 'getRegimenDatos', url: 'assets/json/2603/regimen-catalog.json' },
      { method: 'getMercanciasDatos', url: 'assets/json/2603/mercancias-tabla.json' },
      { method: 'getTipoDeProductoDatos', url: 'assets/json/2603/tipo-de-producto-catalog.json' },
      { method: 'getPaisDeProcedenciaDatos', url: 'assets/json/2603/pais-de-procedencia-catalog.json' },
      { method: 'getFabricanteDatos', url: 'assets/json/2603/fabricante-tabla.json' },
      { method: 'getFacturadorDatos', url: 'assets/json/2603/facturador-tabla.json' },
      { method: 'getProveedorDatos', url: 'assets/json/2603/proveedor-tabla.json' },
      { method: 'getCertificadoDatos', url: 'assets/json/2603/certificado-analitico-tabla.json' },
      { method: 'getOtrosDatos', url: 'assets/json/2603/otros-tabla.json' },
      { method: 'getBancoDatos', url: 'assets/json/2603/banco-catalog.json' },
      { method: 'getTipoDeDocumentoDatos', url: 'assets/json/2603/tipo-de-documento.json' },
      { method: 'getClaveCatalogDatos', url: 'assets/json/2603/clasificacion-del-producto.json' },
      { method: 'getFormularioData', url: 'assets/json/2603/inicializar-formulario.json' },
      { method: 'getPaisDatos', url: 'assets/json/2603/pais.json' },
    ];
    catalogMethods.forEach(({ method, url }) => {
      it(`should fetch ${method} successfully`, (done) => {
        httpMock.get.mockReturnValueOnce(of({ result: 'ok' }));
        (service as any)[method]().subscribe((resp: any) => {
          expect(resp).toEqual({ result: 'ok' });
          expect(httpMock.get).toHaveBeenCalledWith(url);
          done();
        });
      });
      it(`should handle error in ${method}`, (done) => {
        const error = new Error('fail');
        httpMock.get.mockReturnValueOnce(throwError(() => error));
        (service as any)[method]().subscribe({
          next: () => {},
          error: (err: any) => {
            expect(err).toBe(error);
            done();
          },
        });
      });
    });

    // Test actualizarEstadoFormulario with full, partial, and empty data
    it('should call all store setters with full data', () => {
      // List of setters corresponding to Solicitud2603State properties
      const setters = [
        'setDenominacionRazon', 'setCodigoPostal', 'setEstado', 'setMunicipio', 'setLocalidad', 'setColonia', 'setCalleYNumero', 'setCorreoElecronico',
        'setLada', 'setTelefono', 'setClaveScianModal', 'setAvisoDeFuncionamiento', 'setClaveScian', 'setDescripcion', 'setAvisoCheckbox', 'setLicenciaSanitaria',
        'setRegimen', 'setRegimenDestinara', 'setAduanasEntradas', 'setNumeroPermiso', 'setLosDatosNo', 'setNombreORazon', 'setClasificacion', 'setClave',
        'setEspecificarClasificacionProducto', 'setDenominacionEspecifica', 'setDenominacionDistintiva', 'setDenominacionComun', 'setTipoDeProducto', 'setEspecifique',
        'setEstadoFisico', 'setFraccionArancelaria', 'setDescripcionFraccion', 'setCantidadUMT', 'setUMT', 'setCantidadUMC', 'setUMC', 'setPresentacion',
        'setNumeroRegistro', 'setFechaCaducidad', 'setCumplimiento', 'setRfc', 'setNombre', 'setApellidoPaterno', 'setApellidoMaterno', 'setDci',
        'setMarcaComercialODenominacionDistintiva', 'setDescripcionDeLaFraccion', 'setNumeroCas', 'setCantidadDeLotes', 'setKgOrPorLote', 'setPais',
        'setPaisDeProcedencia', 'setDetallarUso', 'setNumeroDePiezas', 'setDescripcionDelNumeroDePiezas', 'setNumeroDeRegistro', 'setClaveDeReferencia',
        'setCadenaDaLaDependencia', 'setBanco', 'setLaveDePago', 'setFechaDePago', 'setImporteDePago', 'setTipoDocumento', 'setTercerosRelacionadosDenominacionSocial',
        'setTercerosRelacionadosTerceroNombre', 'setTercerosNacionalidad', 'setTipoPersona', 'setTercerosRelacionadosRfc', 'setTercerosRelacionadosCurp',
        'setTercerosRelacionadosRazonSocial', 'setTercerosRelacionadosPais', 'setTercerosRelacionadosEstado', 'setTercerosRelacionadosCodigoPostal',
        'setTercerosRelacionadosCalle', 'setTercerosRelacionadosNumeroExterior', 'setTercerosRelacionadosNumeroInterior', 'setTercerosRelacionadosLada',
        'setTercerosRelacionadosTelefono', 'setTercerosRelacionadosCorreoElectronico', 'setManifiestos'
      ];
      // Create a complete Solicitud2603State object with all properties set
      const fullState = {
        denominacionRazon: 'test', codigoPostal: 'test', estado: 'test', municipio: 'test', localidad: 'test', colonia: 'test', calleYNumero: 'test', correoElecronico: 'test', lada: 'test', telefono: 'test', claveScianModal: 'test', avisoDeFuncionamiento: 'test', claveScian: 'test', descripcion: 'test', avisoCheckbox: true, licenciaSanitaria: 'test', regimen: 'test', regimenDestinara: 'test', aduana: 'test', numeroPermiso: 'test', losDatosNo: 'test', nombreORazon: 'test', clasificacion: 'test', clave: 'test', especificarClasificacionProducto: 'test', denominacionEspecifica: 'test', denominacionDistintiva: 'test', denominacionComun: 'test', tipoDeProducto: 'test', especifique: 'test', estadoFisico: 'test', fraccionArancelaria: 'test', descripcionFraccion: 'test', cantidadUMT: 'test', UMT: 'test', cantidadUMC: 'test', UMC: 'test', presentacion: 'test', numeroRegistro: 'test', fechaCaducidad: 'test', cumplimiento: 'test', rfc: 'test', nombre: 'test', apellidoPaterno: 'test', apellidoMaterno: 'test', dci: 'test', marcaComercialODenominacionDistintiva: 'test', descripcionDeLaFraccion: 'test', numeroCas: 'test', cantidadDeLotes: 'test', kgOrPorLote: 'test', pais: 'test', paisDeProcedencia: 'test', detallarUso: 'test', numeroDePiezas: 'test', descripcionDelNumeroDePiezas: 'test', numeroDeRegistro: 'test', claveDeReferencia: 'test', cadenaDaLaDependencia: 'test', banco: 'test', laveDePago: 'test', fechaDePago: 'test', importeDePago: 'test', tipoDocumento: 'test', tercerosRelacionadosDenominacionSocial: 'test', tercerosRelacionadosTerceroNombre: 'test', tercerosNacionalidad: 'test', tipoPersona: 'test', tercerosRelacionadosRfc: 'test', tercerosRelacionadosCurp: 'test', tercerosRelacionadosRazonSocial: 'test', tercerosRelacionadosPais: 'test', tercerosRelacionadosEstado: 'test', tercerosRelacionadosCodigoPostal: 'test', tercerosRelacionadosCalle: 'test', tercerosRelacionadosNumeroExterior: 'test', tercerosRelacionadosNumeroInterior: 'test', tercerosRelacionadosLada: 'test', tercerosRelacionadosTelefono: 'test', tercerosRelacionadosCorreoElectronico: 'test', scianTabla: [], datosPersonalesNombre: 'test', datosPersonalesPrimerApellido: 'test', datosPersonalesSegundoApellido: 'test', tercerosRelacionadosMunicipio: 'test', tercerosRelacionadosLocalidad: 'test', tercerosRelacionadosColonia: 'test', manifiestos: true
      };
      service.actualizarEstadoFormulario(fullState);
      setters.forEach((key) => {
        if (typeof storeMock[key] === 'function' && storeMock[key]._isMockFunction) {
          expect(storeMock[key]).toHaveBeenCalled();
        }
      });
    });

    // Use the initial state for empty data
    const emptyState = {
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
      claveScian: '',
      descripcion: '',
      avisoCheckbox: false,
      licenciaSanitaria: '',
      regimen: '',
      regimenDestinara: '',
      aduana: '',
      numeroPermiso: '',
      losDatosNo: '',
      nombreORazon: '',
      clasificacion: '',
      clave: '',
      especificarClasificacionProducto: '',
      denominacionEspecifica: '',
      denominacionDistintiva: '',
      denominacionComun: '',
      tipoDeProducto: '',
      especifique: '',
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
      tercerosNacionalidad: '',
      tipoPersona: '',
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
      scianTabla: [],
      datosPersonalesNombre: '',
      datosPersonalesPrimerApellido: '',
      datosPersonalesSegundoApellido: '',
      tercerosRelacionadosMunicipio: '',
      tercerosRelacionadosLocalidad: '',
      tercerosRelacionadosColonia: '',
      manifiestos: false,
    };

    it('should call all store setters with empty data', () => {
      const setters = [
        'setDenominacionRazon', 'setCodigoPostal', 'setEstado', 'setMunicipio', 'setLocalidad', 'setColonia', 'setCalleYNumero', 'setCorreoElecronico',
        'setLada', 'setTelefono', 'setClaveScianModal', 'setAvisoDeFuncionamiento', 'setClaveScian', 'setDescripcion', 'setAvisoCheckbox', 'setLicenciaSanitaria',
        'setRegimen', 'setRegimenDestinara', 'setAduanasEntradas', 'setNumeroPermiso', 'setLosDatosNo', 'setNombreORazon', 'setClasificacion', 'setClave',
        'setEspecificarClasificacionProducto', 'setDenominacionEspecifica', 'setDenominacionDistintiva', 'setDenominacionComun', 'setTipoDeProducto', 'setEspecifique',
        'setEstadoFisico', 'setFraccionArancelaria', 'setDescripcionFraccion', 'setCantidadUMT', 'setUMT', 'setCantidadUMC', 'setUMC', 'setPresentacion',
        'setNumeroRegistro', 'setFechaCaducidad', 'setCumplimiento', 'setRfc', 'setNombre', 'setApellidoPaterno', 'setApellidoMaterno', 'setDci',
        'setMarcaComercialODenominacionDistintiva', 'setDescripcionDeLaFraccion', 'setNumeroCas', 'setCantidadDeLotes', 'setKgOrPorLote', 'setPais',
        'setPaisDeProcedencia', 'setDetallarUso', 'setNumeroDePiezas', 'setDescripcionDelNumeroDePiezas', 'setNumeroDeRegistro', 'setClaveDeReferencia',
        'setCadenaDaLaDependencia', 'setBanco', 'setLaveDePago', 'setFechaDePago', 'setImporteDePago', 'setTipoDocumento', 'setTercerosRelacionadosDenominacionSocial',
        'setTercerosRelacionadosTerceroNombre', 'setTercerosNacionalidad', 'setTipoPersona', 'setTercerosRelacionadosRfc', 'setTercerosRelacionadosCurp',
        'setTercerosRelacionadosRazonSocial', 'setTercerosRelacionadosPais', 'setTercerosRelacionadosEstado', 'setTercerosRelacionadosCodigoPostal',
        'setTercerosRelacionadosCalle', 'setTercerosRelacionadosNumeroExterior', 'setTercerosRelacionadosNumeroInterior', 'setTercerosRelacionadosLada',
        'setTercerosRelacionadosTelefono', 'setTercerosRelacionadosCorreoElectronico', 'setManifiestos'
      ];
      service.actualizarEstadoFormulario(emptyState);
      setters.forEach((key) => {
        if (typeof storeMock[key] === 'function' && storeMock[key]._isMockFunction) {
          expect(storeMock[key]).toHaveBeenCalled();
        }
      });
    });

    it('should call all store setters with partial data', () => {
      const partialState = {
        ...emptyState,
        denominacionRazon: 'partial',
        rfc: 'partial',
      };
      service.actualizarEstadoFormulario(partialState);
      expect(storeMock.setDenominacionRazon).toHaveBeenCalledWith('partial');
      expect(storeMock.setRfc).toHaveBeenCalledWith('partial');
    });
  });
});
