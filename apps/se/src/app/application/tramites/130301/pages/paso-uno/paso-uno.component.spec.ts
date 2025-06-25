import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

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
      imports: [HttpClientTestingModule],
      declarations: [PasoUnoComponent, MockSolicitanteComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    mockSolicitante = TestBed.createComponent(MockSolicitanteComponent).componentInstance;
    component.solicitante = mockSolicitante as unknown as SolicitanteComponent;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar indice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe llamar a obtenerTipoPersona con TIPO_PERSONA.MORAL_NACIONAL en ngAfterViewInit', () => {
    component.solicitante = mockSolicitante as unknown as SolicitanteComponent;
    component.ngAfterViewInit();
    expect(mockSolicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('debe actualizar indice cuando se llama a seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('no debe llamar a obtenerTipoPersona si solicitante es undefined', () => {
    component.solicitante = undefined as unknown as SolicitanteComponent;
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });
});
