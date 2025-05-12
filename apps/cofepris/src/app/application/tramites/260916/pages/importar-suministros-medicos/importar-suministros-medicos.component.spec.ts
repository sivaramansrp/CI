import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportarSuministrosMedicosComponent } from './importar-suministros-medicos.component';


describe('ImportarSuministrosMedicosComponent', () => {
  let component: ImportarSuministrosMedicosComponent;
  let fixture: ComponentFixture<ImportarSuministrosMedicosComponent>;

  class MockWizardComponent {
    siguiente = jasmine.createSpy('siguiente');
    atras = jasmine.createSpy('atras');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportarSuministrosMedicosComponent],
    }).overrideComponent(ImportarSuministrosMedicosComponent, {
      set: {
        providers: [],
      },
    }).compileComponents();

    fixture = TestBed.createComponent(ImportarSuministrosMedicosComponent);
    component = fixture.componentInstance;

  
    component['wizardComponent'] = new MockWizardComponent() as any;

    fixture.detectChanges();
  });

  it('should update indice and call siguiente() when accion is "cont"', () => {
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component['wizardComponent'].siguiente).toHaveBeenCalled();
  });

  it('should update indice and call atras() when accion is not "cont"', () => {
    component.getValorIndice({ accion: 'volver', valor: 3 });
    expect(component.indice).toBe(3);
    expect(component['wizardComponent'].atras).toHaveBeenCalled();
  });

  it('should not update indice or call any wizard method if valor is out of range', () => {
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).not.toBe(5); 
    expect(component['wizardComponent'].siguiente).not.toHaveBeenCalled();
    expect(component['wizardComponent'].atras).not.toHaveBeenCalled();
  });
});
