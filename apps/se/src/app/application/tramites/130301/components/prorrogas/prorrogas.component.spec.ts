import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProrrogasComponent } from './prorrogas.component';
import { FormBuilder } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Tramite130301Store } from '../../../../estados/tramites/tramite130301.store';
import { Tramite130301Query } from '../../../../estados/queries/tramite130301.query';
import { of } from 'rxjs';

describe('ProrrogasComponent', () => {
  let component: ProrrogasComponent;
  let fixture: ComponentFixture<ProrrogasComponent>;
  let mockService: Partial<SolicitudProrrogaService>;
  let mockStore: Partial<Tramite130301Store>;
  let mockQuery: Partial<Tramite130301Query>;

  beforeEach(async () => {
    mockService = {
      obtenerProrrogasFormDatos: jest.fn().mockReturnValue(of({ data: [{ folioResolucion: '123', cantidad: 1, prorrogaDel: '2023-01-01', prorrogaAl: '2023-12-31' }] })),
    };

    mockStore = {
      setMotivoJustificacion: jest.fn(),
      setOtrasDeclaraciones: jest.fn(),
    };

    mockQuery = {
      selectSolicitud$: of({
        motivoJustificacion: 'Test Justification',
        otrasDeclaraciones: 'Test Declarations',
        paisEmisorCertificado: 'Test Country',
        mixed: 'false',
        paisDeOrigen: 'Test Origin',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ProrrogasComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudProrrogaService, useValue: mockService },
        { provide: Tramite130301Store, useValue: mockStore },
        { provide: Tramite130301Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProrrogasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.prorrogasForm.value).toEqual({
      folioResolucion: '',
      cantidad: '',
      prorrogaDel: '',
      prorrogaAl: '',
      motivoJustificacion: 'Test Justification',
      otrasDeclaraciones: 'Test Declarations',
    });
  });

  it('should call obtenerProrrogasFormDatos and populate form data', () => {
    expect(mockService.obtenerProrrogasFormDatos).toHaveBeenCalled();
    expect(component.prorrogasFormDatos.length).toBe(1);
    expect(component.prorrogasForm.value.folioResolucion).toBe('123');
    expect(component.prorrogasForm.value.cantidad).toBe(1);
  });

  it('should call setValoresStore with correct parameters', () => {
    const spy = jest.spyOn(mockStore, 'setMotivoJustificacion');
    component.setValoresStore(component.prorrogasForm, 'motivoJustificacion', 'setMotivoJustificacion');
    expect(spy).toHaveBeenCalledWith('Test Justification');
  });

  it('should clean up observables on destroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
