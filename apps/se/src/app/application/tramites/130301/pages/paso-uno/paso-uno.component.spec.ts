import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-solicitante',
  template: '',
})
class MockSolicitanteComponent {
  obtenerTipoPersona = jest.fn();
}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockSolicitante: MockSolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    mockSolicitante = TestBed.createComponent(MockSolicitanteComponent).componentInstance;
    component.solicitante = mockSolicitante as unknown as SolicitanteComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should call obtenerTipoPersona with TIPO_PERSONA.MORAL_NACIONAL on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(mockSolicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should not call obtenerTipoPersona if solicitante is undefined', () => {
    component.solicitante = undefined as unknown as SolicitanteComponent;
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });
});
