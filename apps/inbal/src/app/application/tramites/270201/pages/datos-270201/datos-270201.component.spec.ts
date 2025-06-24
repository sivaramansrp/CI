import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos270201Component } from './datos-270201.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Datos270201Component', () => {
  let component: Datos270201Component;
  let fixture: ComponentFixture<Datos270201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos270201Component],
      imports: [
        HttpClientTestingModule
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datos270201Component);
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
