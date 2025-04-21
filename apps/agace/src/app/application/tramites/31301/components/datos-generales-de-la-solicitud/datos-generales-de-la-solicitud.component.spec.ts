import { TestBed } from '@angular/core/testing';
import { DatosGeneralesDeLaSolicitudComponent } from './datos-generales-de-la-solicitud.component';
import { SolicitudService } from '../../services/solicitud.service';
import { of } from 'rxjs';
import { DatosGeneralesDeLaSolicitudDatos } from '../../models/solicitud.model';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosGeneralesDeLaSolicitudComponent', () => {
  let component: DatosGeneralesDeLaSolicitudComponent;
  let solicitudService: jest.Mocked<SolicitudService>;
  let solicitud31301Store: jest.Mocked<Solicitud31301Store>;

  beforeEach(() => {
    const solicitudServiceMock = {
      conseguirDatosGeneralesDeLaSolicitudDatos: jest.fn(),
    };

    const solicitud31301StoreMock = {
      actualizarTipoDeEndoso: jest.fn(),
      actualizarTipoDeGarantia: jest.fn(),
      actualizarModalidadDeLaGarantia: jest.fn(),
      actualizarTipoSector: jest.fn(),
      actualizarConcepto: jest.fn(),
      actualizar3500: jest.fn(),
      actualizarDatosGeneralesRFC: jest.fn(),
      actualizarTextoGenerico1: jest.fn(),
      actualizarAlerta1: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        DatosGeneralesDeLaSolicitudComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31301Store, useValue: solicitud31301StoreMock },
      ],
    });

    component = TestBed.inject(DatosGeneralesDeLaSolicitudComponent);
    solicitudService = TestBed.inject(
      SolicitudService
    ) as jest.Mocked<SolicitudService>;
    solicitud31301Store = TestBed.inject(
      Solicitud31301Store
    ) as jest.Mocked<Solicitud31301Store>;
  });

  it('should call solicitudService and update store on conseguirDatosGeneralesDeLaSolicitudDatos', () => {
    const mockResponse: DatosGeneralesDeLaSolicitudDatos = {
      tipoDeEndoso: '',
      tipoDeGarantia: 1,
      modalidadDeLaGarantia: 2,
      tipoSector: '1',
      concepto: 1,
      '3500': 1,
      '3501': 2,
      '3502': 1,
      datosGeneralesRFC: '',
      '3503': 2,
      '3504': 1,
      '3505': 2,
      '3506': 1,
      '3507': 1,
      '3508': 1,
      '3509': 2,
      '3511': 2,
      '3512': 2,
      '3513': 2,
      textoGenerico1: 'Nombre del sistema o datos para su identificación',
      textoGenerico2: 'Lugar de radicación',
      '3514': 2,
      '3515': 2,
      '3516': 2,
      textoGenerico3:
        'Opinión positiva vigente del cumplimiento de obligaciones fiscales de la solicitante, los socios, accionistas, representante legal con facultad para actos',
      '3517': 1,
      '3518': 2,
      '3519': 1,
      '3520': 1,
      tipoInversion: 1,
      cantidadInversion: '',
      descInversion: '',
      '3521': 1,
      '3522': 1,
      claveEnumeracionD0:
        'Importación temporal para elaboración, transformación o reparación en programas de maquila o de exportación (IMMEX)',
      claveEnumeracionD1: '',
      claveEnumeracionD2: '',
      claveEnumeracionD3: '',
      claveEnumeracionH: '',
      textoGenerico4: '3213',
      textoGenerico5: '3213123',
      '3523': 1,
      '3528': 1,
      '3529': 1,
      textoGenerico6: '3213123',
      textoGenerico7: '3213123',
      '3530': 1,
      '3531': 1,
      textoGenerico9: '',
      textoGenerico10: 10,
      textoGenerico11: 10,
      textoGenerico12: 10,
      textoGenerico13: 10,
      textoGenerico14: 10,
      textoGenerico15: 10,
      textoGenerico16: 10,
      textoGenerico17: 10,
      textoGenerico18: 10,
      textoGenerico19: 10,
      textoGenerico20: 10,
      textoGenerico21: 10,
      textoGenerico22: 40,
      textoGenerico23: 40,
      textoGenerico24: 40,
      alerta1: false,
      alerta2: false,
    };

    solicitudService.conseguirDatosGeneralesDeLaSolicitudDatos.mockReturnValue(
      of(mockResponse)
    );

    component.conseguirDatosGeneralesDeLaSolicitudDatos();

    expect(
      solicitudService.conseguirDatosGeneralesDeLaSolicitudDatos
    ).toHaveBeenCalled();
    expect(solicitud31301Store.actualizarTipoDeEndoso).toHaveBeenCalledWith(
      mockResponse.tipoDeEndoso
    );
    expect(solicitud31301Store.actualizarTipoDeGarantia).toHaveBeenCalledWith(
      mockResponse.tipoDeGarantia
    );
    expect(
      solicitud31301Store.actualizarModalidadDeLaGarantia
    ).toHaveBeenCalledWith(mockResponse.modalidadDeLaGarantia);
    expect(solicitud31301Store.actualizarTipoSector).toHaveBeenCalledWith(
      mockResponse.tipoSector
    );
    expect(solicitud31301Store.actualizarConcepto).toHaveBeenCalledWith(
      mockResponse.concepto
    );
    expect(solicitud31301Store.actualizar3500).toHaveBeenCalledWith(
      mockResponse['3500']
    );
    expect(
      solicitud31301Store.actualizarDatosGeneralesRFC
    ).toHaveBeenCalledWith(mockResponse.datosGeneralesRFC);
    expect(solicitud31301Store.actualizarTextoGenerico1).toHaveBeenCalledWith(
      mockResponse.textoGenerico1
    );
    expect(solicitud31301Store.actualizarAlerta1).toHaveBeenCalledWith(
      mockResponse.alerta1
    );
    // Add other expectations as needed
  });

  it('should handle empty response gracefully', () => {
    solicitudService.conseguirDatosGeneralesDeLaSolicitudDatos.mockReturnValue(
      of({} as DatosGeneralesDeLaSolicitudDatos)
    );

    component.conseguirDatosGeneralesDeLaSolicitudDatos();

    expect(
      solicitudService.conseguirDatosGeneralesDeLaSolicitudDatos
    ).toHaveBeenCalled();
    expect(solicitud31301Store.actualizarTipoDeEndoso).not.toHaveBeenCalled();
    expect(solicitud31301Store.actualizarTipoDeGarantia).not.toHaveBeenCalled();
    // Add other expectations as needed
  });
  
  it('should emit tipoDeEndosoChanges and update store on getTipoDeEndoso', () => {
    const emitSpy = jest.spyOn(component.tipoDeEndosoChanges, 'emit');
    const mockEvento = 'test-evento';

    component.getTipoDeEndoso(mockEvento);

    expect(emitSpy).toHaveBeenCalledWith(mockEvento);
    expect(solicitud31301Store.actualizarTipoDeEndoso).toHaveBeenCalledWith(mockEvento);
  });

});
