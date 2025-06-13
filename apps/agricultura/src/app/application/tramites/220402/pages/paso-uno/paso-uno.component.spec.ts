import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TransporteComponent } from '../../components/transporte/transporte.component';
import { PagoDeDerechoComponent } from '../../components/pago-de-derecho/pago-de-derecho.component';
import { AgregarDestinatarioComponent } from '../../components/agregar-destinatario/agregar-destinatario.component';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { provideHttpClient } from '@angular/common/http';


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockCapturaSolicitudeService: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockCapturaSolicitudeService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ update: true })),
      actualizarEstadoFormulario: jest.fn(),
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({ update: true }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent,
        SolicitudComponent,
        AgregarDestinatarioComponent,
        PagoDeDerechoComponent,
        TransporteComponent
      ],
      imports: [SolicitanteComponent],
      providers: [
        provideHttpClient(),
        { provide: CapturaSolicitudeService, useValue: mockCapturaSolicitudeService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize consultaDatos on ngOnInit', () => {
    expect(component.consultaDatos).toEqual({ update: true });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario when consultaDatos.update is true', () => {
    const guardarDatosFormularioSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should update the store with data from guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(mockCapturaSolicitudeService.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(mockCapturaSolicitudeService.actualizarEstadoFormulario).toHaveBeenCalledWith({ update: true });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should emit destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('should update the tab index when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});