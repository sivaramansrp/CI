import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudModalidadPageComponent } from './solicitud-modalidad-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';

describe('SolicitudModalidadPageComponent', () => {
  let component: SolicitudModalidadPageComponent;
  let fixture: ComponentFixture<SolicitudModalidadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudModalidadPageComponent, WizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudModalidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title message', () => {
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');
  });

  it('should have default step index', () => {
    expect(component.indice).toBe(1);
  });

  it('should have pasos defined', () => {
    expect(component.pasos).toBeDefined();
    expect(component.pasos.length).toBeGreaterThan(0);
  });

  it('should navigate to next step', () => {
    spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should navigate to previous step', () => {
    spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not navigate if valor is out of range', () => {
    spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });
});
