import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { ImportacionVehiculosUsadosDonacionService } from '../../services/importacion-vehiculos-usados-donacion.service';


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockImportacionVehiculosUsadosDonacionService: any;
  let mockConsultaQuery: any;

  beforeEach(async () => {
    mockImportacionVehiculosUsadosDonacionService = {
      getDatosDeLaSolicitud: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    };

    mockConsultaQuery = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: ImportacionVehiculosUsadosDonacionService, useValue: mockImportacionVehiculosUsadosDonacionService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe marcar esDatosRespuesta en true si update es false', () => {
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('guardarDatosFormulario debe actualizar esDatosRespuesta y llamar actualizarEstadoFormulario', () => {
    const resp = { campo: 'valor' };
    mockImportacionVehiculosUsadosDonacionService.getDatosDeLaSolicitud.mockReturnValue(of(resp));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockImportacionVehiculosUsadosDonacionService.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
  });

  it('seleccionaTab debe actualizar el índice', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('ngOnDestroy debe completar destroyNotifier$', () => {
    const destroyNotifier$ = new Subject<void>();
    (component as any).destroyNotifier$ = destroyNotifier$;
    const completeSpy = jest.spyOn(destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});