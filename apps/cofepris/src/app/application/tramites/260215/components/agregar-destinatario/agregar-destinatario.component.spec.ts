import { TestBed } from '@angular/core/testing';
import { AgregarDestinatarioComponent } from './agregar-destinatario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Sanitario260215Store } from '../../estados/tramites/sanitario260215.store';
import { Permiso260215Query } from '../../estados/queries/permiso260215.query';

describe('AgregarDestinatarioComponent', () => {
  let component: AgregarDestinatarioComponent;
  let sanitarioServiceMock: any;
  let sanitarioStoreMock: any;
  let permisoQueryMock: any;

  beforeEach(() => {
    sanitarioServiceMock = {
      getTable: jest.fn().mockReturnValue(of([{ Nombre: 'Test', RFC: 'RFC123', CURP: 'CURP123', Teléfono: '1234567890', CorreoElectrónico: 'test@example.com', calle: 'Test Street' }])),
      getLocalidaddata: jest.fn().mockReturnValue(of([{ id: 1, name: 'Localidad 1' }])),
    };

    sanitarioStoreMock = {
      updateField: jest.fn(),
    };

    permisoQueryMock = {
      selectSolicitud$: of({
        destinatariorfc: 'RFC123',
        destinatariodenominacion: 'Denominacion Test',
        destinatarionumeroCalle: '123',
        destinatarioexperior: '456',
        destinatariointerior: '789',
        destinatariolada: '52',
        destinatarionumerotelefono: '1234567890',
        destinatariocorreoElectronico: 'test@example.com',
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

    const fixture = TestBed.createComponent(AgregarDestinatarioComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and load data', () => {
    const loadMercanciasSpy = jest.spyOn(component, 'loadMercancias');
    const loadLocalidadSpy = jest.spyOn(component, 'loadLocalidad');
    const getDestinatarioSpy = jest.spyOn(component, 'getDestinatario');

    component.ngOnInit();

    expect(loadMercanciasSpy).toHaveBeenCalled();
    expect(loadLocalidadSpy).toHaveBeenCalled();
    expect(getDestinatarioSpy).toHaveBeenCalled();
    expect(component.solicitudState).toBeDefined();
  });

  it('should load mercancias data', () => {
    component.loadMercancias();
    expect(sanitarioServiceMock.getTable).toHaveBeenCalled();
    expect(component.tercerosProd.length).toBeGreaterThan(0);
  });

  it('should load localidad data', () => {
    component.loadLocalidad();
    expect(sanitarioServiceMock.getLocalidaddata).toHaveBeenCalled();
    expect(component.localidadList.length).toBeGreaterThan(0);
  });

  it('should initialize the destinatario form', () => {
    component.getDestinatario();
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.controls['destinatariorfc'].value).toBe('RFC123');
  });

  it('should validate form fields correctly', () => {
    component.getDestinatario();
    const form = component.destinatarioForm;

    form.controls['destinatariorfc'].setValue('');
    expect(component.isValid(form, 'destinatariorfc')).toBe(true);

    form.controls['destinatariorfc'].setValue('RFC123');
    expect(component.isValid(form, 'destinatariorfc')).toBe(false);
  });

  it('should open the modal and initialize destinatario form', () => {
    const getDestinatarioSpy = jest.spyOn(component, 'getDestinatario');
    component.abrirModaldestinatario();
    expect(component.modal).toBe('show');
    expect(getDestinatarioSpy).toHaveBeenCalled();
  });

  it('should update store values', () => {
    component.getDestinatario();
    const form = component.destinatarioForm;

    form.controls['destinatariorfc'].setValue('NewRFC');
    component.setValoresStore(form, 'destinatariorfc', 'updateField' as any);

    expect(sanitarioStoreMock.updateField).toHaveBeenCalledWith('NewRFC');
  });

  it('should clean up observables on destroy', () => {
    const destroyedNextSpy = jest.spyOn(component['destroyed$'], 'next');
    const destroyedCompleteSpy = jest.spyOn(component['destroyed$'], 'complete');
    const destroyNotifierNextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedNextSpy).toHaveBeenCalled();
    expect(destroyedCompleteSpy).toHaveBeenCalled();
    expect(destroyNotifierNextSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});