import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PasoTresComponent } from './paso-tres.component';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } }, // Mock Router
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this to handle unknown elements like 'firma-electronica'
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a "servicios-extraordinarios/acuse" cuando obtieneFirma es llamada con una firma válida', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.obtieneFirma('valid-signature');
    expect(navigateSpy).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('no debería navegar cuando obtieneFirma es llamada con una firma vacía', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.obtieneFirma('');
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
