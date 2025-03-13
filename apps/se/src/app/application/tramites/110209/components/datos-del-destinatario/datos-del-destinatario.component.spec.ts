import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDelDestinatarioComponent } from './datos-del-destinatario.component';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { of } from 'rxjs';

jest.mock('../../estados/stores/tramite110209.store');
jest.mock('../../estados/queries/tramite110209.query');

describe('DatosDelDestinatarioComponent', () => {
  let component: DatosDelDestinatarioComponent;
  let fixture: ComponentFixture<DatosDelDestinatarioComponent>;
  let tramite110209StoreMock: Tramite110209Store;
  let tramite110209QueryMock: Tramite110209Query;

  beforeEach(() => {
    tramite110209StoreMock = new Tramite110209Store();
    tramite110209QueryMock = new Tramite110209Query(tramite110209StoreMock);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosDelDestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: Tramite110209Store, useValue: tramite110209StoreMock },
        { provide: Tramite110209Query, useValue: tramite110209QueryMock },
      ],
    });

    fixture = TestBed.createComponent(DatosDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getValoresStore', () => {
    it('should patch form values from the store', () => {
      // Mock the full state as expected by the store's select method
      const mockStoreValues = {
        medioDeTransporte: '',
        rutaCompleta: '',
        puertoDeEmbarque: '',
        puertoDeDesembarque: '',
        observaciones: '',
        mercanciasSeleccionadas: {
          numeroDeOrden: '',
          fraccionArancelaria: '',
          nombreTecnico: '',
          nombreComercial: '',
          nombreIngles: '',
          numeroDeRegistro: ''
        },
        nombre: 'John',
        primerApellido: 'Doe',
        segundoApellido: 'Smith',
        numeroDeRegistroFiscal: '12345',
        razonSocial: 'Company X',
        calle: '',
        numeroLetra: '',
        ciudad: '',
        correoElectronico: '',
        fax: 0,
        telefono: 0,
      };

      // Spy on the `select` method to return the full mock store state
      jest.spyOn(tramite110209QueryMock, 'select').mockReturnValue(of(mockStoreValues));

      // Call the method
      component.getValoresStore();

      // Check if the form is patched correctly
      expect(component.detosDelDestinatarioForm.get('nombre')?.value).toBe(mockStoreValues.nombre);
      expect(component.detosDelDestinatarioForm.get('primerApellido')?.value).toBe(mockStoreValues.primerApellido);
      expect(component.detosDelDestinatarioForm.get('numeroDeRegistroFiscal')?.value).toBe(mockStoreValues.numeroDeRegistroFiscal);
    });
  });

  

    describe('setValoresStore', () => {
    it('should set values to the store based on form values', () => {
      const mockFormValue = {
        nombre: 'John',
        primerApellido: 'Doe',
        segundoApellido: 'Smith',
        numeroDeRegistroFiscal: '12345',
        razonSocial: 'Company X',
      };

      // Mock the form controls
      component.detosDelDestinatarioForm.setValue(mockFormValue);

      // Spy on store methods
      const spySetNombre = jest.spyOn(tramite110209StoreMock, 'setNombre');
      const spySetPrimerApellido = jest.spyOn(tramite110209StoreMock, 'setPrimerApellido');
      const spySetNumeroDeRegistroFiscal = jest.spyOn(tramite110209StoreMock, 'setNumeroDeRegistroFiscal');

      // Call the method
      component.setValoresStore(component.detosDelDestinatarioForm, 'nombre', 'setNombre');
      component.setValoresStore(component.detosDelDestinatarioForm, 'primerApellido', 'setPrimerApellido');
      component.setValoresStore(component.detosDelDestinatarioForm, 'numeroDeRegistroFiscal', 'setNumeroDeRegistroFiscal');

      // Check if the store methods were called with the correct values
      expect(spySetNombre).toHaveBeenCalledWith(mockFormValue.nombre);
      expect(spySetPrimerApellido).toHaveBeenCalledWith(mockFormValue.primerApellido);
      expect(spySetNumeroDeRegistroFiscal).toHaveBeenCalledWith(mockFormValue.numeroDeRegistroFiscal);
    });
  });

});





