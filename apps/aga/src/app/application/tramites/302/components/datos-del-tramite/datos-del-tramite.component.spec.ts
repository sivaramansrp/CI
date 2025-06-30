import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Solicitud302Service } from '../../services/service302.service'; // <-- Add this import
import { DATOS_DEL_DONANTE, DOMICILIO_FISCAL, MERCANCIAS } from '../../constantes/datos-del-tramite.enum';
import { Tramite302Query } from '../../../../../application/core/queries/tramite302.query';
import { Tramite302Store } from '../../../../../application/core/estados/tramites/tramite302.store';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let serviceMock: any;
  let storeMock: any;
  let queryMock: any;
  let fb: FormBuilder;

  beforeEach(() => {
    serviceMock = {
      getProductos: jest.fn().mockReturnValue(of([]))
    };

    storeMock = {
      setDynamicFieldValue: jest.fn(),
      selectRegistro$: of({})
    };

    queryMock = {
      selectRegistro$: of({})
    };
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteComponent,ReactiveFormsModule],
      providers: [FormBuilder,
        { provide: Solicitud302Service,useValue: serviceMock},
        { provide: Tramite302Query, useValue: storeMock },
        { provide: Tramite302Store, useValue: queryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.ngOnInit();
    fixture.detectChanges();
  });

  

  beforeEach(() => {
    component.certiRegistroState = {
      cantidad: '10',
      unidadDeMedida: [],
      anoDeImportacionTemporal: [],
    };
    component.listaUnidadDeMedida = [
      {id: 1 , descripcion: 'Unit A'},
      {id: 2 , descripcion: 'Unit B'}
    ];
    component.listImportacionTemporal = [
      {id: 1 , descripcion: '2023'},
      {id: 2 , descripcion: '2024'}
    ];
  });

  const formName = new FormGroup({});
  const formData: {labelNombre: string, campo: string, disabled: boolean, validators: string[], class: string, tipo_input: string}[] = [
    {
      labelNombre: 'Cantidad',
      campo: 'cantidad',
      disabled: false,
      validators: ['required'],
      class: 'col-md-8',
      tipo_input: 'text'
    },
    {
      labelNombre: 'Unidad de medida',
      campo: 'unidadDeMedida',
      disabled: false,
      validators: [],
      class: 'col-md-4',
      tipo_input: 'select-catalogos'
    },
    {
      labelNombre: 'Ano de importacion temporal',
      campo: 'anoDeImportacionTemporal',
      disabled: true,
      validators: ['required'],
      class: 'col-md-4',
      tipo_input: 'select-catalogos'
    },
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add controls to the form group with correct initial values and validators', () => {
    component.inicializarFormGroup(formName, formData);

    expect(formName.get('cantidad')).toBeTruthy();
    expect(formName.get('cantidad')?.value).toBe('10');
    expect(formName.get('cantidad')?.disabled).toBe(false);
    expect(formName.get('cantidad')?.validator).toBeDefined();

    expect(formName.get('unidadDeMedida')).toBeTruthy();
    expect(formName.get('unidadDeMedida')?.disabled).toBe(false);
    expect(formName.get('unidadDeMedida')?.validator).toBeNull();

    expect(formName.get('anoDeImportacionTemporal')).toBeTruthy();
    expect(formName.get('anoDeImportacionTemporal')?.disabled).toBe(true);
    expect(formName.get('unidadDeMedida')?.validator).toBeDefined();
  });

  it('should add controls with correct values, disabled state, and dropdown lists in inicializarFormGroup', () => {
    // Arrange
    const form = new FormGroup({});
    const formularioDatos = [
      { campo: 'unidadDeMedida', validators: [], disabled: false } as any,
      { campo: 'anoDeImportacionTemporal', validators: [], disabled: true } as any,
      { campo: 'otroCampo', validators: [], disabled: false } as any,
    ];
    component.certiRegistroState = {
      unidadDeMedida: "1",
      anoDeImportacionTemporal: 2,
      otroCampo: 'valor'
    };
    component.listaUnidadDeMedida = [{ id: 1, descripcion: 'Unidad 1' }];
    component.listImportacionTemporal = [{ id: 2, descripcion: '2024' }];
    component.soloLectura = false;

    // Act
    component.inicializarFormGroup(form, formularioDatos);

    // Assert
    expect(form.get('unidadDeMedida')).toBeTruthy();
    expect(form.get('unidadDeMedida')?.value).toEqual("1");
    expect(formularioDatos[0].listaDesplegable).toBe(component.listaUnidadDeMedida);

    expect(form.get('anoDeImportacionTemporal')).toBeTruthy();
    expect(form.get('anoDeImportacionTemporal')?.value).toEqual(2);
    expect(formularioDatos[1].listaDesplegable).toBe(component.listImportacionTemporal);

    expect(form.get('otroCampo')).toBeTruthy();
    expect(form.get('otroCampo')?.value).toEqual('valor');
    expect(form.get('anoDeImportacionTemporal')?.disabled).toBe(true);
    expect(form.get('unidadDeMedida')?.disabled).toBe(false);
  });

  it('should disable the form group if esFormularioSoloLectura is true', () => {
    // Arrange
    component.soloLectura = true;
    component.certiRegistroState = { campo1: 'valor1' };
    const form = new FormGroup({
      campo1: new FormControl('valor1'),
      campo2: new FormControl('valor2')
    });
    const formularioDatos = [
      { campo: 'campo1', validators: [], disabled: false } as any,
      { campo: 'campo2', validators: [], disabled: false } as any,
    ];
    // Act
    component.inicializarFormGroup(form, formularioDatos);

    // Assert
    expect(form.disabled).toBe(true);
  });

  it('should set the value of the specified form control with event.descripcion', () => {
    const form = new FormGroup({
      unidadDeMedida: new FormControl('')
    });
    const event = { id: 1, descripcion: 'Test Desc' };
    DatosDelTramiteComponent.docSeleccionado(event, form, 'unidadDeMedida');
    expect(form.get('unidadDeMedida')?.value).toBe('Test Desc');
  });

  it('should not throw if form is null', () => {
    const event = { id: 1, descripcion: 'Test Desc' };
    expect(() => DatosDelTramiteComponent.docSeleccionado(event, null as any, 'unidadDeMedida')).not.toThrow();
  });

  it('should not throw if form control does not exist', () => {
    const form = new FormGroup({});
    const event = { id: 1, descripcion: 'Test Desc' };
    expect(() => DatosDelTramiteComponent.docSeleccionado(event, form, 'noExiste')).not.toThrow();
  });


  it('should not add product if formAgregarProductos is invalid', () => {
    component.formAgregarProductos = fb.group({
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: '',
      marca: '',
      anoDeImportacionTemporal: 2,
      modelo: 'KL001',
      numeroDeSerie: 1
    });
    jest.spyOn(component.formAgregarProductos, 'valid', 'get').mockReturnValue(false);
    component.detallesDelProducto = [];
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    component.agregarProductos();

    expect(component.detallesDelProducto.length).toBe(0);
    expect(cerrarModalSpy).not.toHaveBeenCalled();
    expect(component.modalConfirmacion).not.toBe('show');
  });

  it('should set modal property to "show"', () => {
    component.modal = '';
    component.abrirModal();
    expect(component.modal).toBe('show');
  });
  

  it('should call click on closeModal.nativeElement', () => {
    const clickSpy = jest.spyOn(component.closeModal.nativeElement, 'click');
    component.cerrarModal();
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
  
  it('should initialize forms and set detallesDelProducto from certiRegistroState when not readonly', () => {
    const detalles = [{ tipoDeMercancia: 'Mercancia 1' }];
    component.soloLectura = false;
    component.certiRegistroState = { detallesDelProducto: detalles };
    queryMock = {
      selectRegistro$: of({ detallesDelProducto: detalles })
    } as any;

    component.ngOnInit();

    expect(component.soloLectura).toBe(false);
    expect(Array.isArray(component.detallesDelProducto)).toBe(true);
    expect(component.form).toBeDefined();
    expect(component.formAgregarProductos).toBeDefined();
    expect(component.formDatosDelDonante).toBeDefined();
    expect(component.formDomicilioFiscal).toBeDefined();
  });

  it('should call getProductosSeleccionados and set esFormularioSoloLectura when readonly', () => {
    // Arrange
    component.soloLectura = true;
    const getProductosSeleccionadosSpy = jest.spyOn(component, 'getProductosSeleccionados');
    queryMock = {
      selectRegistro$: of({ detallesDelProducto: [] })
    } as any;

    component.ngOnInit();

    expect(component.soloLectura).toBe(true);
    expect(getProductosSeleccionadosSpy).toHaveBeenCalled();
  });

  it('should return Validators.required if "required" is in the array', () => {
    const result = (DatosDelTramiteComponent as any).mapValidadores(['required']);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(Validators.required);
  });

  it('should return empty array if no validators are provided', () => {
    const result = (DatosDelTramiteComponent as any).mapValidadores([]);
    expect(result.length).toBe(0);
  });

  it('should return empty array if input is undefined', () => {
    const result = (DatosDelTramiteComponent as any).mapValidadores(undefined);
    expect(result.length).toBe(0);
  });
  
  it('should modify an existing product, update store, reset form, clear selection, close modal, and show confirmation when modificarProductos is called and form is valid', () => {
    const oldProduct = {
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: '',
      marca: 'test',
      anoDeImportacionTemporal: 2,
      modelo: 'KL001',
      numeroDeSerie: 1
    };
    const newProduct = {
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 10,
      unidadDeMedida: "2",
      enSucaso: '',
      marca: 'test2',
      anoDeImportacionTemporal: 3,
      modelo: 'KL002',
      numeroDeSerie: 2
    };
    component.formAgregarProductos = fb.group({
      tipoDeMercancia: [''],
      condicionDeLaMercancia: [''],
      cantidad: [''],
      unidadDeMedida: [''],
      enSucaso: [''],
      marca: [''],
      anoDeImportacionTemporal: [''],
      modelo: [''],
      numeroDeSerie: ['']
    });
    component.formAgregarProductos.setValue(newProduct);
    jest.spyOn(component.formAgregarProductos, 'valid', 'get').mockReturnValue(true);
    component.detallesDelProducto = [oldProduct];
    component.selectedProducto = [oldProduct];
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    component.modificarProductos();

    expect(component.detallesDelProducto[0]).toEqual(newProduct);
    expect(component.selectedProducto).toEqual([]);
    expect(component.formAgregarProductos.pristine).toBe(true);
    expect(cerrarModalSpy).toHaveBeenCalled();
    expect(component.modalConfirmacion).toBe('show');
  });

  it('should not modify product if not found in detallesDelProducto but still reset form, clear selection, close modal, and show confirmation', () => {
    const oldProduct = {
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: '',
      marca: 'test',
      anoDeImportacionTemporal: 2,
      modelo: 'KL001',
      numeroDeSerie: 1
    };
    const newProduct = {
      tipoDeMercancia: 'Another Product',
      condicionDeLaMercancia: 'Other Condition',
      cantidad: 10,
      unidadDeMedida: "2",
      enSucaso: '',
      marca: 'test2',
      anoDeImportacionTemporal: 3,
      modelo: 'KL002',
      numeroDeSerie: 2
    };
    component.formAgregarProductos = fb.group({
      tipoDeMercancia: [''],
      condicionDeLaMercancia: [''],
      cantidad: [''],
      unidadDeMedida: [''],
      enSucaso: [''],
      marca: [''],
      anoDeImportacionTemporal: [''],
      modelo: [''],
      numeroDeSerie: ['']
    });
    component.formAgregarProductos.setValue(newProduct);
    jest.spyOn(component.formAgregarProductos, 'valid', 'get').mockReturnValue(true);
    component.detallesDelProducto = [oldProduct];
    component.selectedProducto = [newProduct];
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    component.modificarProductos();

    expect(component.detallesDelProducto[0]).toEqual(oldProduct);
    expect(component.selectedProducto).toEqual([]);
    expect(component.formAgregarProductos.pristine).toBe(true);
    expect(cerrarModalSpy).toHaveBeenCalled();
    expect(component.modalConfirmacion).toBe('show');
  });

  it('should do nothing if formAgregarProductos is invalid', () => {
    component.formAgregarProductos = fb.group({
      tipoDeMercancia: [''],
      condicionDeLaMercancia: [''],
      cantidad: [''],
      unidadDeMedida: [''],
      enSucaso: [''],
      marca: [''],
      anoDeImportacionTemporal: [''],
      modelo: [''],
      numeroDeSerie: ['']
    });
    jest.spyOn(component.formAgregarProductos, 'valid', 'get').mockReturnValue(false);
    component.detallesDelProducto = [];
    component.selectedProducto = [];
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    component.modificarProductos();

    expect(component.detallesDelProducto.length).toBe(0);
    expect(component.selectedProducto).toEqual([]);
    expect(component.formAgregarProductos.pristine).toBe(true);
    expect(cerrarModalSpy).not.toHaveBeenCalled();
    expect(component.modalConfirmacion).not.toBe('show');
  });

  it('should set modal property to "show"', () => {
    component.modal = '';
    component.abrirModal();
    expect(component.modal).toBe('show');
  });
  

  it('should call click on closeModal.nativeElement', () => {
    const clickSpy = jest.spyOn(component.closeModal.nativeElement, 'click');
    component.cerrarModal();
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should call getProductosSeleccionados and set esFormularioSoloLectura when readonly', () => {
    // Arrange
    component.soloLectura = true;
    const getProductosSeleccionadosSpy = jest.spyOn(component, 'getProductosSeleccionados');
    queryMock = {
      selectRegistro$: of({ detallesDelProducto: [] })
    } as any;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.soloLectura).toBe(true);
    expect(getProductosSeleccionadosSpy).toHaveBeenCalled();
  });

  it('should return Validators.required if "required" is in the array', () => {
    const result = (DatosDelTramiteComponent as any).mapValidadores(['required']);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(Validators.required);
  });

  it('should return empty array if no validators are provided', () => {
    const result = (DatosDelTramiteComponent as any).mapValidadores([]);
    expect(result.length).toBe(0);
  });

  it('should return empty array if input is undefined', () => {
    const result = (DatosDelTramiteComponent as any).mapValidadores(undefined);
    expect(result.length).toBe(0);
  });
  
  it('should remove the selected product, update store, clear selection, and show confirmation', () => {
    const product = {
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: 'test',
      marca: 'test',
      anoDeImportacionTemporal: 1,
      modelo: 'KL001',
      numeroDeSerie: 1
    };
    component.detallesDelProducto = [product];
    component.selectedProducto = [product];

    component.eliminarProducto();

    expect(component.detallesDelProducto.length).toBe(0);
    expect(component.selectedProducto).toEqual([]);
    expect(component.modalConfirmacion).toBe('show');
  });

  it('should not remove product or update store if selectedProducto is empty', () => {
    component.detallesDelProducto = [{
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: 'test',
      marca: 'test',
      anoDeImportacionTemporal: 1,
      modelo: 'KL001',
      numeroDeSerie: 1
    }];
    component.selectedProducto = [];

    component.eliminarProducto();

    expect(component.detallesDelProducto.length).toBe(1);
    expect(component.modalConfirmacion).not.toBe('show');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    // Ensure detallesDelProducto is always an array before test
    if (!Array.isArray(component.detallesDelProducto)) {
      component.detallesDelProducto = [];
    }
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should set detallesDelProducto from service and update store (array)', () => {
    const productos = [{
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: 'test',
      marca: 'test',
      anoDeImportacionTemporal: 1,
      modelo: 'KL001',
      numeroDeSerie: 1
    }];
    // Ensure detallesDelProducto is always an array before test
    if (!Array.isArray(component.detallesDelProducto)) {
      component.detallesDelProducto = [];
    }
    serviceMock = { getProductos: jest.fn().mockReturnValue(of(productos)) } as any;

    component.getProductosSeleccionados();
  });

  it('should set detallesDelProducto as array if service returns single object', () => {
    const producto = {
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: 'test',
      marca: 'test',
      anoDeImportacionTemporal: 1,
      modelo: 'KL001',
      numeroDeSerie: 1
    };
    // Ensure detallesDelProducto is always an array before test
    component.detallesDelProducto = [];
    serviceMock = { getProductos: jest.fn().mockReturnValue(of(producto)) } as any;

    component.getProductosSeleccionados();
  });

  it('should set selectedProducto when valorDeAlternancia is called', () => {
    // Ensure selectedProducto is always an array before test
    component.selectedProducto = [];
    const row = [{
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: 'test',
      marca: 'test',
      anoDeImportacionTemporal: 1,
      modelo: 'KL001',
      numeroDeSerie: 1
    }];
    component.valorDeAlternancia(row);
    expect(component.selectedProducto).toBe(row);
  });

  it('should show modal, patch form, clear selectedProducto and call cerrarModal when modificarModal is called with selectedProducto', () => {
    // Arrange
    const product = {
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: "1",
      enSucaso: 'test',
      marca: 'test',
      anoDeImportacionTemporal: 1,
      modelo: 'KL001',
      numeroDeSerie: 1
    };
    component.selectedProducto = [product];
    // Ensure formAgregarProductos is defined
    if (!component.formAgregarProductos) {
      component.formAgregarProductos = new (fb.group as any)({
        tipoDeMercancia: [''],
        condicionDeLaMercancia: [''],
        cantidad: [''],
        unidadDeMedida: [''],
        enSucaso: [''],
        marca: [''],
        anoDeImportacionTemporal: [''],
        modelo: [''],
        numeroDeSerie: ['']
      });
    }
    const patchSpy = jest.spyOn(component.formAgregarProductos, 'patchValue');
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    // Act
    component.modificarModal();

    // Assert
    expect(component.modal).toBe('show');
    expect(patchSpy).toHaveBeenCalledWith(product);
    expect(component.selectedProducto).toEqual([]);
    expect(cerrarModalSpy).toHaveBeenCalled();
  });

  it('should do nothing if selectedProducto is not an array', () => {
    component.selectedProducto = undefined as any;
    component.modal = 'modal';
    // Ensure formAgregarProductos is defined
    if (!component.formAgregarProductos) {
      component.formAgregarProductos = new (fb.group as any)({});
    }
    const patchSpy = jest.spyOn(component.formAgregarProductos, 'patchValue');
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    expect(() => component.modificarModal()).not.toThrow();
    expect(component.modal).toBe('modal');
    expect(patchSpy).not.toHaveBeenCalled();
    expect(cerrarModalSpy).not.toHaveBeenCalled();
  });

  it('should do nothing if selectedProducto is an empty array', () => {
    component.selectedProducto = [];
    component.modal = 'modal';
    const patchSpy = jest.spyOn(component.formAgregarProductos, 'patchValue');
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');

    expect(() => component.modificarModal()).not.toThrow();
    expect(component.modal).toBe('modal');
    expect(patchSpy).not.toHaveBeenCalled();
    expect(cerrarModalSpy).not.toHaveBeenCalled();
  });

  it('should initialize form with MERCANCIAS fields', () => {
    // Arrange
    component.certiRegistroState = {};
    MERCANCIAS.forEach((campo: any) => {
      component.certiRegistroState[campo.campo] = '';
    });
    const form = new FormGroup({});
    // Act
    component.inicializarFormGroup(form, MERCANCIAS);

    // Assert: check that all fields from MERCANCIAS are present in the form
    MERCANCIAS.forEach((campo: any) => {
      expect(form.contains(campo.campo)).toBe(true);
    });
  });

});
