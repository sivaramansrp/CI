import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos260402Component } from './datos-260402.component';
import { Solocitud260402Service } from '../../services/service260402.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Datos260402Component', () => {
  let component: Datos260402Component;
  let fixture: ComponentFixture<Datos260402Component>;
  let mockConsultaQuery: any;
  let mockSolocitud260402Service: any;

  beforeEach(async () => {
    mockConsultaQuery = {
      selectConsultaioState$: of({ update: false })
    };

    mockSolocitud260402Service = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      getPagoDerechos: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn(),
      actualizarPagoDerechosFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [Datos260402Component],
      providers: [
        { provide: 'ConsultaioQuery', useValue: mockConsultaQuery },
        { provide: Solocitud260402Service, useValue: mockSolocitud260402Service }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(Datos260402Component, {
        set: {
          providers: [
            { provide: 'ConsultaioQuery', useValue: mockConsultaQuery },
            { provide: Solocitud260402Service, useValue: mockSolocitud260402Service }
          ]
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Datos260402Component);
    component = fixture.componentInstance;
    // Patch the injected services
    (component as any).consultaQuery = mockConsultaQuery;
    (component as any).solocitud220401Service = mockSolocitud260402Service;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should set esDatosRespuesta to true if update is false', () => {
    component.esDatosRespuesta = false;
    component.consultaState = { update: false } as any;
    // Simulate ngOnInit subscription
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if update is true', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario').mockImplementation();
    mockConsultaQuery.selectConsultaioState$ = of({ update: true });
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
    guardarSpy.mockRestore();
  });

  it('should change indice when seleccionaTab is called', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('guardarDatosFormulario should call service methods and update esDatosRespuesta', () => {
    const registro = { foo: 'bar' };
    const permiso = { bar: 'baz' };
    mockSolocitud260402Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(registro));
    mockSolocitud260402Service.getPagoDerechos.mockReturnValue(of(permiso));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(mockSolocitud260402Service.actualizarEstadoFormulario).toHaveBeenCalledWith(registro);
    expect(mockSolocitud260402Service.actualizarPagoDerechosFormulario).toHaveBeenCalledWith(permiso);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('guardarDatosFormulario should not call actualizarEstadoFormulario if registro is falsy', () => {
    mockSolocitud260402Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    mockSolocitud260402Service.getPagoDerechos.mockReturnValue(of({}));
    component.guardarDatosFormulario();
    expect(mockSolocitud260402Service.actualizarEstadoFormulario).not.toHaveBeenCalled();
    expect(mockSolocitud260402Service.actualizarPagoDerechosFormulario).toHaveBeenCalled();
  });

  it('guardarDatosFormulario should not call actualizarPagoDerechosFormulario if permiso is falsy', () => {
    mockSolocitud260402Service.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({}));
    mockSolocitud260402Service.getPagoDerechos.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(mockSolocitud260402Service.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(mockSolocitud260402Service.actualizarPagoDerechosFormulario).not.toHaveBeenCalled();
  });
});