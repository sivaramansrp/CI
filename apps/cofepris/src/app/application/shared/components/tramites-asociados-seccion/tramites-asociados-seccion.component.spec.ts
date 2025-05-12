import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { TramitesAsociadosSeccionComponent } from './tramites-asociados-seccion.component';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Asociados } from '../../models/datos-de-la-solicitud.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TramitesAsociadosSeccionComponent', () => {
  let component: TramitesAsociadosSeccionComponent;
  let fixture: ComponentFixture<TramitesAsociadosSeccionComponent>;
  let mockEstablecimientoService: jest.Mocked<EstablecimientoService>;

  beforeEach(async () => {
    mockEstablecimientoService = {
      enListaDeAsociados: jest.fn(),
    } as unknown as jest.Mocked<EstablecimientoService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule,TramitesAsociadosSeccionComponent],
      declarations: [],
      providers: [{ provide: EstablecimientoService, useValue: mockEstablecimientoService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesAsociadosSeccionComponent);
    component = fixture.componentInstance;

    // Mock the destroy$ Subject to avoid errors during ngOnDestroy
    component['destroy$'] = new Subject<void>();

    // Mock the enListaDeAsociados method to return an observable with mock data
    mockEstablecimientoService.enListaDeAsociados.mockReturnValue(of([
      { id: 1, folioTramite: 'FT123', tipoTramite: 'Tipo 1', estatus: 'Activo', fechaAltaDeRegistro: '2025-04-09' },
    ]));

    fixture.detectChanges();
  });

  afterEach(() => {
    // Ensure the destroy$ Subject is completed to avoid memory leaks
    component['destroy$'].next();
    component['destroy$'].complete();

    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the table configuration', () => {
    expect(component.configuracionTablaTramites).toEqual([
      { encabezado: '', clave: expect.any(Function), orden: 1 },
      { encabezado: 'Folio trámite', clave: expect.any(Function), orden: 2 },
      { encabezado: 'Tipo trámite', clave: expect.any(Function), orden: 3 },
      { encabezado: 'Estatus', clave: expect.any(Function), orden: 4 },
      { encabezado: 'Fecha alta de registro', clave: expect.any(Function), orden: 5 },
    ]);
  });

  it('should call obtenerListaDeAsociados on ngOnInit', () => {
    const obtenerListaDeAsociadosSpy = jest.spyOn(component, 'obtenerListaDeAsociados');
    component.ngOnInit();
    expect(obtenerListaDeAsociadosSpy).toHaveBeenCalled();
  });

  it('should fetch and assign asociados data to the table', () => {
    component.obtenerListaDeAsociados();

    expect(component.acuseTablaDatos).toEqual([
      { id: 1, folioTramite: 'FT123', tipoTramite: 'Tipo 1', estatus: 'Activo', fechaAltaDeRegistro: '2025-04-09' },
    ]);
    expect(mockEstablecimientoService.enListaDeAsociados).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});