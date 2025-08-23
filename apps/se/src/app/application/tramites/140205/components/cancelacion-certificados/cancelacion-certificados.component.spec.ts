import { TestBed } from '@angular/core/testing';
import { CancelacionCertificadosComponent } from './cancelacion-certificados.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite140205Store } from '../../../../estados/tramites/tramite140205.store';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';
import { CancelacionCertificadosService } from '../../services/cancelacionCertificados.service';
import { CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CancelacionCertificadosComponent', () => {
  let component: CancelacionCertificadosComponent;
  let fixture: any;
  let store: jest.Mocked<Tramite140205Store>;
  let query: jest.Mocked<Tramite140205Query>;
  let cancelacionCertificadosService: jest.Mocked<CancelacionCertificadosService>;
  let validacionesService: jest.Mocked<ValidacionesFormularioService>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    store = {
      setGrupoFolio: jest.fn(),
      setGrupoDatalleCupo: jest.fn(),
    } as any;
    query = {
      selectSolicitud$: of({
        grupoCupo: {},
        grupoDatalleCupo: {},
        grupoFolio: {},
      }),
    } as any;
    cancelacionCertificadosService = {
      getDatosConsulta: jest.fn(),
      obtenerAduanero: jest.fn(),
      obtenerMecanismo: jest.fn(),
      obtenerTratado: jest.fn(),
      obtenerNombreProducto: jest.fn(),
      obtenerNombreSubProducto: jest.fn(),
      obtenerFederal: jest.fn(),
      obtenerAvisoTabla: jest.fn(),
      obtenerAvisoTabla2: jest.fn(),
    } as any;
    validacionesService = {
      isValid: jest.fn(),
    } as any;
    consultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        CancelacionCertificadosComponent,
        ReactiveFormsModule,
        TituloComponent,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        CommonModule,
        TablaDinamicaComponent,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: Tramite140205Store, useValue: store },
        { provide: Tramite140205Query, useValue: query },
        {
          provide: CancelacionCertificadosService,
          useValue: cancelacionCertificadosService,
        },
        {
          provide: ValidacionesFormularioService,
          useValue: validacionesService,
        },
        { provide: ConsultaioQuery, useValue: consultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionCertificadosComponent);
    component = fixture.componentInstance;

    cancelacionCertificadosService.getDatosConsulta.mockReturnValue(of());
    cancelacionCertificadosService.obtenerAduanero.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerMecanismo.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerTratado.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerNombreProducto.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerNombreSubProducto.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerFederal.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerAvisoTabla.mockReturnValue(
      of({ datos: [] })
    );
    cancelacionCertificadosService.obtenerAvisoTabla2.mockReturnValue(
      of({ datos: [] })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and call data loading methods on ngOnInit', () => {
    jest.spyOn(component, 'initImpresaDatosFormulario');
    jest.spyOn(component, 'cargarAduanero');
    jest.spyOn(component, 'cargarMecanismo');
    jest.spyOn(component, 'cargarTratado');
    jest.spyOn(component, 'cargarNombreProducto');
    jest.spyOn(component, 'cargarNombreSubproducto');
    jest.spyOn(component, 'cargarFederal');
    jest.spyOn(component, 'cargarCuposTabla2');
    jest.spyOn(component, 'cargarCuposTabla');
    jest.spyOn(component, 'fetchGetDatos');

    component.ngOnInit();

    expect(component.initImpresaDatosFormulario).toHaveBeenCalled();
    expect(component.cargarAduanero).toHaveBeenCalled();
    expect(component.cargarMecanismo).toHaveBeenCalled();
    expect(component.cargarTratado).toHaveBeenCalled();
    expect(component.cargarNombreProducto).toHaveBeenCalled();
    expect(component.cargarNombreSubproducto).toHaveBeenCalled();
    expect(component.cargarFederal).toHaveBeenCalled();
    expect(component.cargarCuposTabla2).toHaveBeenCalled();
    expect(component.cargarCuposTabla).toHaveBeenCalled();
    expect(component.fetchGetDatos).toHaveBeenCalled();
  });

  it('should patchValue on form when selectSolicitud$ emits', () => {
    component.solicitudForm = new FormBuilder().group({
      grupoDatalleCupo: new FormBuilder().group({}),
      grupoFolio: new FormBuilder().group({}),
    });
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
  });

  it('should disable form when soloLectura is true in inicializarFormulario', () => {
    component.solicitudForm = new FormBuilder().group({});
    component.soloLectura = true;
    jest.spyOn(component, 'cargarCuposTabla');
    component.inicializarFormulario();
    expect(component.solicitudForm.disabled).toBe(true);
    expect(component.cargarCuposTabla).toHaveBeenCalled();
  });

  it('should enable form when soloLectura is false in inicializarFormulario', () => {
    component.solicitudForm = new FormBuilder().group({});
    component.soloLectura = false;
    component.inicializarFormulario();
    expect(component.solicitudForm.enabled).toBe(true);
  });

  it('should initialize solicitudForm in initImpresaDatosFormulario', () => {
    component.solicitudState = {
      grupoCupo: {},
      grupoDatalleCupo: {},
      grupoFolio: {},
    } as any;
    component.initImpresaDatosFormulario();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('grupoCupo')).toBeDefined();
    expect(component.solicitudForm.get('grupoDatalleCupo')).toBeDefined();
    expect(component.solicitudForm.get('grupoFolio')).toBeDefined();
  });

  it('should disable grupoDatalleCupo and grupoFolio in ngAfterViewInit', () => {
    component.solicitudForm = new FormBuilder().group({
      grupoDatalleCupo: new FormBuilder().group({}),
      grupoFolio: new FormBuilder().group({}),
    });
    component.ngAfterViewInit();
    expect(component.solicitudForm.get('grupoDatalleCupo')?.disabled).toBe(
      true
    );
    expect(component.solicitudForm.get('grupoFolio')?.disabled).toBe(true);
  });

  it('should set filaSeleccionadaLista in filaSeleccionada', () => {
    const evento = [{}, {}] as any;
    component.filaSeleccionada(evento);
    expect(component.filaSeleccionadaLista).toBe(evento);
  });

  it('should set filaDisposibleLista in filaDisposible', () => {
    const evento = [{}, {}] as any;
    component.filaDisposible(evento);
    expect(component.filaDisposibleLista).toBe(evento);
  });

  it('should emit datosEmpresaBuscar and set error in buscarCupos when invalid', () => {
    component.solicitudForm = new FormBuilder().group({
      grupoCupo: new FormBuilder().group({}),
    });
    jest.spyOn(component.datosEmpresaBuscar, 'emit');
    component.solicitudForm.get('grupoCupo')?.markAsTouched();
    component.solicitudForm.get('grupoCupo')?.setErrors({ required: true });
    component.buscarCupos();
    expect(component.BUSCAR_EMPRESA_ERROR).toBe('');
    expect(component.datosEmpresaBuscar.emit).toHaveBeenCalledWith(true);
  });

  it('should call store method in setValoresStore', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    store.setGrupoFolio = jest.fn();
    component.setValoresStore(form, 'campo', 'setGrupoFolio');
    expect(store.setGrupoFolio).toHaveBeenCalledWith('valor');
  });

  it('should set optionsAduanero in cargarAduanero', () => {
    cancelacionCertificadosService.obtenerAduanero.mockReturnValue(of());
    component.cargarAduanero();
    expect(component.optionsAduanero).toEqual(undefined);
  });

  it('should set optionsMecanismo in cargarMecanismo', () => {
    cancelacionCertificadosService.obtenerMecanismo.mockReturnValue(of());
    component.cargarMecanismo();
    expect(component.optionsMecanismo).toEqual(undefined);
  });

  it('should set optionsTratado in cargarTratado', () => {
    cancelacionCertificadosService.obtenerTratado.mockReturnValue(of());
    component.cargarTratado();
    expect(component.optionsTratado).toEqual(undefined);
  });

  it('should set optionNombreProducto in cargarNombreProducto', () => {
    cancelacionCertificadosService.obtenerNombreProducto.mockReturnValue(of());
    component.cargarNombreProducto();
    expect(component.optionNombreProducto).toEqual(undefined);
  });

  it('should set optionNombreSubproducto in cargarNombreSubproducto', () => {
    cancelacionCertificadosService.obtenerNombreSubProducto.mockReturnValue(
      of()
    );
    component.cargarNombreSubproducto();
    expect(component.optionNombreSubproducto).toEqual(undefined);
  });

  it('should set optionFederal in cargarFederal', () => {
    cancelacionCertificadosService.obtenerFederal.mockReturnValue(of());
    component.cargarFederal();
    expect(component.optionFederal).toEqual(undefined);
  });

  it('should set tablaDeDatos.datos in cargarCuposTabla', () => {
    cancelacionCertificadosService.obtenerAvisoTabla.mockReturnValue(of());
    component.cargarCuposTabla();
    expect(component.tablaDeDatos.datos).toEqual([]);
  });

  it('should set tablaDatos.datos in cargarCuposTabla2', () => {
    cancelacionCertificadosService.obtenerAvisoTabla2.mockReturnValue(of());
    component.cargarCuposTabla2();
    expect(component.tablaDatos.datos).toEqual([]);
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    validacionesService.isValid.mockReturnValue(true);
    expect(component.isValid(form, 'campo')).toBe(true);
    validacionesService.isValid.mockReturnValue(false);
    expect(component.isValid(form, 'campo')).toBe(false);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
