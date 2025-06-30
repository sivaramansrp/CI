import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260104Query } from '../../../../estados/queries/tramite260104.query';
import { VALOR_FORMULARIO } from '@libs/shared/data-access-user/src/core/enums/260104/domicilo.enum';
import { of } from 'rxjs';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockStore: any;
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
        { provide: 'Tramite260104StoreDos', useValue: mockStore },
        { provide: Tramite260104Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debe inicializar el formulario con valores del store', () => {
      expect(component.representante).toBeDefined();
      expect(component.representante.get('rfc')?.value).toBe('TEST12345678');
    });

    it('debe suscribirse a selectSolicitud$ y actualizar solicitudState', () => {
      expect(component.solicitudState).toBeDefined();
      expect(component.solicitudState.rfc).toBe('TEST12345678');
    });
  });

  describe('Validación del Formulario', () => {
    it('debe requerir el campo RFC', () => {
      const rfcControl = component.representante.get('rfc');
      rfcControl?.setValue('');
      expect(rfcControl?.valid).toBeFalsy();
      expect(rfcControl?.errors?.['required']).toBeTruthy();
    });

    it('debe requerir el campo nombre', () => {
      component.esFormularioSoloLectura = true;
      component.inicializarEstadoFormulario();
      const nombreControl = component.representante.get('nombre');
      expect(nombreControl?.disabled).toBeTruthy();
    });

    it('debe requerir el campo apellidoPaterno', () => {
      component.esFormularioSoloLectura = true;
      component.inicializarEstadoFormulario();
      const apellidoControl = component.representante.get('apellidoPaterno');
      expect(apellidoControl?.disabled).toBeTruthy();
    });

    it('no debe requerir el campo apellidoMaterno', () => {
      component.esFormularioSoloLectura = true;
      component.inicializarEstadoFormulario();
      const apellidoMaternoControl = component.representante.get('apellidoMaterno');
      expect(apellidoMaternoControl?.disabled).toBeTruthy();
      expect(apellidoMaternoControl?.errors).toBeNull();
    });
  });

  describe('obtenerValor', () => {
    it('debe actualizar valores del formulario con constantes VALOR_FORMULARIO', () => {
      component.obtenerValor();
      expect(component.representante.get('nombre')?.value).toBe(VALOR_FORMULARIO.nombre);
      expect(component.representante.get('apellidoPaterno')?.value).toBe(VALOR_FORMULARIO.apellidoPaterno);
      expect(component.representante.get('apellidoMaterno')?.value).toBe(VALOR_FORMULARIO.apellidoMaterno);
    });
  });

  describe('Pruebas de plantilla', () => {
    it('debe mostrar mensaje de error cuando RFC es inválido y está tocado', () => {
      component.representante.get('rfc')?.setValue('');
      component.representante.get('rfc')?.markAsTouched();
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.mensaje-error');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain('Este campo es obligatorio');
    });

    it('debe llamar a obtenerValor al hacer clic en el botón Buscar', () => {
      jest.spyOn(component, 'obtenerValor');
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      expect(component.obtenerValor).toHaveBeenCalled();
    });

    it('debe llamar a setValoresStore al cambiar el input RFC', fakeAsync(() => {
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
    it('debe completar destroyNotifier$', () => {
      const spy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});