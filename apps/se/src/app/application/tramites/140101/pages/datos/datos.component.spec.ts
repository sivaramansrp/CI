import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { ProgramaACancelarService } from '../../services/programACancelar.service';
import { ConsultaioQuery, ConsultaioStore } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let consultaQueryMock: any;
  let consultaStoreMock: any;
  let programaServiceMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({
        readonly: true,
        update: false
      })
    };
    consultaStoreMock = {};
    programaServiceMock = {
      getProgramaDatos: jest.fn().mockReturnValue(of({})),
      setDatosFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: ConsultaioStore, useValue: consultaStoreMock },
        { provide: ProgramaACancelarService, useValue: programaServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set consultaState, esFormularioSoloLectura, and esDatosRespuesta on ngOnInit when update is false', () => {
    component.ngOnInit();
    expect(component.consultaState).toBeDefined();
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario when update is true', () => {
    consultaQueryMock.selectConsultaioState$ = of({
      readonly: false,
      update: true
    });
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call programaService.getProgramaDatos and setDatosFormulario in guardarDatosFormulario', () => {
    const resp = { test: 'value' };
    programaServiceMock.getProgramaDatos.mockReturnValue(of(resp));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(programaServiceMock.getProgramaDatos).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    expect(programaServiceMock.setDatosFormulario).toHaveBeenCalledWith(resp);
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
