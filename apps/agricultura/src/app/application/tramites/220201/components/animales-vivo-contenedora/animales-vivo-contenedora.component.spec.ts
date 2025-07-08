import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalesVivoContenedoraComponent } from './animales-vivo-contenedora.component';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { of } from 'rxjs';
import { AnimalesEventos } from '../../../../shared/models/datos-de-la-solicitue.model';

describe('AnimalesVivoContenedoraComponent', () => {
  let component: AnimalesVivoContenedoraComponent;
  let fixture: ComponentFixture<AnimalesVivoContenedoraComponent>;

  const mockApiService = {
    obtenerRespuestaPorUrl: jest.fn().mockReturnValue(of({
      tipoRequisitoList: [], requisitoList: [], fraccionArancelariaList: [],
      nicoList: [], umtList: [], umcList: [], especieList: [],
      usoList: [], paisOrigenList: [], paisDeProcedenciaList: [], sexoList: []
    }))
  };

  const mockQuery = {
    seleccionarState$: of({
      tablaDatos: [],
      selectedDatos: [{
        tipoRequisito: 'REQ1',
        requisito: 'ABC',
        fraccionArancelaria: '1234',
        descripcionFraccion: 'desc1',
        nico: '567',
        descripcionNico: 'nico-desc',
        descripcion: 'desc',
        cantidadUMT: 10,
        umt: { value: 'KG', disabled: false },
        cantidadUMC: 5,
        umc: 'LTS',
        uso: 'uso-test',
        paisDeProcedencia: 'MX'
      }]
    })
  };

  const mockStore = {
    update: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalesVivoContenedoraComponent],
      providers: [
        { provide: CertificadoZoosanitarioServiceService, useValue: mockApiService },
        { provide: ZoosanitarioQuery, useValue: mockQuery },
        { provide: ZoosanitarioStore, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalesVivoContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize form and catalogs', () => {
    expect(component).toBeTruthy();
    expect(component.catalogosDatos.paisDeProcedenciaList).toEqual([]);
    expect(component.formularioSolicitud.descripcion).toBe('desc');
    expect(component.formularioSolicitud.uso).toBe('uso-test');
  });

  it('should call store.update on agregarDatosFormulario()', () => {
    const evento: AnimalesEventos = {
      formulario: {
        tipoRequisito: 'REQ2',
        requisito: 'DEF',
        fraccionArancelaria: '4321',
        descripcionFraccion: 'desc2',
        nico: '765',
        descripcionNico: 'nico-desc-2',
        descripcion: 'desc-2',
        cantidadUMT: '15',
        umt: { value: 'KG', disabled: false },
        cantidadUMC: '8',
        umc: 'LTS',
        uso: 'uso-test-2',
        paisDeProcedencia: 'US',
        numeroCertificado: '',
        especie: '',
        paisOrigen: ''
      },
      tablaDatos: []
    };

    component.agregarDatosFormulario(evento);
    expect(mockStore.update).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
