import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { of } from 'rxjs';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputRadioComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let revisionServiceMock: jest.Mocked<RevisionService>;
  let solicitudStoreMock: jest.Mocked<Solicitud220503Store>;
  let solicitudQueryMock: jest.Mocked<Solicitud220503Query>;

  beforeEach(async () => {
    revisionServiceMock = {
      getPagoDeDerechos: jest.fn(),
      getJustificacion: jest.fn(),
      getBanco: jest.fn(),
      getAduanaIngreso: jest.fn(),
      getOficianaInspeccion: jest.fn(),
      getPuntoInspeccion: jest.fn(),
      getEstablecimiento: jest.fn(),
      getRegimenDestinaran: jest.fn(),
      getMovilizacionNacional: jest.fn(),
      getPuntoVerificacion: jest.fn(),
      getEmpresaTransportista: jest.fn(),
      getDatosDelaSolicitud: jest.fn(),
      getMovilizacion: jest.fn(),
    } as any;

    solicitudStoreMock = {
      setJustificacion: jest.fn(),
      setClaveReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setIlavePago: jest.fn(),
      setImportePago: jest.fn(),
      setFetchaPago: jest.fn(),
      setExentoPagoNo: jest.fn(),
    } as any;

    solicitudQueryMock = {
      selectSolicitud$: jest.fn(),
      __store__: {} as any,
      select: jest.fn(),
      selectLoading: jest.fn(),
      selectError: jest.fn(),
      selectEntity: jest.fn(),
      selectAll: jest.fn(),
      selectActiveId: jest.fn(),
      selectActive: jest.fn(),
      config: {} as any,
    } as any;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        PagoDeDerechosComponent,
        CommonModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent,
      ],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: revisionServiceMock },
        { provide: Solicitud220503Store, useValue: solicitudStoreMock },
        { provide: Solicitud220503Query, useValue: solicitudQueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;

    (solicitudQueryMock.selectSolicitud$ as any).mockReturnValue(
      of({
        exentoPagoNo: '1',
        justificacion: 'Test Justification',
        claveReferencia: '12345',
        cadenaDependencia: 'Test Dependency',
        banco: 'Test Bank',
        llavePago: 'Test Key',
        importePago: '1000',
        fetchapago: '2023-01-01',
      }) as any
    );

    revisionServiceMock.getPagoDeDerechos.mockReturnValue(of({}));
    revisionServiceMock.getJustificacion.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getBanco.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.pagoForm).toBeDefined();
    expect(component.pagoForm.get('exentoPagoNo')?.value).toBe('1');
    expect(component.pagoForm.get('justificacion')?.value).toBe(
      'Test Justification'
    );
  });

  it('should call getPagoDeDerechos on initialization', () => {
    expect(revisionServiceMock.getPagoDeDerechos).toHaveBeenCalled();
  });

  it('should call getJustificacion on initialization', () => {
    expect(revisionServiceMock.getJustificacion).toHaveBeenCalled();
  });

  it('should call getBanco on initialization', () => {
    expect(revisionServiceMock.getBanco).toHaveBeenCalled();
  });

  it('should update the store when selectJustificacionCatalogo is called', () => {
    const mockCatalogo = {
      id: 123,
      descripcion: 'string',
      clave: 'string',
      tam: 'string',
      dpi: 'string',
      relacionadaUmtId: 123,
      relacionadaAcotacionId: 123,
    };
    component.selectJustificacionCatalogo(mockCatalogo);
    expect(solicitudStoreMock.setJustificacion).toHaveBeenCalledWith('123');
  });

  it('should update the store when setClaveReferencia is called', () => {
    const event = { target: { value: 'Test Reference' } } as any;
    component.setClaveReferencia(event);
    expect(solicitudStoreMock.setClaveReferencia).toHaveBeenCalledWith(
      'Test Reference'
    );
  });

  it('should update the store when setCadenaDependencia is called', () => {
    const event = { target: { value: 'Test Dependency' } } as any;
    component.setCadenaDependencia(event);
    expect(solicitudStoreMock.setCadenaDependencia).toHaveBeenCalledWith(
      'Test Dependency'
    );
  });

  it('should update the store when setExentoPagoNo is called', () => {
    component.setExentoPagoNo('1');
    expect(solicitudStoreMock.setExentoPagoNo).toHaveBeenCalledWith('1');
  });

  it('should update the store when selectBancoCatalogo is called', () => {
    const mockCatalogo = {
      id: 123,
      descripcion: 'string',
      clave: 'string',
      tam: 'string',
      dpi: 'string',
      relacionadaUmtId: 123,
      relacionadaAcotacionId: 123,
    };
    component.selectBancoCatalogo(mockCatalogo);
    expect(solicitudStoreMock.setBanco).toHaveBeenCalledWith('456');
  });

  it('should update the store when setIlavePago is called', () => {
    const event = { target: { value: 'Test Key' } } as any;
    component.setIlavePago(event);
    expect(solicitudStoreMock.setIlavePago).toHaveBeenCalledWith('Test Key');
  });

  it('should update the store when setFetchaPago is called', () => {
    const event = { target: { value: '2023-01-01' } } as any;
    component.setFetchaPago(event);
    expect(solicitudStoreMock.setFetchaPago).toHaveBeenCalledWith('2023-01-01');
  });

  it('should update the store when setImportePago is called', () => {
    const event = { target: { value: '1000' } } as any;
    component.setImportePago(event);
    expect(solicitudStoreMock.setImportePago).toHaveBeenCalledWith('1000');
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
