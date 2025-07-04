import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { of} from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Fabricante, Otros } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let certificadosSvcMock: jest.Mocked<CertificadosLicenciasPermisosService>;
  let modalServiceMock: jest.Mocked<BsModalService>;

  const FABRICANTE_MOCK: Fabricante[] = [{ nombre: 'Fabricante Test' } as Fabricante];
  const OTROS_MOCK: Otros[] = [{
    tercero: 'T1',
    nombre: 'Nombre Test',
    rfc: 'RFC123456',
    curp: 'CURP123456',
    telefono: '5551234567',
    correoElectronico: 'test@example.com',
    calle: 'Calle Falsa',
    numeroExterior: '123',
    numeroInterior: '4B',
    pais: 'México',
    colonia: 'Centro',
    municipio: 'Municipio Test',
    localidad: 'Localidad Test',
    entidadFederativa: 'CDMX',
    estado: 'Activo',
    cp: '01234',
  }];


  beforeEach(async () => {
    certificadosSvcMock = {
      getFabricanteDatos: jest.fn().mockReturnValue(of(FABRICANTE_MOCK)),
      getFacturadorDatos: jest.fn().mockReturnValue(of(FABRICANTE_MOCK)),
      getProveedorDatos: jest.fn().mockReturnValue(of(FABRICANTE_MOCK)),
      getCertificadoDatos: jest.fn().mockReturnValue(of(FABRICANTE_MOCK)),
      getOtrosDatos: jest.fn().mockReturnValue(of(OTROS_MOCK)),
    } as unknown as jest.Mocked<CertificadosLicenciasPermisosService>;

    modalServiceMock = {
      show: jest.fn(),
    } as unknown as jest.Mocked<BsModalService>;

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosSvcMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    (component as any).consultaState = { readonly: false };
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los datos de todas las tablas al inicializarse', () => {
    expect(certificadosSvcMock.getFabricanteDatos).toHaveBeenCalled();
    expect(certificadosSvcMock.getFacturadorDatos).toHaveBeenCalled();
    expect(certificadosSvcMock.getProveedorDatos).toHaveBeenCalled();
    expect(certificadosSvcMock.getCertificadoDatos).toHaveBeenCalled();
    expect(certificadosSvcMock.getOtrosDatos).toHaveBeenCalled();

    expect(component.fabricanteTablaDatos).toEqual(FABRICANTE_MOCK);
    expect(component.facturadorTablaDatos).toEqual(FABRICANTE_MOCK);
    expect(component.proveedorTablaDatos).toEqual(FABRICANTE_MOCK);
    expect(component.certificadoAnaliticoTablaDatos).toEqual(FABRICANTE_MOCK);
    expect(component.otrosTablaDatos).toEqual(OTROS_MOCK);
  });

 it('debe limpiar las suscripciones al destruirse', () => {
  // Asegura que consultaState existe para evitar errores en ngOnDestroy
  (component as any).consultaState = { readonly: false };

  const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
  const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

  component.ngOnDestroy();

  expect(nextSpy).toHaveBeenCalled();
  expect(completeSpy).toHaveBeenCalled();
});
});
