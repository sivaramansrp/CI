import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MercanciasTableFormComponent } from './mercancias-table-form.component';
import { SolicitudService } from '../../services/solicitud.service';

describe('MercanciasTableFormComponent', () => {
  let component: MercanciasTableFormComponent;
  let fixture: ComponentFixture<MercanciasTableFormComponent>;
  let mockSolicitudService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,MercanciasTableFormComponent],
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
    expect(mockSolicitudService.getclave).toHaveBeenCalled();
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
});
