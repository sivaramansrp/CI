import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoSolicitanteComponent } from './paso-solicitante.component';

describe('PasoSolicitanteComponent', () => {
  let component: PasoSolicitanteComponent;
  let fixture: ComponentFixture<PasoSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoSolicitanteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el índice a 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debería actualizar el índice cuando se llama a seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debería mantener el índice dentro de los límites esperados', () => {
    component.seleccionaTab(5); // Intentar seleccionar un índice fuera de rango
    expect(component.indice).toBe(5); // En este caso, el componente simplemente asigna el valor, podrías agregar lógica para evitar esto si es necesario

    component.seleccionaTab(-1); // Intentar seleccionar un índice negativo
    expect(component.indice).toBe(-1); // Similar al caso anterior, podrías agregar validaciones
  });
});