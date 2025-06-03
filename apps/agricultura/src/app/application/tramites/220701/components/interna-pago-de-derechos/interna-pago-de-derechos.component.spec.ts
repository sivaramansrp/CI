import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternaPagoDeDerechosComponent } from './interna-pago-de-derechos.component';
import { of, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';


// Mocks
const mockImportacionDeAcuiculturaService = {
  obtenerDatos: jest.fn().mockReturnValue(of({ formularioPago: {} })),
  obtenerDetallesDelCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
  actualizarFormaValida: jest.fn(),
  actualizarFormularioPago: jest.fn()
};

const mockTramiteStoreQuery = {
  selectSolicitudTramite$: of({ FormularioPagoState: {} })
};

const mockTramiteStore = {
  setInternaPagoDeDerechosTramite: jest.fn()
};

const mockSeccionLibQuery = {
  selectSeccionState$: of({ formaValida: [] }),
  getValue: () => ({ formaValida: [] })
};

const mockSeccionLibStore = {
  establecerFormaValida: jest.fn()
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false })
};

describe('InternaPagoDeDerechosComponent', () => {
  let component: InternaPagoDeDerechosComponent;
  let fixture: ComponentFixture<InternaPagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternaPagoDeDerechosComponent],
      providers: [
      FormBuilder,
      { provide: 'ImportacionDeAcuiculturaService', useValue: mockImportacionDeAcuiculturaService },
      { provide: 'TramiteStoreQuery', useValue: mockTramiteStoreQuery },
      { provide: 'TramiteStore', useValue: mockTramiteStore },
      { provide: 'SeccionLibQuery', useValue: mockSeccionLibQuery },
      { provide: 'SeccionLibStore', useValue: mockSeccionLibStore },
      { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InternaPagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario correctamente', () => {
    component.inicializarFormulario();
    expect(component.formularioPago).toBeDefined();
    expect(component.formularioPago.get('exentoPago')).toBeTruthy();
  });

  it('debe cambiar el valor del radio exentoPago', () => {
    component.inicializarFormulario();
    component.cambioValorRadio('exentoPago', 'No');
    expect(component.exentoPagoValor).toBe('No');
    expect(component.formularioPago.get('exentoPago')?.value).toBe('No');
  });

  it('debe actualizar la fecha en el formulario', () => {
    component.inicializarFormulario();
    component.cambioFechaFinal('01/01/2025');
    expect(component.fechaPagoDate).toBe('01/01/2025');
    expect(component.formularioPago.get('fechaPago')?.value).toBe('01/01/2025');
  });

  it('debe formatear una fecha correctamente', () => {
    const fecha = new Date('2025-06-02');
    const resultado = InternaPagoDeDerechosComponent.formatearFecha(fecha);
    expect(resultado).toBe('02/06/2025');
  });

  it('debe llamar a actualizarFormularioPago cuando se ejecuta setValoresStore', () => {
    component.inicializarFormulario();
    component.setValoresStore(component.formularioPago, 'exentoPago');
    expect(mockImportacionDeAcuiculturaService.actualizarFormularioPago).toHaveBeenCalled();
  });
});
