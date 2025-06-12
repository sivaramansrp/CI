import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PARTIDASDELAMERCANCIA_TABLA } from '../../../../shared/constantes/partidas-de-la-mercancia.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [PartidasDeLaMercanciaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Create mock forms
    component.partidasDelaMercanciaForm = formBuilder.group({
      descripcion: ['']
    });

    component.formForTotalCount = formBuilder.group({
      total: [0]
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.ngOnChanges({
      esFormularioSoloLectura: {
        currentValue: true,
        previousValue: false,
        isFirstChange: () => false,
        firstChange: false
      }
    });

    expect(component.partidasDelaMercanciaForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.ngOnChanges({
      esFormularioSoloLectura: {
        currentValue: false,
        previousValue: true,
        isFirstChange: () => false,
        firstChange: false
      }
    });

    expect(component.partidasDelaMercanciaForm.enabled).toBe(true);
  });

  it('should return true if control is invalid', () => {
    const controlName = 'descripcion';
    component.partidasDelaMercanciaForm.get(controlName)?.markAsTouched();
    expect(component.esInvalido(controlName)).toBe(true);
  });

  it('should emit filaSeleccionadaChange on handleListaDeFilaSeleccionada', () => {
    const spy = jest.spyOn(component.filaSeleccionadaChange, 'emit');
    const mockRows = [{ id: 1 }, { id: 2 }];
    component.handleListaDeFilaSeleccionada(mockRows);
    expect(spy).toHaveBeenCalledWith(mockRows);
  });

  it('should emit validarYEnviarFormularioEvent on validarYEnviarFormulario', () => {
    const spy = jest.spyOn(component.validarYEnviarFormularioEvent, 'emit');
    component.validarYEnviarFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit navegarParaModificarPartidaEvent on navegarParaModificarPartida', () => {
    const spy = jest.spyOn(component.navegarParaModificarPartidaEvent, 'emit');
    component.navegarParaModificarPartida();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit setValoresStoreEvent with correct data', () => {
    const spy = jest.spyOn(component.setValoresStoreEvent, 'emit');
    const mockForm = component.partidasDelaMercanciaForm;
    const campo = 'descripcion';
    component.setValoresStore(mockForm, campo);
    expect(spy).toHaveBeenCalledWith({ form: mockForm, campo });
  });

  it('should use correct table header and selection type', () => {
    expect(component.tableHeaderData).toEqual(PARTIDASDELAMERCANCIA_TABLA);
    expect(component.CHECKBOX).toBe(TablaSeleccion.CHECKBOX);
  });
});
