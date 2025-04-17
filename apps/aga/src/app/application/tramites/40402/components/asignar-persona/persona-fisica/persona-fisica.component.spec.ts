import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonaFisicaComponent } from './persona-fisica.component';
import { TransportacionMaritimaService } from '../../../../40402/services/transportacion-maritima/transportacion-maritima.service';
import { Tramite40402Store } from '../../../estados/tramite40402.store';
import { of } from 'rxjs';

describe('PersonaFisicaComponent', () => {
  let component: PersonaFisicaComponent;
  let fixture: ComponentFixture<PersonaFisicaComponent>;
  let mockTransportacionMaritimaService: any;
  let mockTramite40402Store: any;

  beforeEach(async () => {
    mockTransportacionMaritimaService = {
      getPaisCatalogo: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Mexico' }] })),
    };
    mockTramite40402Store = {
      setPaisPFE: jest.fn(),
      setPersonaFisicaExtranjeraTabla: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, PersonaFisicaComponent],
      providers: [
        { provide: TransportacionMaritimaService, useValue: mockTransportacionMaritimaService },
        { provide: Tramite40402Store, useValue: mockTramite40402Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.personaFisicaExtranjeraForm).toBeDefined();
    const form = component.personaFisicaExtranjeraForm;
    expect(form.get('nombrePFE')?.value).toBeNull();
    expect(form.get('seguroNumero')?.value).toBeNull();
  });

  it('should validate required fields in the form', () => {
    const form = component.personaFisicaExtranjeraForm;
    form.get('nombrePFE')?.setValue('');
    form.get('seguroNumero')?.setValue('');
    expect(form.get('nombrePFE')?.valid).toBeFalsy();
    expect(form.get('seguroNumero')?.valid).toBeFalsy();
  });

  it('should call setValoresStore when a form control changes', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    const form = component.personaFisicaExtranjeraForm;
    form.get('nombrePFE')?.setValue('John');
    expect(spy).toHaveBeenCalledWith(form, 'nombrePFE', 'setNombrePFE');
  });

  it('should call agregarPFE and update the table', () => {
    const form = component.personaFisicaExtranjeraForm;
    form.setValue({
      seguroNumero: '12345678901',
      nombrePFE: 'John',
      apellidoPaternoPFE: 'Doe',
      apellidoMaternoPFE: 'Smith',
      correoPFE: 'john.doe@example.com',
      paisPFE: 1,
      codigoPostalPFE: '12345',
      ciudadPFE: 'Mexico City',
      estadoPFE: 'CDMX',
      callePFE: 'Main Street',
      numeroExteriorPFE: '123',
      numeroInteriorPFE: 'A',
    });

    component.agregarPFE(form.getRawValue());
    expect(component.personaFisicaExtranjeraTabla.length).toBe(1);
    expect(mockTramite40402Store.setPersonaFisicaExtranjeraTabla).toHaveBeenCalled();
  });

  it('should reset the form when limpiarDatosPFE is called', () => {
    const form = component.personaFisicaExtranjeraForm;
    form.setValue({
      seguroNumero: '12345678901',
      nombrePFE: 'John',
      apellidoPaternoPFE: 'Doe',
      apellidoMaternoPFE: 'Smith',
      correoPFE: 'john.doe@example.com',
      paisPFE: 1,
      codigoPostalPFE: '12345',
      ciudadPFE: 'Mexico City',
      estadoPFE: 'CDMX',
      callePFE: 'Main Street',
      numeroExteriorPFE: '123',
      numeroInteriorPFE: 'A',
    });

    component.limpiarDatosPFE();
    expect(form.get('nombrePFE')?.value).toBeNull();
    expect(form.get('seguroNumero')?.value).toBeNull();
  });

  it('should call setPaisPFE when a country is selected', () => {
    const form = component.personaFisicaExtranjeraForm;
    form.get('paisPFE')?.setValue(1);
    component.paisSeleccion();
    expect(mockTramite40402Store.setPaisPFE).toHaveBeenCalledWith(1);
  });
});