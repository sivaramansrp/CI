import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { SolicitantePageComponent } from './solicitante-page.component';
import { SeccionQuery } from '@ng-mf/data-access-user';
import { SeccionStore } from '../../../../estados/seccion.store';
import { WizardComponent } from '@ng-mf/data-access-user';

// Mock Store Service
@Injectable()
class MockSeccionStore {
  establecerSeccion = jest.fn();
  establecerFormaValida = jest.fn();
}

// Custom Directive Mock
@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

// Pipe Mocks
@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('SolicitantePageComponent', () => {
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let component: SolicitantePageComponent;
  let seccionQueryMock: jest.Mocked<SeccionQuery>;
  let seccionStoreMock: MockSeccionStore;

  beforeEach(async () => {
    // Correcting Mock for SeccionQuery
    seccionQueryMock = {
      selectSeccionState$: observableOf({
        pasos: [],
        currentStep: 1
      }) // ✅ Now it's an Observable
    } as unknown as jest.Mocked<SeccionQuery>;

    // Creating Mock for SeccionStore
    seccionStoreMock = new MockSeccionStore();

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SolicitantePageComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: SeccionQuery, useValue: seccionQueryMock },
        { provide: SeccionStore, useValue: seccionStoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properly on ngOnInit()', () => {
    jest.spyOn(component as any, 'asignarSecciones'); // FIXED TypeScript error

    component.ngOnInit();

    expect((component as any).asignarSecciones).toHaveBeenCalled();
  });

  it('should call seleccionaTab() with a given value', () => {
    const tabMock = 1;
    jest.spyOn(component, 'seleccionaTab');

    component.seleccionaTab(tabMock);

    expect(component.seleccionaTab).toHaveBeenCalledWith(tabMock);
  });

  it('should call getValorIndice() and trigger wizard navigation', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any; // FIXED TypeScript error

    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    component.getValorIndice({ valor: 1, accion: 'prev' });
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should assign sections correctly using asignarSecciones()', () => {
    (component as any).asignarSecciones(); // FIXED TypeScript error

    expect(seccionStoreMock.establecerSeccion).toHaveBeenCalled();
    expect(seccionStoreMock.establecerFormaValida).toHaveBeenCalled();
  });
});
