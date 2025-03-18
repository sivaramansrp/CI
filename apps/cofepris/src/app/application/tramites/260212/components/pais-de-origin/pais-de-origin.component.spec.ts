import { TestBed } from '@angular/core/testing';
import { PaisDeOriginComponent } from './pais-de-origin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';

describe('PaisDeOriginComponent', () => {
  let component: PaisDeOriginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CommonModule, CrosslistComponent,PaisDeOriginComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(PaisDeOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle colapsable when mostrar_colapsable is called', () => {
    const initialState = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initialState);
  });

  it('should add all elements to fechasSeleccionadas when agregar is called with "t"', () => {
    component.selectRangoDias = ['2023-01-01', '2023-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(component.selectRangoDias);
    expect(component.fechasDatos.length).toBe(0);
  });

  it('should remove all elements from fechasSeleccionadas when quitar is called with "t"', () => {
    component.fechasSeleccionadas = ['2023-01-01', '2023-01-02'];
    component.quitar('t');
    expect(component.fechasSeleccionadas.length).toBe(0);
    expect(component.fechasDatos).toEqual(['2023-01-01', '2023-01-02']);
  });

});
