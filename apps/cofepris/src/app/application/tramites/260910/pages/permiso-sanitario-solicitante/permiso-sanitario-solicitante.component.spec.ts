import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoSanitarioSolicitanteComponent } from './permiso-sanitario-solicitante.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';

describe('ImportacionProductosComponent', () => {
  let component: PermisoSanitarioSolicitanteComponent;
  let fixture: ComponentFixture<PermisoSanitarioSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoSanitarioSolicitanteComponent],
      imports: [WizardComponent, BtnContinuarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoSanitarioSolicitanteComponent);
    component = fixture.componentInstance;

    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent; 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to the next step when accion is "cont" and valor is valid', () => {
  //   const accionBoton = { accion: 'cont', valor: 2 };
  //   component.getValorIndice(accionBoton);
  //   expect(component.indice).toBe(2); 
  //   expect(component.wizardComponent.siguiente).toHaveBeenCalled(); 
  //   expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  // });

  // it('should navigate to the previous step when accion is "atras" and valor is valid', () => {
  //   const accionBoton = { accion: 'atras', valor: 3 };
  //   component.getValorIndice(accionBoton);
  //   expect(component.indice).toBe(3);
  //   expect(component.wizardComponent.atras).toHaveBeenCalled(); 
  //   expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  // });

  // it('should not navigate if valor is out of range (too low)', () => {
  //   const accionBoton = { accion: 'cont', valor: 0 };
  //   component.getValorIndice(accionBoton);
  //   expect(component.indice).toBe(1);
  //   expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  //   expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  // });

  // it('should not navigate if valor is out of range (too high)', () => {
  //   const accionBoton = { accion: 'cont', valor: 6 };
  //   component.getValorIndice(accionBoton);
  //   expect(component.indice).toBe(1);
  //   expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  //   expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  // });
});
