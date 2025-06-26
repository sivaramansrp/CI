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

    // Simula la asignación de ViewChild
    component.wizardComponent = new MockWizardComponent() as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el índice por defecto en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe tener pantallasPasos igual a EMPRESA_FRONTERA', () => {
    expect(component.pantallasPasos).toBe(EMPRESA_FRONTERA);
  });

  it('debe llamar a wizardComponent.siguiente cuando la acción es "cont"', () => {
    const mockEvent = { accion: 'cont', valor: 2 };
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar a wizardComponent.atras cuando la acción no es "cont"', () => {
    const mockEvent = { accion: 'back', valor: 2 };
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('no debe actualizar el índice si el valor está fuera de rango', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 10 });
    expect(component.indice).toBe(1); // sin cambios
  });
});
