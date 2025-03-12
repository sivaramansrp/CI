import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasSeleccionadasFormComponent } from './mercancias-seleccionadas-form.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('MercanciasSeleccionadasFormComponent', () => {
  let component: MercanciasSeleccionadasFormComponent;
  let fixture: ComponentFixture<MercanciasSeleccionadasFormComponent>;
  let mockService: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockService = {
      getUnidadMedida: jest.fn(() => of([{ id: 1, name: 'Kg' }])),
      getTipodeFctura: jest.fn(() => of([{ id: 1, name: 'Factura A' }])),
    };

    mockQuery = {
      tableDataDatos$: of([{ nombreComercial: 'Producto X', nombreIngles: 'Product X' }]),
    };

    await TestBed.configureTestingModule({
      imports:[MercanciasSeleccionadasFormComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Query, useValue: mockQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MercanciasSeleccionadasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.modifydatosdelcertificado.value).toEqual({
      nombreComercial: 'Producto X',  
      nombreIngles: 'Product X',      
      complementoDelaDescripcion: '',
      marca: '',
      valorMercancia: '',
      cantidad: '100',               
      unidaddeMedidadeComercializacion: '',
      numerodeFactura: '',
      tipodeFactura: '',
      fechadelaFactura: '2024-11-13', 
    });
  });

  it('should populate unidad de medida options', () => {
    component.unidadMedidaData();
    expect(mockService.getUnidadMedida).toHaveBeenCalled();
    expect(component.unidaddeMedidadeComercializacionOptions).toEqual([{ id: 1, name: 'Kg' }]);
  });

  it('should populate tipo de factura options', () => {
    component.tipoDeFactura();
    expect(mockService.getTipodeFctura).toHaveBeenCalled();
    expect(component.tipodeFacturaOptions).toEqual([{ id: 1, name: 'Factura A' }]);
  });

  it('should update form with received table data', () => {
    component.tableDataValues();
    expect(component.modifydatosdelcertificado.value.nombreComercial).toBe('Producto X');
    expect(component.modifydatosdelcertificado.value.nombreIngles).toBe('Product X');
  });

  it('should unsubscribe on destroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next'); // Use bracket notation to access private property
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});