import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';

describe('DatosMercanciaContenedoraComponent', () => {
  let component: DatosMercanciaContenedoraComponent;
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMercanciaContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize tramiteState on ngOnInit', () => {
    const mockState = { tablaMercanciasConfigDatos: [] }; // Mock state
    jest.spyOn((component['tramite260204Query'] as any), 'selectTramiteState$').mockReturnValue({
      pipe: () => ({
        subscribe: (callback: (state: any) => void) => callback(mockState),
      }),
    } as any);

    component.ngOnInit();

    expect(component.tramiteState).toEqual(mockState);
  });

  it('should handle mercanciaSeleccionado and update state correctly', () => {
    const mockEvent = {
      clasificacionProducto: '123',
      especificarClasificacionProducto: 'Test',
      denominacionEspecificaProducto: 'Test Product',
      denominacionComun: 'Common Name',
      formaFarmaceutica: 'Tablet',
      estadoFisico: 'Solid',
      fraccionArancelaria: '456',
      descripcionFraccion: 'Description',
      unidadMedidaComercializacion: 'Box',
      cantidadUMC: 10,
      unidadMedidaTarifa: 'Kg',
      cantidadUMT: 5,
      presentacion: 'Pack',
      numeroRegistroSanitario: '789',
      paisOrigen: 'Country A',
      paisProcedencia: 'Country B',
      tipoProducto: 'Type A',
      usoEspecifico: 'Specific Use',
    };

    const mockState = {
      tablaMercanciasConfigDatos: [
        { clasificacionProducto: '123' },
      ],
    };

    component.tramiteState = mockState as any;

    jest.spyOn(component['tramite260204Store'], 'update');

    component.mercanciaSeleccionado(mockEvent as any);

    expect(component.SeleccionadoDatos).toEqual(mockEvent);
    expect(component['tramite260204Store'].update).toHaveBeenCalledWith(expect.objectContaining({
      seleccionadoTablaMercanciasDatos: [expect.objectContaining(mockEvent)],
      tablaMercanciasConfigDatos: expect.arrayContaining([expect.objectContaining(mockEvent)]),
    }));
  });
});
