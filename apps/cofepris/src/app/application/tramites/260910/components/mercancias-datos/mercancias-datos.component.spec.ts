import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarMercanciasComponent } from './mercancias-datos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('ModificarMercanciasComponent - additional tests', () => {
  let component: ModificarMercanciasComponent;
  let fixture: ComponentFixture<ModificarMercanciasComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    solicitudDatosService = {
      obtenerClavesDeLotesListo: jest.fn(),
      obtenerMercanciaListo: jest.fn().mockReturnValue(of([{ descripcionFraccionArancelaria: 'desc', umt: 'UMT' }])),
      obtenerCrosslisto: jest.fn().mockReturnValue(of({
        paisOrigenCrossList: { a: 1 },
        paisProcedencisCrossList: { b: 2 },
        usoEspecificoCrossList: { c: 3 }
      })),
      obtenerMercanciaCatalogos: jest.fn().mockReturnValue(of({
        productosCatalogo: { a: 1 },
        especificarCatalogo: { b: 2 },
        tipoProductoCatalogo: { c: 3 },
        farmaceuticaCatalogo: { d: 4 },
        fisicoCatalogo: { e: 5 },
        umcCatalogo: { f: 6 }
      })),
    } as any;

    solicitud260910Store = {
      setDescripcionFraccionArancelaria: jest.fn(),
      setUmt: jest.fn(),
      setCadenaDeDependencia: jest.fn(),
      setEspecificarProducto: jest.fn(),
      setTipoProducto: jest.fn(),
      setFarmaceutica: jest.fn(),
      setFisico: jest.fn(),
      setFechaCaducidad: jest.fn(),
      setNombreProductoEspecifico: jest.fn(),
      setDistintiva: jest.fn(),
      setCientifico: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setCantidadUMT: jest.fn(),
      setCantidadUMC: jest.fn(),
      setUmc: jest.fn(),
      setMercanciasDatos: jest.fn(),
      _value: jest.fn().mockReturnValue({ mercanciasDatos: [{ id: 1 }, { id: 2 }] }),
    } as any;

    solicitud260910Query = {
      seleccionarSolicitud$: of({
        clasificaionProductos: 'cp',
        especificarProducto: 'ep',
        nombreProductoEspecifico: 'npe',
        distintiva: 'd',
        cientifico: 'c',
        tipoProducto: 'tp',
        farmaceutica: 'f',
        fisico: 'fi',
        fraccionArancelaria: 'fa',
        descripcionFraccionArancelaria: 'dfa',
        cantidadUMT: 'umt',
        umt: 'umtval',
        cantidadUMC: 'umc',
        umc: 'umcval',
        presentacionFarmaceutica: 'pf',
        registroSanitario: 'rs',
        fechaCaducidad: 'fc'
      })
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ModificarMercanciasComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder, SolicitudDatosService, Solicitud260910Store, Solicitud260910Query, provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ModificarMercanciasComponent);
    component = fixture.componentInstance;
    component.solicitudDatosService = solicitudDatosService;
    component.solicitud260910Store = solicitud260910Store;
    component.solicitud260910Query = solicitud260910Query;
    component.datosMercanciaForm = new FormBuilder().group({
      clasificaionProductos: ['cp'],
      especificarProducto: ['ep'],
      nombreProductoEspecifico: ['npe'],
      distintiva: ['d'],
      cientifico: ['c'],
      tipoProducto: ['tp'],
      farmaceutica: ['f'],
      fisico: ['fi'],
      fraccionArancelaria: ['fa'],
      descripcionFraccionArancelaria: ['dfa'],
      cantidadUMT: ['umt'],
      umt: ['umtval'],
      cantidadUMC: ['umc'],
      umc: ['umcval'],
      presentacionFarmaceutica: ['pf'],
      registroSanitario: ['rs'],
      fechaCaducidad: ['fc']
    });
  });

  it('should initialize default property values', () => {
    const c = new ModificarMercanciasComponent(
      new FormBuilder(),
      solicitudDatosService,
      solicitud260910Store,
      solicitud260910Query
    );
    expect(c.productosCatalogo).toBeDefined();
    expect(c.paisOrigen).toBe(false);
    expect(c.paisProcedencisColapsable).toBe(false);
    expect(c.usoEspecifico).toBe(false);
    expect(c.tipos).toEqual([]);
    expect(c.selectedClavesDeLotes).toEqual([]);
  });

  it('should create form and patch values on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosMercanciaForm).toBeDefined();
    expect(component.datosMercanciaForm.get('clasificaionProductos')).toBeDefined();
    expect(component.datosMercanciaForm.get('especificarProducto')).toBeDefined();    
    expect(component.datosMercanciaForm.get('clasificaionProductos')?.value).toBe('cp');
  });

  it('should patch form on ngOnChanges if mercancia exists', () => {
    component.datosMercanciaForm.patchValue = jest.fn();
    component.mercancia = { nombreProductoEspecifico: 'nuevo' } as any;
    component.ngOnChanges();
    expect(component.datosMercanciaForm.patchValue).toHaveBeenCalledWith(component.mercancia);
  });

  it('obtenerMercanciaListo should update store with description and UMT', () => {
    component.obtenerMercanciaListo();
    expect(solicitudDatosService.obtenerMercanciaListo).toHaveBeenCalled();
    expect(solicitud260910Store.setDescripcionFraccionArancelaria).toHaveBeenCalledWith('desc');
    expect(solicitud260910Store.setUmt).toHaveBeenCalledWith('UMT');
  });

  it('obtenerCrosslisto should update crosslist properties', () => {
    component.obtenerCrosslisto();
    expect(solicitudDatosService.obtenerCrosslisto).toHaveBeenCalled();
    expect(component.paisOrigenCrossList).toEqual({ a: 1 });
    expect(component.paisProcedencisCrossList).toEqual({ b: 2 });
    expect(component.usoEspecificoCrossList).toEqual({ c: 3 });
  });

  it('obtenerMercanciaCatalogos should update catalog properties', () => {
    component.obtenerMercanciaCatalogos();
    expect(solicitudDatosService.obtenerMercanciaCatalogos).toHaveBeenCalled();
    expect(component.productosCatalogo).toEqual({ a: 1 });
    expect(component.especificarCatalogo).toEqual({ b: 2 });
    expect(component.tipoProductoCatalogo).toEqual({ c: 3 });
    expect(component.farmaceuticaCatalogo).toEqual({ d: 4 });
    expect(component.fisicoCatalogo).toEqual({ e: 5 });
    expect(component.umcCatalogo).toEqual({ f: 6 });
  });

  it('paisOrigenColapsable should toggle paisOrigen', () => {
    component.paisOrigen = false;
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(true);
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(false);
  });

  it('paisProcedencis_colapsable should toggle paisProcedencisColapsable', () => {
    component.paisProcedencisColapsable = false;
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(true);
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(false);
  });

  it('usoEspecificoColapsable should toggle usoEspecifico', () => {
    component.usoEspecifico = false;
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(true);
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(false);
  });

  it('seleccionaProductos should call setCadenaDeDependencia', () => {
    component.seleccionaProductos({ descripcion: 'desc' } as any);
    expect(solicitud260910Store.setCadenaDeDependencia).toHaveBeenCalledWith('desc');
  });

  it('seleccionaEspecificar should call setEspecificarProducto', () => {
    component.seleccionaEspecificar({ id: 123 } as any);
    expect(solicitud260910Store.setEspecificarProducto).toHaveBeenCalledWith(123);
  });

  it('seleccionaTipoProducto should call setTipoProducto', () => {
    component.seleccionaTipoProducto({ id: 456 } as any);
    expect(solicitud260910Store.setTipoProducto).toHaveBeenCalledWith(456);
  });

  it('seleccionaFarmaceutica should call setFarmaceutica', () => {
    component.seleccionaFarmaceutica({ id: 789 } as any);
    expect(solicitud260910Store.setFarmaceutica).toHaveBeenCalledWith(789);
  });

  it('seleccionaFisico should call setFisico', () => {
    component.seleccionaFisico({ id: 321 } as any);
    expect(solicitud260910Store.setFisico).toHaveBeenCalledWith(321);
  });

  it('seleccionarFechaCaducidad should call setFechaCaducidad', () => {
    component.seleccionarFechaCaducidad('2024-01-01');
    expect(solicitud260910Store.setFechaCaducidad).toHaveBeenCalledWith('2024-01-01');
  });

  it('setNombreProductoEspecifico should call setNombreProductoEspecifico', () => {
    const event = { target: { value: 'abc' } } as any;
    component.setNombreProductoEspecifico(event);
    expect(solicitud260910Store.setNombreProductoEspecifico).toHaveBeenCalledWith('abc');
  });

  it('setDistintiva should call setDistintiva', () => {
    const event = { target: { value: 'def' } } as any;
    component.setDistintiva(event);
    expect(solicitud260910Store.setDistintiva).toHaveBeenCalledWith('def');
  });

  it('setCientifico should call setCientifico', () => {
    const event = { target: { value: 'ghi' } } as any;
    component.setCientifico(event);
    expect(solicitud260910Store.setCientifico).toHaveBeenCalledWith('ghi');
  });

  it('setFraccionArancelaria should call setFraccionArancelaria', () => {
    const event = { target: { value: 'jkl' } } as any;
    component.setFraccionArancelaria(event);
    expect(solicitud260910Store.setFraccionArancelaria).toHaveBeenCalledWith('jkl');
  });

  it('setCantidadUMT should call setCantidadUMT', () => {
    const event = { target: { value: 'mno' } } as any;
    component.setCantidadUMT(event);
    expect(solicitud260910Store.setCantidadUMT).toHaveBeenCalledWith('mno');
  });

  it('setCantidadUMC should call setCantidadUMC', () => {
    const event = { target: { value: 'pqr' } } as any;
    component.setCantidadUMC(event);
    expect(solicitud260910Store.setCantidadUMC).toHaveBeenCalledWith('pqr');
  });

  it('setUMC should call setUmc', () => {
    component.setUMC({ id: 555 } as any);
    expect(solicitud260910Store.setUmc).toHaveBeenCalledWith(555);
  });

  it('setValoresStore should call correct store method', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    solicitud260910Store.setDistintiva = jest.fn();
    component.setValoresStore(form, 'campo', 'setDistintiva');
    expect(solicitud260910Store.setDistintiva).toHaveBeenCalledWith('valor');
  });

  it('modificarMercanias should update existing mercancia', () => {
    component.mercancia = { id: 1 } as any;
    solicitud260910Store._value = jest.fn().mockReturnValue({ mercanciasDatos: [{ id: 1, foo: 'bar' }, { id: 2 }] });
    component.datosMercanciaForm.get('clasificaionProductos')?.setValue('cp');
    component.datosMercanciaForm.get('especificarProducto')?.setValue('ep');
    component.datosMercanciaForm.get('nombreProductoEspecifico')?.setValue('npe');
    component.datosMercanciaForm.get('distintiva')?.setValue('d');
    component.datosMercanciaForm.get('cientifico')?.setValue('c');
    component.datosMercanciaForm.get('tipoProducto')?.setValue('tp');
    component.datosMercanciaForm.get('farmaceutica')?.setValue('f');
    component.datosMercanciaForm.get('fisico')?.setValue('fi');
    component.datosMercanciaForm.get('fraccionArancelaria')?.setValue('fa');
    component.datosMercanciaForm.get('descripcionFraccionArancelaria')?.setValue('dfa');
    component.datosMercanciaForm.get('cantidadUMT')?.setValue('umt');
    component.datosMercanciaForm.get('umt')?.setValue('umtval');
    component.datosMercanciaForm.get('cantidadUMC')?.setValue('umc');
    component.datosMercanciaForm.get('umc')?.setValue('umcval');
    component.datosMercanciaForm.get('presentacionFarmaceutica')?.setValue('pf');
    component.datosMercanciaForm.get('registroSanitario')?.setValue('rs');
    component.datosMercanciaForm.get('fechaCaducidad')?.setValue('fc');
    jest.spyOn(solicitud260910Store, 'setMercanciasDatos');
    component.modificarMercanias();
    expect(solicitud260910Store.setMercanciasDatos).not.toHaveBeenCalled();
  });

  it('modificarMercanias should add new mercancia if mercancia is null', () => {
    component.mercancia = null;
    solicitud260910Store._value = jest.fn().mockReturnValue({ mercanciasDatos: [] });
    component.datosMercanciaForm.get('clasificaionProductos')!.setValue('cp');
    component.datosMercanciaForm.get('especificarProducto')!.setValue('ep');
    component.datosMercanciaForm.get('nombreProductoEspecifico')!.setValue('npe');
    component.datosMercanciaForm.get('distintiva')!.setValue('d');
    component.datosMercanciaForm.get('cientifico')!.setValue('c');
    component.datosMercanciaForm.get('tipoProducto')!.setValue('tp');
    component.datosMercanciaForm.get('farmaceutica')!.setValue('f');
    component.datosMercanciaForm.get('fisico')!.setValue('fi');
    component.datosMercanciaForm.get('fraccionArancelaria')!.setValue('fa');
    component.datosMercanciaForm.get('descripcionFraccionArancelaria')!.setValue('dfa');
    component.datosMercanciaForm.get('cantidadUMT')!.setValue('umt');
    component.datosMercanciaForm.get('umt')!.setValue('umtval');
    component.datosMercanciaForm.get('cantidadUMC')!.setValue('umc');
    component.datosMercanciaForm.get('umc')!.setValue('umcval');
    component.datosMercanciaForm.get('presentacionFarmaceutica')!.setValue('pf');
    component.datosMercanciaForm.get('registroSanitario')!.setValue('rs');
    component.datosMercanciaForm.get('fechaCaducidad')!.setValue('fc');
    jest.spyOn(solicitud260910Store, 'setMercanciasDatos');
    component.modificarMercanias();
    expect(solicitud260910Store.setMercanciasDatos).toHaveBeenCalled();
  });

  it('ngOnDestroy should call next and complete on destroyNotifier$', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
