import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosTramiteComponent } from './datos-tramite.component';
import { Tramite40402Service } from '../../estados/tramite40402.service';

describe('DatosTramiteComponent', () => {
  let component: DatosTramiteComponent;
  let fixture: ComponentFixture<DatosTramiteComponent>;
  let tramite40402ServiceMock: any;

  beforeEach(async () => {
    tramite40402ServiceMock = {
      geTideCodTransportacionAerea: jest.fn(),
      getTipoDeCaatAerea: jest.fn(),
      buscarSolicitudPorCAATe: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosTramiteComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite40402Service, useValue: tramite40402ServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('claveFolioCAAT')).toBeTruthy();
  });

  it('should call cargarCodigoTransportacion on ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'cargarCodigoTransportacion');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call cargarTipoCaatAereo on ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'cargarTipoCaatAereo');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should load tipoDeCaatAerea data', () => {
    const mockData = [{ id: 1, name: 'Test' }];
    tramite40402ServiceMock.getTipoDeCaatAerea.mockReturnValue(of(mockData));
    component.tipoDeCaatAereaData();
    expect(tramite40402ServiceMock.getTipoDeCaatAerea).toHaveBeenCalled();
    expect(component.tipoDeCaatAerea).toEqual(mockData);
  });

  it('should load ideCodTransportacionAerea data', () => {
    const mockData = [{ id: 1, name: 'Test' }];
    tramite40402ServiceMock.geTideCodTransportacionAerea.mockReturnValue(of(mockData));
    component.ideCodTransportacionAereaData();
    expect(tramite40402ServiceMock.geTideCodTransportacionAerea).toHaveBeenCalled();
    expect(component.ideCodTransportacionAerea).toEqual(mockData);
  });

  it('should convert claveFolioCAAT to uppercase', () => {
    component.ngOnInit();
    const event = { target: { value: 'test' } };
    component.caatConMayusculas(event);
    expect(component.formulario.get('claveFolioCAAT')?.value).toBe('TEST');
  });

  it('should mark all form controls as touched', () => {
    component.ngOnInit();
    const spy = jest.spyOn(component.formulario.get('claveFolioCAAT')!, 'markAsTouched');
    component.markFormGroupTouched(component.formulario);
    expect(spy).toHaveBeenCalled();
  });

  it('should patch form values when buscarSolicitudPorCAAT is successful', () => {
    const mockResponse = {
      idSolicitud: '1',
      claveFolioCAAT: 'TEST',
      tipoDeCaatAerea: 'Type',
      ideCodTransportacionAerea: 'Code',
    };
    tramite40402ServiceMock.buscarSolicitudPorCAATe.mockReturnValue(of(mockResponse));
    component.ngOnInit();
    component.formulario.get('claveFolioCAAT')?.setValue('TEST');
    component.buscarSolicitudPorCAAT();
    expect(tramite40402ServiceMock.buscarSolicitudPorCAATe).toHaveBeenCalledWith('TEST');
    expect(component.formulario.value).toMatchObject(mockResponse);
  });

  it('should not call buscarSolicitudPorCAATe if form is invalid', () => {
    component.ngOnInit();
    component.formulario.get('claveFolioCAAT')?.setValue('');
    component.buscarSolicitudPorCAAT();
    expect(tramite40402ServiceMock.buscarSolicitudPorCAATe).not.toHaveBeenCalled();
  });

  it('should unsubscribe from destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});