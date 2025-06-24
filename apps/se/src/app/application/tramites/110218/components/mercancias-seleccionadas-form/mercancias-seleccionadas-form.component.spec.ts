import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasSeleccionadasFormComponent } from './mercancias-seleccionadas-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MercanciasSeleccionadasFormComponent', () => {
  let component: MercanciasSeleccionadasFormComponent;
  let fixture: ComponentFixture<MercanciasSeleccionadasFormComponent>;
  let mockService: any;
  let mockQuery: any;
  let mockStore: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockService = {
      getUnidadMedida: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Unidad' }])),
      getTipodeFctura: jest.fn().mockReturnValue(of([{ id: 2, descripcion: 'Factura' }]))
    };
    mockQuery = {
      selectTramite110218State$: of({
        complementoDelaDescripcion: 'desc',
        marca: 'marca',
        valorMercancia: 100,
        unidaddeMedidadeComercializacion: 1,
        numerodeFactura: '123',
        tipodeFactura: 2
      })
    };
    mockStore = {
      setTramite110218State: jest.fn()
    };
    mockRouter = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [MercanciasSeleccionadasFormComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasSeleccionadasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize unidaddeMedidadeComercializacionOptions on unidadMedidaData', () => {
    component.unidadMedidaData();
    expect(mockService.getUnidadMedida).toHaveBeenCalled();
    expect(component.unidaddeMedidadeComercializacionOptions).toEqual([{ id: 1, descripcion: 'Unidad' }]);
  });

  it('should initialize tipodeFacturaOptions on tipoDeFactura', () => {
    component.tipoDeFactura();
    expect(mockService.getTipodeFctura).toHaveBeenCalled();
    expect(component.tipodeFacturaOptions).toEqual([{ id: 2, descripcion: 'Factura' }]);
  });

  it('should patch form values in tableDataValues if receivedData exists', () => {
    component.inicializarFormulario();
    component.receivedData = [{ nombreComercial: 'Com', nombreIngles: 'Ing' }];
    component.tableDataValues();
    expect(component.modifydatosdelcertificado.get('nombreComercial')?.value).toBe('Com');
    expect(component.modifydatosdelcertificado.get('nombreIngles')?.value).toBe('Ing');
    expect(component.modifydatosdelcertificado.get('cantidad')?.value).toBe('100');
    expect(component.modifydatosdelcertificado.get('fechadelaFactura')?.value).toBe('2024-11-13');
  });

  it('should emit true on modificarSuccess', () => {
    const spy = jest.spyOn(component.modificarÉxitoBtn, 'emit');
    component.modificarSuccess();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should update store with setValorStore', () => {
    component.inicializarFormulario();
    component.modifydatosdelcertificado.get('marca')?.setValue('NuevaMarca');
    component.setValorStore(component.modifydatosdelcertificado, 'marca');
    expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ marca: 'NuevaMarca' });
  });

  it('should update estadoSeleccionado on getValorStore', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual(expect.objectContaining({
      complementoDelaDescripcion: 'desc',
      marca: 'marca'
    }));
  });

  it('should clean up destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize the form with correct default values', () => {
    component.estadoSeleccionado = {
      complementoDelaDescripcion: 'desc',
      marca: 'marca',
      valorMercancia: 100,
      unidaddeMedidadeComercializacion: 1,
      numerodeFactura: '123',
      tipodeFactura: 2
    } as any;
    component.inicializarFormulario();
    expect(component.modifydatosdelcertificado.get('complementoDelaDescripcion')?.value).toBe('desc');
    expect(component.modifydatosdelcertificado.get('marca')?.value).toBe('marca');
    expect(component.modifydatosdelcertificado.get('valorMercancia')?.value).toBe(100);
    expect(component.modifydatosdelcertificado.get('unidaddeMedidadeComercializacion')?.value).toBe(1);
    expect(component.modifydatosdelcertificado.get('numerodeFactura')?.value).toBe('123');
    expect(component.modifydatosdelcertificado.get('tipodeFactura')?.value).toBe(2);
  });
});