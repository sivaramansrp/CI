import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;
  let datosDeLaSolicitudService: DatosDeLaSolicitudService;
  let tramite130119Query: Tramite130119Query;
  let tramite130119Store: Tramite130119Store;

  beforeEach(async () => {
    const datosDeLaSolicitudServiceMock = {
      getFraccionArancelaria: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Fracción 1' },
        { id: '2', nombre: 'Fracción 2' }
      ])),
      getPais: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'País 1' },
        { id: '2', nombre: 'País 2' }
      ]))
    };

    const tramite130119QueryMock = {
      selectTramite130119$: of({
        descripcion: '',
        fraccionArancelaria: '',
        umt: '',
        cantidad: '',
        valorFacturaUSD: '',
        paisOrigen: '',
        paisExportador: '',
        numeroFactura: '',
        fechaExpedicionFactura: '',
        observaciones: ''
      })
    };

    const tramite130119StoreMock = {
      establecerDatos: jest.fn() 
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, DatosDeLaMercanciaComponent, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: DatosDeLaSolicitudService, useValue: datosDeLaSolicitudServiceMock },
        { provide: Tramite130119Query, useValue: tramite130119QueryMock },
        { provide: Tramite130119Store, useValue: tramite130119StoreMock }
      ]
    }).compileComponents();

    datosDeLaSolicitudService = TestBed.inject(DatosDeLaSolicitudService);
    tramite130119Query = TestBed.inject(Tramite130119Query);
    tramite130119Store = TestBed.inject(Tramite130119Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores predeterminados', () => {
    expect(component.datosDeLaMercanciaForm).toBeDefined();
    expect(component.datosDeLaMercanciaForm.get('descripcion')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('fraccionArancelaria')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('umt')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('cantidad')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('valorFacturaUSD')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('paisOrigen')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('paisExportador')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('numeroFactura')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('fechaExpedicionFactura')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('observaciones')?.value).toBe('');
  });

  it('debería buscar y configurar las opciones de fracción arancelaria en init', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getFraccionArancelaria).toHaveBeenCalled();
    expect(component.opcionesFraccionArancelaria.length).toBe(2);
    expect(component.opcionesFraccionArancelaria).toEqual([
      { id: '1', nombre: 'Fracción 1' },
      { id: '2', nombre: 'Fracción 2' }
    ]);
  });

  it('Debería obtener y configurar las opciones de pais al iniciar.', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getPais).toHaveBeenCalled();
    expect(component.pasises.length).toBe(2);
    expect(component.pasises).toEqual([
      { id: '1', nombre: 'País 1' },
      { id: '2', nombre: 'País 2' }
    ]);
  });

  it('debería manejar el cambio fraccionario arancelario', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');

   
    component.datosDeLaMercanciaForm.patchValue({ fraccionArancelaria: 'Fracción 1' });
    component.onFraccionArancelariaChange();

    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.datosDeLaMercanciaForm, 'fraccionArancelaria');
    expect(component.datosDeLaMercanciaForm.get('umt')?.value).toBe('Pieza');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.datosDeLaMercanciaForm, 'umt');
  });

  it('Debe obtener y establecer valores de formulario desde la tienda al iniciar.', () => {
    component.ngOnInit();
    expect(component.datosDeLaMercanciaForm.get('descripcion')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('fraccionArancelaria')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('umt')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('cantidad')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('valorFacturaUSD')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('paisOrigen')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('paisExportador')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('numeroFactura')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('fechaExpedicionFactura')?.value).toBe('');
    expect(component.datosDeLaMercanciaForm.get('observaciones')?.value).toBe('');
  });

  it('should set values in store when setValoresStore is called', () => {
    component.datosDeLaMercanciaForm.patchValue({ descripcion: 'Descripción Nueva' });
    component.setValoresStore(component.datosDeLaMercanciaForm, 'descripcion');
    expect(tramite130119Store.establecerDatos).toHaveBeenCalledWith({ descripcion: 'Descripción Nueva' });
  });

  it('Debe establecer valores en la tienda cuando se llama a setValoresStore', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
