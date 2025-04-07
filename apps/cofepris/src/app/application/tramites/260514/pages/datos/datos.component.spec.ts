import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial indice value of 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should not throw errors when seleccionaTab is called with invalid values', () => {
    expect(() => component.seleccionaTab(-1)).not.toThrow();
    expect(() => component.seleccionaTab(0)).not.toThrow();
  });
});
