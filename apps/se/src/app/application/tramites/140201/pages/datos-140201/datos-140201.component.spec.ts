import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos140201Component } from './datos-140201.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Datos140201Component', () => {
  let component: Datos140201Component;
  let fixture: ComponentFixture<Datos140201Component>;
  let solicitanteComponent: SolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos140201Component],
      schemas: [NO_ERRORS_SCHEMA], // To ignore unknown component errors
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Datos140201Component);
    component = fixture.componentInstance;
    solicitanteComponent = TestBed.createComponent(SolicitanteComponent).componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call obtenerTipoPersona with MORAL_NACIONAL after view init', () => {
    component.solicitante = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as SolicitanteComponent;
    
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });
});
