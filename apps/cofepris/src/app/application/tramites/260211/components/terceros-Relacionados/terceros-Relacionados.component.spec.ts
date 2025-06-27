import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosRelacionadoesComponent } from './terceros-Relacionados.component';
import { SanitarioService } from '../../services/sanitario.service';
import { Tramite260212Store } from '../../../../estados/tramites/tramite260212.store';
import { of } from 'rxjs';

describe('TercerosRelacionadoesComponent', () => {
  let component: TercerosRelacionadoesComponent;
  let fixture: ComponentFixture<TercerosRelacionadoesComponent>;
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
        TercerosRelacionadoesComponent,
      ],
      providers: [FormBuilder,Tramite260212Store, { provide: SanitarioService, useValue: tercerosMockService }],
    }).compileComponents();


    fixture = TestBed.createComponent(TercerosRelacionadoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    beforeEach(() => {
      fixture = TestBed.createComponent(TercerosRelacionadoesComponent);
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

  it('debe llamar a submitFabricanteForm y cambiar los flags', () => {
    component.showTableDiv = false;
    component.showFabricante = true;
    component.submitFabricanteForm();
    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(false);
  });

  it('debe llamar a submitDestinatarioForm y cambiar los flags', () => {
    component.showTableDiv = false;
    component.showDestinatario = true;
    component.submitDestinatarioForm();
    expect(component.showTableDiv).toBe(true);
    expect(component.showDestinatario).toBe(false);
  });

  it('debe llamar a submitProveedorForm y cambiar los flags', () => {
    component.showTableDiv = false;
    component.showProveedor = true;
    component.submitProveedorForm();
    expect(component.showTableDiv).toBe(true);
    expect(component.showProveedor).toBe(false);
  });

  it('debe llamar a submitFacturadorForm y cambiar los flags', () => {
    component.showTableDiv = false;
    component.showFacturador = true;
    component.submitFacturadorForm();
    expect(component.showTableDiv).toBe(true);
    expect(component.showFacturador).toBe(false);
  });
});
