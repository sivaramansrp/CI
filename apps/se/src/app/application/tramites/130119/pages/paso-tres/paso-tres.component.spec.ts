import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora errores de elementos desconocidos como firma-electronica
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a router.navigate cuando obtieneFirma se llama con una firma válida', () => {
    const FIRMA = 'firma-electronica-valida';
    component.obtieneFirma(FIRMA);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('no debería llamar a router.navigate cuando obtieneFirma se llama con una firma inválida', () => {
    const FIRMA = '';
    component.obtieneFirma(FIRMA);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('debería renderizar el componente firma-electronica correctamente', () => {
    const COMPILED = fixture.nativeElement;
    const FIRMA_ELECTRONICA_ELEMENT = COMPILED.querySelector('firma-electronica');
    expect(FIRMA_ELECTRONICA_ELEMENT).toBeTruthy();
    expect(FIRMA_ELECTRONICA_ELEMENT.getAttribute('tipo')).toBe('');
  });

  it('debería manejar el evento firma correctamente', () => {
    const FIRMA = 'firma-electronica-valida';
    const SPY_OBTIENE_FIRMA = jest.spyOn(component, 'obtieneFirma');
    const FIRMA_ELECTRONICA_ELEMENT = fixture.nativeElement.querySelector('firma-electronica');
    FIRMA_ELECTRONICA_ELEMENT.dispatchEvent(new CustomEvent('firma', { detail: FIRMA }));
    expect(SPY_OBTIENE_FIRMA).toHaveBeenCalledWith(FIRMA);
  });
});