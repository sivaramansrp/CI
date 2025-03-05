import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureComponent } from './agriculture.component';
import { AccionBoton } from 'libs/shared/data-access-user/src/core/models/220202/fitosanitario.model';

describe('AgricultureComponent', () => {
  let component: AgricultureComponent;
  let fixture: ComponentFixture<AgricultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgricultureComponent], // Declara el componente a testear
      imports: [], // Importa los módulos necesarios para el componente (si los hay)
      providers: [] // Provee los servicios necesarios para el componente (si los hay)
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it('should have correct number of steps', () => {
    expect(component.pasos.length).toBe(5); // Verifica que el número de pasos es correcto
    expect(component.datosPasos.nroPasos).toBe(5); // Verifica que el número de pasos en datosPasos es correcto
  });

  it('should initialize with correct step index', () => {
    expect(component.indice).toBe(1); // Verifica que el índice inicial es 1
    expect(component.datosPasos.indice).toBe(1); // Verifica que el índice en datosPasos es 1
  });

  it('should update index and call wizard next when getValorIndice is called with "cont" action', () => {
    const mockAccionBoton: AccionBoton = { accion: 'cont', valor: 3 };
    const spySiguiente = spyOn(component.componenteWizard, 'siguiente'); // Espía el método siguiente()
    component.getValorIndice(mockAccionBoton);
    expect(component.indice).toBe(3); // Verifica que el índice se actualiza
    expect(spySiguiente).toHaveBeenCalled(); // Verifica que se llama a siguiente()
  });

  it('should update index and call wizard back when getValorIndice is called with "atras" action', () => {
    const mockAccionBoton: AccionBoton = { accion: 'atras', valor: 2 };
    const spyAtras = spyOn(component.componenteWizard, 'atras'); // Espía el método atras()
    component.getValorIndice(mockAccionBoton);
    expect(component.indice).toBe(2); // Verifica que el índice se actualiza
    expect(spyAtras).toHaveBeenCalled(); // Verifica que se llama a atras()
  });

  it('should not update index or call wizard methods when getValorIndice is called with invalid value', () => {
    const mockAccionBoton: AccionBoton = { accion: 'cont', valor: 6 }; // Valor inválido
    const spySiguiente = spyOn(component.componenteWizard, 'siguiente');
    const spyAtras = spyOn(component.componenteWizard, 'atras');

    component.getValorIndice(mockAccionBoton);

    expect(component.indice).toBe(1); // El índice no debe cambiar
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();

    const mockAccionBoton2: AccionBoton = { accion: 'cont', valor: -1 }; // Valor inválido
    component.getValorIndice(mockAccionBoton2);

    expect(component.indice).toBe(1); // El índice no debe cambiar
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });
})