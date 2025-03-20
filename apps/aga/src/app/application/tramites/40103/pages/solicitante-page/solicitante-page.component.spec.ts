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
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { WizardComponent } from '@ng-mf/data-access-user';

@Injectable()
class MockChofer40103Store {
  establecerSeccion = jest.fn();
  establecerFormaValida = jest.fn();
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

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
  let Chofer40103QueryMock: jest.Mocked<Chofer40103Query>;
  let chofer40103StoreMock: MockChofer40103Store;

  beforeEach(async () => {
    Chofer40103QueryMock = {
      selectSeccionState$: observableOf({
        pasos: [],
        currentStep: 1,
      }),
    } as unknown as jest.Mocked<Chofer40103Query>;
    chofer40103StoreMock = new MockChofer40103Store();
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SolicitantePageComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Chofer40103Query, useValue: Chofer40103QueryMock },
        { provide: Chofer40103Store, useValue: chofer40103StoreMock },
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
   * Verifica que el método `seleccionaTab` se llame con un valor dado.
   */
  it('should call seleccionaTab() with a given value', () => {
    const tabMock = 1;
    jest.spyOn(component, 'seleccionaTab');

    component.seleccionaTab(tabMock);

    expect(component.seleccionaTab).toHaveBeenCalledWith(tabMock);
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
    expect(chofer40103StoreMock.establecerSeccion).toHaveBeenCalled();
    expect(chofer40103StoreMock.establecerFormaValida).toHaveBeenCalled();
  });
});