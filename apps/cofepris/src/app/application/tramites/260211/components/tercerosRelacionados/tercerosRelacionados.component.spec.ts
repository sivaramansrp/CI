import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosRelacionadosComponent } from './tercerosRelacionados.component';
import { SanitarioService } from '../../services/sanitario.service';
import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';
import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';
import { of, Subject } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let sanitarioServiceMock: any;
  let sanitarioStoreMock: any;
  let permisoQueryMock: any;

  beforeEach(() => {
    sanitarioServiceMock = {
      getTable: jest.fn().mockReturnValue(of([])),
      getProveedordata: jest.fn().mockReturnValue(of([])),
      getLocalidaddata: jest.fn().mockReturnValue(of([])),
    };

    sanitarioStoreMock = {
      update: jest.fn(),
    };

    permisoQueryMock = {
      selectSolicitud$: of({
        denominacion: 'Test Denominacion',
        numeroCalle: '123',
        experior: 'Exterior',
        interior: 'Interior',
        lada: '123',
        numerotelefono: '1234567890',
        correoElectronico: 'test@example.com',
      }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SanitarioService, useValue: sanitarioServiceMock },
        { provide: Sanitario260211Store, useValue: sanitarioStoreMock },
        { provide: Permiso260211Query, useValue: permisoQueryMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new TercerosRelacionadosComponent(fb, sanitarioServiceMock, sanitarioStoreMock, permisoQueryMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize proveedorForm on getRegistroForm', () => {
    component.getRegistroForm();
    expect(component.proveedorForm).toBeDefined();
    expect(component.proveedorForm.controls['denominacion'].value).toBe('Test Denominacion');
  });

  it('should initialize requeridaForm on getFormrequerida', () => {
    component.getFormrequerida();
    expect(component.requeridaForm).toBeDefined();
    expect(component.requeridaForm.controls['tiporfc'].value).toBe('Test Denominacion');
  });

  it('should load mercancias on loadMercancias', () => {
    component.loadMercancias();
    expect(sanitarioServiceMock.getTable).toHaveBeenCalled();
    expect(component.tercerosProd).toEqual([]);
  });

  it('should load proveedor list on loadComboUnidad', () => {
    component.loadComboUnidad();
    expect(sanitarioServiceMock.getProveedordata).toHaveBeenCalled();
    expect(component.proveedorList).toEqual([]);
  });

  it('should load localidad list on loadLocalidad', () => {
    component.loadLocalidad();
    expect(sanitarioServiceMock.getLocalidaddata).toHaveBeenCalled();
    expect(component.localidadList).toEqual([]);
  });

  it('should open modal and initialize proveedorForm on abrirModal', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
    expect(component.proveedorForm).toBeDefined();
  });

  it('should open modal and initialize requeridaForm on abrirModalrequerida', () => {
    component.abrirModalrequerida();
    expect(component.modal).toBe('show');
    expect(component.requeridaForm).toBeDefined();
  });

  it('should validate form fields using isValid', () => {
    component.getRegistroForm();
    const form = component.proveedorForm;
    form.controls['denominacion'].setValue('');
    form.controls['denominacion'].markAsTouched();
    expect(component.isValid(form, 'denominacion')).toBe(true);
  });

  it('should update store when setValoresStore is called', () => {
    component.getRegistroForm();
    const form = component.proveedorForm;
    form.controls['denominacion'].setValue('Updated Value');
    component.setValoresStore(form, 'denominacion', 'update');
    expect(sanitarioStoreMock.update).toHaveBeenCalledWith('Updated Value');
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });

  it('should handle valid form submission on guardarProveedor', () => {
    component.getRegistroForm();
    component.proveedorForm.controls['denominacion'].setValue('Valid Value');
    component.guardarProveedor();
    expect(component.proveedorForm.valid).toBe(true);
  });

  it('should handle invalid form submission on guardarProveedor', () => {
    component.getRegistroForm();
    component.proveedorForm.controls['denominacion'].setValue('');
    component.guardarProveedor();
    expect(component.proveedorForm.valid).toBe(false);
  });
});