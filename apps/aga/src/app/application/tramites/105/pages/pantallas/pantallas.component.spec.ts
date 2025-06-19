import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { AccionBoton } from '@ng-mf/data-access-user';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los pasos y el índice correctamente', () => {
    expect(component.pantallasPasos.length).toBeGreaterThan(0);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
  });

  it('debería cambiar el índice y llamar a siguiente() si la acción es "cont"', () => {
    const mockWizard = { siguiente: jest.fn(), atras: jest.fn() } as any;
    component.wizardComponent = mockWizard;
    const accion: AccionBoton = { valor: 2, accion: 'cont' } as any;

    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(mockWizard.siguiente).toHaveBeenCalled();
    expect(mockWizard.atras).not.toHaveBeenCalled();
  });

  it('debería cambiar el índice y llamar a atras() si la acción NO es "cont"', () => {
    const mockWizard = { siguiente: jest.fn(), atras: jest.fn() } as any;
    component.wizardComponent = mockWizard;
    const accion: AccionBoton = { valor: 3, accion: 'ant' } as any;

    component.getValorIndice(accion);

    expect(component.indice).toBe(3);
    expect(mockWizard.atras).toHaveBeenCalled();
    expect(mockWizard.siguiente).not.toHaveBeenCalled();
  });

  it('no debería cambiar el índice ni llamar métodos si el valor está fuera de rango', () => {
    const mockWizard = { siguiente: jest.fn(), atras: jest.fn() } as any;
    component.wizardComponent = mockWizard;
    const accion: AccionBoton = { valor: 0, accion: 'cont' } as any;

    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // No cambia
    expect(mockWizard.siguiente).not.toHaveBeenCalled();
    expect(mockWizard.atras).not.toHaveBeenCalled();
  });
});