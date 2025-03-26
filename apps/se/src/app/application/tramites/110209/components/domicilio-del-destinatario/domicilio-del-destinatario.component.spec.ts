import { DomicilioDelDestinatarioComponent } from './domicilio-del-destinatario.component';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('DomicilioDelDestinatarioComponent', () => {
  let component: DomicilioDelDestinatarioComponent;
  let fixture: ComponentFixture<DomicilioDelDestinatarioComponent>;
  let store: Tramite110209Store;
  let query: Tramite110209Query;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DomicilioDelDestinatarioComponent],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: Tramite110209Store,
          useValue: {
            setCalle: jest.fn(),
            setNumeroLetra: jest.fn(),
            setCiudad: jest.fn(),
            setCorreoElectronico: jest.fn(),
            setFax: jest.fn(),
            setTelefono: jest.fn(),
          }
        },
        {
          provide: Tramite110209Query,
          useValue: {
            selectTramite110102$: of({
              calle: 'Calle Falsa 123',
              numeroLetra: 'A',
              ciudad: 'Ciudad X',
              correoElectronico: 'example@mail.com',
              fax: 123456789,
              telefono: 987654321
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioDelDestinatarioComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite110209Store);
    query = TestBed.inject(Tramite110209Query);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form initialization', () => {
    it('should create the form with the correct controls', () => {
      const form = component.domicilioDelDestinatarioForm;
      
      expect(form).toBeDefined();
      expect(form.controls['calle']).toBeDefined();
      expect(form.controls['numeroLetra']).toBeDefined();
      expect(form.controls['ciudad']).toBeDefined();
      expect(form.controls['correoElectronico']).toBeDefined();
      expect(form.controls['fax']).toBeDefined();
      expect(form.controls['telefono']).toBeDefined();
    });
  });

  describe('getValoresStore', () => {
    it('should patch form with values from the store query', () => {
      // Call the method
      component.getValoresStore();

      // Check if form values are patched correctly
      expect(component.domicilioDelDestinatarioForm.get('calle')?.value).toBe('Calle Falsa 123');
      expect(component.domicilioDelDestinatarioForm.get('numeroLetra')?.value).toBe('A');
      expect(component.domicilioDelDestinatarioForm.get('ciudad')?.value).toBe('Ciudad X');
      expect(component.domicilioDelDestinatarioForm.get('correoElectronico')?.value).toBe('example@mail.com');
      expect(component.domicilioDelDestinatarioForm.get('fax')?.value).toBe(123456789);
      expect(component.domicilioDelDestinatarioForm.get('telefono')?.value).toBe(987654321);
    });
  });

  describe('setValoresStore', () => {
    it('should call setCalle method from store with the correct value', () => {
      const form = component.domicilioDelDestinatarioForm;
      form.get('calle')?.setValue('Calle Test');

      component.setValoresStore(form, 'calle', 'setCalle');
      
      expect(store.setCalle).toHaveBeenCalledWith('Calle Test');
    });

    it('should call setNumeroLetra method from store with the correct value', () => {
      const form = component.domicilioDelDestinatarioForm;
      form.get('numeroLetra')?.setValue('B');
      
      component.setValoresStore(form, 'numeroLetra', 'setNumeroLetra');
      
      expect(store.setNumeroLetra).toHaveBeenCalledWith('B');
    });

    it('should call setCorreoElectronico method from store with the correct value', () => {
      const form = component.domicilioDelDestinatarioForm;
      form.get('correoElectronico')?.setValue('newemail@mail.com');
      
      component.setValoresStore(form, 'correoElectronico', 'setCorreoElectronico');
      
      expect(store.setCorreoElectronico).toHaveBeenCalledWith('newemail@mail.com');
    });
  });
});
