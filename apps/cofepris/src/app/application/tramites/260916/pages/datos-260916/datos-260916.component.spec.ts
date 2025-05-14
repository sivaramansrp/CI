import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos260916Component } from './datos-260916.component';
describe('Datos260916Component', () => {
  let component: Datos260916Component;
  let fixture: ComponentFixture<Datos260916Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos260916Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos260916Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have "indice" initialized to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change "indice" when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });
});
