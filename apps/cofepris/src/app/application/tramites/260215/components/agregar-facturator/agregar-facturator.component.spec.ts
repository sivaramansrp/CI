import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Sanitario260215Store } from '../../estados/tramites/sanitario260215.store';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Permiso260215Query } from '../../estados/queries/permiso260215.query';
import { AgregarFacturatorComponent } from './agregar-facturator.component';

describe('AgregarFacturatorComponent', () => {
  let component: AgregarFacturatorComponent;
  let sanitarioServiceMock: any;
  let sanitarioStoreMock: any;
  let permisoQueryMock: any;

  beforeEach(() => {
    sanitarioServiceMock = {
      getTable: jest.fn().mockReturnValue(of([])),
      getLocalidaddata: jest.fn().mockReturnValue(of([])),
    };

    sanitarioStoreMock = {
      update: jest.fn(),
    };

    permisoQueryMock = {
      selectSolicitud$: of({
        nombres: 'Test Name',
        facturatorapellido: 'Test Last Name',
        facturatorsapellido: 'Test Second Last Name',
        facturatorestado: 'Test State',
        facturatorcalle: 'Test Street',
        facturatorexperior: '123',
        facturatorlada: '456',
        facturatorElectronico: 'test@example.com',
      }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ServiciosPermisoSanitarioService, useValue: sanitarioServiceMock },
        { provide: Sanitario260215Store, useValue: sanitarioStoreMock },
        { provide: Permiso260215Query, useValue: permisoQueryMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new AgregarFacturatorComponent(fb, sanitarioServiceMock, sanitarioStoreMock, permisoQueryMock);
    component.ngOnInit(); // Ensure ngOnInit is called to initialize the component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize facturatorForm on getFacturator', () => {
    component.getFacturator();
    expect(component.facturatorForm).toBeDefined();
    expect(component.facturatorForm.controls['nombres'].value).toBe('Test Name');
  });

  it('should load mercancias on loadMercancias', () => {
    component.loadMercancias();
    expect(sanitarioServiceMock.getTable).toHaveBeenCalled();
    expect(component.tercerosProd).toEqual([]);
  });

  it('should load localidad list on loadLocalidad', () => {
    component.loadLocalidad();
    expect(sanitarioServiceMock.getLocalidaddata).toHaveBeenCalled();
    expect(component.localidadList).toEqual([]);
  });

  it('should open modal and initialize facturatorForm on abrirModalfacurator', () => {
    component.abrirModalfacurator();
    expect(component.modal).toBe('show');
    expect(component.facturatorForm).toBeDefined();
  });

  it('should validate form fields using isValid', () => {
    component.getFacturator();
    const form = component.facturatorForm;
    form.controls['nombres'].setValue('');
    form.controls['nombres'].markAsTouched();
    expect(component.isValid(form, 'nombres')).toBe(true);
  });

  it('should update store when setValoresStore is called', () => {
    component.getFacturator();
    const form = component.facturatorForm;
    form.controls['nombres'].setValue('Updated Name');
    component.setValoresStore(form, 'nombres', 'update');
    expect(sanitarioStoreMock.update).toHaveBeenCalledWith('Updated Name');
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalledTimes(1);
    expect(destroyNotifierSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle valid form submission', () => {
    component.getFacturator();
    component.facturatorForm.controls['nombres'].setValue('Valid Name');
    component.facturatorForm.controls['facturatorapellido'].setValue('Valid Last Name');
    component.facturatorForm.controls['facturatorestado'].setValue('Valid State');
    component.facturatorForm.controls['facturatorcalle'].setValue('Valid Street');
    component.facturatorForm.controls['facturatorexperior'].setValue('123');
    component.facturatorForm.controls['facturatorlada'].setValue('456');
    component.facturatorForm.controls['facturatorElectronico'].setValue('valid@example.com');
    expect(component.facturatorForm.valid).toBe(true);
  });

  it('should handle invalid form submission', () => {
    component.getFacturator();
    component.facturatorForm.controls['nombres'].setValue('');
    expect(component.facturatorForm.valid).toBe(false);
  });
});