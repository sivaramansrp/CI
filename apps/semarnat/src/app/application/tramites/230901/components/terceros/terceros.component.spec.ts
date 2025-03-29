import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { TercerosComponent } from './terceros.component';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';
import { DESTINARIO_TABLE_ENTRY } from '../../enum/terceros-constants';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;
  let tramite230901Store: Tramite230901Store;
  let tramite230901Query: Tramite230901Query;
  let autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService;

  beforeEach(async () => {
    // Mock dependencies
    const tramite230901StoreMock = {
      setEntidadFederativa: jest.fn(),
    };

    const tramite230901QueryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'TestEntidad',
      }),
    };

    const autorizacionesDeVidaSilvestreServiceMock = {
      inicializaTercerosDatosCatalogos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [TercerosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite230901Store, useValue: tramite230901StoreMock },
        { provide: Tramite230901Query, useValue: tramite230901QueryMock },
        { provide: AutorizacionesDeVidaSilvestreService, useValue: autorizacionesDeVidaSilvestreServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    tramite230901Store = TestBed.inject(Tramite230901Store);
    tramite230901Query = TestBed.inject(Tramite230901Query);
    autorizacionesDeVidaSilvestreService = TestBed.inject(AutorizacionesDeVidaSilvestreService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.get('entidadFederativa')?.value).toBe('TestEntidad');
  });

  it('should call inicializaTercerosDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreService.inicializaTercerosDatosCatalogos).toHaveBeenCalled();
  });

  it('should call setEntidadFederativa and update tablaDatos when onEntidadFederativaChange is triggered', () => {
    component.destinatarioForm.get('entidadFederativa')?.setValue('NewEntidad');
    component.onEntidadFederativaChange();
    expect(tramite230901Store.setEntidadFederativa).toHaveBeenCalledWith('NewEntidad');
    expect(component.tablaDatos).toContain(DESTINARIO_TABLE_ENTRY);
  });

  it('should not update tablaDatos if it already contains data', () => {
    component.tablaDatos.push(DESTINARIO_TABLE_ENTRY);
    component.destinatarioForm.get('entidadFederativa')?.setValue('AnotherEntidad');
    component.onEntidadFederativaChange();
    expect(component.tablaDatos.length).toBe(1); // No new entry should be added
  });

  it('should initialize the form with default values', () => {
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.get('entidadFederativa')?.value).toBe('TestEntidad');
  });

  it('should call ngOnDestroy and complete destroyNotifier$', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalledWith();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});