import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregardestinatariofinalComponent } from './agregardestinatariofinal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';

describe('AgregardestinatariofinalComponent', () => {
  let component: AgregardestinatariofinalComponent;
  let fixture: ComponentFixture<AgregardestinatariofinalComponent>;

  const mockCertificadoService = {
    getAllDatosForma: jest.fn().mockReturnValue(of({ seletedExdora: {} }))
  };

  const mockStore = {
    updatedatosForma: jest.fn(),
    actualizarSelectedExdora: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardestinatariofinalComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        { provide: ImportacionDeAcuiculturaService, useValue: mockCertificadoService },
        { provide: AcuiculturaStore, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregardestinatariofinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.value.tipoMercancia).toBe('yes');
  });

  it('should call store methods when form is valid on save', () => {
    component.destinatarioForm.patchValue({
      tipoMercancia: 'yes',
      razonSocial: 'Empresa',
      pais: 'MX',
      domicilio: 'Calle 1',
    });
    component.onGuardarDestinatarioFinal();
    expect(mockStore.updatedatosForma).toHaveBeenCalled();
    expect(mockStore.actualizarSelectedExdora).toHaveBeenCalled();
  });

  it('should not call store if form is invalid', () => {
    component.destinatarioForm.patchValue({ razonSocial: '', pais: '' });
    component.onGuardarDestinatarioFinal();
    expect(mockStore.updatedatosForma).not.toHaveBeenCalled();
  });

  it('should reset form on limpiar', () => {
    component.destinatarioForm.patchValue({ razonSocial: 'Test' });
    component.onLimpiarDestinatario();
    expect(component.destinatarioForm.value.tipoMercancia).toBe('yes');
  });

  it('should emit cerrar on cancel', () => {
    jest.spyOn(component.cerrar, 'emit');
    component.onCancelarDestinatario();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('should update validators on enCambioValorRadio', () => {
    component.destinatarioForm.patchValue({ tipoMercancia: 'no' });
    component.enCambioValorRadio();
    expect(component.destinatarioForm.get('nombre')?.validator).toBeTruthy();
  });
});
