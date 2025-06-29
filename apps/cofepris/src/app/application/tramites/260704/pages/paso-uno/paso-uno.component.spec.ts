import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, SolicitanteComponent } from '@ng-mf/data-access-user';
import { ConsultaService } from '../../service/consulta.service';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;
  let consultaServiceMock: any;
  let destroyed$: ReplaySubject<boolean>;

  beforeEach(async () => {
    destroyed$ = new ReplaySubject(1);

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    consultaServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: 'value' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent, HttpClientTestingModule],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: ConsultaService, useValue: consultaServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    // Set destroyed$ to the test instance for spying
    (component as any).destroyed$ = destroyed$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.esDatosRespuesta = false;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  // it('should call guardarDatosFormularios if consultaState.update is true in ngOnInit', () => {
  //   component.consultaState = { update: true } as any;
  //   const spy = jest.spyOn(component, 'guardarDatosFormularios');
  //   component.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should set esDatosRespuesta and call actualizarEstadoFormulario in guardarDatosFormularios', () => {
    consultaServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({ test: 'value' }));
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(consultaServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'value' });
  });

  it('should set indice in seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});