import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlaguicidasComponent } from './plaguicidas.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { Shared2605Service } from '../../../../shared/services/shared2605/shared2605.service';
import { Tramite260501Store } from '../../../../shared/estados/stores/260501/tramite260509.store';
import { Tramite260501Query } from '../../../../shared/estados/queries/260501/tramite260501.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

/*******************************
 * M O C K S 
 *******************************/
class MockStore {
  setContinuarTriggered = jest.fn();
  setIdSolicitud = jest.fn();
}

class MockQuery {
  selectSolicitud$ = of({
    continuarTriggered: false,
    formValidity: {},
    idSolicitud: 0
  });
}

@Component({
  selector: 'app-wizard',
  template: ''
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
  listaPasos: any[] = [];
  indice = new EventEmitter<number>();
  indiceActual = 1;
  ngOnChanges = jest.fn();
  estadoInicial: any = {};
  lista: any[] = [];
  maximo: number = 0;
  wizardService: any = {};
}

class MockSharedService {
  getAllState = jest.fn().mockReturnValue(of({ a: 1 }));
  buildPayload = jest.fn().mockReturnValue({ payload: true });
  guardarDatosPost = jest.fn().mockReturnValue(
    of({
      codigo: "00",
      mensaje: "Guardado correctamente",
      datos: { id_solicitud: 999 }
    })
  );
}

class MockConsultaQuery {
  private subject = new BehaviorSubject<any>({});
  selectConsultaioState$ = this.subject.asObservable();
}

@Component({ selector: 'app-paso-uno', template: '' })
class MockPasoUnoComponent {
  validarFormularios = jest.fn().mockReturnValue(true);
}

/*******************************
 *  T E S T S 
 *******************************/
describe('PlaguicidasComponent', () => {
  let component: PlaguicidasComponent;
  let fixture: ComponentFixture<PlaguicidasComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlaguicidasComponent,
        MockWizardComponent,
        MockPasoUnoComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Tramite260501Store, useClass: MockStore },
        { provide: Tramite260501Query, useClass: MockQuery },
        { provide: ConsultaioQuery, useClass: MockConsultaQuery },
        { provide: Shared2605Service, useClass: MockSharedService },
        ToastrService,
        provideToastr()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaguicidasComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Tramite260501Store) as any;

    component.wizardComponent = TestBed.createComponent(MockWizardComponent).componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should call wizardComponent.atras() on accion = "back"', () => {
    fixture.detectChanges();
    const wizardDebug = fixture.debugElement.query(By.directive(MockWizardComponent));
    component.wizardComponent = wizardDebug.componentInstance;
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'back', valor: 1 });
    expect(spy).toHaveBeenCalled();
    expect(component.indice).toBe(1);
  });

  it('should render wizard component', () => {
    const wizard = fixture.debugElement.query(By.directive(MockWizardComponent));
    expect(wizard).toBeTruthy();
  });

  it('should call validarFormularios on pasoUnoComponent when indice = 1', () => {
    component.pasoUnoComponent = new MockPasoUnoComponent() as any;

    component.indice = 1;

    const result = (component as any).validarFormulariosPasoActual();

    expect(component.pasoUnoComponent.validarFormularios).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should block navigation if step 1 is invalid', () => {
    component.pasoUnoComponent = {
      validarFormularios: jest.fn().mockReturnValue(false)
    } as any;
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 1 });
    expect(store.setContinuarTriggered).toHaveBeenCalledWith(true);
    expect(component.isPeligro).toBe(true);
    expect(component.indice).toBe(1);
  });

  it('should emit cargarArchivosEvento', () => {
    const spy = jest.spyOn(component.cargarArchivosEvento, 'emit');
    component.onClickCargaArchivos();
    expect(spy).toHaveBeenCalled();
  });

  it('should complete destroyNotifier on ngOnDestroy()', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should set solicitudState and isContinuarTriggered on ngOnInit', () => {
    const mockState = { continuarTriggered: true } as any;
    jest.spyOn(MockQuery, 'selectSolicitud$' as any, 'get').mockReturnValue(of(mockState));
    component.ngOnInit();
    expect(component.solicitudState).toEqual(mockState);
    expect(component.isContinuarTriggered).toBe(true);
  });

  it('should set isPeligro=true when step 1 is invalid', () => {
    component.indice = 1;
    component.pasoUnoComponent = { validarFormularios: () => false } as any;
    component.getValorIndice({ accion: 'cont', valor: 1 });
    expect(component.isPeligro).toBe(true);
  });



});
