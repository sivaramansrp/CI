import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';

describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let revisionServiceMock: jest.Mocked<RevisionService>;
  let solicitudStoreMock: jest.Mocked<Solicitud220503Store>;
  let solicitudQueryMock: jest.Mocked<Solicitud220503Query>;
  let validacionesServiceMock: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    revisionServiceMock = {
      getAduanaIngreso: jest.fn(),
      getOficianaInspeccion: jest.fn(),
      getPuntoInspeccion: jest.fn(),
      getEstablecimiento: jest.fn(),
      getRegimenDestinaran: jest.fn(),
      getMovilizacionNacional: jest.fn(),
      getPuntoVerificacion: jest.fn(),
      getEmpresaTransportista: jest.fn(),
      getDatosDelaSolicitud: jest.fn(),
    } as never;

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
    } as never;

    solicitudQueryMock = {
      selectSolicitud$: jest.fn(() =>
        of({
          foliodel: '123',
          aduanaIngreso: 'aduana1',
          oficinaInspeccion: 'oficina1',
          puntoInspeccion: 'punto1',
          claveUCON: 'clave1',
          establecimientoTIF: 'establecimiento1',
          nombre: 'nombre1',
          numeroguia: 'guia1',
          regimen: 'regimen1',
          capturaDatosMercancia: 'mercancia1',
          coordenadas: 'coords1',
          movilizacion: 'movilizacion1',
          transporte: 'transporte1',
          punto: 'punto1',
          nombreEmpresa: 'empresa1',
        })
      ),
    } as never;

    validacionesServiceMock = {
      isValid: jest.fn(),
      noCeroValidator: jest.fn(),
      errorCampoRequerido: jest.fn(),
      errorEmail: jest.fn(),
      errorPattern: jest.fn(),
    } as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        DatosGeneralesComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
      ],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: revisionServiceMock },
        { provide: Solicitud220503Store, useValue: solicitudStoreMock },
        { provide: Solicitud220503Query, useValue: solicitudQueryMock },
        {
          provide: ValidacionesFormularioService,
          useValue: validacionesServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;

    // solicitudQueryMock.selectSolicitud$.mockReturnValue(
    //   of({
    //     foliodel: '123',
    //     aduanaIngreso: 'aduana1',
    //     oficinaInspeccion: 'oficina1',
    //     puntoInspeccion: 'punto1',
    //     claveUCON: 'clave1',
    //     establecimientoTIF: 'establecimiento1',
    //     nombre: 'nombre1',
    //     numeroguia: 'guia1',
    //     regimen: 'regimen1',
    //     capturaDatosMercancia: 'mercancia1',
    //     coordenadas: 'coords1',
    //     movilizacion: 'movilizacion1',
    //     transporte: 'transporte1',
    //     punto: 'punto1',
    //     nombreEmpresa: 'empresa1',
    //   }) as any
    // );

    revisionServiceMock.getAduanaIngreso.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getOficianaInspeccion.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getPuntoInspeccion.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getEstablecimiento.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getRegimenDestinaran.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getMovilizacionNacional.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getPuntoVerificacion.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getEmpresaTransportista.mockReturnValue(
      of({ code: 200, data: [], message: '' })
    );
    revisionServiceMock.getDatosDelaSolicitud.mockReturnValue(
      of({
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
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('foliodel')?.value).toBe('123');
  });

  it('should call getAduanaIngreso on initialization', () => {
    expect(revisionServiceMock.getAduanaIngreso).toHaveBeenCalled();
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
    const isValid = component.isValid(component.forma, 'foliodel');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(
      component.forma,
      'foliodel'
    );
    expect(isValid).toBe(true);
  });

  it('should call setAduanaIngreso when seleccionarAduanaIngreso is called', () => {
    const mockCatalogo = { id: 'aduana1' } as any;
    component.seleccionarAduanaIngreso(mockCatalogo);
    expect(solicitudStoreMock.setAduanaIngreso).toHaveBeenCalledWith('aduana1');
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
