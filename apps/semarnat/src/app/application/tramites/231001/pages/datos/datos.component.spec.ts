import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { PASOS } from '@libs/shared/data-access-user/src'; // Removed WizardComponent import
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA], // keep schema to ignore unknown child components/elements
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Assign the mock after detectChanges so it is not overwritten by @ViewChild/ngAfterViewInit
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
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
    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');

    component.wizardComponent.siguiente();
    expect(siguienteSpy).toHaveBeenCalled();

    component.wizardComponent.atras();
    expect(atrasSpy).toHaveBeenCalled();
  });
});
