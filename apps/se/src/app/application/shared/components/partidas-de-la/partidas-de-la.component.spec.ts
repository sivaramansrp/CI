import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PartidasDeLaComponent } from './partidas-de-la.component';
import { EventEmitter } from '@angular/core';

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

  
    component.form = new FormBuilder().group({
      testField: [''],
    });
    component.formForTotalCount = new FormBuilder().group({
      totalField: [''],
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
      field: ['value'],
    });
    const campo = 'field';
    const metodoNombre = 'testMethod';
    jest.spyOn(component.setValoresStoreEvent, 'emit');

    component.setValoresStore(form, campo, metodoNombre);

    expect(component.setValoresStoreEvent.emit).toHaveBeenCalledWith({
      form,
      campo,
      metodoNombre,
    });
  });

  it('should return true if form control is invalid in esInvalido', () => {
    component.form.get('testField')?.setValidators(() => ({ invalid: true }));
    component.form.get('testField')?.markAsTouched();

    expect(component.esInvalido('testField')).toBe(true);
  });

  it('should return false if form control is valid in esInvalido', () => {
    component.form.get('testField')?.setValidators(() => null);
    component.form.get('testField')?.markAsTouched();

    expect(component.esInvalido('testField')).toBe(false);
  });
});