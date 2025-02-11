import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMercanciaComponent } from './agregar-mercancia.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AgregarMercanciaComponent', () => {
  let component: AgregarMercanciaComponent;
  let fixture: ComponentFixture<AgregarMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarMercanciaComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on initialization', () => {
    expect(component.agregarMercanciaForm).toBeDefined();
    expect(component.agregarMercanciaForm.get('agregarMercancia')).toBeDefined();
  });

  it('should patch form value when mercanciasDatos changes', () => {
    const mercanciasDatos = {
      agregarMercancia: {
        fraccionArancelaria: '1234',
        descripcionFraccion: 'Test Description',
        nico: '5678',
        descripcionNico: 'Test Nico',
        unidadMedidaTarifa: 'kg',
        cantidadTotal: '100',
        saldoPendiente: '50',
        cantidadSolicitada: '10'
      }
    };
    component.mercanciasDatos = mercanciasDatos;
    component.ngOnChanges({
      mercanciasDatos: {
        currentValue: mercanciasDatos,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component.agregarMercanciaForm.value).toEqual(mercanciasDatos);
  });

  it('should emit cancelarEvento when cerrarModal is called with true', () => {
    spyOn(component.cancelarEvento, 'emit');
    component.cerrarModal(true);
    expect(component.cancelarEvento.emit).toHaveBeenCalledWith(false);
  });

  it('should not emit cancelarEvento when cerrarModal is called with false', () => {
    spyOn(component.cancelarEvento, 'emit');
    component.cerrarModal(false);
    expect(component.cancelarEvento.emit).not.toHaveBeenCalled();
  });
});
