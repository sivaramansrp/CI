import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisosCancelarComponent } from './permisos-cancelar.component';
import { PermisosCancelarService } from '../../service/permisos-cancelar.service';
import { Tramite140112Store } from '../../estados/tramite-140112.store';
import { Tramite140112Query } from '../../estados/tramite-140112.query';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PermisosCancelarComponent', () => {
  let component: PermisosCancelarComponent;
  let fixture: ComponentFixture<PermisosCancelarComponent>;
  let permisosCancelarServiceSpy: any;
  let storeSpy: any;
  let querySpy: any;
  let fb: FormBuilder;
  let consultaQuerySpy: any;

  beforeEach(async () => {
    const PERMISOSCANCELARSERVICEMOCK = {
      getPermisosCancelar: jest.fn(),
      isValid: jest.fn(),
    };
    const STOREMOCK = {
      setDesistimiento: jest.fn(),
    };

    const QUERYMOCK = {
      selectDesistimiento$: new Subject().asObservable(),
    };

    consultaQuerySpy = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        PermisosCancelarComponent,
        TablaDinamicaComponent,
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: PermisosCancelarService, useValue: PERMISOSCANCELARSERVICEMOCK },
        { provide: Tramite140112Store, useValue: STOREMOCK },
        { provide: Tramite140112Query, useValue: QUERYMOCK },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: 'ConsultaioQuery', useValue: consultaQuerySpy },
      ],
    }).compileComponents();

    permisosCancelarServiceSpy = TestBed.inject(PermisosCancelarService);
    storeSpy = TestBed.inject(Tramite140112Store);
    querySpy = TestBed.inject(Tramite140112Query);
    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(PermisosCancelarComponent);
    component = fixture.componentInstance;
    component.solicitud = fb.group({
      descripcionClobGenerica1: ['test', []],
      declaracionBoolean: [true, []],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(component.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
    expect(component.configuracionTabla.length).toBe(7);
    expect(component.permisosCancelar).toEqual([]);
    expect(component.manifestoDeVeracidad).toBe(
      'De conformidad con el artículo 57, fracción 11, y 58 de la ley Federal de Procedimiento Administrativo* Manifiesto decir verdad'
    );
    expect(component.motivoDesistimientotextBox).toBe('');
    expect(component.obtenerFilasSeleccionadas).toEqual([]);
    expect(component.confirmarVeracidad).toBe('');
    expect(component.declaracionEstaMarcado).toBe(false);
  });

  it('should select or deselect all rows', () => {
    const EVENT = { target: { checked: true } } as any;
    component.seleccionarDeseleccionarTodos(EVENT);
    expect(component.declaracionEstaMarcado).toBe(true);
    expect(component.confirmarVeracidad).toBe(component.manifestoDeVeracidad);
    const EVENT2 = { target: { checked: false } } as any;
    component.seleccionarDeseleccionarTodos(EVENT2);
    expect(component.declaracionEstaMarcado).toBe(false);
    expect(component.confirmarVeracidad).toBe('');
  });

  it('should set values in store', () => {
    component.setValoresStore();
    expect(storeSpy.setDesistimiento).toHaveBeenCalledWith('test');
  });

  it('should validate form field', () => {
    permisosCancelarServiceSpy.isValid.mockReturnValue(true);
    expect(component.isValid('descripcionClobGenerica1')).toBe(true);
    expect(permisosCancelarServiceSpy.isValid).toHaveBeenCalledWith(component.solicitud, 'descripcionClobGenerica1');
  });

  it('should unsubscribe on destroy', () => {
    const DESTROY$SPY = jest.spyOn((component as any).destroy$, 'next');
    const COMPLETE$SPY = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(DESTROY$SPY).toHaveBeenCalled();
    expect(COMPLETE$SPY).toHaveBeenCalled();
  });

  it('should patch form value on init from selectDesistimiento$', () => {
    const DESISTIMIENTOSUBJECT = new Subject<string>();
    (querySpy.selectDesistimiento$ as any) = DESISTIMIENTOSUBJECT.asObservable();
    component.ngOnInit();
    DESISTIMIENTOSUBJECT.next('test data');
    expect(component.solicitud.get('descripcionClobGenerica1')?.value).toBe('test data');
  });

  it('should patch form value on loadPermisoCancelar', () => {
    const response = [
      {
        id: 1,
        folioTramite: 17013001008,
        tipoSolicitud: 'Inicial',
        regimen: 'Definitivos',
        clasificacionRegimen: 'De importación',
        condicionDeLaMercancia: 'Nuevo',
        fraccionArancelaria: '27090099 Los demás',
        descripcionClobGenerica1: 'Texto de ejemplo para el motivo',
      },
    ];
    permisosCancelarServiceSpy.getPermisosCancelar.mockReturnValue(of(response));
    component.loadPermisoCancelar();
    expect(component.permisosCancelar).toEqual(response);
    expect(component.solicitud.get('descripcionClobGenerica1')?.value).toBe('Texto de ejemplo para el motivo');
  });

  it('should disable form if esSoloLectura is true on ngOnInit', () => {
    component.esSoloLectura = true;
    const disableSpy = jest.spyOn(component.solicitud, 'disable');
    component.ngOnInit();
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should enable form if esSoloLectura is false on ngOnInit', () => {
    component.esSoloLectura = false;
    const enableSpy = jest.spyOn(component.solicitud, 'enable');
    component.ngOnInit();
    expect(enableSpy).toHaveBeenCalled();
  });

  it('should disable form on ngOnChanges if esSoloLectura is true', () => {
    component.esSoloLectura = true;
    const disableSpy = jest.spyOn(component.solicitud, 'disable');
    component.ngOnChanges({ estadoConsulta: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false } });
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should enable form on ngOnChanges if esSoloLectura is false', () => {
    component.esSoloLectura = false;
    const enableSpy = jest.spyOn(component.solicitud, 'enable');
    component.ngOnChanges({ estadoConsulta: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } });
    expect(enableSpy).toHaveBeenCalled();
  });
});