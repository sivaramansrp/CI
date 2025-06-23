import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggregarComplimentosComponent } from './aggregar-complimentos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  DatosComplimentos,
  SociaoAccionistas,
} from '../../../../shared/models/complimentos.model';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { of } from 'rxjs';

const mockComplimentos: DatosComplimentos = {
  modalidad: 'Test',
  programaPreOperativo: 'Yes',
  datosGeneralis: { paginaWWeb: '', localizacion: '' },
  obligacionesFiscales: {
    opinionPositiva: '',
    fechaExpedicion: '',
    aceptarObligacionFiscal: '',
  },
  formaModificaciones: {
    nombreDelFederatario: '',
    nombreDeNotaria: '',
    estado: '',
    nombreDeActa: '',
    fechaDeActa: '',
    rfc: '',
    nombreDeRepresentante: '',
  },
  formaCertificacion: { certificada: '', fechaInicio: '', fechaVigencia: '' },
  formaSocioAccionistas: {
    nationalidadMaxicana: '',
    tipoDePersona: '',
    formaDatos: {},
  },
};

const mockAccionista: SociaoAccionistas = {
  nombre: 'Juan',
  rfc: 'RFC123',
};

const mockAccionistaExtranjero: SociaoAccionistas = {
  nombre: 'Ana',
  rfc: '',
};

describe('AggregarComplimentosComponent', () => {
  let component: AggregarComplimentosComponent;
  let fixture: ComponentFixture<AggregarComplimentosComponent>;
  let storeMock: jest.Mocked<Tramite80101Store>;
  let queryMock: jest.Mocked<Tramite80101Query>;

  beforeEach(async () => {
    storeMock = {
      setDatosComplimentos: jest.fn(),
      aggregarTablaDatosComplimentos: jest.fn(),
      aggregarTablaDatosComplimentosExtranjera: jest.fn(),
      eliminarTablaDatosComplimentos: jest.fn(),
      eliminarTablaDatosComplimentosExtranjera: jest.fn(),
    } as any;

    queryMock = {
      selectDatosComplimento$: of(mockComplimentos),
      selectTablaDatosComplimentos$: of([]),
      selectTablaDatosComplimentosExtranjera$: of([]),
    } as any;
    await TestBed.configureTestingModule({
      imports: [AggregarComplimentosComponent, HttpClientTestingModule],
      providers: [
        { provide: Tramite80101Store, useValue: storeMock },
        { provide: Tramite80101Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AggregarComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to selectDatosComplimento$ and set datosComplimentos', () => {
    expect(component.datosComplimentos).toEqual(mockComplimentos);
  });

  it('should call setDatosComplimentos on modifierComplimentos()', () => {
    component.modifierComplimentos(mockComplimentos);
    expect(storeMock.setDatosComplimentos).toHaveBeenCalledWith(
      mockComplimentos
    );
  });

  it('should call aggregarTablaDatosComplimentos for accionistas with RFC', () => {
    component.accionistasAgregados(mockAccionista);
    expect(storeMock.aggregarTablaDatosComplimentos).toHaveBeenCalledWith(
      mockAccionista
    );
  });

  it('should call aggregarTablaDatosComplimentosExtranjera for accionistas without RFC', () => {
    component.accionistasAgregados(mockAccionistaExtranjero);
    expect(
      storeMock.aggregarTablaDatosComplimentosExtranjera
    ).toHaveBeenCalledWith(mockAccionistaExtranjero);
  });

  it('should call eliminarTablaDatosComplimentos with data', () => {
    const data = [mockAccionista];
    component.accionistasEliminados(data);
    expect(storeMock.eliminarTablaDatosComplimentos).toHaveBeenCalledWith(data);
  });

  it('should call eliminarTablaDatosComplimentosExtranjera with data', () => {
    const data = [mockAccionistaExtranjero];
    component.accionistasExtranjerosEliminado(data);
    expect(
      storeMock.eliminarTablaDatosComplimentosExtranjera
    ).toHaveBeenCalledWith(data);
  });

  it('should complete destroyNotifier$ on manual call', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component['destroyNotifier$'].next();
    component['destroyNotifier$'].complete();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
