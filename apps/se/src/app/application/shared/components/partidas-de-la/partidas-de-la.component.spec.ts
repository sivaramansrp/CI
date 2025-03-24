import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PartidasDeLaComponent } from './partidas-de-la.component';

describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,PartidasDeLaComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;

    // Initialize inputs
    component.form = new FormBuilder().group({
      cantidad: [''],
      descripcion: [''],
    });
    component.formForTotalCount = new FormBuilder().group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
    component.tableHeaderData = [];
    component.tableBodyData = [];
    component.mostrarTabla = false;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filaSeleccionadaChange when handleListaDeFilaSeleccionada is called', () => {
    const filasSeleccionadas = [{ id: 1 }];
    jest.spyOn(component.filaSeleccionadaChange, 'emit');

    component.handleListaDeFilaSeleccionada(filasSeleccionadas);

    expect(component.filaSeleccionadaChange.emit).toHaveBeenCalledWith(filasSeleccionadas);
  });

  it('should emit validarYEnviarFormularioEvent when validarYEnviarFormulario is called', () => {
    jest.spyOn(component.validarYEnviarFormularioEvent, 'emit');

    component.validarYEnviarFormulario();

    expect(component.validarYEnviarFormularioEvent.emit).toHaveBeenCalled();
  });

  it('should emit navegarParaModificarPartidaEvent when navegarParaModificarPartida is called', () => {
    jest.spyOn(component.navegarParaModificarPartidaEvent, 'emit');

    component.navegarParaModificarPartida();

    expect(component.navegarParaModificarPartidaEvent.emit).toHaveBeenCalled();
  });

  it('should emit setValoresStoreEvent with correct arguments when setValoresStore is called', () => {
    const form = new FormBuilder().group({
      cantidad: ['10'],
    });
    const campo = 'cantidad';
    const metodoNombre = 'setCantidad';
    jest.spyOn(component.setValoresStoreEvent, 'emit');

    component.setValoresStore(form, campo, metodoNombre);

    expect(component.setValoresStoreEvent.emit).toHaveBeenCalledWith({
      form,
      campo,
      metodoNombre,
    });
  });

  it('should return true if form control is invalid in esInvalido', () => {
    component.form.get('cantidad')?.setValidators(() => ({ invalid: true }));
    component.form.get('cantidad')?.markAsTouched();

    expect(component.esInvalido('cantidad')).toBe(true);
  });

  it('should return false if form control is valid in esInvalido', () => {
    component.form.get('cantidad')?.setValidators(() => null);
    component.form.get('cantidad')?.markAsTouched();

    expect(component.esInvalido('cantidad')).toBe(false);
  });
});