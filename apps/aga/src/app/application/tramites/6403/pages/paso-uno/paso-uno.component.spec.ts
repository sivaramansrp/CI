import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { Tramite6403Query } from '../../estados/tramite6403.query';
import { Tramite6403Store } from '../../estados/tramite6403.store';
import { of, Subject } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let tramiteQueryMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    tramiteQueryMock = {
      selectSolicitud$: of({
        pestanaActiva: 1,
      }),
    };

    tramiteStoreMock = {
      setPestanaActiva: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, SolicitanteComponent, SolicitudComponent],
      providers: [
        provideHttpClient(),
        { provide: Tramite6403Query, useValue: tramiteQueryMock },
        { provide: Tramite6403Store, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the active tab index on ngOnInit', () => {
    component.ngOnInit();
    expect(component.indice).toBe(1);
  });

  it('should call setPestanaActiva when seleccionaTab is called', () => {
    const tabIndex = 2;
    component.seleccionaTab(tabIndex);
    expect(component.indice).toBe(tabIndex);
    expect(tramiteStoreMock.setPestanaActiva).toHaveBeenCalledWith(tabIndex);
  });

  it('should subscribe to tramiteQuery and update tramiteState', () => {
    component.ngOnInit();
    expect(component.tramiteState).toEqual({ pestanaActiva: 1 });
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});