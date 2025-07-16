import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ModificarDestinatarioComponent } from './modificar-destinatario.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
// Add missing imports for providers used in the test
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mocks
const mockSolicitudDatosService = {
  obtenerDestinatarioCatalogos: jest.fn().mockReturnValue(of({
    paisCatalogo: { id: 1 },
    estadoCatalogo: { id: 2 },
    municipioCatalogo: { id: 3 },
    localidadCatalogo: { id: 4 },
    codigoCatalogo: { id: 5 },
    coloniaCatalogo: { id: 6 }
  })),
  obtenerDestinatarioRadio: jest.fn().mockReturnValue(of([
    { label: 'Moral', value: 'moral' },
    { label: 'Física', value: 'fisica' }
  ])),
  obtenerDestinatarioImitar: jest.fn().mockReturnValue(of({ domicilioPais: 1 }))
};

const mockSolicitud260101Store = {
  setDomicilioPais: jest.fn(),
  setTipoPersona: jest.fn(),
  setModificarRFC: jest.fn(),
  setDenominacion: jest.fn(),
  setDomicilioEstado: jest.fn(),
  setDomicilioMunicipio: jest.fn(),
  setDomicilioLocalidad: jest.fn(),
  setDomicilioCodigo: jest.fn(),
  setDomicilioColonia: jest.fn(),
  setDomicilioCalle: jest.fn(),
  setDomicilioNumeroExterior: jest.fn(),
  setDomicilioNumeroInterior: jest.fn(),
  setDomicilioLada: jest.fn(),
  setDomicilioTelefono: jest.fn(),
  setDomicilioCorreoElectronico: jest.fn(),
  addDestinatarioDato: jest.fn()
};

const mockSolicitud260101Query = {
  seleccionarSolicitud$: of({
    tipoPersona: 'moral',
    modificarRFC: 'RFC123456789',
    denominacion: 'Empresa S.A.',
    domicilioPais: 1,
    domicilioEstado: 2,
    domicilioMunicipio: 3,
    domicilioLocalidad: 4,
    domicilioCodigo: '12345',
    domicilioColonia: 'Centro',
    domiciliCalle: 'Calle 1',
    domiciliNumeroExterior: '10',
    domiciliNumeroInterior: '2',
    domiciliLada: '55',
    domiciliTelefono: '1234567890',
    domiciliCorreoElectronioco: 'test@email.com'
  })
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false })
};

describe('ModificarDestinatarioComponent', () => {
  let component: ModificarDestinatarioComponent;
  let fixture: ComponentFixture<ModificarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
          ModificarDestinatarioComponent,
              CommonModule,
              ReactiveFormsModule,
              CatalogoSelectComponent,
              FormsModule,
              InputRadioComponent,
              TituloComponent,
              HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    })
      .overrideComponent(ModificarDestinatarioComponent, {
        set: {
          providers: [
            { provide: FormBuilder, useValue: new FormBuilder() },
            { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
            { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
            { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
            { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ModificarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from state', () => {
    component.inicializarFormulario();
    expect(component.modificarDestinatarioForm.value.denominacion).toBe('Empresa S.A.');
    expect(component.modificarDestinatarioForm.value.modificarRFC).toBe('RFC123456789');
  });

  it('should call setTipoPersona on setTipoPersona', () => {
    component.setTipoPersona('fisica');
    expect(mockSolicitud260101Store.setTipoPersona).toHaveBeenCalledWith('fisica');
  });

  it('should call setModificarRFC on setModificarRFC', () => {
    const event = { target: { value: 'RFC987654321' } } as any;
    component.setModificarRFC(event);
    expect(mockSolicitud260101Store.setModificarRFC).toHaveBeenCalledWith('RFC987654321');
  });

  it('should call setDenominacion on setDenominacion', () => {
    const event = { target: { value: 'Nueva Empresa' } } as any;
    component.setDenominacion(event);
    expect(mockSolicitud260101Store.setDenominacion).toHaveBeenCalledWith('Nueva Empresa');
  });

  it('should call setDomicilioPais on seleccionaPais', () => {
    component.seleccionaPais({ id: 99 } as any);
    expect(mockSolicitud260101Store.setDomicilioPais).toHaveBeenCalledWith(99);
  });

  it('should call setDomicilioEstado on seleccionaEstado', () => {
    component.seleccionaEstado({ id: 88 } as any);
    expect(mockSolicitud260101Store.setDomicilioEstado).toHaveBeenCalledWith(88);
  });

  it('should call setDomicilioMunicipio on seleccionaMunicipio', () => {
    component.seleccionaMunicipio({ id: 77 } as any);
    expect(mockSolicitud260101Store.setDomicilioMunicipio).toHaveBeenCalledWith(77);
  });

  it('should call setDomicilioLocalidad on seleccionaLocalidad', () => {
    component.seleccionaLocalidad({ id: 66 } as any);
    expect(mockSolicitud260101Store.setDomicilioLocalidad).toHaveBeenCalledWith(66);
  });

  it('should call setDomicilioCodigo on seleccionaCodigo', () => {
    component.seleccionaCodigo({ id: 55 } as any);
    expect(mockSolicitud260101Store.setDomicilioCodigo).toHaveBeenCalledWith(55);
  });

  it('should call setDomicilioColonia on seleccionaColonia', () => {
    component.seleccionaColonia({ id: 44 } as any);
    expect(mockSolicitud260101Store.setDomicilioColonia).toHaveBeenCalledWith(44);
  });

  it('should reset the form on limpiarDestinatario', () => {
    component.inicializarFormulario();
    component.modificarDestinatarioForm.patchValue({ denominacion: 'Test' });
    component.limpiarDestinatario();
    expect(component.modificarDestinatarioForm.value.denominacion).toBeNull();
  });

  it('should not call addDestinatarioDato if form is invalid', () => {
    component.inicializarFormulario();
    component.modificarDestinatarioForm.get('denominacion')?.setValue('');
    component.guardarDestinatario();
    expect(mockSolicitud260101Store.addDestinatarioDato).not.toHaveBeenCalled();
  });

  it('should call addDestinatarioDato if form is valid', () => {
    component.inicializarFormulario();
    component.modificarDestinatarioForm.get('denominacion')?.setValue('Empresa S.A.');
    component.modificarDestinatarioForm.get('modificarRFC')?.setValue('RFC123456789');
    component.guardarDestinatario();
    expect(mockSolicitud260101Store.addDestinatarioDato).toHaveBeenCalled();
  });

  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.modificarDestinatarioForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.modificarDestinatarioForm.enabled).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});