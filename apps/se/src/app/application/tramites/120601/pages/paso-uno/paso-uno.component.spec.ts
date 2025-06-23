import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let datosEmpresaServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    datosEmpresaServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ campo: 'valor' })),
      actualizarEstadoFormulario: jest.fn(),
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: DatosEmpresaService, useValue: datosEmpresaServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set esDatosRespuesta to true and call actualizarEstadoFormulario in guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(datosEmpresaServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ campo: 'valor' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});