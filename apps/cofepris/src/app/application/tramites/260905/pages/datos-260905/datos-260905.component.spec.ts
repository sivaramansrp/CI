import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos260905Component } from './datos-260905.component';
describe('Datos260905Component', () => {
  let component: Datos260905Component;
  let fixture: ComponentFixture<Datos260905Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos260905Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos260905Component);
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
