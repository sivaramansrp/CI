import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargaDeMercanciasComponent } from './cargaDeMercancias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

describe('CargaDeMercanciasComponent', () => {
  let component: CargaDeMercanciasComponent;
  let fixture: ComponentFixture<CargaDeMercanciasComponent>;
  let validarInicalmenteServiceMock: any;
  let tramite110208QueryMock: any;

  beforeEach(async () => {
    validarInicalmenteServiceMock = {
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [] })),
      obtenerFormDatos: jest.fn().mockReturnValue(of({ data: [] })),
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: [] })),
    };

    tramite110208QueryMock = {
      selectSolicitud$: of({ marca: 'TestMarca', umc: 'TestUMC', cantidad: '10', valorDeLa: '100' }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CargaDeMercanciasComponent],
      providers: [
        { provide: ValidarInicalmenteService, useValue: validarInicalmenteServiceMock },
        { provide: Tramite110208Query, useValue: tramite110208QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CargaDeMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores por defecto', () => {
    expect(component.formMercancia.get('marca')?.value).toBe('TestMarca');
    expect(component.formMercancia.get('umc')?.value).toBe('TestUMC');
    expect(component.formMercancia.get('cantidad')?.value).toBe('10');
    expect(component.formMercancia.get('valorDeLa')?.value).toBe('100');
  });

  it('debe llamar a obtenerTablaDatos al inicializar', () => {
    expect(validarInicalmenteServiceMock.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.mercanciasTablaDatos).toEqual([]);
  });

  it('debe llamar a obtenerFormDatos al inicializar', () => {
    expect(validarInicalmenteServiceMock.obtenerFormDatos).toHaveBeenCalled();
    expect(component.mercanciasFormaDatos).toEqual([]);
  });

  it('debe llamar a obtenerEstadoList al inicializar', () => {
    expect(validarInicalmenteServiceMock.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual([]);
  });

  it('debe cerrar el modal cuando se llama cerrarModal', () => {
    const closeModalMock = {
      nativeElement: {
        click: jest.fn(),
      },
    };
    
    component.closeModal = closeModalMock as any;
    component.cerrarModal();
    expect(closeModalMock.nativeElement.click).toHaveBeenCalled();
  });

  it('debe actualizar fechaFactura en el formulario cuando se llama cambioFechaFactura', () => {
    const nuevoValor = '2023-01-01';
    component.cambioFechaFactura(nuevoValor, component.formMercancia, 'fechaFactura', 'setFechaFactura');
    expect(component.formMercancia.get('fechaFactura')?.value).toBe(nuevoValor);
  });

  it('debe llamar a setValoresStore cuando se llama setValoresStore', () => {
    const metodoNombre = 'setCantidad';
    const spy = jest.spyOn(component.tramite110208Store, metodoNombre as any);
    component.setValoresStore(component.formMercancia, 'cantidad', metodoNombre);
    expect(spy).toHaveBeenCalledWith('10');
  });

  it('debe limpiar los observables al destruir el componente', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
