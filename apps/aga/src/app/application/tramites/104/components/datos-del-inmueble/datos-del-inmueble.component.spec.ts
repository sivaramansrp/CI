import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelInmuebleComponent } from './datos-del-inmueble.component';
import { FormBuilder } from '@angular/forms';
import { FormularioStore } from '../../../../core/estados/tramites/tramite104.store';
import { FormularioQuery } from '../../../../core/queries/tramite104.query';
import { of } from 'rxjs';

describe('DatosDelInmuebleComponent', () => {
  let componente: DatosDelInmuebleComponent;
  let fixture: ComponentFixture<DatosDelInmuebleComponent>;
  let formularioTienda: FormularioStore;
  let formularioConsulta: FormularioQuery;

  const FORMULARIO_EXPORTACION = { tipoPrograma: '1', folioAutorizacion: '12345' };
  const FORMULARIO_DIRECCION = { calle: 'Main St', numeroExterior: '100' };

  beforeEach(async () => {
    formularioTienda = {
      setFomentoExportacion: jest.fn(),
      setDireccion: jest.fn()
    } as Partial<FormularioStore> as FormularioStore;

    formularioConsulta = {
      fomentoExportacion$: of(FORMULARIO_EXPORTACION),
      direccion$: of(FORMULARIO_DIRECCION)
    } as Partial<FormularioQuery> as FormularioQuery;

    await TestBed.configureTestingModule({
      imports: [DatosDelInmuebleComponent],
      providers: [
        FormBuilder,
        { provide: FormularioStore, useValue: formularioTienda },
        { provide: FormularioQuery, useValue: formularioConsulta }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelInmuebleComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar los formularios correctamente', (): void => {
    expect(componente.fomentoExportacionForm).toBeDefined();
    expect(componente.formularioDireccion).toBeDefined();
  });

  it('debería establecer los valores de Akita en los formularios', (): void => {
    expect(componente.fomentoExportacionForm.value).toEqual(FORMULARIO_EXPORTACION);
    expect(componente.formularioDireccion.value.calle).toBe('Main St');
  });

  it('debería emitir el evento cerrarClicado al llamar cerrarModal', (): void => {
    jest.spyOn(componente.cerrarClicado, 'emit');
    componente.cerrarModal();
    expect(componente.cerrarClicado.emit).toHaveBeenCalled();
  });

  it('debería actualizar la tienda Akita cuando los valores del formulario cambien', (): void => {
    componente.fomentoExportacionForm.patchValue({ tipoPrograma: '2' });
    expect(formularioTienda.setFomentoExportacion).toHaveBeenCalledWith({ tipoPrograma: '2', folioAutorizacion: '12345' });

    componente.formularioDireccion.patchValue({ calle: 'New Street' });
    expect(formularioTienda.setDireccion).toHaveBeenCalledWith(expect.objectContaining({ calle: 'New Street' }));
  });
});
