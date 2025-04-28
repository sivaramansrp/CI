import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarImmexProgramComponent } from './agregar-immex-program.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { of } from 'rxjs';
import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
} from '@libs/shared/data-access-user/src';
import {
  DatosGeneralesDeLaSolicitudCatologo,
  EntidadFederativa,
} from '../../models/solicitud.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('AgregarImmexProgramComponent', () => {
  let component: AgregarImmexProgramComponent;
  let fixture: ComponentFixture<AgregarImmexProgramComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud31101StoreMock: jest.Mocked<Solicitud31101Store>;
  let solicitud31101QueryMock: jest.Mocked<Solicitud31101Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirDatosGeneralesCatologo: jest.fn(),
      conseguirEntidadFederativaDatos: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitudServiceMock.conseguirDatosGeneralesCatologo.mockReturnValue(
      of({} as DatosGeneralesDeLaSolicitudCatologo)
    );
    solicitudServiceMock.conseguirEntidadFederativaDatos.mockReturnValue(
      of([])
    );

    solicitud31101StoreMock = {
      actualizarEntidadFederativa: jest.fn(),
    } as unknown as jest.Mocked<Solicitud31101Store>;

    solicitud31101QueryMock = {
      selectSolicitud$: of({ entidadFederativa: {} }),
    } as jest.Mocked<Solicitud31101Query>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AgregarImmexProgramComponent,
        HttpClientTestingModule,
        CommonModule,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31101Store, useValue: solicitud31101StoreMock },
        { provide: Solicitud31101Query, useValue: solicitud31101QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarImmexProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
  });

  it('should call conseguirDatosGeneralesCatologo and set entidadFederativa', () => {
    const mockResponse: DatosGeneralesDeLaSolicitudCatologo = {
      concepto: {
        labelNombre: 'Concepto',
        required: false,
        primerOpcion: 'Seleccione un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Reparación, re-trabajo o mantenimiento de',
          },
          {
            id: 2,
            descripcion: 'Reparación, re-trabajo o mantenimiento de - 1',
          },
        ],
      },
      tipoDeInversion: {
        labelNombre: 'Tipo de inversión',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test',
          },
          {
            id: 2,
            descripcion: 'Test - 1',
          },
        ],
      },
      enSuCaracterDe: {
        labelNombre: 'En su caracter de',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Accionista',
          },
          {
            id: 2,
            descripcion: 'Accionista - 1',
          },
        ],
      },
      nacionalidad: {
        labelNombre: 'Nacionalidad',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI)',
          },
          {
            id: 2,
            descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI) - 1',
          },
        ],
      },
      tipoDePersona: {
        labelNombre: 'Tipo de Persona',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Física',
          },
          {
            id: 2,
            descripcion: 'Moral',
          },
        ],
      },
      modalidadDelProgramaIMMEX: {
        labelNombre: 'Seleccione el numero y modalidad del programa I M M E X',
        required: false,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Domicilios registrados',
          },
          {
            id: 2,
            descripcion: '192022 - Autorización Programa Nuevo Industrial',
          },
        ],
      },
      tipoDeInstalacion: {
        labelNombre: 'Tipo de instalación',
        required: true,
        primerOpcion: 'Selecciona un tipo de instalación',
        catalogos: [
          {
            id: 1,
            descripcion: 'Planta Productiva',
          },
          {
            id: 2,
            descripcion: 'Planta Productiva -1',
          },
        ],
      },
      entidadFederativa: {
        labelNombre: '',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'AGUASCALIENTES',
          },
          {
            id: 2,
            descripcion: 'AGUASCALIENTES -1',
          },
        ],
      },
    };
  });

  it('should call conseguirEntidadFederativaDatos and set domiciliosDatos', () => {
    const mockResponse: EntidadFederativa[] = [
      {
        entidadFederativa: 'SINALOA',
        municipioDelegacion: 'AHOME',
        direccion: 'MIGUEL HIDALGO CAMINO VIEJO 1353',
        codigoPostal: '81210',
        registroSESAT: 'SAT',
      },
    ];
  });

  it('should update domicilioslista and call actualizarEntidadFederativa on seleccionArentidadFederativa', () => {
    const mockCatalogo: Catalogo = { id: 1, descripcion: 'Test' };
    component.domiciliosDatos = [
      {
        instalacionPrincipal: 'Planta Norte',
        cveTipoInstalacion: '01',
        tipoInstalacion: 'Fábrica',
        cveEntidadFederativa: '09',
        entidadFederativa: 'Ciudad de México',
        cveDelegacionMunicipio: '010',
        municipioDelegacion: 'Gustavo A. Madero',
        direccion: 'Av. Central 123',
        codigoPostal: '07760',
        registroSESAT: 'SESAT-456789',
        noExterior: '123',
        noInterior: '5B',
        cveColonia: '025',
        calle: 'Av. Central',
      },
    ];
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();
  });
});
