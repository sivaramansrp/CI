import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudComponent } from './solicitud.component';
import { Solicitud6101Query } from '../../estados/solicitud6101.query';
import { Solicitud6101Store } from '../../estados/solicitud6101.store';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Solicitud6101State } from '../../estados/solicitud6101.store';
import { SolicitudCatologo } from '../../models/solicitud.model';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let solicitud6101StoreMock: any;
  let solicitudServiceMock: any;

  const stateMock: Solicitud6101State = {
    aduanaAux: 'aduana1',
    juntaTecnicaDerivada: 'junta1',
    numeroPedimento: '12345',
    nombreComercialMercancia: 'mercancia1',
    descDetalladaMercancia: 'descripcion1',
    fraccionI: '1234567890',
    capitulo: '12',
    partida: '1234',
    subpartida: '123456',
    subdivision: '90',
    fraccionII: '0987654321',
    capituloII: '09',
    partidaII: '0987',
    subpartidaII: '098765',
    subdivisionII: '21',
    fraccionIII: '1122334455',
    capituloIII: '11',
    partidaIII: '1122',
    subpartidaIII: '112233',
    subdivisionIII: '55',
    manifiestosSeleccionados: true,
  };

  beforeEach(async () => {
    solicitud6101StoreMock = {
      actualizarAduanaAux: jest.fn(),
      actualizarJuntaTecnicaDerivada: jest.fn(),
      actualizarNumeroPedimento: jest.fn(),
      actualizarNombreComercialMercancia: jest.fn(),
      actualizarDescDetalladaMercancia: jest.fn(),
      actualizarFraccionI: jest.fn(),
      actualizarFraccionII: jest.fn(),
      actualizarFraccionIII: jest.fn(),
      actualizarCapitulo: jest.fn(),
      actualizarPartida: jest.fn(),
      actualizarSubpartida: jest.fn(),
      actualizarSubdivision: jest.fn(),
      actualizarCapituloII: jest.fn(),
      actualizarPartidaII: jest.fn(),
      actualizarSubpartidaII: jest.fn(),
      actualizarSubdivisionII: jest.fn(),
      actualizarCapituloIII: jest.fn(),
      actualizarPartidaIII: jest.fn(),
      actualizarSubpartidaIII: jest.fn(),
      actualizarSubdivisionIII: jest.fn(),
      actualizarManifiestosSeleccionados: jest.fn(),
    };

    solicitudServiceMock = {
      conseguirSolicitudCatologo: jest.fn().mockReturnValue(of({
        aduana: { id: 'aduana1', nombre: 'Aduana Mock' },
        juntaTecnicaDerivada: { id: 'junta1', nombre: 'Junta Mock' },
      } as unknown as SolicitudCatologo)),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Solicitud6101Query, useValue: { seleccionarSolicitud$: of(stateMock) } },
        { provide: Solicitud6101Store, useValue: solicitud6101StoreMock },
        { provide: SolicitudService, useValue: solicitudServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with state values', () => {
    expect(component.solicitudForm.value).toEqual(stateMock);
  });

  it('should patch values when store emits new state', () => {
    const patchSpy = jest.spyOn(component.solicitudForm, 'patchValue');
    component.ngOnInit();
    expect(patchSpy).toHaveBeenCalledWith(stateMock);
  });

  it('should update store on fraccionI input', () => {
    const event = { target: { value: '1234567890' } } as any;
    component.onFraccionI(event);
    expect(solicitud6101StoreMock.actualizarFraccionI).toHaveBeenCalledWith('1234567890');
    expect(solicitud6101StoreMock.actualizarCapitulo).toHaveBeenCalledWith('12');
  });

  it('should update store on fraccionII input', () => {
    const event = { target: { value: '0987654321' } } as any;
    component.onFraccionII(event);
    expect(solicitud6101StoreMock.actualizarFraccionII).toHaveBeenCalledWith('0987654321');
    expect(solicitud6101StoreMock.actualizarCapituloII).toHaveBeenCalledWith('09');
  });

  it('should update store on fraccionIII input', () => {
    const event = { target: { value: '1122334455' } } as any;
    component.onFraccionIII(event);
    expect(solicitud6101StoreMock.actualizarFraccionIII).toHaveBeenCalledWith('1122334455');
    expect(solicitud6101StoreMock.actualizarCapituloIII).toHaveBeenCalledWith('11');
  });

  it('should sanitize and update numeroPedimento', () => {
    const event = { target: { value: '12abc345' } } as any;
    component.onNumeroPedimento(event);
    expect(solicitud6101StoreMock.actualizarNumeroPedimento).toHaveBeenCalledWith('');
  });

  it('should update name and description fields', () => {
    const nameEvent = { target: { value: 'testName' } } as any;
    const descEvent = { target: { value: 'testDesc' } } as any;

    component.onNombreComercialMercancia(nameEvent);
    component.onDescDetalladaMercancia(descEvent);

    expect(solicitud6101StoreMock.actualizarNombreComercialMercancia).toHaveBeenCalledWith('testName');
    expect(solicitud6101StoreMock.actualizarDescDetalladaMercancia).toHaveBeenCalledWith('testDesc');
  });

  it('should update manifiestosSeleccionados', () => {
    const event = { target: { checked: true } } as any;
    component.onManifiesto(event);
    expect(solicitud6101StoreMock.actualizarManifiestosSeleccionados).toHaveBeenCalledWith(true);
  });

  it('should update aduana and junta tecnica', () => {
    component.seleccionarAduana({ id: '123' } as any);
    expect(solicitud6101StoreMock.actualizarAduanaAux).toHaveBeenCalledWith('123');

    component.seleccionarJuntaTecnicaDerivada({ id: '456' } as any);
    expect(solicitud6101StoreMock.actualizarJuntaTecnicaDerivada).toHaveBeenCalledWith('456');
  });

  it('should split valid fraccion string into parts', () => {
    const result = component.divideFraccion('1234567890');
    expect(result).toEqual({
      capitulo: '12',
      partida: '1234',
      subpartida: '123456',
      subdivision: '90',
    });
  });

  it('should handle conseguirSolicitudCatologo()', () => {
    component.conseguirSolicitudCatologo();
    expect(solicitudServiceMock.conseguirSolicitudCatologo).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
