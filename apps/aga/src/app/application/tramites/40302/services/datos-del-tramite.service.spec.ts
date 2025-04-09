import { TestBed } from '@angular/core/testing';
import { DatosDelTramiteService } from './datos-del-tramite.service';
import { Solicitud40302Store } from '../estados/tramite40302.store';
import { Solicitud40302Query } from '../estados/tramite40302.query';
import { of } from 'rxjs';

describe('DatosDelTramiteService', () => {
  let service: DatosDelTramiteService;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(() => {
    mockStore = {
      update: jest.fn(),
    };

    mockQuery = {
      select: jest.fn().mockReturnValue(of({
        cveFolioCaat: '3L6V',
        descTipoCaat: 'Naviero',
        descTipoAgente: 'Agente Naviero',
        directorGeneralNombre: 'HAZEL',
        primerApellido: 'NAVA',
        segundoApellido: 'AVILA',
      })),
    };

    TestBed.configureTestingModule({
      providers: [
        DatosDelTramiteService,
        { provide: Solicitud40302Store, useValue: mockStore },
        { provide: Solicitud40302Query, useValue: mockQuery },
      ],
    });

    service = TestBed.inject(DatosDelTramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call store.update with initial values when setInitialValues is called', () => {
    service.setInitialValues();

    expect(mockStore.update).toHaveBeenCalledWith({
      cveFolioCaat: '3L6V',
      descTipoCaat: 'Naviero',
      descTipoAgente: 'Agente Naviero',
      directorGeneralNombre: 'HAZEL',
      primerApellido: 'NAVA',
      segundoApellido: 'AVILA',
    });
  });

  it('should return the state observable when getSolicitudState is called', (done) => {
    service.getSolicitudState().subscribe((state) => {
      expect(state).toEqual({
        cveFolioCaat: '3L6V',
        descTipoCaat: 'Naviero',
        descTipoAgente: 'Agente Naviero',
        directorGeneralNombre: 'HAZEL',
        primerApellido: 'NAVA',
        segundoApellido: 'AVILA',
      });
      done();
    });

    expect(mockQuery.select).toHaveBeenCalled();
  });
});