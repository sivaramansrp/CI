import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PartidasDeLaMercanciaComponent], // Import standalone component
    }).compileComponents();
  
    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    component.partidasDelaMercanciaForm = formBuilder.group({
      cantidadPartidasDeLaMercancia: ['', Validators.required],
      nombrePartida: ['', Validators.required],
      descripcionPartidasDeLaMercancia: ['', Validators.required], 
      valorPartidaUSDPartidasDeLaMercancia: ['', Validators.required], 
    });
  
    fixture.detectChanges(); 
  });
  
  
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if form control is invalid in esInvalido', () => {
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].setValue('');
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].markAsTouched();

    const isInvalid = component.esInvalido('cantidadPartidasDeLaMercancia');
    expect(isInvalid).toBe(true);
  });

  it('should return false if form control is valid in esInvalido', () => {
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].setValue('Valid Value');
    component.partidasDelaMercanciaForm.controls['cantidadPartidasDeLaMercancia'].markAsTouched();

    const isInvalid = component.esInvalido('cantidadPartidasDeLaMercancia');
    expect(isInvalid).toBe(false);
  });

  it('should emit filaSeleccionadaChange when handleListaDeFilaSeleccionada is called', () => {
    const emitSpy = spyOn(component.filaSeleccionadaChange, 'emit');
    const filasSeleccionadas = [{ id: 1 }, { id: 2 }];

    component.handleListaDeFilaSeleccionada(filasSeleccionadas);

    expect(emitSpy).toHaveBeenCalledWith(filasSeleccionadas);
  });

  it('should emit validarYEnviarFormularioEvent when validarYEnviarFormulario is called', () => {
    const emitSpy = spyOn(component.validarYEnviarFormularioEvent, 'emit');

    component.validarYEnviarFormulario();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit navegarParaModificarPartidaEvent when navegarParaModificarPartida is called', () => {
    const emitSpy = spyOn(component.navegarParaModificarPartidaEvent, 'emit');

    component.navegarParaModificarPartida();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit setValoresStoreEvent with correct arguments when setValoresStore is called', () => {
    const emitSpy = spyOn(component.setValoresStoreEvent, 'emit');
    const testForm = formBuilder.group({
      testControl: ['', Validators.required],
    });
    const testCampo = 'testCampo';
    const testMetodoNombre = 'testMetodoNombre';

    component.setValoresStore(testForm, testCampo, testMetodoNombre);

    expect(emitSpy).toHaveBeenCalledWith({
      form: testForm,
      campo: testCampo,
      metodoNombre: testMetodoNombre,
    });
  });
});
