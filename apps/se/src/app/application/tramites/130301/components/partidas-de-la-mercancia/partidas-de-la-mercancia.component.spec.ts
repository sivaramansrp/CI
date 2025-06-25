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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario de partidas en ngOnInit', () => {
    expect(component.partidas).toBeDefined();
    expect(component.partidas.get('usoEspecificoMercancia')).toBeTruthy();
    expect(component.partidas.get('justificacionBeneficio')).toBeTruthy();
    expect(component.partidas.get('observaciones')).toBeTruthy();
    expect(component.partidas.get('representacionFederal')).toBeTruthy();
  });

  it('debe llamar a obtenerTablaDatos en ngOnInit', () => {
    expect(mockService.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('debe llamar a obtenerFormDatos en ngOnInit', () => {
    expect(mockService.obtenerPartidasFormDatos).toHaveBeenCalled();
  });

  it('debe limpiar los observables al destruir el componente', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
