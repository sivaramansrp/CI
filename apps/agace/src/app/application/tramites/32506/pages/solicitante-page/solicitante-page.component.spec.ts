import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { Tramite32506Store } from '../../estados/tramite32506.store';
import { Tramite32506Query } from '../../estados/tramite32506.query';
import { WizardComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { AccionBoton } from '../../models/aviso-destruccion.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('../../estados/tramite32506.store');
jest.mock('../../estados/tramite32506.query');
jest.mock('@ng-mf/data-access-user');

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let storeMock: jest.Mocked<Tramite32506Store>;
  let queryMock: jest.Mocked<Tramite32506Query>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    storeMock = {
      setPasoActivo: jest.fn()
    } as any;

    queryMock = {
      selectSolicitud$: of({ some: 'state' })
    } as any;

    await TestBed.configureTestingModule({
      declarations: [SolicitantePageComponent],
      imports:[WizardComponent,HttpClientTestingModule],
      providers: [
        { provide: Tramite32506Store, useValue: storeMock },
        { provide: Tramite32506Query, useValue: queryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;

    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
    component.wizardComponent = wizardComponentMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.datosPasos.nroPasos).toEqual(component.pasos.length);
    expect(component.datosPasos.indice).toEqual(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should subscribe to tramiteQuery.selectSolicitud$ on ngOnInit and set tramiteState', () => {
    component.ngOnInit();
    expect(component.tramiteState).toEqual({ some: 'state' });
  });

  it('should call wizardComponent.siguiente and store.setPasoActivo on getValorIndice with accion "cont"', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
    expect(storeMock.setPasoActivo).toHaveBeenCalledWith(2);
  });

  it('should call wizardComponent.atras and store.setPasoActivo on getValorIndice with accion "atras"', () => {
    const accion: AccionBoton = { accion: 'atras', valor: 3 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(3);
    expect(wizardComponentMock.atras).toHaveBeenCalled();
    expect(storeMock.setPasoActivo).toHaveBeenCalledWith(3);
  });

  it('should not call wizardComponent or store if valor is out of range', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 0 };
    component.getValorIndice(accion);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
    expect(storeMock.setPasoActivo).not.toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});