import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosPasosComponent } from './todos-pasos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS, TITULO_PASO_DOS, TITULO_PASO_TRES, TITULO_PASO_UNO } from '../../services/registros-de-comercio-exterior.enum';

describe('TodosPasosComponent', () => {
  let component: TodosPasosComponent;
  let fixture: ComponentFixture<TodosPasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosPasosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.pantallasPasos).toEqual(PANTA_PASOS);
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(component.datosPasos.nroPasos).toBe(PANTA_PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update title and call wizardComponent methods on getValorIndice', () => {
    const wizardComponentSpy = jasmine.createSpyObj('WizardComponent', ['siguiente', 'atras']);
    component.wizardComponent = wizardComponentSpy;

    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.titulo).toBe(TITULO_PASO_DOS);
    expect(wizardComponentSpy.siguiente).toHaveBeenCalled();

    component.getValorIndice({ valor: 1, accion: 'back' });
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(wizardComponentSpy.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods for invalid values', () => {
    const wizardComponentSpy = jasmine.createSpyObj('WizardComponent', ['siguiente', 'atras']);
    component.wizardComponent = wizardComponentSpy;

    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();

    component.getValorIndice({ valor: 5, accion: 'back' });
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = spyOn(component['destroyed$'], 'next');
    const completeSpy = spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
