import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasDeLaComponent } from './partidas-de-la.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { UppercaseDirective } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Subject, of } from 'rxjs';

describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;

  const mockFormRegistroService = {
    registrarFormulario: jest.fn(),
    getFraccionArancelariaTIGIE: jest.fn(() => of([{ id: 1, descripcion: 'Fracción 1' }])),
  };

  const mockStore = {
    setCantidad: jest.fn(),
    setFraccionArancelariaTIGIE: jest.fn(),
    setFraccionArancelariaTIGIE_TIGIE: jest.fn(),
    setDescripcion: jest.fn(),
    setValorPartidaUSD: jest.fn(),
  };

  const solicitudMockState = {
    cantidadPartidas: 2,
    fraccionArancelariaTIGIE: '01010101',
    fraccionArancelariaTIGIE_TIGIE: '01010101',
    descripcionPartidas: 'desc',
    valorPartidaUSD: 100
  };

  const consultaioSubject = new Subject<any>();
  const tramiteQuerySubject = new Subject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PartidasDeLaComponent,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
        TituloComponent,
        AlertComponent,
        UppercaseDirective,
        CommonModule
      ],
      providers: [
        FormBuilder,
        { provide: Tramite130102Store, useValue: mockStore },
        {
          provide: Tramite130102Query,
          useValue: {
            selectSolicitud$: tramiteQuerySubject.asObservable()
          }
        },
        {
          provide: ConsultaioQuery,
          useValue: {
            selectConsultaioState$: consultaioSubject.asObservable()
          }
        },
        { provide: FormularioRegistroService, useValue: mockFormRegistroService }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form and register it', () => {
    consultaioSubject.next({ readonly: false });
    tramiteQuerySubject.next(solicitudMockState);

    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(mockFormRegistroService.registrarFormulario).toHaveBeenCalledWith('form', component.form);
    expect(component.form.enabled).toBe(true);
  });

  it('should disable form if readonly is true', () => {
    consultaioSubject.next({ readonly: true });
    tramiteQuerySubject.next(solicitudMockState);

    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
   
  });

  it('should call setValoresStore and store value', () => {
    consultaioSubject.next({ readonly: false });
    tramiteQuerySubject.next(solicitudMockState);

    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    component.form.get('descripcion')?.setValue('desc');
    component.setValoresStore(component.form, 'descripcion', 'setDescripcion');
    expect(mockStore.setDescripcion).toHaveBeenCalledWith('desc');
  });

  it('should validate no leading spaces', () => {
    const controlWithSpace = { value: '  Leading' } as any;
    const controlValid = { value: 'Valid' } as any;

    expect(PartidasDeLaComponent['noLeadingSpacesValidator'](controlWithSpace)).toEqual({ leadingSpaces: true });
    expect(PartidasDeLaComponent['noLeadingSpacesValidator'](controlValid)).toBeNull();
  });

  it('should calculate totals correctly', () => {
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    component.tableBodyData = [
      { tbodyData: ['2', '', '', '', '', '100'] },
      { tbodyData: ['3', '', '', '', '', '200'] }
    ];
    component.formularioTotalCount();
    component.calculateTotals();
    expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(5);
    expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(300);
  });

  it('should unsubscribe on destroy', () => {
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should return true for esInvalido if control is invalid and touched', () => {
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    component.formularioTotalCount();
    component.form = component['fb'].group({
      test: ['', [Validators.required]]
    });
    const control = component.form.get('test');
    control?.markAsTouched();
    expect(component.esInvalido('test')).toBe(true);
  });

  it('should return false for esInvalido if control is valid', () => {
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    component.formularioTotalCount();
    component.form = component['fb'].group({
      test: ['ok', [Validators.required]]
    });
    expect(component.esInvalido('test')).toBe(false);
  });
});