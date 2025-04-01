import { TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../../../11105/pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from '../../../11105/pages/paso-tres/paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        WizardComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        PasoTresComponent,
        HttpClientTestingModule,
        SolicitantePageComponent
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the wizard steps on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pasos.length).toBe(2);
    expect(component.pasos[1].titulo).toBe('Firmar solicitud');
  });

  it('should update the current step index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should navigate forward in the wizard when getValorIndice is called with "cont"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should navigate backward in the wizard when getValorIndice is called with "ant"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'ant', valor: 1 });
    expect(component.indice).toBe(1);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not navigate if the index is out of bounds in getValorIndice', () => {
    const wizardSpyNext = jest.spyOn(component.wizardComponent, 'siguiente');
    const wizardSpyBack = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'cont', valor: 6 });
    expect(component.indice).toBe(1); // Index should remain unchanged
    expect(wizardSpyNext).not.toHaveBeenCalled();
    expect(wizardSpyBack).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on component destruction', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});