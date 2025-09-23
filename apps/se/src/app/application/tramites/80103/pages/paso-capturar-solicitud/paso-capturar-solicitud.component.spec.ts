import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoCapturarSolicitudComponent } from './paso-capturar-solicitud.component';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('PasoCapturarSolicitudComponent', () => {
  let component: PasoCapturarSolicitudComponent;
  let fixture: ComponentFixture<PasoCapturarSolicitudComponent>;
  let mockFormaValida$: Subject<boolean>;
  let mockQuery: any;
  let mockSeccionStore: any;

  beforeEach(async () => {
    mockFormaValida$ = new Subject<boolean>();
    mockQuery = {
      FormaValida$: mockFormaValida$.asObservable(),
    };
    mockSeccionStore = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoCapturarSolicitudComponent],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: SeccionLibStore, useValue: mockSeccionStore },
      ],
      imports: [
        HttpClientModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignore WizardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCapturarSolicitudComponent);
    component = fixture.componentInstance;
    // Emit value before detectChanges to trigger subscription logic
    mockFormaValida$.next(true);
    fixture.detectChanges(); // Triggers subscription logic
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockFormaValida$.complete(); // complete observable
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update indice and call wizardComponent.siguiente when accion is "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when accion is not "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    component.getValorIndice({ accion: 'back', valor: 3 });

    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not call wizard methods when valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    component.getValorIndice({ accion: 'cont', valor: 6 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });
});
