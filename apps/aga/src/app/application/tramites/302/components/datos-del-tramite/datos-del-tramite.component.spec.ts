import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormGroup } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    
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


  it('should set the value of the specified form control with event.descripcion', () => {
    const event: Catalogo = { id: 1, descripcion: 'Test Description' };
    const formControlName = 'unidadDeMedida';
    component.docSeleccionado(event, formName, formControlName);
    expect(formName.get(formControlName)?.value).toBe('Test Description');
  });

  it('should handle undefined or null form safely', () => {
    const event: Catalogo = { id: 1, descripcion: 'Test Description' };
    const formControlName = 'unidadDeMedida';
    component.docSeleccionado(event, null as any, formControlName);
    expect(() => component.docSeleccionado(event, null as any, formControlName)).not.toThrow();
  });

  it('should handle undefined or null form control safely', () => {
    const event: Catalogo = { id: 1, descripcion: 'Test Description' };
    component.docSeleccionado(event, formName, 'nonExistentFormControl');
    expect(formName.get('nonExistentFormControl')).toBeNull();
  });

  it('should add product to detallesDelProducto and reset the form if formAgregarProductos is valid', () => {
    component.formAgregarProductos.setValue({
      tipoDeMercancia: 'Test Product',
      condicionDeLaMercancia: 'Product Condition',
      cantidad: 5,
      unidadDeMedida: { id: 1, descripcion: 'Test Description' },
      enSuCaso: '',
      marca: 'test',
      anoDeImportacionTemporal: { id: 1, descripcion: 'Test Description' },
      modelo: 'KL001',
      numeroDeSerie: 'INR78742TT',
    });
    component.agregarProductos();
    expect(component.detallesDelProducto.length).toBe(1);
    expect(component.detallesDelProducto[0].tipoDeMercancia).toBe('Test Product');
    expect(component.modalConfirmacion).toBe('show');
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
  
});
