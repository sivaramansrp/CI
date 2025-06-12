import { AvisoCalculoComponent } from './aviso-calculo.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AvisoCalculoComponent', () => {
  let component: AvisoCalculoComponent;
  let solicitud30505StoreMock: any;
  let solicitud30505QueryMock: any;

  beforeEach(() => {
    solicitud30505StoreMock = {
      setCapacidadAlmacenamiento: jest.fn(),
      setEmpresaControladora: jest.fn()
      // ...add other methods as needed for setValoresStore
    };
    solicitud30505QueryMock = {
      selectSolicitud$: of({
        capacidadAlmacenamiento: '1',
        tipoSolicitudPexim: 'PEXIM',
        actividadProductiva: 'PROD',
        tipoCaat: 'CAAT',
        tipoProgFomExp: 'FOM',
        tipoTransito: 'TRANS',
        numeroEstablecimiento: '123',
        medioTransporte: 'CAMION',
        nombreBanco: 'BANCO',
        nomOficialAutorizado: 'OFICIAL',
        observaciones: 'OBS',
        empresaControladora: '1',
        descripcionLugarEmbarque: 'LUGAR'
      })
    };
    component = new AvisoCalculoComponent(
      new FormBuilder(),
      solicitud30505StoreMock,
      solicitud30505QueryMock
    );
    component.solicitudState = {
      capacidadAlmacenamiento: '1',
      tipoSolicitudPexim: 'PEXIM',
      actividadProductiva: 'PROD',
      tipoCaat: 'CAAT',
      tipoProgFomExp: 'FOM',
      tipoTransito: 'TRANS',
      numeroEstablecimiento: '123',
      medioTransporte: 'CAMION',
      nombreBanco: 'BANCO',
      nomOficialAutorizado: 'OFICIAL',
      observaciones: 'OBS',
      empresaControladora: '1',
      descripcionLugarEmbarque: 'LUGAR'
    } as any;
  });

  it('should initialize form and set visibility flags on ngOnInit', () => {
    component.ngOnInit();
    expect(component.avisoDeCalForm).toBeDefined();
    expect(component.montoContribuVisible).toBe(true);
    expect(component.montoTotalContribucionesVisible).toBe(true);
  });

  it('should call store method in setValoresStore', () => {
    component.ngOnInit();
    component.avisoDeCalForm.get('capacidadAlmacenamiento')?.setValue('2');
    component.setValoresStore(component.avisoDeCalForm, 'capacidadAlmacenamiento', 'setCapacidadAlmacenamiento');
    expect(solicitud30505StoreMock.setCapacidadAlmacenamiento).toHaveBeenCalledWith('2');
  });

  it('should update visibility flags in validaRadioCalculo', () => {
    component.ngOnInit();
    component.avisoDeCalForm.get('capacidadAlmacenamiento')?.setValue('0');
    component.avisoDeCalForm.get('empresaControladora')?.setValue('0');
    component.validaRadioCalculo();
    expect(component.montoContribuVisible).toBe(false);
    expect(component.montoTotalContribucionesVisible).toBe(false);
    component.avisoDeCalForm.get('capacidadAlmacenamiento')?.setValue('1');
    component.avisoDeCalForm.get('empresaControladora')?.setValue('1');
    component.validaRadioCalculo();
    expect(component.montoContribuVisible).toBe(true);
    expect(component.montoTotalContribucionesVisible).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
