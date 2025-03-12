import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RegistroDeMercanciaComponent } from './registro-de-mercancia.component';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { MercanciasService } from '../../services/mercancias/mercancias.service';
import { Router } from '@angular/router';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';

describe('RegistroDeMercanciaComponent', () => {
  let component: RegistroDeMercanciaComponent;
  let fixture: ComponentFixture<RegistroDeMercanciaComponent>;
  let service: MercanciasService;
  let router: Router;
  let query: Tramite110209Query;

  beforeEach(async () => {
    const serviceMock = {
      getTipoDeFactura: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Factura 1' },
        { id: '2', nombre: 'Factura 2' }
      ])),
      getUnidad: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Unidad 1' },
        { id: '2', nombre: 'Unidad 2' }
      ])),
      getMercancias: jest.fn().mockReturnValue(of([
        { nombreComercial: 'Mercancia 1', nombreIngles: 'Merchandise 1' }
      ]))
    };

    const queryMock = {
      selectTramite110102$: of({
        mercanciasSeleccionadas: {
          nombreComercial: 'Mercancia 1',
          nombreIngles: 'Merchandise 1'
        }
      })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent,RegistroDeMercanciaComponent],
      providers: [
        { provide: MercanciasService, useValue: serviceMock },
        { provide: Tramite110209Query, useValue: queryMock },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();

    service = TestBed.inject(MercanciasService);
    query = TestBed.inject(Tramite110209Query);
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
    expect(service.getTipoDeFactura).toHaveBeenCalled();
    expect(component.tipoFacturaOptions.length).toBe(2);
    expect(component.tipoFacturaOptions).toEqual([
      { id: '1', nombre: 'Factura 1' },
      { id: '2', nombre: 'Factura 2' }
    ]);
  });

  it('should fetch and set unidad options on init', () => {
    component.ngOnInit();
    expect(service.getUnidad).toHaveBeenCalled();
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
    expect(component.mercanciaFrom.get('cantidad')?.value).toBe(21343);
    expect(component.mercanciaFrom.get('fechaFactura')?.value).toBe('2025-02-25');
  });

  it('should navigate to the specified route', () => {
    component.onNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['/se/certificado-sgp/solicitud']);
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});