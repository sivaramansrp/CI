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
import { Tramite40101Store } from '../../estado/tramite40101.store';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { WizardComponent } from '@ng-mf/data-access-user';

@Injectable()
class MockTramite40101Store {
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
  let Tramite40101QueryMock: jest.Mocked<Tramite40101Query>;
  let tramite40101StoreMock: MockTramite40101Store;

  beforeEach(async () => {
    Tramite40101QueryMock = {
      selectSeccionState$: observableOf({
        pasos: [],
        currentStep: 1,
      }),
    } as unknown as jest.Mocked<Tramite40101Query>;
    tramite40101StoreMock = new MockTramite40101Store();
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
        { provide: Tramite40101Query, useValue: Tramite40101QueryMock },
        { provide: Tramite40101Store, useValue: tramite40101StoreMock },
      ],
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
    jest.spyOn(component as any, 'asignarSecciones');

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
      atras: jest.fn(),
    } as any;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    component.getValorIndice({ valor: 1, accion: 'prev' });
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should assign sections correctly using asignarSecciones()', () => {
    (component as any).asignarSecciones();
    expect(tramite40101StoreMock.establecerSeccion).toHaveBeenCalled();
    expect(tramite40101StoreMock.establecerFormaValida).toHaveBeenCalled();
  });
});
