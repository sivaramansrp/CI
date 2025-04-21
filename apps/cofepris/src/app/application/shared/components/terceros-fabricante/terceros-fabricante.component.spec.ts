import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-fabricante.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TercerosFabricanteService } from '../../services/terceros-fabricante.service';
import { TercerosFabricanteStore } from '../../estados/stores/terceros-fabricante.store';
import { of, Subject } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let mockService: jasmine.SpyObj<TercerosFabricanteService>;
  let mockStore: jasmine.SpyObj<TercerosFabricanteStore>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('TercerosFabricanteService', ['someMethod']);
    mockStore = jasmine.createSpyObj('TercerosFabricanteStore', ['setFabricante', 'setFormulador', 'setProveedor']);

    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TercerosFabricanteService, useValue: mockService },
        { provide: TercerosFabricanteStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;

    // Mock destroyNotifier$
    (component as any).destroyNotifier$ = new Subject<void>();

    fixture.detectChanges();
  });

  it('debería mostrar un mensaje de error si el formulario de fabricante es inválido al enviar', () => {
    component.agregarFabricanteFormGroup.setValue({
      tercerosNacionalidad: '',
      tipoPersona: '',
      rfc: '',
      curp: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      denominacionRazonSocial: '',
      pais: '',
      estadoLocalidad: '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: '',
      codigoPostaloEquivalente: '',
      colonia: '',
      coloniaoEquivalente: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      lada: '',
      telefono: '',
      correoElectronico: '',
      extranjeroCodigo: '',
      extranjeroEstado: '',
      extranjeroColonia: '',
    });

    component.submitFabricanteForm();
    expect(component.agregarFabricanteFormGroup.invalid).toBeTruthy();
    expect(component.fabricanteRowData.length).toBe(0);
  });

  it('debería alternar correctamente entre las secciones de formularios y tabla', () => {
    component.toggleDivFabricante();
    expect(component.showFabricante).toBeTruthy();
    expect(component.showTableDiv).toBeFalsy();

    component.toggleDivFormulador();
    expect(component.showFormulador).toBeTruthy();
    expect(component.showFabricante).toBeFalsy();

    component.toggleDivProveedor();
    expect(component.showProveedor).toBeTruthy();
    expect(component.showFormulador).toBeFalsy();
  });

  it('debería agregar un formulador al enviar el formulario', () => {
    component.agregarFormuladorFormGroup.setValue({
      tercerosNacionalidad: 'Extranjero',
      tipoPersona: 'Moral',
      rfc: 'XEXX010101000',
      curp: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      denominacionRazonSocial: 'Empresa Internacional S.A.',
      pais: 'Estados Unidos',
      estadoLocalidad: 'California',
      municipioAlcaldia: 'Los Angeles',
      localidad: 'Downtown',
      entidadFederativa: '',
      codigoPostaloEquivalente: '90001',
      colonia: '',
      coloniaoEquivalente: '',
      calle: 'Main Street',
      numeroExterior: '456',
      numeroInterior: '',
      lada: '1',
      telefono: '987654321',
      correoElectronico: 'contact@empresa.com',
      extranjeroCodigo: 'US',
      extranjeroEstado: 'CA',
      extranjeroColonia: 'Downtown',
    });

    component.submitFormuladorForm();
    expect(component.formuladorRowData.length).toBe(1);
    expect(mockStore.setFormulador).toHaveBeenCalledWith(component.formuladorRowData);
  });

  it('debería manejar correctamente el cambio de tipo de persona', () => {
    component.tipoPersonaSelection = 'Física';
    component.onTipoPersonaChange(component.agregarFabricanteFormGroup);
    expect(component.fisica).toBeTruthy();
    expect(component.moral).toBeFalsy();

    component.tipoPersonaSelection = 'Moral';
    component.onTipoPersonaChange(component.agregarFabricanteFormGroup);
    expect(component.moral).toBeTruthy();
    expect(component.fisica).toBeFalsy();
  });

  it('debería destruir los observables al destruir el componente', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería validar correctamente el RFC', () => {
    const control = component.agregarFabricanteFormGroup.get('rfc');
    control?.setValue('XAXX010101000');
    expect(TercerosRelacionadosComponent.rfcValidator(control!)).toBeNull();

    control?.setValue('INVALIDO');
    expect(TercerosRelacionadosComponent.rfcValidator(control!)).toEqual({
      invalidRFC: true,
    });
  });

  it('debería validar correctamente la CURP', () => {
    const control = component.agregarFabricanteFormGroup.get('curp');
    control?.setValue('XAXX010101HDFXXX01');
    expect(TercerosRelacionadosComponent.curpValidator(control!)).toBeNull();

    control?.setValue('INVALIDO');
    expect(TercerosRelacionadosComponent.curpValidator(control!)).toEqual({
      invalidCURP: true,
    });
  });
});