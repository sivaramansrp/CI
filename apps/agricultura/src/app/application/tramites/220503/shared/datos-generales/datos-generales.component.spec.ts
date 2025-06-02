import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
  SharedModule, WizardComponent
} from '@ng-mf/data-access-user';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


describe('DatosGeneralesComponent', () => {
  jest.mock('../../services/revision.service');
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let revisionServiceMock: jest.Mocked<RevisionService>;
  let solicitudStoreMock: jest.Mocked<Solicitud220503Store>;
  let solicitudQueryMock: jest.Mocked<Solicitud220503Query>;
  let validacionesServiceMock: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    revisionServiceMock = {
      getDatosDelaSolicitud: jest.fn(),
      getAduanaIngreso: jest.fn(),
      getOficianaInspeccion: jest.fn(),
      getPuntoInspeccion: jest.fn(),
      getEstablecimiento: jest.fn(),
      getRegimenDestinaran: jest.fn(),
      getMovilizacionNacional: jest.fn(),
      getPuntoVerificacion: jest.fn(),
      getEmpresaTransportista: jest.fn(),
    } as unknown as jest.Mocked<RevisionService>;

    solicitudStoreMock = {
      setFoliodel: jest.fn(),
      setClaveUCON: jest.fn(),
      setEstablecimientoTIF: jest.fn(),
      setNombre: jest.fn(),
      setNumeroguia: jest.fn(),
      setCoordenadas: jest.fn(),
      setTransporte: jest.fn(),
      setNombreEmpresa: jest.fn(),
      setAduanaIngreso: jest.fn(),
      setOficinaInspeccion: jest.fn(),
      setPuntoInspeccion: jest.fn(),
      setRegimen: jest.fn(),
      setMovilizacion: jest.fn(),
      setCapturaDatosMercancia: jest.fn(),
      setPunto: jest.fn(),
    } as unknown as  jest.Mocked<Solicitud220503Store>;

    solicitudQueryMock = {
      selectSolicitud$: jest.fn(),
    } as unknown as  jest.Mocked<Solicitud220503Query>;

    validacionesServiceMock = {
      isValid: jest.fn(),
    } as unknown as  jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, DatosGeneralesComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
          RouterModule,
                FormsModule,
                HttpClientModule,
                WizardComponent,
                SharedModule,

      ],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: revisionServiceMock },
        { provide: Solicitud220503Store, useValue: solicitudStoreMock },
        { provide: Solicitud220503Query, useValue: solicitudQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    (solicitudQueryMock.selectSolicitud$ as unknown as jest.Mock).mockReturnValue(of(
      
    ) as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.forma).toBeDefined();
  });

  it('should call getDatosDelaSolicitud and update the store', () => {
    const mockResponse = {
      certificadosAutorizados: 0,
      horaDeInspeccion: 0,
      aduanaDeIngreso: 0,
      sanidadAgropecuaria: 0,
      puntoDeInspeccion: 0,
      fechaDeInspeccion: '',
      nombre: '',
      primerapellido: '',
      segundoapellido: '',
      mercancia: '',
      tipocontenedor: 0,
      transporteIdMedio: 0,
      identificacionTransporte: '',
      esSolicitudFerros: '',
      totalDeGuiasAmparadas: '',
      foliodel: '',
      aduanaIngreso: 0,
      oficinaInspeccion: 0,
      puntoInspeccion: 0,
      claveUCON: '',
      establecimientoTIF: '',
      numeroguia: '',
      regimen: 0,
      capturaDatosMercancia: 0,
      coordenadas: '',
      movilizacion: 0,
      transporte: '',
      punto: 0,
      nombreEmpresa: 0,
      fetchapago: '',
      exentoPagoNo: 0,
      justificacion: 0,
      claveReferencia: '',
      cadenaDependencia: '',
      banco: 0,
      llavePago: '',
      importePago: '',


    };
    revisionServiceMock.getDatosDelaSolicitud.mockReturnValue(of(mockResponse));

    component.actualizarDatosDelaSolicitud();

    expect(revisionServiceMock.getDatosDelaSolicitud).toHaveBeenCalled();
    expect(solicitudStoreMock.setFoliodel).toHaveBeenCalledWith(mockResponse.foliodel);
    expect(solicitudStoreMock.setClaveUCON).toHaveBeenCalledWith(mockResponse.claveUCON);
    expect(solicitudStoreMock.setEstablecimientoTIF).toHaveBeenCalledWith(mockResponse.establecimientoTIF);
    expect(solicitudStoreMock.setNombre).toHaveBeenCalledWith(mockResponse.nombre);
    expect(solicitudStoreMock.setNumeroguia).toHaveBeenCalledWith(mockResponse.numeroguia);
    expect(solicitudStoreMock.setCoordenadas).toHaveBeenCalledWith(mockResponse.coordenadas);
    expect(solicitudStoreMock.setTransporte).toHaveBeenCalledWith(mockResponse.transporte);
    expect(solicitudStoreMock.setNombreEmpresa).toHaveBeenCalledWith(mockResponse.nombreEmpresa);
  });

  it('should toggle colapsable state', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should rotate rows correctly', () => {
    component.rows = [{}, {}, {}] as any;
    component.currentIndex = 0;

    component.rotateRow(1);
    expect(component.currentIndex).toBe(1);

    component.rotateRow(1);
    expect(component.currentIndex).toBe(2);

    component.rotateRow(1);
    expect(component.currentIndex).toBe(0);
  });

  it('should validate form fields using ValidacionesFormularioService', () => {
    validacionesServiceMock.isValid.mockReturnValue(true);
    const isValid = component.isValid(component.forma, 'testField');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.forma, 'testField');
    expect(isValid).toBe(true);
  });

  it('should call getAduanaIngreso and set aduanaIngreso', () => {
    const mockResponse = { code: 200, data: [], message: '' };
    revisionServiceMock.getAduanaIngreso.mockReturnValue(of(mockResponse));

    component.getAduanaIngreso();

    expect(revisionServiceMock.getAduanaIngreso).toHaveBeenCalled();
    expect(component.aduanaIngreso.catalogos).toEqual(mockResponse.data);
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});