import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos140201Component } from './datos-140201.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-solicitante',
  template: ''
})
class MockSolicitanteComponent {
  @Input() tipoPersona!: typeof TIPO_PERSONA;
  obtenerTipoPersona(tipo: typeof TIPO_PERSONA) {
    this.tipoPersona = tipo;
  }
}

describe('Datos140201Component', () => {
  let component: Datos140201Component;
  let fixture: ComponentFixture<Datos140201Component>;
  let solicitanteComponent: MockSolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos140201Component, MockSolicitanteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(Datos140201Component);
    component = fixture.componentInstance;
    solicitanteComponent = TestBed.createComponent(MockSolicitanteComponent).componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTipoPersona with TIPO_PERSONA.MORAL_NACIONAL after view init', () => {
    const solicitanteComponent = fixture.debugElement.children[0].componentInstance as MockSolicitanteComponent;
    const obtenerTipoPersonaSpy = jest.spyOn(solicitanteComponent, 'obtenerTipoPersona');
    component.ngAfterViewInit();
    expect(obtenerTipoPersonaSpy).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice value when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });
});