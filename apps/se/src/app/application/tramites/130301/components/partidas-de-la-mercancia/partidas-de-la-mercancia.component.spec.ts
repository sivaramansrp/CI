import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;
  let mockService: jest.Mocked<SolicitudProrrogaService>;

  beforeEach(async () => {
    mockService = {
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [] })),
      obtenerPartidasFormDatos: jest.fn().mockReturnValue(of({ data: [] })),
    } as unknown as jest.Mocked<SolicitudProrrogaService>;

    await TestBed.configureTestingModule({
      imports: [PartidasDeLaMercanciaComponent],
      providers: [
        { provide: SolicitudProrrogaService, useValue: mockService },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize partidas form on ngOnInit', () => {
    expect(component.partidas).toBeDefined();
    expect(component.partidas.get('usoEspecificoMercancia')).toBeTruthy();
    expect(component.partidas.get('justificacionBeneficio')).toBeTruthy();
    expect(component.partidas.get('observaciones')).toBeTruthy();
    expect(component.partidas.get('representacionFederal')).toBeTruthy();
  });

  it('should call obtenerTablaDatos on ngOnInit', () => {
    expect(mockService.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('should call obtenerFormDatos on ngOnInit', () => {
    expect(mockService.obtenerPartidasFormDatos).toHaveBeenCalled();
  });

  it('should update partidasTablaDatos when obtenerTablaDatos is called', () => {
    const mockData = [{ id: 1, name: 'Test' }];

    component.obtenerTablaDatos();
    expect(component.partidasTablaDatos).toEqual(mockData);
  });

  it('should update partidasFormDatos and patch form values when obtenerFormDatos is called', () => {
    const mockFormData = [
      {
        usoEspecificoMercancia: 'Test Uso',
        justificacionBeneficio: 'Test Justificacion',
        observaciones: 'Test Observaciones',
        representacionFederal: 'Test Representacion',
      },
    ];

    component.obtenerFormDatos();
    expect(component.partidasFormDatos).toEqual(mockFormData);
    expect(component.partidas.value).toEqual({
      usoEspecificoMercancia: 'Test Uso',
      justificacionBeneficio: 'Test Justificacion',
      observaciones: 'Test Observaciones',
      representacionFederal: 'Test Representacion',
    });
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
