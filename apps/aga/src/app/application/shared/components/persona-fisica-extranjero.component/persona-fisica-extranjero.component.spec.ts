import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaFisicaExtranjeroComponent } from './persona-fisica-extranjero.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Tramite630104Query } from '../../../tramites/630104/estados/queries/tramite630104.query';
import { Tramite630104Store } from '../../../tramites/630104/estados/tramites/tramite630104.store';
import { of, Subject } from 'rxjs';

describe('PersonaFisicaExtranjeroComponent', () => {
  let component: PersonaFisicaExtranjeroComponent;
  let fixture: ComponentFixture<PersonaFisicaExtranjeroComponent>;
  let tramite630104QueryMock: Partial<Tramite630104Query>;
  let tramite630104StoreMock: Partial<Tramite630104Store>;

  beforeEach(async () => {
    tramite630104QueryMock = {
      select: jest.fn().mockReturnValue(of({
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
        calle: 'Main Street',
        numeroExterior: '123',
        numeroInterior: 'A',
        pais: 'USA',
        estadoLocalidad: 'California',
        correoElectronico: 'john.doe@example.com',
        telefono: '1234567890',
        codigoPostal: '90001',
      })),
    };

    tramite630104StoreMock = {
      setCvePaisFabricante: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PersonaFisicaExtranjeroComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630104Query, useValue: tramite630104QueryMock },
        { provide: Tramite630104Store, useValue: tramite630104StoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaExtranjeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosDelFabricanteForm).toBeDefined();
    expect(component.datosDelFabricanteForm.get('nombre')?.value).toBe('John');
    expect(component.datosDelFabricanteForm.get('apellidoPaterno')?.value).toBe('Doe');
  });

  it('should call setCvePaisFabricante when paisSeleccion is called', () => {
    const setCvePaisFabricanteSpy = jest.spyOn(tramite630104StoreMock, 'setCvePaisFabricante');
    component.datosDelFabricanteForm.get('cvePaisFabricante')?.setValue('USA');
    component.paisSeleccion();
    expect(setCvePaisFabricanteSpy).toHaveBeenCalledWith('USA');
  });

  it('should call setValoresStore with the correct parameters', () => {
    const form = component.fb.group({
      nombre: ['John'],
    });
    const campo = 'nombre';
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.setValoresStore(form, campo);
    expect(setValoresStoreSpy).toHaveBeenCalledWith(form, campo);
  });

 

  it('should create the form with default values when crearDatosDelFabricanteForm is called', () => {
    component.crearDatosDelFabricanteForm();
    expect(component.datosDelFabricanteForm.get('nombre')?.value).toBe('John');
    expect(component.datosDelFabricanteForm.get('apellidoPaterno')?.value).toBe('Doe');
    expect(component.datosDelFabricanteForm.get('pais')?.value).toBe('USA');
  });
});