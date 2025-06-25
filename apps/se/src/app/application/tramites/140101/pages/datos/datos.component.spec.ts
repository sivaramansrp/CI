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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer consultaState, esFormularioSoloLectura y esDatosRespuesta en ngOnInit cuando update es false', () => {
    component.ngOnInit();
    expect(component.consultaState).toBeDefined();
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe llamar a programaService.getProgramaDatos y setDatosFormulario en guardarDatosFormulario', () => {
    const resp = { test: 'valor' };
    programaServiceMock.getProgramaDatos.mockReturnValue(of(resp));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(programaServiceMock.getProgramaDatos).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    expect(programaServiceMock.setDatosFormulario).toHaveBeenCalledWith(resp);
  });

  it('debe establecer el índice cuando se llama a seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('debe completar destroyNotifier$ al llamar ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
