import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default index value of 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update the index when seleccionaTab is called with a valid index', () => {
    const newIndex = 3;
    component.seleccionaTab(newIndex);
    expect(component.indice).toBe(newIndex);
  });

  it('should handle edge case when seleccionaTab is called with 0', () => {
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });

  it('should handle edge case when seleccionaTab is called with a negative index', () => {
    component.seleccionaTab(-1);
    expect(component.indice).toBe(-1);
  });

  it('should handle edge case when seleccionaTab is called with a large index', () => {
    const largeIndex = 1000;
    component.seleccionaTab(largeIndex);
    expect(component.indice).toBe(largeIndex);
  });

  it('should not throw an error when seleccionaTab is called with undefined', () => {
    expect(() => component.seleccionaTab(undefined as unknown as number)).not.toThrow();
  });

  it('should not throw an error when seleccionaTab is called with null', () => {
    expect(() => component.seleccionaTab(null as unknown as number)).not.toThrow();
  });
});
