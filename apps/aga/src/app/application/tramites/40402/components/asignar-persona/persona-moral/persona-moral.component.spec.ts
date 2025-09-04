import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { PersonaMoralComponent } from './persona-moral.component';
import { Tramite40402Store } from '../../../estados/tramite40402.store';
import { Tramite40402Query } from '../../../estados/tramite40402.query';
import { TransportacionMaritimaService } from '../../../../40402/services/transportacion-maritima/transportacion-maritima.service';
import { provideHttpClient } from '@angular/common/http';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src/core/queries/consulta.query';

describe('PersonaMoralComponent', () => {
  let component: PersonaMoralComponent;
  let tramite40402Store: Tramite40402Store;
  let transportacionMaritimaService: TransportacionMaritimaService;
  let consultaioQuery: ConsultaioQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        FormBuilder,
        Tramite40402Store,
        Tramite40402Query,
        TransportacionMaritimaService,
        ConsultaioQuery,
      ],
    });

    tramite40402Store = TestBed.inject(Tramite40402Store);
    transportacionMaritimaService = TestBed.inject(TransportacionMaritimaService);
    consultaioQuery = TestBed.inject(ConsultaioQuery);
    component = new PersonaMoralComponent(
      TestBed.inject(FormBuilder),
      tramite40402Store,
      TestBed.inject(Tramite40402Query),
      transportacionMaritimaService,
      consultaioQuery
    );
  });

  describe('crearAgregarPMNForm', () => {
    it('should initialize the form with default values', () => {
      component.crearAgregarPMNForm();
      expect(component.personaMoralExtranjeraForm).toBeDefined();
      expect(component.personaMoralExtranjeraForm.get('denominacionPME')?.value).toBeNull();
      expect(component.personaMoralExtranjeraForm.get('correoPME')?.value).toBeNull();
    });
  });

  describe('agregarPME', () => {
    it('should add a new person to the table and update the store', () => {
      const spy = jest.spyOn(tramite40402Store, 'setPersonaMoralExtranjeraTabla');
      component.crearAgregarPMNForm();
      component.personaMoralExtranjeraForm.setValue({
        denominacionPME: 'Empresa XYZ',
        correoPME: 'empresa@xyz.com',
        paisPME: '1',
        codigoPostalPME: '12345',
        ciudadPME: 'Ciudad XYZ',
        estadoPME: 'Estado XYZ',
        callePME: 'Calle XYZ',
        numeroExteriorPME: '123',
        numeroInteriorPME: 'A',
        nombreDG: 'John',
        apellidoPaternoDG: 'Doe',
        apellidoMaternoDG: 'Smith',
      });

      component.agregarPME(component.personaMoralExtranjeraForm.getRawValue());
      expect(component.personaMoralExtranjeraTabla.length).toBe(1);
      expect(spy).toHaveBeenCalledWith(component.personaMoralExtranjeraTabla);
    });
  });

  describe('limpiarDatosPME', () => {
    it('should reset the form and update the store', () => {
      const spy = jest.spyOn(component, 'actualizarFormularioState');
      component.crearAgregarPMNForm();
      component.personaMoralExtranjeraForm.get('denominacionPME')?.setValue('Empresa XYZ');
      component.limpiarDatosPME();
      expect(component.personaMoralExtranjeraForm.get('denominacionPME')?.value).toBeNull();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('actualizarFormularioState', () => {
    it('should update the store with form values', () => {
      const spy = jest.spyOn(tramite40402Store, 'setDenominacionPME');
      component.crearAgregarPMNForm();
      component.personaMoralExtranjeraForm.get('denominacionPME')?.setValue('Empresa XYZ');
      component.actualizarFormularioState();
      expect(spy).toHaveBeenCalledWith('Empresa XYZ');
    });
  });
});