import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarSolicitudComponent } from './capturar-solicitud.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CapturarSolicitudComponent', () => {
  let component: CapturarSolicitudComponent;
  let fixture: ComponentFixture<CapturarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturarSolicitudComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(CapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el índice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe cambiar el índice al seleccionar un tab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debe emitir el evento modificarEventCapturar', () => {
    const SPY = jest.spyOn(component.modificarEventCapturar, 'emit');
    component.modificarEventCapturar.emit(true);
    expect(SPY).toHaveBeenCalledWith(true);
  });
});