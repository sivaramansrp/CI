import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { PersonaFisicaComponent } from './persona-fisica.component';
import { Tramite40402Store } from '../../../estados/tramite40402.store';
import { Tramite40402Query } from '../../../estados/tramite40402.query';
import { TransportacionMaritimaService } from '../../../../40402/services/transportacion-maritima/transportacion-maritima.service';
import { provideHttpClient } from '@angular/common/http';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src/core/queries/consulta.query';

describe('PersonaFisicaComponent', () => {
  let component: PersonaFisicaComponent;
  let tramite40402Store: Tramite40402Store;
  let transportacionMaritimaService: TransportacionMaritimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        FormBuilder,
        Tramite40402Store,
        Tramite40402Query,
        TransportacionMaritimaService,
      ],
    });

    tramite40402Store = TestBed.inject(Tramite40402Store);
    transportacionMaritimaService = TestBed.inject(TransportacionMaritimaService);
    component = new PersonaFisicaComponent(
      TestBed.inject(FormBuilder),
      tramite40402Store,
      TestBed.inject(Tramite40402Query),
      transportacionMaritimaService,
      TestBed.inject(ConsultaioQuery),
      {} as any
    );
  });

  describe('crearAgregarPFEForm', () => {
    it('should initialize the form with default values', () => {
      component.crearAgregarPFEForm();
      expect(component.personaFisicaExtranjeraForm).toBeDefined();
      expect(component.personaFisicaExtranjeraForm.get('nombrePFE')?.value).toBeNull();
      expect(component.personaFisicaExtranjeraForm.get('seguroNumero')?.value).toBeNull();
    });
  });

  describe('actualizarFormularioState', () => {
    it('should update the store with form values', () => {
      const spy = jest.spyOn(tramite40402Store, 'setNombrePFE');
      component.crearAgregarPFEForm();
      component.personaFisicaExtranjeraForm.get('nombrePFE')?.setValue('John');
      component.actualizarFormularioState();
      expect(spy).toHaveBeenCalledWith('John');
    });
  });

  describe('limpiarDatosPFE', () => {
    it('should reset the form and update the store', () => {
      const spy = jest.spyOn(component, 'actualizarFormularioState');
      component.crearAgregarPFEForm();
      component.personaFisicaExtranjeraForm.get('nombrePFE')?.setValue('John');
      component.limpiarDatosPFE();
      expect(component.personaFisicaExtranjeraForm.get('nombrePFE')?.value).toBeNull();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('agregarPFE', () => {
    it('should add a new person to the table and update the store', () => {
      const spy = jest.spyOn(tramite40402Store, 'setPersonaFisicaExtranjeraTabla');
      component.crearAgregarPFEForm();
      component.personaFisicaExtranjeraForm.setValue({
        seguroNumero: '12345678901',
        nombrePFE: 'John',
        apellidoPaternoPFE: 'Doe',
        apellidoMaternoPFE: 'Smith',
        correoPFE: 'john.doe@example.com',
        paisPFE: '1',
        codigoPostalPFE: '12345',
        ciudadPFE: 'New York',
        estadoPFE: 'NY',
        callePFE: '5th Avenue',
        numeroExteriorPFE: '123',
        numeroInteriorPFE: 'A',
      });

      component.agregarPFE(component.personaFisicaExtranjeraForm.getRawValue());
      expect(component.personaFisicaExtranjeraTabla.length).toBe(1);
      expect(spy).toHaveBeenCalledWith(component.personaFisicaExtranjeraTabla);
    });
  });
});