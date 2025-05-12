import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { PASOS } from '../../../../shared/constantes/aviso.enum';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      imports: [WizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pasos defined', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should have wizardComponent defined', () => {
    expect(component.wizardComponent).toBeDefined();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice value', () => {
    component.indice = 2;
    expect(component.indice).toBe(2);
  });

  it('should call wizardComponent methods', () => {
    spyOn(component.wizardComponent, 'siguiente');
    spyOn(component.wizardComponent, 'atras');

    component.wizardComponent.siguiente();
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    component.wizardComponent.atras();
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });
});
