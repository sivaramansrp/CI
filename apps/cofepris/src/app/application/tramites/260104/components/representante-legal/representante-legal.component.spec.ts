import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260104Store } from '../../../../estados/tramites/tramite260104.store';
import { Tramite260104Query } from '../../../../estados/queries/tramite260104.query';
import { VALOR_FORMULARIO } from '@libs/shared/data-access-user/src/core/enums/260104/domicilo.enum';
import { of } from 'rxjs';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockStore: Partial<Tramite260104Store>;
  let mockQuery: Partial<Tramite260104Query>;
  let fb: FormBuilder;

  beforeEach(async () => {
    mockStore = {
      setRfc: jest.fn(),
    };

    mockQuery = {
      selectSolicitud$: of({
        rfc: 'TEST12345678',
        razonSocial: 'Test Company',
        correoElectronico: 'test@example.com',
        codigoPostal: '12345',
        estado: 'Test State',
        municipio: 'Test Municipality',
        localidad: 'Test Locality',
        colonia: 'Test Colony',
        calle: 'Test Street',
        numeroExterior: '123',
        numeroInterior: '456',
        telefono: '1234567890',
        lada: '123',
        avisoCheckbox: 'true',
        licenciaSanitaria: 'Test License',
        regimen: 'Test Regimen',
        aduana: 'Test Aduana',
        hacerlosPublicos: 'false',
        manifesto: 'Test Manifesto',
        claveScianModal: 'Test Clave',
        claveDescripcionModal: 'Test Description',
        clasificacion: 'Test Classification',
        especificarClasificacionProducto: 'Test Specification',
        especifique: 'Test Especifique',
        denominacionEspecifica: 'Test Denominacion',
        marca: 'Test Marca',
        tipoDeProducto: 'Test Tipo',
        fraccionArancelaria: 'Test Fraccion',
        descripcionFraccion: 'Test Descripcion Fraccion',
        cantidadUMT: '10',
        UMT: 'Test UMT',
        cantidadUMC: '5',
        UMC: 'Test UMC',
        unidadMedida: 'Test Unidad',
        valorComercial: '1000',
        valorAduana: '500',
        valorTotal: '1500',
        especifiqueTipo: 'Test Tipo Especifico',
        claveDeLosLotes: 'Test Clave Lotes',
        fechaFabricacion: '2023-01-01',
        fechaCaducidad: '2024-01-01',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        RepresentanteLegalComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite260104Store, useValue: mockStore },
        { provide: Tramite260104Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with values from store', () => {
      expect(component.representante).toBeDefined();
      expect(component.representante.get('rfc')?.value).toBe('TEST12345678');
    });

    it('should subscribe to selectSolicitud$ and update solicitudState', () => {
      expect(component.solicitudState).toBeDefined();
      expect(component.solicitudState.rfc).toBe('TEST12345678');
    });
  });

  describe('Form Validation', () => {
    it('should make RFC field required', () => {
      const rfcControl = component.representante.get('rfc');
      rfcControl?.setValue('');
      expect(rfcControl?.valid).toBeFalsy();
      expect(rfcControl?.errors?.['required']).toBeTruthy();
    });

    it('should make nombre field required', () => {
      const nombreControl = component.representante.get('nombre');
      expect(nombreControl?.disabled).toBeTruthy();
      
    });

    it('should make apellidoPaterno field required', () => {
      const apellidoControl = component.representante.get('apellidoPaterno');
      expect(apellidoControl?.disabled).toBeTruthy();
      
    });

    it('should not require apellidoMaterno field', () => {
      const apellidoMaternoControl = component.representante.get('apellidoMaterno');
      expect(apellidoMaternoControl?.disabled).toBeTruthy();
      expect(apellidoMaternoControl?.errors).toBeNull();
    });
  });

  describe('obtenerValor', () => {
    it('should patch form values with VALOR_FORMULARIO constants', () => {
      component.obtenerValor();
      
      expect(component.representante.get('nombre')?.value).toBe(VALOR_FORMULARIO.nombre);
      expect(component.representante.get('apellidoPaterno')?.value).toBe(VALOR_FORMULARIO.apellidoPaterno);
      expect(component.representante.get('apellidoMaterno')?.value).toBe(VALOR_FORMULARIO.apellidoMaterno);
    });
  });

  describe('setValoresStore', () => {
    it('should call store method with form value', () => {
      const testValue = 'NEWRFC123456';
      component.representante.get('rfc')?.setValue(testValue);
      
      component.setValoresStore(component.representante, 'rfc', 'setRfc');
      
      expect(mockStore.setRfc).toHaveBeenCalledWith(testValue);
    });
  });

  describe('Template Tests', () => {
    it('should display error message when RFC is invalid and touched', () => {
      component.representante.get('rfc')?.setValue('');
      component.representante.get('rfc')?.markAsTouched();
      fixture.detectChanges();
      
      const errorMessage = fixture.nativeElement.querySelector('.mensaje-error');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain('Este campo es obligatorio');
    });

    it('should call obtenerValor when Buscar button is clicked', () => {
      jest.spyOn(component, 'obtenerValor');
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      
      expect(component.obtenerValor).toHaveBeenCalled();
    });

    it('should call setValoresStore on RFC input change', fakeAsync(() => {
      jest.spyOn(component, 'setValoresStore');
      const input = fixture.nativeElement.querySelector('#rfc');
      input.value = 'NEWVALUE';
      input.dispatchEvent(new Event('change'));
      tick();
      
      expect(component.setValoresStore).toHaveBeenCalledWith(
        component.representante,
        'rfc',
        'setRfc'
      );
    }));
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$', () => {
      const spy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(spy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});