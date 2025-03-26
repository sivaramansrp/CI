import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PartidasDeLaMercanciaComponent], // Import standalone component
    }).compileComponents();
  
    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    component.partidasDelaMercanciaForm = new FormGroup({
      cantidadPartidasDeLaMercancia: new FormControl(''),
      nombrePartida: new FormControl(''), // Add the missing 'bloque' control
      descripcionPartidasDeLaMercancia: new FormControl(''), // Add the missing 'usoEspecifico' control
      valorPartidaUSDPartidasDeLaMercancia: new FormControl(''), // Add the missing 'justificacionImportacionExportacion' control
        });

        component.formForTotalCount = new FormGroup({
          cantidadTotal: new FormControl('', Validators.required),
          valorTotalUSD: new FormControl('', Validators.required),
        });

    fixture.detectChanges(); 
  });
  
  
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filaSeleccionadaChange when handleListaDeFilaSeleccionada is called', () => {
    const emitSpy = jest.spyOn(component.filaSeleccionadaChange, 'emit');
    const filasSeleccionadas = [{ id: 1 }, { id: 2 }];

    component.handleListaDeFilaSeleccionada(filasSeleccionadas);

    expect(emitSpy).toHaveBeenCalledWith(filasSeleccionadas);
  });

  it('should emit validarYEnviarFormularioEvent when validarYEnviarFormulario is called', () => {
    const emitSpy = jest.spyOn(component.validarYEnviarFormularioEvent, 'emit');

    component.validarYEnviarFormulario();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit navegarParaModificarPartidaEvent when navegarParaModificarPartida is called', () => {
    const emitSpy = jest.spyOn(component.navegarParaModificarPartidaEvent, 'emit');

    component.navegarParaModificarPartida();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit setValoresStoreEvent with correct arguments when setValoresStore is called', () => {
    const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit');
    const testForm = new FormGroup({
      testControl: new FormControl('')
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
