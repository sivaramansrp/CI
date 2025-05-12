import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidasDeLaMercanciaComponent, ReactiveFormsModule], // Use imports for standalone components
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Initialize inputs
    component.partidasDelaMercanciaForm = formBuilder.group({
      cantidad: [''],
      descripcion: [''],
    });
    component.formForTotalCount = formBuilder.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
    component.tableHeaderData = [];
    component.tableBodyData = [];
    component.mostrarTabla = false;
    component.fraccionDescripcionPartidasDeLaMercancia = [];
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filaSeleccionadaChange when handleListaDeFilaSeleccionada is called', () => {
    const spy = jest.spyOn(component.filaSeleccionadaChange, 'emit');
    const mockRows = [{ id: 1, name: 'Test Row' }];
    component.handleListaDeFilaSeleccionada(mockRows);
    expect(spy).toHaveBeenCalledWith(mockRows);
  });

  it('should emit validarYEnviarFormularioEvent when validarYEnviarFormulario is called', () => {
    const spy = jest.spyOn(component.validarYEnviarFormularioEvent, 'emit');
    component.validarYEnviarFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit navegarParaModificarPartidaEvent when navegarParaModificarPartida is called', () => {
    const spy = jest.spyOn(component.navegarParaModificarPartidaEvent, 'emit');
    component.navegarParaModificarPartida();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit setValoresStoreEvent when setValoresStore is called', () => {
    const spy = jest.spyOn(component.setValoresStoreEvent, 'emit');
    const mockForm = formBuilder.group({ campo: [''] });
    component.setValoresStore(mockForm, 'campo', 'metodoNombre');
    expect(spy).toHaveBeenCalledWith({
      form: mockForm,
      campo: 'campo',
      metodoNombre: 'metodoNombre',
    });
  });

  it('should return true if a control is invalid in esInvalido', () => {
    component.partidasDelaMercanciaForm.get('cantidad')?.setErrors({ required: true });
    component.partidasDelaMercanciaForm.get('cantidad')?.markAsTouched();
    expect(component.esInvalido('cantidad')).toBe(true);
  });

  it('should return false if a control is valid in esInvalido', () => {
    component.partidasDelaMercanciaForm.get('cantidad')?.setValue('10');
    expect(component.esInvalido('cantidad')).toBe(false);
  });
});
