import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoDeExportacionComponent } from './permiso-de-exportacion.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/pasos.enums';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PermisoDeExportacionComponent', () => {
  let component: PermisoDeExportacionComponent;
  let fixture: ComponentFixture<PermisoDeExportacionComponent>;
  let wizardMock: any;

  beforeEach(async () => {
    wizardMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PermisoDeExportacionComponent],
      providers: [
        { provide: WizardComponent, useValue: wizardMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoDeExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos and TEXTOS correctly', () => {
    expect(component.pantallasPasos).toEqual(PASOS);
    expect(component.TEXTOS).toEqual(AVISO);
  });

  it('should update indice and call siguiente on getValorIndice with "cont" action', () => {
    component.wizardComponent = wizardMock;
    const accionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(2);
    expect(wizardMock.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call atras on getValorIndice with "atrás" action', () => {
    component.wizardComponent = wizardMock;
    const accionBoton = { valor: 1, accion: 'atrás' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1);
    expect(wizardMock.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    component.wizardComponent = wizardMock;
    const accionBoton = { valor: 6, accion: 'cont' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1); // Default value
    expect(wizardMock.siguiente).not.toHaveBeenCalled();
    expect(wizardMock.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if accion is invalid', () => {
    component.indice = 1; // Ensure the initial value of indice is set
    component.wizardComponent = wizardMock;
    const accionBoton = { valor: 2, accion: 'invalid' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1); // Ensure indice remains unchanged
    expect(wizardMock.siguiente).not.toHaveBeenCalled();
    expect(wizardMock.atras).not.toHaveBeenCalled();
  });
});
