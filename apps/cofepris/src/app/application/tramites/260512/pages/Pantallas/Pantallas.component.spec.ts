import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './Pantallas.component';
import { Component } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({selector: 'app-wizard', template: ''})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent, MockWizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
  
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have pasos and solicitudePasos defined', () => {
    expect(Array.isArray(component.pasos)).toBe(true);
    expect(Array.isArray(component.solicitudePasos)).toBe(true);
  });

  it('should have datosPasos initialized correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Guardar');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente for accion "cont"', () => {
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(spySiguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras for accion not "cont"', () => {
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 3 });
    expect(component.indice).toBe(3);
    expect(spyAtras).toHaveBeenCalled();
  });

  it('should not change indice or call wizard methods for valor <= 0', () => {
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });

  it('should not change indice or call wizard methods for valor >= 5', () => {
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });
});
