import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresaFronteraSolicitudComponent } from './empresa-frontera-solicitud';
import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { EMPRESA_FRONTERA } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { DatosComponent } from '../datos/datos.component';
import { PasoDosComponent } from '../../component/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../../component/paso-tres/paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitanteComponent } from '../../component/solicitante/solicitante.component';

@Component({
  selector: 'app-mock-wizard',
  template: '',
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('EmpresaFronteraSolicitudComponent', () => {
  let component: EmpresaFronteraSolicitudComponent;
  let fixture: ComponentFixture<EmpresaFronteraSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EmpresaFronteraSolicitudComponent,
        MockWizardComponent,
        DatosComponent
      ],
      imports: [WizardComponent, PasoDosComponent, PasoTresComponent, BtnContinuarComponent, HttpClientTestingModule, SolicitanteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaFronteraSolicitudComponent);
    component = fixture.componentInstance;

    // Simulate ViewChild assignment
    component.wizardComponent = new MockWizardComponent() as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have pantallasPasos set to EMPRESA_FRONTERA', () => {
    expect(component.pantallasPasos).toBe(EMPRESA_FRONTERA);
  });

  it('should call wizardComponent.siguiente when accion is cont', () => {
    const mockEvent = { accion: 'cont', valor: 2 };
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when accion is not cont', () => {
    const mockEvent = { accion: 'back', valor: 2 };
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should not update indice if value is out of range', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 10 });
    expect(component.indice).toBe(1); // unchanged
  });
});
