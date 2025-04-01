import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockService: jest.Mocked<ExportacionDeDiamantesEnBrutoService>;
  let mockStore: jest.Mocked<Tramite130203Store>;
  let mockQuery: jest.Mocked<Tramite130203Query>;

  beforeEach(async () => {
    mockService = {
      getSolicitudeOptions: jest.fn(),
      getProductoOptions: jest.fn(),
      getListaDePaisesDisponibles: jest.fn(),
      getEntidadFederativa: jest.fn(),
      getRepresentacionFederal: jest.fn(),
    } as Partial<
      jest.Mocked<ExportacionDeDiamantesEnBrutoService>
    > as jest.Mocked<ExportacionDeDiamantesEnBrutoService>;
    mockStore = {
      updateState: jest.fn(),
    } as Partial<
      jest.Mocked<Tramite130203Store>
    > as jest.Mocked<Tramite130203Store>;

    mockQuery = {
      solicitud$: of('Test Solicitud'),
      regimen$: of('Test Regimen'),
      clasificacion$: of('Test Clasificacion'),
    } as jest.Mocked<Tramite130203Query>;

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        {
          provide: ExportacionDeDiamantesEnBrutoService,
          useValue: mockService,
        },
        { provide: Tramite130203Store, useValue: mockStore },
        { provide: Tramite130203Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formDelTramite).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
    expect(component.partidasDelaMercanciaForm).toBeDefined();
    expect(component.paisForm).toBeDefined();
    expect(component.frmRepresentacionForm).toBeDefined();
  });

  it('should call getSolicitudeOptions on opcionesDeBusqueda', () => {
    mockService.getSolicitudeOptions.mockReturnValue(
      of({ options: [], defaultSelect: 'Default Value' })
    );
    component.opcionesDeBusqueda();
    expect(mockService.getSolicitudeOptions).toHaveBeenCalled();
  });

  it('should update store state on form value changes', () => {
    component.formDelTramite.patchValue({
      solicitud: 'New Solicitud',
      regimen: 'New Regimen',
      clasificacion: 'New Clasificacion',
    });
    expect(mockStore.updateState).toHaveBeenCalledWith({
      solicitud: 'New Solicitud',
      regimen: 'New Regimen',
      clasificacion: 'New Clasificacion',
    });
  });

  it('should calculate totals correctly', () => {
    component.tableBodyData = [
      { tbodyData: ['10', '', '', '', '', '100.50'] },
      { tbodyData: ['5', '', '', '', '', '50.25'] },
    ];
    component.calcularTotales();
    expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(15);
    expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(
      150.75
    );
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
