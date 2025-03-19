import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
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
        descripcion: 'Descripción',
        fraccionArancelaria: 'Fracción 1',
        umt: 'Pieza',
        cantidad: '100',
        valorFacturaUSD: '1000',
        paisOrigen: 'País 1',
        paisExportador: 'País 2',
        numeroFactura: '12345',
        fechaExpedicionFactura: '2025-02-25',
        observaciones: 'Observaciones'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule,DatosDeLaMercanciaComponent, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: DatosDeLaSolicitudService, useValue: datosDeLaSolicitudServiceMock },
        { provide: Tramite130119Query, useValue: tramite130119QueryMock },
        { provide: Tramite130119Store, useValue: {} }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
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

  it('should fetch and set fraccion arancelaria options on init', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getFraccionArancelaria).toHaveBeenCalled();
    expect(component.fraccionArancelariaOptions.length).toBe(2);
    expect(component.fraccionArancelariaOptions).toEqual([
      { id: '1', nombre: 'Fracción 1' },
      { id: '2', nombre: 'Fracción 2' }
    ]);
  });

  it('should fetch and set pais options on init', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getPais).toHaveBeenCalled();
    expect(component.pasises.length).toBe(2);
    expect(component.pasises).toEqual([
      { id: '1', nombre: 'País 1' },
      { id: '2', nombre: 'País 2' }
    ]);
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.datosDeLaMercanciaForm.get('descripcion')?.value).toBe('Descripción');
    expect(component.datosDeLaMercanciaForm.get('fraccionArancelaria')?.value).toBe('Fracción 1');
    expect(component.datosDeLaMercanciaForm.get('umt')?.value).toBe('Pieza');
    expect(component.datosDeLaMercanciaForm.get('cantidad')?.value).toBe('100');
    expect(component.datosDeLaMercanciaForm.get('valorFacturaUSD')?.value).toBe('1000');
    expect(component.datosDeLaMercanciaForm.get('paisOrigen')?.value).toBe('País 1');
    expect(component.datosDeLaMercanciaForm.get('paisExportador')?.value).toBe('País 2');
    expect(component.datosDeLaMercanciaForm.get('numeroFactura')?.value).toBe('12345');
    expect(component.datosDeLaMercanciaForm.get('fechaExpedicionFactura')?.value).toBe('2025-02-25');
    expect(component.datosDeLaMercanciaForm.get('observaciones')?.value).toBe('Observaciones');
  });

  it('should set values in store when setValoresStore is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.setValoresStore(component.datosDeLaMercanciaForm, 'descripcion', 'setDescripcion');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.datosDeLaMercanciaForm, 'descripcion', 'setDescripcion');
  });

  it('should handle fraccion arancelaria change', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.onFraccionArancelariaChange();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.datosDeLaMercanciaForm, 'fraccionArancelaria', 'setFraccionArancelaria');
    expect(component.datosDeLaMercanciaForm.get('umt')?.value).toBe('Pieza');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.datosDeLaMercanciaForm, 'umt', 'setUmt');
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});