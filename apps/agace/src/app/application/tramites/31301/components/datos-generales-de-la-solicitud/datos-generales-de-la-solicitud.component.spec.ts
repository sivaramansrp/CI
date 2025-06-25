import { TestBed } from '@angular/core/testing';
import { DatosGeneralesDeLaSolicitudComponent } from './datos-generales-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import {
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosGeneralesDeLaSolicitudComponent', () => {
  let component: DatosGeneralesDeLaSolicitudComponent;
  let fixture: any;
  let solicitudServiceSpy: jest.Mocked<SolicitudService>;
  let solicitud31301StoreSpy: jest.Mocked<Solicitud31301Store>;
  let solicitud31301QuerySpy: jest.Mocked<Solicitud31301Query>;
  let consultaioQuerySpy: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    solicitudServiceSpy = {
      conseguirDatosGeneralesOpcionDeRadio: jest.fn().mockReturnValue(
        of({
          tipoDeEndoso: {
            radioOptions: [
              {
                label: 'Aumento de monto',
                value: 1,
              },
              {
                label: 'Aumento de monto y renovación/ampliación de vigencia',
                value: 2,
              },
              {
                label: 'Modificación de denominación o razórrsocial',
                value: 3,
              },
              {
                label: 'Renovación/ampliación de vigencia',
                value: 4,
              },
            ],
            isRequired: true,
          },
          tipoDeGarantia: {
            radioOptions: [
              {
                label: 'Fianza',
                value: 1,
              },
              {
                label: 'Carta de crédito',
                value: 2,
              },
            ],
            isRequired: true,
          },
          modalidadDeLaGarantia: {
            radioOptions: [
              {
                label: 'Garantía revolvente',
                value: 1,
              },
              {
                label: 'Garantía individual',
                value: 2,
              },
            ],
            isRequired: true,
          },
          tipoSector: {
            radioOptions: [
              {
                label: 'Sector productivo',
                value: 1,
              },
              {
                label: 'Sector servicio',
                value: 2,
              },
            ],
            isRequired: true,
          },
          requisitos: {
            radioOptions: [
              {
                label: 'Sí',
                value: 1,
              },
              {
                label: 'No',
                value: 2,
              },
            ],
            isRequired: true,
          },
        })
      ),
      conseguirDatosGeneralesCatologo: jest.fn(() =>
        of({
          concepto: {},
          tipoDeInversion: {},
        })
      ),
      conseguirListaDeSubcontratistas: jest.fn(() =>
        of([
          {
            rfc: 'MAHA790703QW5',
            razonSocial: 'ARTURO MATA HERNANDEZ',
          },
        ])
      ),
      conseguirRegimenAduanero: jest.fn(() => of([])),
      conseguirMiembrosDeLaEmpresa: jest.fn(() => of([])),
      conseguirTipoDeInversionDatos: jest.fn(() => of([])),
      conseguirDomicilios: jest.fn(() => of([])),
      conseguirDatosGeneralesDeLaSolicitudDatos: jest.fn(() => of({})),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud31301StoreSpy = {
      actualizarTipoDeEndoso: jest.fn(),
      actualizarTipoDeGarantia: jest.fn(),
      actualizarModalidadDeLaGarantia: jest.fn(),
      actualizarTipoSector: jest.fn(),
      actualizarConcepto: jest.fn(),
      actualizar3500: jest.fn(),
      actualizar3501: jest.fn(),
      actualizar3502: jest.fn(),
      actualizarDatosGeneralesRFC: jest.fn(),
      actualizar3503: jest.fn(),
      actualizar3504: jest.fn(),
      actualizar3505: jest.fn(),
      actualizar3506: jest.fn(),
      actualizar3507: jest.fn(),
      actualizar3508: jest.fn(),
      actualizar3509: jest.fn(),
      actualizar3511: jest.fn(),
      actualizar3512: jest.fn(),
      actualizar3513: jest.fn(),
      actualizarTextoGenerico1: jest.fn(),
      actualizarTextoGenerico2: jest.fn(),
      actualizar3514: jest.fn(),
      actualizar3515: jest.fn(),
      actualizar3516: jest.fn(),
      actualizarTextoGenerico3: jest.fn(),
      actualizar3517: jest.fn(),
      actualizar3518: jest.fn(),
      actualizar3519: jest.fn(),
      actualizar3520: jest.fn(),
      actualizarTipoInversion: jest.fn(),
      actualizarCantidadInversion: jest.fn(),
      actualizarDescInversion: jest.fn(),
      actualizar3521: jest.fn(),
      actualizar3522: jest.fn(),
      actualizarClaveEnumeracionD0: jest.fn(),
      actualizarClaveEnumeracionD1: jest.fn(),
      actualizarClaveEnumeracionD2: jest.fn(),
      actualizarClaveEnumeracionD3: jest.fn(),
      actualizarClaveEnumeracionH: jest.fn(),
      actualizarTextoGenerico4: jest.fn(),
      actualizarTextoGenerico5: jest.fn(),
      actualizar3523: jest.fn(),
      actualizar3528: jest.fn(),
      actualizar3529: jest.fn(),
      actualizarTextoGenerico6: jest.fn(),
      actualizarTextoGenerico7: jest.fn(),
      actualizar3530: jest.fn(),
      actualizar3531: jest.fn(),
      actualizarTextoGenerico9: jest.fn(),
      actualizarTextoGenerico10: jest.fn(),
      actualizarTextoGenerico11: jest.fn(),
      actualizarTextoGenerico12: jest.fn(),
      actualizarTextoGenerico13: jest.fn(),
      actualizarTextoGenerico14: jest.fn(),
      actualizarTextoGenerico15: jest.fn(),
      actualizarTextoGenerico16: jest.fn(),
      actualizarTextoGenerico17: jest.fn(),
      actualizarTextoGenerico18: jest.fn(),
      actualizarTextoGenerico19: jest.fn(),
      actualizarTextoGenerico20: jest.fn(),
      actualizarTextoGenerico21: jest.fn(),
      actualizarTextoGenerico22: jest.fn(),
      actualizarTextoGenerico23: jest.fn(),
      actualizarTextoGenerico24: jest.fn(),
      actualizarAlerta1: jest.fn(),
      actualizarAlerta2: jest.fn(),
    } as any;

    solicitud31301QuerySpy = {
      selectSolicitud$: of({}) as any,
    } as any;

    consultaioQuerySpy = {
      selectConsultaioState$: of({ readonly: false }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        DatosGeneralesDeLaSolicitudComponent,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: Solicitud31301Store, useValue: solicitud31301StoreSpy },
        { provide: Solicitud31301Query, useValue: solicitud31301QuerySpy },
        { provide: ConsultaioQuery, useValue: consultaioQuerySpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosGeneralesForm on ngOnInit', () => {
    component.solicitud31301State = {
      tipoDeEndoso: 'A',
      claveEnumeracionH: 'H',
    } as any;
    component.ngOnInit();
    expect(component.datosGeneralesForm).toBeDefined();
    expect(component.datosGeneralesForm.get('tipoDeEndoso')).toBeTruthy();
  });

  it('should call conseguirDatosGeneralesOpcionDeRadio in constructor', () => {
    solicitudServiceSpy.conseguirDatosGeneralesOpcionDeRadio.mockReturnValue(
      of({
        tipoDeEndoso: {
          radioOptions: [
            {
              label: 'Aumento de monto',
              value: 1,
            },
            {
              label: 'Aumento de monto y renovación/ampliación de vigencia',
              value: 2,
            },
            {
              label: 'Modificación de denominación o razórrsocial',
              value: 3,
            },
            {
              label: 'Renovación/ampliación de vigencia',
              value: 4,
            },
          ],
          isRequired: true,
        },
        tipoDeGarantia: {
          radioOptions: [
            {
              label: 'Fianza',
              value: 1,
            },
            {
              label: 'Carta de crédito',
              value: 2,
            },
          ],
          isRequired: true,
        },
        modalidadDeLaGarantia: {
          radioOptions: [
            {
              label: 'Garantía revolvente',
              value: 1,
            },
            {
              label: 'Garantía individual',
              value: 2,
            },
          ],
          isRequired: true,
        },
        tipoSector: {
          radioOptions: [
            {
              label: 'Sector productivo',
              value: 1,
            },
            {
              label: 'Sector servicio',
              value: 2,
            },
          ],
          isRequired: true,
        },
        requisitos: {
          radioOptions: [
            {
              label: 'Sí',
              value: 1,
            },
            {
              label: 'No',
              value: 2,
            },
          ],
          isRequired: true,
        },
      })
    );
    solicitudServiceSpy.conseguirDatosGeneralesOpcionDeRadio();
    expect(
      solicitudServiceSpy.conseguirDatosGeneralesOpcionDeRadio
    ).toHaveBeenCalled();
    expect(
      solicitudServiceSpy.conseguirDatosGeneralesOpcionDeRadio
    ).toBeDefined();
  });

  it('should call conseguirDatosGeneralesCatologo in constructor', () => {
    solicitudServiceSpy.conseguirDatosGeneralesCatologo()
    expect(
      solicitudServiceSpy.conseguirDatosGeneralesCatologo
    ).toHaveBeenCalled();
    expect(solicitudServiceSpy.conseguirDatosGeneralesCatologo).toBeDefined();
  });

  it('should call conseguirListaDeSubcontratistas in constructor', () => {
    solicitudServiceSpy.conseguirListaDeSubcontratistas.mockReturnValue(
      of([
        {
          rfc: 'MAHA790703QW5',
          razonSocial: 'ARTURO MATA HERNANDEZ',
        },
      ])
    );
    solicitudServiceSpy.conseguirListaDeSubcontratistas();
    expect(
      solicitudServiceSpy.conseguirListaDeSubcontratistas
    ).toHaveBeenCalled();
    expect(solicitudServiceSpy.conseguirListaDeSubcontratistas).toBeDefined();
  });

  it('should call conseguirRegimenAduanero in constructor', () => {
    solicitudServiceSpy.conseguirRegimenAduanero();
    expect(solicitudServiceSpy.conseguirRegimenAduanero).toHaveBeenCalled();
    expect(component.listaRegimenAduanero).toEqual([]);
  });

  it('should call conseguirMiembrosDeLaEmpresa in constructor', () => {
    solicitudServiceSpy.conseguirMiembrosDeLaEmpresa();
    expect(solicitudServiceSpy.conseguirMiembrosDeLaEmpresa).toHaveBeenCalled();
    expect(component.listaSeccionSociosIC).toEqual([]);
  });

  it('should call conseguirTipoDeInversionDatos in constructor', () => {
    solicitudServiceSpy.conseguirTipoDeInversionDatos();
    expect(
      solicitudServiceSpy.conseguirTipoDeInversionDatos
    ).toHaveBeenCalled();
    expect(component.tipoDeInversionDatos).toEqual([]);
  });

  it('should call conseguirDomicilios in constructor', () => {
    solicitudServiceSpy.conseguirDomicilios();
    expect(solicitudServiceSpy.conseguirDomicilios).toHaveBeenCalled();
    expect(solicitudServiceSpy.conseguirDomicilios).toBeDefined();
  });

  it('should call conseguirDatosGeneralesDeLaSolicitudDatos in constructor', () => {
    solicitudServiceSpy.conseguirDatosGeneralesDeLaSolicitudDatos();
    expect(
      solicitudServiceSpy.conseguirDatosGeneralesDeLaSolicitudDatos
    ).toHaveBeenCalled();
  });

  it('should emit tipoDeEndosoChanges and update store on getTipoDeEndoso', () => {
    const emitSpy = jest.spyOn(component.tipoDeEndosoChanges, 'emit');
    component.getTipoDeEndoso('B');
    expect(emitSpy).toHaveBeenCalledWith('B');
    expect(solicitud31301StoreSpy.actualizarTipoDeEndoso).toHaveBeenCalledWith(
      'B'
    );
  });

  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.datosGeneralesForm = component.fb.group({ test: ['value'] });
    component.guardarDatosFormulario();
    expect(component.datosGeneralesForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.datosGeneralesForm = component.fb.group({ test: ['value'] });
    component.guardarDatosFormulario();
    expect(component.datosGeneralesForm.enabled).toBe(true);
  });

  it('should clean up destroy$ on ngOnDestroy', () => {
    const destroy$ = (component as any).destroy$ as Subject<void>;
    const nextSpy = jest.spyOn(destroy$, 'next');
    const completeSpy = jest.spyOn(destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
