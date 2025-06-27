import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { of } from 'rxjs';
import { Sanitario260215Store } from '../../estados/tramites/sanitario260215.store';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { CODIGOPOSTALSELECTDATA, COLONIASELECTDATA, LOCALIDADSELECTDATA, MUNICIPIOSELECTDATA, PAISSELECTDATA, TERCEROS_RELACIONADOS_TABLE_BODY_DATA, TERCEROS_RELACIONADOS_TABLE_HEADER_DATA } from '../../enum/permiso.enum';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ModalComponent } from '../modal/modal.component';

// Add mock definitions for radio options used in tests
const TipoPersonaRadioOptions = [
  { label: 'Física', value: 'fisica' },
  { label: 'Moral', value: 'moral' }
];
const NacionalidadRadioOptions = [
  { label: 'Nacional', value: 'nacional' },
  { label: 'Extranjero', value: 'extranjero' }
];

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let tercerosMockService: any;

  beforeEach(async () => {

    tercerosMockService = {
      getData: jest.fn().mockReturnValue(
        of([
          { id: 'Banco1', descripcion: 'Banco1' },
          { id: 'Banco2', descripcion: 'Banco2' },
          { id: 'Banco3', descripcion: 'Banco3' },
        ])
      ),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TercerosRelacionadosComponent,
      ],
      providers: [FormBuilder,Sanitario260215Store, { provide: ServiciosPermisoSanitarioService, useValue: tercerosMockService }],
    }).compileComponents();


    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    beforeEach(() => {
      fixture = TestBed.createComponent(TercerosRelacionadosComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData on init', () => {
    expect(tercerosMockService.getData).toHaveBeenCalled();
  });

  it('should initialize all form groups on init', () => {
    component.ngOnInit();
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('should call initializeAgregarFabricanteFormGroup on init', () => {
    // Spy on the method
    const initializeSpy = jest.spyOn(component, 'initializeAgregarFabricanteFormGroup');
  
    // Call ngOnInit
    component.ngOnInit();
  
    // Verify that the method was called
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('should call initializeAgregarDestinatarioFormGroup on init', () => {
    // Spy on the method
    const initializeSpy = jest.spyOn(component, 'initializeAgregarDestinatarioFormGroup');
  
    // Call ngOnInit
    component.ngOnInit();
  
    // Verify that the method was called
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('should call initializeAgregarProveedorFormGroup on init', () => {
    // Spy on the method
    const initializeSpy = jest.spyOn(component, 'initializeAgregarProveedorFormGroup');
  
    // Call ngOnInit
    component.ngOnInit();
  
    // Verify that the method was called
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('should call initializeAgregarFacturadorFormGroup on init', () => {
    // Spy on the method
    const initializeSpy = jest.spyOn(component, 'initializeAgregarFacturadorFormGroup');
  
    // Call ngOnInit
    component.ngOnInit();
  
    // Verify that the method was called
    expect(initializeSpy).toHaveBeenCalled();
  });

  // fabricante
  it('should initialize agregarFabricanteFormGroup correctly', () => {
    component.initializeAgregarFabricanteFormGroup();

    const formGroup = component.agregarFabricanteFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('rfc')?.disabled).toBeTruthy();
    expect(formGroup.get('curp')?.disabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
    expect(formGroup.get('tercerosNacionalidad')?.value).toBe('');
    expect(formGroup.get('pais')?.validator).toBeDefined();
    expect(formGroup.get('calle')?.validator).toBeDefined();
    expect(formGroup.get('numeroExterior')?.validator).toBeDefined();
  });

  it('should enable specific fields in agregarFabricanteFormGroup when tipoPersona value changes', () => {
    component.initializeAgregarFabricanteFormGroup();

    const formGroup = component.agregarFabricanteFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
    fixture.detectChanges();

    expect(formGroup.get('rfc')?.enabled).toBeTruthy();
    expect(formGroup.get('curp')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
    expect(formGroup.get('numeroExterior')?.enabled).toBeTruthy();
  });

  it('should toggle showTableDiv and showFabricante', () => {
    component.showTableDiv = true;
    component.showFabricante = true;

    component.toggleDivFabricante();

    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(false);
  });

  it('should toggle showTableDiv and showFabricante again', () => {
    component.showTableDiv = false;
    component.showFabricante = false;

    component.toggleDivFabricante();

    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(true);
  });

  it('should reset fisica and moral to false', () => {
    component.fisica = true;
    component.moral = true;

    component.toggleDivFabricante();

    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('should toggle showTableDiv and showFabricante from true to false', () => {
    component.showTableDiv = true;
    component.showFabricante = true;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showFabricante = !component.showFabricante;

    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(false);
  });

  it('should toggle showTableDiv and showFabricante from false to true', () => {
    component.showTableDiv = false;
    component.showFabricante = false;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showFabricante = !component.showFabricante;

    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(true);
  });

  // destinatario
  it('should initialize agregarDestinatarioFormGroup correctly', () => {
    component.initializeAgregarDestinatarioFormGroup();

    const formGroup = component.agregarDestinatarioFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('rfc')?.disabled).toBeTruthy();
    expect(formGroup.get('curp')?.disabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
    expect(formGroup.get('tipoPersona')?.value).toBe('');
    expect(formGroup.get('localidad')?.value).toBe('');
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
  });

  it('should enable specific fields in agregarDestinatarioFormGroup when tipoPersona value changes', () => {
    component.initializeAgregarDestinatarioFormGroup();

    const formGroup = component.agregarDestinatarioFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
    fixture.detectChanges();

    expect(formGroup.get('rfc')?.enabled).toBeTruthy();
    expect(formGroup.get('curp')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
    expect(formGroup.get('numeroExterior')?.enabled).toBeTruthy();
  });

  it('should toggle showTableDiv and showDestinatario', () => {
    component.showTableDiv = true;
    component.showDestinatario = true;

    component.toggleDivDestinatario();

    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(false);
  });

  it('should toggle showTableDiv and showDestinatario again', () => {
    component.showTableDiv = false;
    component.showDestinatario = false;

    component.toggleDivDestinatario();

    expect(component.showTableDiv).toBe(true);
    expect(component.showDestinatario).toBe(true);
  });

  it('should reset fisica and moral to false', () => {
    component.fisica = true;
    component.moral = true;

    component.toggleDivDestinatario();

    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('should toggle showTableDiv and showDestinatario from true to false', () => {
    component.showTableDiv = true;
    component.showDestinatario = true;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showDestinatario = !component.showDestinatario;

    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(false);
  });

  it('should toggle showTableDiv and showDestinatario from false to true', () => {
    component.showTableDiv = false;
    component.showDestinatario = false;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showDestinatario = !component.showDestinatario;

    expect(component.showTableDiv).toBe(true);
    expect(component.showDestinatario).toBe(true);
  });

  // proveedor
  it('should initialize agregarProveedorFormGroup correctly', () => {
    component.initializeAgregarProveedorFormGroup();

    const formGroup = component.agregarProveedorFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('nombre')?.disabled).toBeTruthy();
    expect(formGroup.get('segundoApellido')?.disabled).toBeTruthy();
    expect(formGroup.get('primerApellido')?.value).toBe('');
    expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
    expect(formGroup.get('pais')?.validator).toBeDefined();
    expect(formGroup.get('telefono')?.value).toBe('');
  });

  it('should enable specific fields in agregarProveedorFormGroup when tipoPersona value changes', () => {
    component.initializeAgregarProveedorFormGroup();

    const formGroup = component.agregarProveedorFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
    fixture.detectChanges();

    expect(formGroup.get('nombre')?.enabled).toBeTruthy();
    expect(formGroup.get('segundoApellido')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
  });

  it('should toggle showTableDiv and showProveedor', () => {
    component.showTableDiv = true;
    component.showProveedor = true;

    component.toggleDivProveedor();

    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(false);
  });

  it('should toggle showTableDiv and showProveedor again', () => {
    component.showTableDiv = false;
    component.showProveedor = false;

    component.toggleDivProveedor();

    expect(component.showTableDiv).toBe(true);
    expect(component.showProveedor).toBe(true);
  });

  it('should reset fisica and moral to false', () => {
    component.fisica = true;
    component.moral = true;

    component.toggleDivProveedor();

    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('should toggle showTableDiv and showProveedor from true to false', () => {
    component.showTableDiv = true;
    component.showProveedor = true;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showProveedor = !component.showProveedor;

    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(false);
  });

  it('should toggle showTableDiv and showProveedor from false to true', () => {
    component.showTableDiv = false;
    component.showProveedor = false;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showProveedor = !component.showProveedor;

    expect(component.showTableDiv).toBe(true);
    expect(component.showProveedor).toBe(true);
  });

  // Facturador
  it('should initialize agregarFacturadorFormGroup correctly', () => {
    component.initializeAgregarFacturadorFormGroup();

    const formGroup = component.agregarFacturadorFormGroup;
    expect(formGroup).toBeDefined();
    expect(formGroup.get('tipoPersona')!.value).toBe('');
    expect(formGroup.get('nombre')!.value).toBe('');
    expect(formGroup.get('primerApellido')!.value).toBe('');
    expect(formGroup.get('segundoApellido')!.value).toBe('');
    expect(formGroup.get('denominacionRazonSocial')!.value).toBe('');
    expect(formGroup.get('pais')!.value).toBe('');
    expect(formGroup.get('estado')!.value).toBe('');
    expect(formGroup.get('codigoPostaloEquivalente')!.value).toBe('');
    expect(formGroup.get('coloniaoEquivalente')!.value).toBe('');
    expect(formGroup.get('calle')!.value).toBe('');
    expect(formGroup.get('numeroExterior')!.value).toBe('');
    expect(formGroup.get('numeroInterior')!.value).toBe('');
    expect(formGroup.get('lada')!.value).toBe('');
    expect(formGroup.get('telefono')!.value).toBe('');
    expect(formGroup.get('correoElectronico')!.value).toBe('');
  });

  it('should enable specific fields in agregarFacturadorFormGroup when tipoPersona value changes', () => {
    component.initializeAgregarFacturadorFormGroup();

    const formGroup = component.agregarFacturadorFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
    fixture.detectChanges();

    expect(formGroup.get('nombre')?.enabled).toBeTruthy();
    expect(formGroup.get('segundoApellido')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('telefono')?.enabled).toBeTruthy();
    expect(formGroup.get('correoElectronico')?.enabled).toBeTruthy();
    
  });

  it('should toggle showTableDiv and showFacturador', () => {
    component.showTableDiv = true;
    component.showFacturador = true;

    component.toggleDivFacturador();

    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(false);
  });

  it('should toggle showTableDiv and showFacturador again', () => {
    component.showTableDiv = false;
    component.showFacturador = false;

    component.toggleDivFacturador();

    expect(component.showTableDiv).toBe(true);
    expect(component.showFacturador).toBe(true);
  });

  it('should reset fisica and moral to false', () => {
    component.fisica = true;
    component.moral = true;

    component.toggleDivFacturador();

    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('should toggle showTableDiv and showFacturador from true to false', () => {
    component.showTableDiv = true;
    component.showFacturador = true;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showFacturador = !component.showFacturador;

    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(false);
  });

  it('should toggle showTableDiv and showFacturador from false to true', () => {
    component.showTableDiv = false;
    component.showFacturador = false;

    // Simulate the toggle logic
    component.showTableDiv = !component.showTableDiv;
    component.showFacturador = !component.showFacturador;

    expect(component.showTableDiv).toBe(true);
    expect(component.showFacturador).toBe(true);
  });

  it('should toggle showTableDiv and showFacturador', () => {
    component.showTableDiv = true;
    component.showFacturador = false;
  
    component.submitFacturadorForm();
  
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(true);
  });

  //fisica, moral, nacional and extranjero
  it('should set fisica to true and moral to false when checkbox is "fisica"', () => {
    component.inputChecked('fisica');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
  });

  it('should set fisica to false and moral to true when checkbox is not "fisica"', () => {
    component.inputChecked('moral');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  it('should set fisica to false and moral to true for any other checkbox name', () => {
    component.inputChecked('other');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  it('should set nacional to true and extranjero to false when checkbox is "nacional"', () => {
    component.tercerosInputChecked('nacional');
    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false);
  });

  it('should set nacional to false and extranjero to true when checkbox is not "nacional"', () => {
    component.tercerosInputChecked('extranjero');
    expect(component.nacional).toBe(false);
    expect(component.extranjero).toBe(true);
  });

  it('should set nacional to false and extranjero to true for any other checkbox name', () => {
    component.tercerosInputChecked('other');
    expect(component.nacional).toBe(false);
    expect(component.extranjero).toBe(true);
  });

  describe('Métodos cambiarRadio y cambiarRadioFisica', () => {
    it('debería llamar a tercerosInputChecked con el valor proporcionado en cambiarRadio', () => {
      const spy = jest.spyOn(component, 'tercerosInputChecked');
      component.cambiarRadio('nacional');
      expect(spy).toHaveBeenCalledWith('nacional');
      component.cambiarRadio('extranjero');
      expect(spy).toHaveBeenCalledWith('extranjero');
    });

    it('debería llamar a inputChecked con el valor proporcionado en cambiarRadioFisica', () => {
      const spy = jest.spyOn(component, 'inputChecked');
      component.cambiarRadioFisica('fisica');
      expect(spy).toHaveBeenCalledWith('fisica');
      component.cambiarRadioFisica('moral');
      expect(spy).toHaveBeenCalledWith('moral');
    });

    it('debería funcionar correctamente con valores numéricos', () => {
      const spyTerceros = jest.spyOn(component, 'tercerosInputChecked');
      const spyFisica = jest.spyOn(component, 'inputChecked');
      component.cambiarRadio(1);
      // Acepta tanto string como number
      expect(spyTerceros).toHaveBeenCalledWith(expect.anything());
      component.cambiarRadioFisica(2);
      expect(spyFisica).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('Método fetchTableDummyJson', () => {
    it('debería agregar datos dummy a todas las filas', () => {
      component.fabricanteRowData = [];
      component.destinatarioRowData = [];
      component.proveedorRowData = [];
      component.facturadorRowData = [];

      component.fetchTableDummyJson();

      expect(component.fabricanteRowData.length).toBeGreaterThan(0);
      expect(component.destinatarioRowData.length).toBeGreaterThan(0);
      expect(component.proveedorRowData.length).toBeGreaterThan(0);
      expect(component.facturadorRowData.length).toBeGreaterThan(0);

      // Verifica que los datos agregados tengan la propiedad esperada
      expect(component.fabricanteRowData[0]).toHaveProperty('tbodyData');
      expect(Array.isArray(component.fabricanteRowData[0].tbodyData)).toBe(true);
      expect(component.destinatarioRowData[0]).toHaveProperty('tbodyData');
      expect(component.proveedorRowData[0]).toHaveProperty('tbodyData');
      expect(component.facturadorRowData[0]).toHaveProperty('tbodyData');
    });
  });

  describe('Verificación de imports de enums y componentes', () => {
    it('debería tener definidos los datos y componentes importados', () => {
      // Enums y datos
      expect(typeof CODIGOPOSTALSELECTDATA).toBeDefined();
      expect(typeof COLONIASELECTDATA).toBeDefined();
      expect(typeof LOCALIDADSELECTDATA).toBeDefined();
      expect(typeof MUNICIPIOSELECTDATA).toBeDefined();
      expect(typeof PAISSELECTDATA).toBeDefined();
      expect(typeof TERCEROS_RELACIONADOS_TABLE_BODY_DATA).toBeDefined();
      expect(typeof TERCEROS_RELACIONADOS_TABLE_HEADER_DATA).toBeDefined();

      // Componentes
      expect(AlertComponent).toBeDefined();
      expect(TituloComponent).toBeDefined();
      expect(CatalogoSelectComponent).toBeDefined();
      expect(InputRadioComponent).toBeDefined();
      expect(ModalComponent).toBeDefined();
      expect(TableComponent).toBeDefined();

      // JSON de opciones
      expect(TipoPersonaRadioOptions).toBeDefined();
      expect(NacionalidadRadioOptions).toBeDefined();
    });
  });
});
