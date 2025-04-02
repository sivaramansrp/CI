import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct path when irAAcciones is called', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    const accionesPath = 'test-path';

    component.irAAcciones(accionesPath);

    expect(navigateSpy).toHaveBeenCalledWith([accionesPath], {
      relativeTo: component['activatedRoute'],
    });
  });

  it('should have correct default values', () => {
    expect(component.infoAlert).toBe('alert-info');
    expect(component.MENSAJE_TABLA_OBLIGATORIA).toBeDefined();
    expect(component.tipoSeleccionTabla).toBeDefined();
    expect(component.configuracionTablaFabricante).toBeDefined();
    expect(component.configuracionTablaDestinatarioFinal).toBeDefined();
    expect(component.configuracionTablaProveedor).toBeDefined();
    expect(component.configuracionTablaFacturador).toBeDefined();
  });

  it('should initialize empty data arrays', () => {
    expect(component.fabricanteTablaDatos).toEqual([]);
    expect(component.destinatarioFinalTablaDatos).toEqual([]);
    expect(component.proveedorTablaDatos).toEqual([]);
    expect(component.facturadorTablaDatos).toEqual([]);
  });
});
