import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MercanciasTableFormComponent } from './mercancias-table-form.component';
import { SolicitudService } from '../../services/solicitud.service';
import { of } from 'rxjs';

describe('MercanciasTableFormComponent', () => {
  let component: MercanciasTableFormComponent;
  let fixture: ComponentFixture<MercanciasTableFormComponent>;
  let mockSolicitudService: any;

  beforeEach(async () => {
    mockSolicitudService = {
      getClave: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Test Catalogo' }])),
      getClasificacionProducto: jest.fn().mockReturnValue(of([])),
      getTestadoFisico: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MercanciasTableFormComponent],
      declarations: [],
      providers: [{ provide: SolicitudService, useValue: mockSolicitudService }],
    }).compileComponents();
    fixture = TestBed.createComponent(MercanciasTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosMercanciaForm properly', () => {
    expect(component.datosMercanciaForm).toBeDefined();
    const formControls = component.datosMercanciaForm.controls;

    expect(formControls['clasificacion']).toBeTruthy();
    expect(formControls['clasificacion'].validator).toBeDefined();
    expect(formControls['clasificacion'].hasError('required')).toBeTruthy();
  });

  it('should emit Cancelar event when cerrarMercanciasTableForm is called', () => {
    spyOn(component.Cancelar, 'emit');
    component.cerrarMercanciasTableForm();
    expect(component.Cancelar.emit).toHaveBeenCalled();
  });

  it('should populate "especificarClasificacion"', () => {
    expect(mockSolicitudService.getClave).toHaveBeenCalled();
    expect(component.especificarClasificacion).toEqual([{ id: 1, descripcion: 'Test Catalogo' }]);
  });

  it('should set form values and mark fields as required', () => {
    component.datosMercanciaForm.setValue({
      clasificacion: 'Test Classification',
      especificarClasificacion: 'Test Specification',
      especificaDelProducto: 'Test Product Details',
      denominacionDistintiva: 'Distinctive Denomination',
      nombreCientifico: 'Scientific Name',
      tipoDeProducto: 'Product Type',
      estadoFisico: 'Physical State',
      fraccionArancelaria: 'Tariff Fraction',
      descripcionFraccion: 'Fraction Description',
      cantidadUMT: '10',
      UMT: 'Unit Measure T',
      cantidadUMC: '5',
      UMC: 'Unit Measure C',
      tipoDeEnvase: 'Container Type',
    });

    expect(component.datosMercanciaForm.valid).toBeTruthy();
  });

  // Additional tests for coverage

  it('should have invalid form when required fields are missing', () => {
    component.datosMercanciaForm.reset();
    expect(component.datosMercanciaForm.invalid).toBe(true);
    expect(component.datosMercanciaForm.get('clasificacion')?.hasError('required')).toBe(true);
  });

  // The following tests are commented out because the component does not have Guardar output or guardarMercanciasTableForm/patchForm methods.
  // Uncomment and adjust if you add these to your component.

  // it('should emit Guardar event when guardarMercanciasTableForm is called and form is valid', () => {
  //   spyOn(component.Guardar, 'emit');
  //   component.datosMercanciaForm.setValue({
  //     clasificacion: 'Test Classification',
  //     especificarClasificacion: 'Test Specification',
  //     especificaDelProducto: 'Test Product Details',
  //     denominacionDistintiva: 'Distinctive Denomination',
  //     nombreCientifico: 'Scientific Name',
  //     tipoDeProducto: 'Product Type',
  //     estadoFisico: 'Physical State',
  //     fraccionArancelaria: 'Tariff Fraction',
  //     descripcionFraccion: 'Fraction Description',
  //     cantidadUMT: '10',
  //     UMT: 'Unit Measure T',
  //     cantidadUMC: '5',
  //     UMC: 'Unit Measure C',
  //     tipoDeEnvase: 'Container Type',
  //   });
  //   component.guardarMercanciasTableForm();
  //   expect(component.Guardar.emit).toHaveBeenCalledWith(component.datosMercanciaForm.value);
  // });

  // it('should not emit Guardar event when guardarMercanciasTableForm is called and form is invalid', () => {
  //   spyOn(component.Guardar, 'emit');
  //   component.datosMercanciaForm.reset();
  //   component.guardarMercanciasTableForm();
  //   expect(component.Guardar.emit).not.toHaveBeenCalled();
  // });

  it('should call getClasificacionProducto and getTestadoFisico on init', () => {
    expect(mockSolicitudService.getClasificacionProducto).toHaveBeenCalled();
    expect(mockSolicitudService.getTestadoFisico).toHaveBeenCalled();
  });

  // it('should patch form value when patchForm is called', () => {
  //   const patchValue = {
  //     clasificacion: 'Patch Classification',
  //     especificarClasificacion: 'Patch Specification',
  //     especificaDelProducto: 'Patch Product Details',
  //     denominacionDistintiva: 'Patch Denomination',
  //     nombreCientifico: 'Patch Scientific Name',
  //     tipoDeProducto: 'Patch Product Type',
  //     estadoFisico: 'Patch Physical State',
  //     fraccionArancelaria: 'Patch Tariff Fraction',
  //     descripcionFraccion: 'Patch Fraction Description',
  //     cantidadUMT: '20',
  //     UMT: 'Patch Unit Measure T',
  //     cantidadUMC: '15',
  //     UMC: 'Patch Unit Measure C',
  //     tipoDeEnvase: 'Patch Container Type',
  //   };
  //   component.patchForm(patchValue);
  //   expect(component.datosMercanciaForm.value).toEqual(patchValue);
  // });
});
