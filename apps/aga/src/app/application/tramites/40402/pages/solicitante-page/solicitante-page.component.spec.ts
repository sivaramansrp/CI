import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { SolicitantePageComponent } from './solicitante-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { Tramite40402Query } from '../../estados/tramite40402.query';
import { Tramite40402Store } from '../../estados/tramite40402.store';

@Injectable()
class MockTramite40402Store {
  establecerSeccion = jest.fn();
  establecerFormaValida = jest.fn();
}


describe('SolicitantePageComponent', () => {
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let component: SolicitantePageComponent;
  let Tramite40402QueryMock: jest.Mocked<Tramite40402Query>;
  let tramite40402StoreMock: MockTramite40402Store;

  beforeEach(async () => {
    Tramite40402QueryMock = {
      selectSeccionState$: observableOf({
        pasos: [],
        currentStep: 1,
      }),
    } as unknown as jest.Mocked<Tramite40402Query>;
    tramite40402StoreMock = new MockTramite40402Store();
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SolicitantePageComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite40402Query, useValue: Tramite40402QueryMock },
        { provide: Tramite40402Store, useValue: tramite40402StoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el método `ngOnInit` se inicialice correctamente.
   */
  it('should initialize properly on ngOnInit()', () => {
    jest.spyOn(component as any, 'asignarSecciones');

    component.ngOnInit();

    expect((component as any).asignarSecciones).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `getValorIndice` se llame y active la navegación del asistente.
   */
  it('should call getValorIndice() and trigger wizard navigation', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    component.getValorIndice({ valor: 1, accion: 'prev' });
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  /**
   * Verifica que el método `asignarSecciones` asigne las secciones correctamente.
   */
  it('should assign sections correctly using asignarSecciones()', () => {
    (component as any).asignarSecciones();
    expect(tramite40402StoreMock.establecerSeccion).toHaveBeenCalled();
    expect(tramite40402StoreMock.establecerFormaValida).toHaveBeenCalled();
  });
});
