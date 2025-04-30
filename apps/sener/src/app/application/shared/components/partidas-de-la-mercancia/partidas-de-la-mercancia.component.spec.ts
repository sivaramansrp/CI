import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';

interface PartidasDeLaMercanciaModelo {
  id: number;
  cantidad: string;
  unidadDeMedida: string;
  fraccionFrancelaria: string;
  descripcion: string;
  valorUSD: number;
  precioUnitarioUSD: string;
  totalUSD: string;
}

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PartidasDeLaMercanciaComponent],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;

    component.partidasDelaMercanciaForm = formBuilder.group({
      cantidadPartidasDeLaMercancia: ['', Validators.required],
      nombrePartida: ['', Validators.required],
      descripcionPartidasDeLaMercancia: ['', Validators.required],
      valorPartidaUSDPartidasDeLaMercancia: ['', Validators.required],
      cantidadModificar: ['', Validators.required],
      descripcionModificar: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería devolver true si el control del formulario es inválido en esInvalido', () => {
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].setValue('');
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].markAsTouched();

    const ES_INVALIDO = component.esInvalido('cantidadPartidasDeLaMercancia');
    expect(ES_INVALIDO).toBe(true);
  });

  it('debería devolver false si el control del formulario es válido en esInvalido', () => {
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].setValue('Valor Válido');
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].markAsTouched();

    const ES_INVALIDO = component.esInvalido('cantidadPartidasDeLaMercancia');
    expect(ES_INVALIDO).toBe(false);
  });

  it('debería emitir filaSeleccionadaChange cuando se llama a handleListaDeFilaSeleccionada', () => {
    const EMIT_SPY = spyOn(component.filaSeleccionadaChange, 'emit');
    const FILASSELECCIONADAS: PartidasDeLaMercanciaModelo[] = [
      {
        id: 1,
        cantidad: '10',
        unidadDeMedida: 'kg',
        fraccionFrancelaria: '1234.56.78',
        descripcion: 'Descripción de prueba 1',
        valorUSD: 100,
        precioUnitarioUSD: '10',
        totalUSD: '1000',
      },
      {
        id: 2,
        cantidad: '20',
        unidadDeMedida: 'kg',
        fraccionFrancelaria: '8765.43.21',
        descripcion: 'Descripción de prueba 2',
        valorUSD: 200,
        precioUnitarioUSD: '20',
        totalUSD: '4000',
      },
    ];
    component.handleListaDeFilaSeleccionada(FILASSELECCIONADAS);

    expect(EMIT_SPY).toHaveBeenCalledWith(FILASSELECCIONADAS);
  });

  it('debería emitir validarYEnviarFormularioEvent cuando se llama a validarYEnviarFormulario', () => {
    const EMIT_SPY = spyOn(component.validarYEnviarFormularioEvent, 'emit');

    component.validarYEnviarFormulario();

    expect(EMIT_SPY).toHaveBeenCalled();
  });

  it('debería emitir navegarParaModificarPartidaEvent cuando se llama a navegarParaModificarPartida', () => {
    const EMIT_SPY = spyOn(component.navegarParaModificarPartidaEvent, 'emit');

    component.navegarParaModificarPartida();

    expect(EMIT_SPY).toHaveBeenCalled();
  });

  it('debería emitir setValoresStoreEvent con los argumentos correctos cuando se llama a setValoresStore', () => {
    const EMIT_SPY = spyOn(component.setValoresStoreEvent, 'emit');
    const TEST_FORM = formBuilder.group({
      testControl: ['', Validators.required],
    });
    const MOCK_TEST_CAMPO = 'testCampo';

    component.setValoresStore(TEST_FORM, MOCK_TEST_CAMPO);

    expect(EMIT_SPY).toHaveBeenCalledWith({
      form: TEST_FORM,
      campo: MOCK_TEST_CAMPO,
    });
  });
});