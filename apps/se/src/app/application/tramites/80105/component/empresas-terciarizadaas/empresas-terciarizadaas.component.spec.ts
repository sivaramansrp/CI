import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadaasComponent } from './empresas-terciarizadaas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-terciarización.service';

describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;
  let serviceMock: jest.Mocked<NuevoProgramaIndustrialService>;
  
  beforeEach(async () => {
    serviceMock = {
      obtenerListaEstado: jest.fn().mockReturnValue(
        of({
          code: 200,
          message: 'Success',
          data: [
            { id: 1, descripcion: 'Estado 1' },
            { id: 2, descripcion: 'Estado 2' },
          ],
        })
      ),
    } as any;

    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadaasComponent, HttpClientTestingModule],
      providers: [{ provide: NuevoProgramaIndustrialService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

   it('Debería definir la configuración correcta de la tabla.', () => {
    expect(component.parentTablaConfig.length).toBe(11);
    expect(component.parentTablaConfig[0].encabezado).toBe('Calle');
    expect(component.parentTablaConfig[10].encabezado).toBe('Razón social');
  });

  it('Debería actualizar estadosCatalogo desde obtenerListaEstado()', () => {
    const mockResponse = {
      code: 200,
      message: 'Success',
      data: [
        { id: 1, descripcion: 'Estado 1' },
        { id: 2, descripcion: 'Estado 2' },
      ],
    };
    serviceMock.obtenerListaEstado.mockReturnValue(of(mockResponse));
    component.obtenerListaEstado();
    expect(serviceMock.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(mockResponse.data);
  });

  it('no debería actualizar estadosCatalogo cuando el servicio devuelve null o undefined', () => {
    serviceMock.obtenerListaEstado.mockReturnValue(of(null as any));
    component.estadosCatalogo = [{ id: 99, descripcion: 'Preexisting' }];
    component.obtenerListaEstado();
    expect(serviceMock.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual([{ id: 99, descripcion: 'Preexisting' }]);
  });

  it('debe limpiar destroyNotifier$ en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('Debería manejar un array de datos vacío desde obtenerListaEstado()', () => {
  const mockResponse = {
    code: 200,
    message: 'Success',
    data: [],
  };
  serviceMock.obtenerListaEstado.mockReturnValue(of(mockResponse));
  component.obtenerListaEstado();
  expect(serviceMock.obtenerListaEstado).toHaveBeenCalled();
  expect(component.estadosCatalogo).toEqual([]);
});

it('Debería extraer los valores correctamente utilizando las claves de parentTablaConfig', () => {
  const mockItem = {
    calle: 'Av. Reforma',
    numeroExterior: '123',
    numeroInterior: '456',
    codigoPostal: '11200',
    colonia: 'Centro',
    municipioDelegacion: 'Cuauhtémoc',
    entidadFederativa: 'CDMX',
    pais: 'México',
    registroFederalContribuyentes: 'ABC123',
    domicilioFiscalSolicitante: 'Sí',
    razonSocial: 'Empresa SA de CV',
  };

  const results = component.parentTablaConfig.map(cfg => cfg.clave(mockItem));
  expect(results).toEqual([
    'Av. Reforma',
    '123',
    '456',
    '11200',
    'Centro',
    'Cuauhtémoc',
    'CDMX',
    'México',
    'ABC123',
    'Sí',
    'Empresa SA de CV',
  ]);
});
});
