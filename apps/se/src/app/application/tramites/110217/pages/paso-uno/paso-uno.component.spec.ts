import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PasoUnoComponent
      ],
      providers: [
        provideHttpClient(),
        { provide: 'ToastConfig', useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default indice value', () => {
    expect(component.indice).toBeDefined();
  });

  it('should set the active tab to 1 when seleccionaTab(1) is called', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('should set the active tab to 2 when seleccionaTab(2) is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should set the active tab to 3 when seleccionaTab(3) is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should set the active tab to 4 when seleccionaTab(4) is called', () => {
    component.seleccionaTab(4);
    expect(component.indice).toBe(4);
  });

  it('should set the active tab to 5 when seleccionaTab(5) is called', () => {
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should have seleccionaTab method', () => {
    expect(typeof component.seleccionaTab).toBe('function');
  });
});