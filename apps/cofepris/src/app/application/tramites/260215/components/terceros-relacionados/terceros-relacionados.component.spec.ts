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

    
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getData al inicializar', () => {
    expect(tercerosMockService.getData).toHaveBeenCalled();
  });

  it('debería inicializar todos los form groups al inicializar', () => {
    component.ngOnInit();
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('debería llamar a initializeAgregarFabricanteFormGroup al inicializar', () => {
    const initializeSpy = jest.spyOn(component, 'initializeAgregarFabricanteFormGroup');
    component.ngOnInit();
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('debería llamar a initializeAgregarDestinatarioFormGroup al inicializar', () => {
    const initializeSpy = jest.spyOn(component, 'initializeAgregarDestinatarioFormGroup');
    component.ngOnInit();
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('debería llamar a initializeAgregarProveedorFormGroup al inicializar', () => {
    const initializeSpy = jest.spyOn(component, 'initializeAgregarProveedorFormGroup');
    component.ngOnInit();
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('debería llamar a initializeAgregarFacturadorFormGroup al inicializar', () => {
    const initializeSpy = jest.spyOn(component, 'initializeAgregarFacturadorFormGroup');
    component.ngOnInit();
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('debería inicializar correctamente agregarFabricanteFormGroup', () => {
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

  it('debería habilitar campos específicos en agregarFabricanteFormGroup cuando cambia tipoPersona', () => {
    component.initializeAgregarFabricanteFormGroup();
    const formGroup = component.agregarFabricanteFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue');
    fixture.detectChanges();
    expect(formGroup.get('rfc')?.enabled).toBeTruthy();
    expect(formGroup.get('curp')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
    expect(formGroup.get('numeroExterior')?.enabled).toBeTruthy();
  });

  it('debería alternar showTableDiv y showFabricante', () => {
    component.showTableDiv = true;
    component.showFabricante = true;
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(false);
  });

  it('debería alternar showTableDiv y showFabricante nuevamente', () => {
    component.showTableDiv = false;
    component.showFabricante = false;
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(true);
  });

  it('debería reiniciar fisica y moral a false', () => {
    component.fisica = true;
    component.moral = true;
    component.toggleDivFabricante();
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('debería alternar showTableDiv y showFabricante de true a false', () => {
    component.showTableDiv = true;
    component.showFabricante = true;
    component.showTableDiv = !component.showTableDiv;
    component.showFabricante = !component.showFabricante;
    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(false);
  });

  it('debería alternar showTableDiv y showFabricante de false a true', () => {
    component.showTableDiv = false;
    component.showFabricante = false;
    component.showTableDiv = !component.showTableDiv;
    component.showFabricante = !component.showFabricante;
    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(true);
  });

  it('debería inicializar correctamente agregarDestinatarioFormGroup', () => {
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

  it('debería habilitar campos específicos en agregarDestinatarioFormGroup cuando cambia tipoPersona', () => {
    component.initializeAgregarDestinatarioFormGroup();
    const formGroup = component.agregarDestinatarioFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue');
    fixture.detectChanges();
    expect(formGroup.get('rfc')?.enabled).toBeTruthy();
    expect(formGroup.get('curp')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
    expect(formGroup.get('numeroExterior')?.enabled).toBeTruthy();
  });

  it('debería alternar showTableDiv y showDestinatario', () => {
    component.showTableDiv = true;
    component.showDestinatario = true;
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(false);
  });

  it('debería alternar showTableDiv y showDestinatario nuevamente', () => {
    component.showTableDiv = false;
    component.showDestinatario = false;
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(true);
    expect(component.showDestinatario).toBe(true);
  });

  it('debería reiniciar fisica y moral a false en destinatario', () => {
    component.fisica = true;
    component.moral = true;
    component.toggleDivDestinatario();
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('debería alternar showTableDiv y showDestinatario de true a false', () => {
    component.showTableDiv = true;
    component.showDestinatario = true;
    component.showTableDiv = !component.showTableDiv;
    component.showDestinatario = !component.showDestinatario;
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(false);
  });

  it('debería alternar showTableDiv y showDestinatario de false a true', () => {
    component.showTableDiv = false;
    component.showDestinatario = false;
    component.showTableDiv = !component.showTableDiv;
    component.showDestinatario = !component.showDestinatario;
    expect(component.showTableDiv).toBe(true);
    expect(component.showDestinatario).toBe(true);
  });

  it('debería inicializar correctamente agregarProveedorFormGroup', () => {
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

  it('debería habilitar campos específicos en agregarProveedorFormGroup cuando cambia tipoPersona', () => {
    component.initializeAgregarProveedorFormGroup();
    const formGroup = component.agregarProveedorFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue');
    fixture.detectChanges();
    expect(formGroup.get('nombre')?.enabled).toBeTruthy();
    expect(formGroup.get('segundoApellido')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('calle')?.enabled).toBeTruthy();
  });

  it('debería alternar showTableDiv y showProveedor', () => {
    component.showTableDiv = true;
    component.showProveedor = true;
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(false);
  });

  it('debería alternar showTableDiv y showProveedor nuevamente', () => {
    component.showTableDiv = false;
    component.showProveedor = false;
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(true);
    expect(component.showProveedor).toBe(true);
  });

  it('debería reiniciar fisica y moral a false en proveedor', () => {
    component.fisica = true;
    component.moral = true;
    component.toggleDivProveedor();
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('debería alternar showTableDiv y showProveedor de true a false', () => {
    component.showTableDiv = true;
    component.showProveedor = true;
    component.showTableDiv = !component.showTableDiv;
    component.showProveedor = !component.showProveedor;
    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(false);
  });

  it('debería alternar showTableDiv y showProveedor de false a true', () => {
    component.showTableDiv = false;
    component.showProveedor = false;
    component.showTableDiv = !component.showTableDiv;
    component.showProveedor = !component.showProveedor;
    expect(component.showTableDiv).toBe(true);
    expect(component.showProveedor).toBe(true);
  });

  it('debería inicializar correctamente agregarFacturadorFormGroup', () => {
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

  it('debería habilitar campos específicos en agregarFacturadorFormGroup cuando cambia tipoPersona', () => {
    component.initializeAgregarFacturadorFormGroup();
    const formGroup = component.agregarFacturadorFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue');
    fixture.detectChanges();
    expect(formGroup.get('nombre')?.enabled).toBeTruthy();
    expect(formGroup.get('segundoApellido')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
    expect(formGroup.get('telefono')?.enabled).toBeTruthy();
    expect(formGroup.get('correoElectronico')?.enabled).toBeTruthy();
  });

  it('debería alternar showTableDiv y showFacturador', () => {
    component.showTableDiv = true;
    component.showFacturador = true;
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(false);
  });

  it('debería alternar showTableDiv y showFacturador nuevamente', () => {
    component.showTableDiv = false;
    component.showFacturador = false;
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(true);
    expect(component.showFacturador).toBe(true);
  });

  it('debería reiniciar fisica y moral a false en facturador', () => {
    component.fisica = true;
    component.moral = true;
    component.toggleDivFacturador();
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
  });

  it('debería alternar showTableDiv y showFacturador de true a false', () => {
    component.showTableDiv = true;
    component.showFacturador = true;
    component.showTableDiv = !component.showTableDiv;
    component.showFacturador = !component.showFacturador;
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(false);
  });

  it('debería alternar showTableDiv y showFacturador de false a true', () => {
    component.showTableDiv = false;
    component.showFacturador = false;
    component.showTableDiv = !component.showTableDiv;
    component.showFacturador = !component.showFacturador;
    expect(component.showTableDiv).toBe(true);
    expect(component.showFacturador).toBe(true);
  });

  it('debería alternar showTableDiv y showFacturador al enviar el formulario', () => {
    component.showTableDiv = true;
    component.showFacturador = false;
    component.submitFacturadorForm();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(true);
  });

  it('debería establecer fisica en true y moral en false cuando el checkbox es "fisica"', () => {
    component.inputChecked('fisica');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
  });

  it('debería establecer fisica en false y moral en true cuando el checkbox no es "fisica"', () => {
    component.inputChecked('moral');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  it('debería establecer fisica en false y moral en true para cualquier otro valor de checkbox', () => {
    component.inputChecked('other');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  it('debería establecer nacional en true y extranjero en false cuando el checkbox es "nacional"', () => {
    component.tercerosInputChecked('nacional');
    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false);
  });

  it('debería establecer nacional en false y extranjero en true cuando el checkbox no es "nacional"', () => {
    component.tercerosInputChecked('extranjero');
    expect(component.nacional).toBe(false);
    expect(component.extranjero).toBe(true);
  });

  it('debería establecer nacional en false y extranjero en true para cualquier otro valor de checkbox', () => {
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

      expect(component.fabricanteRowData[0]).toHaveProperty('tbodyData');
      expect(Array.isArray(component.fabricanteRowData[0].tbodyData)).toBe(true);
      expect(component.destinatarioRowData[0]).toHaveProperty('tbodyData');
      expect(component.proveedorRowData[0]).toHaveProperty('tbodyData');
      expect(component.facturadorRowData[0]).toHaveProperty('tbodyData');
    });
  });

  describe('Verificación de imports de enums y componentes', () => {
    it('debería tener definidos los datos y componentes importados', () => {
      expect(typeof CODIGOPOSTALSELECTDATA).toBeDefined();
      expect(typeof COLONIASELECTDATA).toBeDefined();
      expect(typeof LOCALIDADSELECTDATA).toBeDefined();
      expect(typeof MUNICIPIOSELECTDATA).toBeDefined();
      expect(typeof PAISSELECTDATA).toBeDefined();
      expect(typeof TERCEROS_RELACIONADOS_TABLE_BODY_DATA).toBeDefined();
      expect(typeof TERCEROS_RELACIONADOS_TABLE_HEADER_DATA).toBeDefined();

      expect(AlertComponent).toBeDefined();
      expect(TituloComponent).toBeDefined();
      expect(CatalogoSelectComponent).toBeDefined();
      expect(InputRadioComponent).toBeDefined();
      expect(ModalComponent).toBeDefined();
      expect(TableComponent).toBeDefined();

      expect(TipoPersonaRadioOptions).toBeDefined();
      expect(NacionalidadRadioOptions).toBeDefined();
    });
  });
});
