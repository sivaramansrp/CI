import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelInmuebleComponent } from './datos-del-inmueble.component';
import { FormBuilder } from '@angular/forms';
import { FormularioStore } from '../../../../core/estados/tramites/tramite104.store';
import { FormularioQuery } from '../../../../core/queries/tramite104.query';
import { of } from 'rxjs';

describe('DatosDelInmuebleComponent', () => {
  let component: DatosDelInmuebleComponent;
  let fixture: ComponentFixture<DatosDelInmuebleComponent>;
  let formularioStore: FormularioStore;
  let formularioQuery: FormularioQuery;

  beforeEach(async () => {
    formularioStore = {
      setFomentoExportacion: jest.fn(),
      setDireccion: jest.fn()
    } as unknown as FormularioStore;

    formularioQuery = {
      fomentoExportacion$: of({ tipoPrograma: '1', folioAutorizacion: '12345' }),
      direccion$: of({ calle: 'Main St', numeroExterior: '100' })
    } as unknown as FormularioQuery;

    await TestBed.configureTestingModule({
      imports: [DatosDelInmuebleComponent], // ✅ Import instead of declaring
      providers: [
        FormBuilder,
        { provide: FormularioStore, useValue: formularioStore },
        { provide: FormularioQuery, useValue: formularioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly', () => {
    expect(component.fomentoExportacionForm).toBeDefined();
    expect(component.formularioDireccion).toBeDefined();
  });

  it('should patch values from Akita store', () => {
    expect(component.fomentoExportacionForm.value).toEqual({ tipoPrograma: '1', folioAutorizacion: '12345' });
    expect(component.formularioDireccion.value.calle).toBe('Main St');
  });

  it('should emit cerrarClicado event on cerrarModal', () => {
    jest.spyOn(component.cerrarClicado, 'emit');
    component.cerrarModal();
    expect(component.cerrarClicado.emit).toHaveBeenCalled();
  });

  it('should update Akita store when form values change', () => {
    component.fomentoExportacionForm.patchValue({ tipoPrograma: '2' });
    expect(formularioStore.setFomentoExportacion).toHaveBeenCalledWith({ tipoPrograma: '2', folioAutorizacion: '12345' });

    component.formularioDireccion.patchValue({ calle: 'New Street' });
    expect(formularioStore.setDireccion).toHaveBeenCalledWith(expect.objectContaining({ calle: 'New Street' }));
  });
});
