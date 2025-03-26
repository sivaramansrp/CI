import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let certificadosLicenciasSvcMock: jest.Mocked<CertificadosLicenciasPermisosService>;
  let modalServiceMock: jest.Mocked<BsModalService>;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getFabricanteDatos: jest.fn(),
      getFacturadorDatos: jest.fn(),
      getProveedorDatos: jest.fn(),
      getCertificadoDatos: jest.fn(),
      getOtrosDatos: jest.fn(),
    } as unknown as jest.Mocked<CertificadosLicenciasPermisosService>;

    modalServiceMock = {
      show: jest.fn(),
    } as unknown as jest.Mocked<BsModalService>;

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFabricanteTablaDatos and populate fabricanteTablaDatos', () => {
    const mockData:any = [{ id: 1, name: 'Fabricante 1' }];
    certificadosLicenciasSvcMock.getFabricanteDatos.mockReturnValue(of(mockData));

    component.getFabricanteTablaDatos();

    expect(certificadosLicenciasSvcMock.getFabricanteDatos).toHaveBeenCalled();
    expect(component.fabricanteTablaDatos).toEqual(mockData);
  });

  it('should call getFacturadorTablaDatos and populate facturadorTablaDatos', () => {
    const mockData:any = [{ id: 2, name: 'Facturador 1' }];
    certificadosLicenciasSvcMock.getFacturadorDatos.mockReturnValue(of(mockData));

    component.getFacturadorTablaDatos();

    expect(certificadosLicenciasSvcMock.getFacturadorDatos).toHaveBeenCalled();
    expect(component.facturadorTablaDatos).toEqual(mockData);
  });

  it('should call getProveedorTablaDatos and populate proveedorTablaDatos', () => {
    const mockData:any = [{ id: 3, name: 'Proveedor 1' }];
    certificadosLicenciasSvcMock.getProveedorDatos.mockReturnValue(of(mockData));

    component.getProveedorTablaDatos();

    expect(certificadosLicenciasSvcMock.getProveedorDatos).toHaveBeenCalled();
    expect(component.proveedorTablaDatos).toEqual(mockData);
  });

  it('should call getCertificadoAnaliticoTablaDatos and populate certificadoAnaliticoTablaDatos', () => {
    const mockData:any = [{ id: 4, name: 'Certificado 1' }];
    certificadosLicenciasSvcMock.getCertificadoDatos.mockReturnValue(of(mockData));

    component.getCertificadoAnaliticoTablaDatos();

    expect(certificadosLicenciasSvcMock.getCertificadoDatos).toHaveBeenCalled();
    expect(component.certificadoAnaliticoTablaDatos).toEqual(mockData);
  });

  it('should call getOtrosTablaDatos and populate otrosTablaDatos', () => {
    const mockData:any = [{ id: 5, name: 'Otro 1' }];
    certificadosLicenciasSvcMock.getOtrosDatos.mockReturnValue(of(mockData));

    component.getOtrosTablaDatos();

    expect(certificadosLicenciasSvcMock.getOtrosDatos).toHaveBeenCalled();
    expect(component.otrosTablaDatos).toEqual(mockData);
  });

});
