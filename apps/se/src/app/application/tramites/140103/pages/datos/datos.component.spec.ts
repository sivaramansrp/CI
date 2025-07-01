import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { Solicitud140103Service } from '../../services/service140103.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let solicitud140103ServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    solicitud140103ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ campo: 'valor' })),
      actualizarEstadoFormulario: jest.fn(),
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: Solicitud140103Service, useValue: solicitud140103ServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer esDatosRespuesta en true si consultaState.update es false en ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe establecer esDatosRespuesta en true y llamar a actualizarEstadoFormulario en guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(solicitud140103ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ campo: 'valor' });
  });

  it('debe establecer el índice cuando se llama seleccionaTab', () => {
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
