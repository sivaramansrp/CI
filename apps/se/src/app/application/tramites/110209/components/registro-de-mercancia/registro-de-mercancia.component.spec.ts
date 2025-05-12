import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RegistroDeMercanciaComponent } from './registro-de-mercancia.component';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { MercanciasService } from '../../services/mercancias/mercancias.service';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';

describe('RegistroDeMercanciaComponent', () => {
  let component: RegistroDeMercanciaComponent;
  let fixture: ComponentFixture<RegistroDeMercanciaComponent>;
  let mercanciasService: MercanciasService;
  let tramite110209Query: Tramite110209Query;
  let tramite110209Store: Tramite110209Store;
  let router: Router;

  beforeEach(async () => {
    const mercanciasServiceMock = {
      getTipoDeFactura: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Factura 1' },
        { id: '2', nombre: 'Factura 2' }
      ])),
      getUnidad: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Unidad 1' },
        { id: '2', nombre: 'Unidad 2' }
      ]))
    };

    const tramite110209QueryMock = {
      selectTramite110102$: of({
        mercanciasSeleccionadas: {
          nombreComercial: 'Mercancia 1',
          nombreIngles: 'Merchandise 1'
        },
        descripcion: 'Descripcion',
        marca: 'Marca',
        valorMercancia: '1000',
        unidadMedida: 'Unidad',
        numeroFactura: '12345',
        tipoFactura: 'Tipo'
      })
    };

    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent,RegistroDeMercanciaComponent],
      providers: [
        { provide: MercanciasService, useValue: mercanciasServiceMock },
        { provide: Tramite110209Query, useValue: tramite110209QueryMock },
        { provide: Tramite110209Store, useValue: {} },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    mercanciasService = TestBed.inject(MercanciasService);
    tramite110209Query = TestBed.inject(Tramite110209Query);
    tramite110209Store = TestBed.inject(Tramite110209Store);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.mercanciaFrom).toBeDefined();
    expect(component.mercanciaFrom.get('nombreComercial')?.value).toBe('');
    expect(component.mercanciaFrom.get('nombreIngles')?.value).toBe('');
    expect(component.mercanciaFrom.get('descripcion')?.value).toBe('');
    expect(component.mercanciaFrom.get('marca')?.value).toBe('');
    expect(component.mercanciaFrom.get('valorMercancia')?.value).toBe('');
    expect(component.mercanciaFrom.get('cantidad')?.value).toBe('');
    expect(component.mercanciaFrom.get('unidadMedida')?.value).toBe('');
    expect(component.mercanciaFrom.get('numeroFactura')?.value).toBe('');
    expect(component.mercanciaFrom.get('tipoFactura')?.value).toBe('');
    expect(component.mercanciaFrom.get('fechaFactura')?.value).toBe('');
  });

  it('should fetch and set tipo de factura options on init', () => {
    component.ngOnInit();
    expect(mercanciasService.getTipoDeFactura).toHaveBeenCalled();
    expect(component.tipoFacturaOptions.length).toBe(2);
    expect(component.tipoFacturaOptions).toEqual([
      { id: '1', nombre: 'Factura 1' },
      { id: '2', nombre: 'Factura 2' }
    ]);
  });

  it('should fetch and set unidad options on init', () => {
    component.ngOnInit();
    expect(mercanciasService.getUnidad).toHaveBeenCalled();
    expect(component.unidadOptions.length).toBe(2);
    expect(component.unidadOptions).toEqual([
      { id: '1', nombre: 'Unidad 1' },
      { id: '2', nombre: 'Unidad 2' }
    ]);
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.mercanciaFrom.get('nombreComercial')?.value).toBe('Mercancia 1');
    expect(component.mercanciaFrom.get('nombreIngles')?.value).toBe('Merchandise 1');
    expect(component.mercanciaFrom.get('descripcion')?.value).toBe('Descripcion');
    expect(component.mercanciaFrom.get('marca')?.value).toBe('Marca');
    expect(component.mercanciaFrom.get('valorMercancia')?.value).toBe('1000');
    expect(component.mercanciaFrom.get('unidadMedida')?.value).toBe('Unidad');
    expect(component.mercanciaFrom.get('numeroFactura')?.value).toBe('12345');
    expect(component.mercanciaFrom.get('tipoFactura')?.value).toBe('Tipo');
  });

  it('should set values in store when setValoresStore is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.setValoresStore(component.mercanciaFrom, 'descripcion', 'setDescripcion');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.mercanciaFrom, 'descripcion', 'setDescripcion');
  });

  it('should emit modificarEventMercancia and navigate back when regresar is called', () => {
    const modificarEventSpy = jest.spyOn(component.modificarEventMercancia, 'emit');
    component.regresar();
    expect(modificarEventSpy).toHaveBeenCalledWith(false);
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});