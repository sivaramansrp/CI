import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { MercanciasSeleccionadasFormComponent } from './mercancias-seleccionadas-form.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Router } from '@angular/router';

describe('MercanciasSeleccionadasFormComponent', () => {
  let component: MercanciasSeleccionadasFormComponent;
  let fixture: ComponentFixture<MercanciasSeleccionadasFormComponent>;
  let mockService: any;
  let mockQuery: any;
  let mockStore: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockService = {
      getUnidadMedida: jest.fn().mockReturnValue(of([{ id: 1, name: 'Unidad 1' }])),
      getTipodeFctura: jest.fn().mockReturnValue(of([{ id: 1, name: 'Factura 1' }])),
    };

    mockQuery = {
      unidaddeMedidadeComercializacion$: of('Unidad 1'),
      tipodeFactura$: of('Factura 1'),
      complementoDelaDescripcion$: of('Descripción'),
      marca$: of('Marca 1'),
      valorMercancia$: of('100.00'),
      numerodeFactura$: of('12345'),
      tableDataDatos$: of([{ nombreComercial: 'Producto 1', nombreIngles: 'Product 1' }]),
    };

    mockStore = {
      setUnidadeMedida: jest.fn(),
      setTipodeFactura: jest.fn(),
      setComplementoDelaDescripcion: jest.fn(),
      setMarca: jest.fn(),
      setValorMercancia: jest.fn(),
      setNumerodeFactura: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,MercanciasSeleccionadasFormComponent],
      declarations: [],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasSeleccionadasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.modifydatosdelcertificado.value).toEqual({
      nombreComercial: '',
      nombreIngles: '',
      complementoDelaDescripcion: '',
      marca: '',
      valorMercancia: '',
      cantidad: '',
      unidaddeMedidadeComercializacion: '',
      numerodeFactura: '',
      tipodeFactura: '',
      fechadelaFactura: '',
    });
  });

  it('should fetch unidad de medida options on initialization', () => {
    expect(mockService.getUnidadMedida).toHaveBeenCalled();
    expect(component.unidaddeMedidadeComercializacionOptions).toEqual([{ id: 1, name: 'Unidad 1' }]);
  });

  it('should fetch tipo de factura options on initialization', () => {
    expect(mockService.getTipodeFctura).toHaveBeenCalled();
    expect(component.tipodeFacturaOptions).toEqual([{ id: 1, name: 'Factura 1' }]);
  });

  it('should patch form values from received data', () => {
    expect(component.modifydatosdelcertificado.get('nombreComercial')?.value).toBe('Producto 1');
    expect(component.modifydatosdelcertificado.get('nombreIngles')?.value).toBe('Product 1');
  });

  it('should emit modificarÉxitoBtn event on modificarSuccess', () => {
    jest.spyOn(component.modificarÉxitoBtn, 'emit');
    component.modificarSuccess();
    expect(component.modificarÉxitoBtn.emit).toHaveBeenCalledWith(true);
  });

  it('should update store on unidad de medida change', () => {
    component.modifydatosdelcertificado.get('unidaddeMedidadeComercializacion')?.setValue('Unidad 1');
    component.enCambioDeUnidadDeMedida();
    expect(mockStore.setUnidadeMedida).toHaveBeenCalledWith('Unidad 1');
  });

  it('should update store on tipo de factura change', () => {
    component.modifydatosdelcertificado.get('tipodeFactura')?.setValue('Factura 1');
    component.enCambioDeTipoDeFactura();
    expect(mockStore.setTipodeFactura).toHaveBeenCalledWith('Factura 1');
  });

  it('should update store on complementoDelaDescripcion change', () => {
    component.onMercanciaSeleccionadasChange('complementoDelaDescripcion');
    expect(mockStore.setComplementoDelaDescripcion).toHaveBeenCalledWith('Descripción');
  });

  it('should update store on marca change', () => {
    component.onMercanciaSeleccionadasChange('marca');
    expect(mockStore.setMarca).toHaveBeenCalledWith('Marca 1');
  });

  it('should update store on valorMercancia change', () => {
    component.onMercanciaSeleccionadasChange('valorMercancia');
    expect(mockStore.setValorMercancia).toHaveBeenCalledWith('100.00');
  });

  it('should update store on numerodeFactura change', () => {
    component.onMercanciaSeleccionadasChange('numerodeFactura');
    expect(mockStore.setNumerodeFactura).toHaveBeenCalledWith('12345');
  });
});