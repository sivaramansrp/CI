import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { of } from 'rxjs';

describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;
  let validarInicalmenteServiceMock: jest.Mocked<ValidarInicalmenteService>;
  let tramite110208StoreMock: jest.Mocked<Tramite110208Store>;
  let tramite110208QueryMock: jest.Mocked<Tramite110208Query>;

  beforeEach(async () => {
      validarInicalmenteServiceMock = {
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Estado1' }] })),
      obtenerTablaDatosCertificado: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Dato1' }] })),
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Dato2' }] })), 
      obtenerFormDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'FormDato1' }] })),
    } as unknown as jest.Mocked<ValidarInicalmenteService>;

    tramite110208StoreMock = {
      setEntidadFederativa: jest.fn(),
      setBloque: jest.fn(),
    } as unknown as jest.Mocked<Tramite110208Store>;

    tramite110208QueryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'Test',
        bloque: 'Test',
        fechaInicio: '2023-01-01',
        fechaFinal: '2023-12-31',
      }),
    } as unknown as jest.Mocked<Tramite110208Query>;

    await TestBed.configureTestingModule({
      imports: [CertificadoOrigenComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ValidarInicalmenteService, useValue: validarInicalmenteServiceMock },
        { provide: Tramite110208Store, useValue: tramite110208StoreMock },
        { provide: Tramite110208Query, useValue: tramite110208QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formCertificado.get('entidadFederativa')?.value).toBe('Test');
    expect(component.formCertificado.get('bloque')?.value).toBe('Test');
  });

  it('should call obtenerEstadoList and populate estado', () => {
    component.obtenerEstadoList();
    expect(validarInicalmenteServiceMock.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, nombre: 'Estado1' }]);
  });

  it('should call obtenerTablaDatosCertificado and populate nicoTablaDatos', () => {
    component.obtenerTablaDatosCertificado();
    expect(validarInicalmenteServiceMock.obtenerTablaDatosCertificado).toHaveBeenCalled();
    expect(component.nicoTablaDatos).toEqual([{ id: 1, nombre: 'Dato1' }]);
  });

  it('should update fechaFinal in the form and call setEntidadFederativa', () => {
    component.cambioFechaFinal('2023-12-31', component.formCertificado, 'fechaFinal', 'setEntidadFederativa');
    expect(component.formCertificado.get('fechaFinal')?.value).toBe('2023-12-31');
    expect(tramite110208StoreMock.setEntidadFederativa).toHaveBeenCalledWith('2023-12-31');
  });

  it('should update fechaInicio in the form and call setBloque', () => {
    component.cambioFechaInicio('2023-01-01', component.formCertificado, 'fechaInicio', 'setBloque');
    expect(component.formCertificado.get('fechaInicio')?.value).toBe('2023-01-01');
    expect(tramite110208StoreMock.setBloque).toHaveBeenCalledWith('2023-01-01');
  });

  it('should set mostrarTercerOperador to true and call setEntidadFederativa', () => {
    component.tercerOperador(component.formCertificado, 'tercerOperador', 'setEntidadFederativa');
    expect(component.mostrarTercerOperador).toBe(true);
    expect(tramite110208StoreMock.setEntidadFederativa).toHaveBeenCalled();
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  it('should call the correct store method with the correct value', () => {
    const mockForm = new FormBuilder().group({
      testField: ['TestValue']
    });

    component.setValoresStore(mockForm, 'testField', 'setEntidadFederativa');
    expect(tramite110208StoreMock.setEntidadFederativa).toHaveBeenCalledWith('TestValue');
  });

  it('should not call the store method if the form field value is null', () => {
    const mockForm = new FormBuilder().group({
      testField: [null]
    });

    component.setValoresStore(mockForm, 'testField', 'setEntidadFederativa');
    expect(tramite110208StoreMock.setEntidadFederativa).not.toHaveBeenCalled();
  });

  it('should handle undefined form field gracefully', () => {
    const mockForm = new FormBuilder().group({});

    component.setValoresStore(mockForm, 'nonExistentField', 'setEntidadFederativa');
    expect(tramite110208StoreMock.setEntidadFederativa).not.toHaveBeenCalled();
  });

});
