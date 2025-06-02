import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ConsultarCupoComponent } from './consultar-cupo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { of } from 'rxjs';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';

describe('ConsultarCupoComponent', () => {
  let component: ConsultarCupoComponent;
  let fixture: ComponentFixture<ConsultarCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarCupoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarCupoComponent);
    component = fixture.componentInstance;

    component.consultaState = {
      readonly: false,
    } as any;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set "mostrar" to true for "descripcion" when fraccionArancelaria has a value', () => {
    component.forma = new FormGroup({
      ninoFormGroup: new FormGroup({
        fraccionArancelaria: new FormControl('12345')
      })
    });
    component.consultarCupoFormData = [
      { campo: 'descripcion', mostrar: false, labelNombre: '', clase: '', tipoInput: '', desactivado: false },
      { campo: 'otroCampo', mostrar: false, labelNombre: '', clase: '', tipoInput: '', desactivado: false }
    ];
    component.mostrarCampoDeDescripcion();
    const descripcionField = component.consultarCupoFormData.find(f => f.campo === 'descripcion');
    expect(descripcionField?.mostrar).toBe(true);
  });

  it('should not change "mostrar" if fraccionArancelaria is empty', () => {
    component.forma = new FormGroup({
      ninoFormGroup: new FormGroup({
        fraccionArancelaria: new FormControl('')
      })
    });
    component.consultarCupoFormData = [
      { campo: 'descripcion', mostrar: false, labelNombre: '', clase: '', tipoInput: '', desactivado: false }
    ];
    component.mostrarCampoDeDescripcion();
    expect(component.consultarCupoFormData[0].mostrar).toBe(false);
  });
  
  it('should call store and service with correct values', () => {
    const event = { campo: 'descripcion', valor: 'valor1' };
    const setDynamicFieldValueSpy = jest.spyOn(component['tramite120101Store'], 'setDynamicFieldValue');
    const setFormValueSpy = jest.spyOn(component['servicioDeFormularioService'], 'setFormValue');
    component.establecerCambioDeValor(event);
    expect(setDynamicFieldValueSpy).toHaveBeenCalledWith('descripcion', 'valor1');
    expect(setFormValueSpy).toHaveBeenCalledWith('consultarCupoForm', { descripcion: 'valor1' });
  });  
  
  it('should do nothing if event is null', () => {
    const setDynamicFieldValueSpy = jest.spyOn(component['tramite120101Store'], 'setDynamicFieldValue');
    const setFormValueSpy = jest.spyOn(component['servicioDeFormularioService'], 'setFormValue');
  
    component.establecerCambioDeValor(null as any);
  
    expect(setDynamicFieldValueSpy).not.toHaveBeenCalled();
    expect(setFormValueSpy).not.toHaveBeenCalled();
  });

  it('should do nothing if event is null', () => {
    const setDynamicFieldValueSpy = jest.spyOn(component['tramite120101Store'], 'setDynamicFieldValue');
    const setFormValueSpy = jest.spyOn(component['servicioDeFormularioService'], 'setFormValue');
    component.establecerCambioDeValor(null as any);
    expect(setDynamicFieldValueSpy).not.toHaveBeenCalled();
    expect(setFormValueSpy).not.toHaveBeenCalled();
  });

  it('should not call service or update store if form is invalid', () => {
    component.ninoFormGroup.setErrors({ invalid: true });
    const mostrarSpy = jest.spyOn(component, 'mostrarCampoDeDescripcion');
    const serviceSpy = jest.spyOn(component['solicitudDeRegistroTplService'], 'obtenerTablaDatos');
    const storeSpy = jest.spyOn(component['tramite120101Store'], 'setDynamicFieldValue');
    component.buscar();
    expect(mostrarSpy).not.toHaveBeenCalled();
    expect(serviceSpy).not.toHaveBeenCalled();
    expect(storeSpy).not.toHaveBeenCalled();
  });

  it('should complete destroy$ on destroy', () => {
    const completeSpy = jest.spyOn(component.destroy$, 'complete');
    const nextSpy = jest.spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should fetch country data and update pais field options', fakeAsync(() => {
    const mockPaisData = [
      { id: 1, descripcion: 'Mexico' },
      { id: 2, descripcion: 'USA' },
    ];
    jest.spyOn(component['solicitudDeRegistroTplService'], 'getPaisData')
      .mockReturnValue(of(mockPaisData));
    component.consultarCupoFormData = [
      {
        campo: 'pais',
      } as ModeloDeFormaDinamica,
    ];
    component.obtenerPaisDatos();
    tick();
    expect(component.consultarCupoFormData[0].opciones).toEqual([
      { descripcion: 'Mexico', id: 1 },
      { descripcion: 'USA', id: 2 },
    ]);
  }));

  it('should fetch classification data and update clasificacion field options', fakeAsync(() => {
    const mockClasificacionData = [
      { id: 1, descripcion: 'Regimen 1' },
      { id: 2, descripcion: 'Regimen 2' },
    ];
    jest.spyOn(component['solicitudDeRegistroTplService'], 'getClasificacionRegimenData')
      .mockReturnValue(of(mockClasificacionData));
    component.consultarCupoFormData = [
      {
        campo: 'clasificacion',
      } as ModeloDeFormaDinamica,
    ];
    component.obtenerClasificacionRegimenDatos();
    tick();
    expect(component.consultarCupoFormData[0].opciones).toEqual([
      { descripcion: 'Regimen 1', id: 1 },
      { descripcion: 'Regimen 2', id: 2 },
    ]);
  }));
  
  
});
