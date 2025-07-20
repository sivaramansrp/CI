import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnlaceComponent } from './enlace.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite32615TercerosQuery } from '../../../../estados/queries/tramite32615_terceros.query';
import { Tramite32615TercerosStore } from '../../../../estados/tramites/tramite32615_terceros.store';

describe('EnlaceComponent', () => {
  let component: EnlaceComponent;
  let fixture: ComponentFixture<EnlaceComponent>;
  let tramite32615QueryMock: Partial<Tramite32615TercerosQuery>;
  let tramite32615StoreMock: Partial<Tramite32615TercerosStore>;

  beforeEach(async () => {
    tramite32615QueryMock = {
      selectSolicitud$: of({
        resigtro: '12345',
        resigtroFedral: '12345',
        cargo: 'Manager',
        telefono: '1234567890',
        telefonoEnlace: '1234567890',
        correo: 'test@example.com',
        correoEnlace: 'test@example.com',
        suplente: 'John Doe',
      }),
    };

    tramite32615StoreMock = {
      setResigtroFedral: jest.fn(),
      setCargo: jest.fn(),
      setTelefonoEnlace: jest.fn(),
      setCorreoEnlace: jest.fn(),
      setSuplente: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,
      EnlaceComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite32615TercerosQuery, useValue: tramite32615QueryMock },
        { provide: Tramite32615TercerosStore, useValue: tramite32615StoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.enlace).toBeDefined();
    expect(component.enlace.get('resigtroFedral')?.value).toBe('12345');
    expect(component.enlace.get('cargo')?.value).toBe('Manager');
  });

  it('should load enlace header data from JSON', () => {
    component.getEnlace();
    expect(component.enlaceHeaderData).toBeDefined();
    expect(component.enlaceHeaderData.length).toBeGreaterThan(0);
  });

  it('should open the modal and initialize the form', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
    expect(component.enlace).toBeDefined();
  });

  it('should patch form data with representative data', () => {
    component.patchData();
    expect(component.enlace.get('rfc')?.value).toBe(component.representativeData.rfc);
    expect(component.enlace.get('nombre')?.value).toBe(component.representativeData.nombre);
    expect(component.enlace.get('apellidoPaterno')?.value).toBe(component.representativeData.apellidoPaterno);
    expect(component.enlace.get('apellidoMaterno')?.value).toBe(component.representativeData.apellidoMaterno);
    expect(component.enlace.get('cuidad')?.value).toBe(component.representativeData.cuidad);
  });

  it('should disable specific form fields after patching data', () => {
    component.patchData();
    expect(component.enlace.get('rfc')?.disabled).toBe(true);
    expect(component.enlace.get('nombre')?.disabled).toBe(true);
    expect(component.enlace.get('apellidoPaterno')?.disabled).toBe(true);
    expect(component.enlace.get('apellidoMaterno')?.disabled).toBe(true);
    expect(component.enlace.get('cuidad')?.disabled).toBe(true);
  });

  it('should set values in the store', () => {
    const form = component.enlace;
    form.get('resigtroFedral')?.setValue('67890');
    component.setValoresStore(form, 'resigtroFedral', 'setResigtroFedral');
    expect(tramite32615StoreMock.setResigtroFedral).toHaveBeenCalledWith('67890');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('should validate required fields in the form', () => {
    component.enlace.get('resigtroFedral')?.setValue('');
    component.enlace.get('cargo')?.setValue('');
    expect(component.enlace.get('resigtroFedral')?.valid).toBe(false);
    expect(component.enlace.get('cargo')?.valid).toBe(false);
  });

  it('should handle modal visibility correctly', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
    component.modal = 'hide';
    expect(component.modal).toBe('hide');
  });
});
