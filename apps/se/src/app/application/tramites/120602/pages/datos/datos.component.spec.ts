import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PASOS_REGISTRO } from '@ng-mf/data-access-user';

/**
 * Stub para WizardComponent
 */
@Component({
  selector: 'app-wizard',
  template: ''
})
class WizardStubComponent {
  @Input() listaPasos: any;
  siguiente = jest.fn();
  atras = jest.fn();
}

/**
 * Stub para PasoUno, PasoDos, PasoTres
 */
@Component({selector: 'app-paso-uno', template: ''})
class PasoUnoStub {}
@Component({selector: 'app-paso-dos', template: ''})
class PasoDosStub {}
@Component({selector: 'app-paso-tres', template: ''})
class PasoTresStub {}

/**
 * Stub para btn-continuar
 */
@Component({
  selector: 'btn-continuar',
  template: ''
})
class BtnContinuarStub {
  @Input() datos: any;
  @Output() continuarEvento = new EventEmitter<any>();
}

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DatosComponent,
        WizardStubComponent,
        PasoUnoStub,
        PasoDosStub,
        PasoTresStub,
        BtnContinuarStub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el título', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Solicitud empresa de la frontera persona física.');
  });

  it('debe renderizar el wizard con los pasos correctos', () => {
    const wizard = fixture.debugElement.query(By.directive(WizardStubComponent));
    expect(wizard).toBeTruthy();
    expect(wizard.componentInstance.listaPasos).toEqual(PASOS_REGISTRO);
  });

  it('debe renderizar app-paso-uno cuando indice es 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(PasoUnoStub))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(PasoDosStub))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(PasoTresStub))).toBeFalsy();
  });

  it('debe renderizar app-paso-dos cuando indice es 2', () => {
    component.indice = 2;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(PasoUnoStub))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(PasoDosStub))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(PasoTresStub))).toBeFalsy();
  });

  it('debe renderizar app-paso-tres cuando indice es 3', () => {
    component.indice = 3;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(PasoUnoStub))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(PasoDosStub))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(PasoTresStub))).toBeTruthy();
  });

  it('debe renderizar "Firmar solicitud" cuando indice es 4', () => {
    component.indice = 4;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Firmar solicitud');
  });

  it('debe renderizar btn-continuar con los datos correctos', () => {
    const btn = fixture.debugElement.query(By.directive(BtnContinuarStub));
    expect(btn).toBeTruthy();
    expect(btn.componentInstance.datos).toEqual(component.datosPasos);
  });

  it('debe llamar a wizardComponent.siguiente() cuando getValorIndice es llamado con accion "cont"', () => {
    // Asignar un mock wizardComponent
    const wizard = TestBed.createComponent(WizardStubComponent).componentInstance as any;
    component.wizardComponent = wizard;
    component.wizardComponent.siguiente = jest.fn();
    component.getValorIndice({accion: 'cont', valor: 2});
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe llamar a wizardComponent.atras() cuando getValorIndice es llamado con accion distinta de "cont"', () => {
    const wizard = TestBed.createComponent(WizardStubComponent).componentInstance as any;
    component.wizardComponent = wizard;
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({accion: 'back', valor: 2});
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debe cambiar indice ni llamar métodos del wizard si valor está fuera de rango', () => {
    const wizard = TestBed.createComponent(WizardStubComponent).componentInstance as any;
    component.wizardComponent = wizard;
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.indice = 1;
    component.getValorIndice({accion: 'cont', valor: 0});
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    component.getValorIndice({accion: 'back', valor: 5});
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});