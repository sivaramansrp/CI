import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { Service270301Service } from '../../services/service270301.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let consultaQueryMock: any;
  let service270301ServiceMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };
    service270301ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ data: 'mock' })),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: Service270301Service, useValue: service270301ServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    // Mock ViewChild
    component.solicitante = {
      obtenerTipoPersona: jest.fn()
    } as unknown as SolicitanteComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if update is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call obtenerTipoPersona with MORAL_NACIONAL on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('guardarDatosFormulario should update esDatosRespuesta and call actualizarEstadoFormulario', () => {
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(service270301ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ data: 'mock' });
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
