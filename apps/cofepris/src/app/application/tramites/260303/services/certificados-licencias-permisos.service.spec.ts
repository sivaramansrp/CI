import { CertificadosLicenciasPermisosService } from './certificados-licencias-permisos.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('CertificadosLicenciasPermisosService', () => {
  let service: CertificadosLicenciasPermisosService;
  let httpMock: jest.Mocked<HttpClient>;
  let storeMock: any;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as any;

    // Mock all store methods used in actualizarEstadoFormulario
    storeMock = {};
    [
      'setDenominacionRazon', 'setCodigoPostal', 'setEstado', 'SetMunicipio', 'setLocalidad', 'setColonia',
      'SetCalleYNumero', 'SetCorreoElecronico', 'setLada', 'setTelefono', 'setClaveScianModal',
      'setAvisoDeFuncionamiento', 'setClave', 'setDescripcion', 'setAvisoCheckbox', 'setLicenciaSanitaria',
      'setRegimen', 'setRegimenDestinara', 'setAduanasEntradas', 'setNumeroPermiso', 'setLosDatosNo',
      'setLosDatosYes', 'setNombreORazon', 'setClasificacion', 'setEspecificarClasificacionProducto',
      'setDenominacionEspecifica', 'setDenominacionDistintiva', 'setDenominacionComun', 'setTipoDeProducto',
      'setEstadoFisico', 'setFraccionArancelaria', 'setDescripcionFraccion', 'setCantidadUMT', 'setUMT',
      'setCantidadUMC', 'setUMC', 'setPresentacion', 'setNumeroRegistro', 'setFechaCaducidad', 'setCumplimiento',
      'setRfc', 'setNombre', 'setApellidoPaterno', 'setApellidoMaterno', 'setDci',
      'setMarcaComercialODenominacionDistintiva', 'setDescripcionDeLaFraccion', 'setNumeroCas',
      'setCantidadDeLotes', 'setKgOrPorLote', 'setPais', 'setPaisDeProcedencia', 'setDetallarUso',
      'setNumeroDePiezas', 'setDescripcionDelNumeroDePiezas', 'setNumeroDeRegistro', 'SetClaveDeReferencia',
      'SetCadenaDaLaDependencia', 'SetBanco', 'SetLaveDePago', 'SetFechaDePago', 'SetImporteDePago',
      'SetTipoDocumento', 'SetTercerosRelacionadosDenominacionSocial', 'SetTercerosRelacionadosTerceroNombre',
      'SetTercerosRelacionadosNacional', 'SetTercerosRelacionadosExtranjero', 'SetTercerosRelacionadosFisica',
      'SetTercerosRelacionadosMoral', 'SetTercerosRelacionadosNoContribuyente', 'SetTercerosRelacionadosRfc',
      'SetTercerosRelacionadosCurp', 'SetTercerosRelacionadosRazonSocial', 'SetTercerosRelacionadosPais',
      'SetTercerosRelacionadosEstado', 'SetTercerosRelacionadosCodigoPostal', 'SetTercerosRelacionadosCalle',
      'SetTercerosRelacionadosNumeroExterior', 'SetTercerosRelacionadosNumeroInterior', 'SetTercerosRelacionadosLada',
      'SetTercerosRelacionadosTelefono', 'SetTercerosRelacionadosCorreoElectronico'
    ].forEach(method => {
      storeMock[method] = jest.fn();
    });

    service = new CertificadosLicenciasPermisosService(httpMock, storeMock);
  });

  it('debe crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debe actualizar el estado del formulario en el store', () => {
    const datos: any = {};
    service.actualizarEstadoFormulario(datos);
    // Verifica que todos los métodos del store hayan sido llamados
    Object.keys(storeMock).forEach(method => {
      expect(storeMock[method]).toHaveBeenCalled();
    });
  });

  describe('Métodos de obtención de catálogos', () => {
    const endpoints = [
      { method: 'getEstadoDatos', url: 'assets/json/260303/estado-catalog.json', type: 'EstadoCatalogResponse' },
      { method: 'getScianDatos', url: 'assets/json/260303/scian-tabla.json', type: 'ScianDatos[]' },
      { method: 'getClaveDatos', url: 'assets/json/260303/clave-catalog.json', type: 'EstadoCatalogResponse' },
      { method: 'getRegimenDatos', url: 'assets/json/260303/regimen-catalog.json', type: 'EstadoCatalogResponse' },
      { method: 'getMercanciasDatos', url: 'assets/json/260303/mercancias-tabla.json', type: 'MercanciasDatos[]' },
      { method: 'getTipoDeProductoDatos', url: 'assets/json/260303/tipo-de-producto-catalog.json', type: 'EstadoCatalogResponse' },
      { method: 'getPaisDeProcedenciaDatos', url: 'assets/json/260303/pais-de-procedencia-catalog.json', type: 'EstadoCatalogResponse' },
      { method: 'getFabricanteDatos', url: 'assets/json/260303/fabricante-tabla.json', type: 'Fabricante[]' },
      { method: 'getFacturadorDatos', url: 'assets/json/260303/facturador-tabla.json', type: 'Fabricante[]' },
      { method: 'getProveedorDatos', url: 'assets/json/260303/proveedor-tabla.json', type: 'Fabricante[]' },
      { method: 'getCertificadoDatos', url: 'assets/json/260303/certificado-analitico-tabla.json', type: 'Fabricante[]' },
      { method: 'getOtrosDatos', url: 'assets/json/260303/otros-tabla.json', type: 'Otros[]' },
      { method: 'getBancoDatos', url: 'assets/json/260303/banco-catalog.json', type: 'JSONResponse' },
      { method: 'getTipoDeDocumentoDatos', url: 'assets/json/260303/tipo-de-documento.json', type: 'JSONResponse' },
      { method: 'getFormularioData', url: 'assets/json/260303/inicializar-formulario.json', type: 'Solicitud260303State' }
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
          }
        });
      });
    });
  });
});