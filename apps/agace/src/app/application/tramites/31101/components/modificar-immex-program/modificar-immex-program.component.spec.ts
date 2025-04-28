import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarImmexProgramComponent } from './modificar-immex-program.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { of } from 'rxjs';
import {
  DatosGeneralesDeLaSolicitudRadioLista,
  DatosGeneralesDeLaSolicitudCatologo,
} from '../../models/solicitud.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

describe('ModificarImmexProgramComponent', () => {
  let component: ModificarImmexProgramComponent;
  let fixture: ComponentFixture<ModificarImmexProgramComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirDatosGeneralesOpcionDeRadio: jest.fn(),
      conseguirDatosGeneralesCatologo: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModificarImmexProgramComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        CommonModule,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarImmexProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modificarImmexProgramForm).toBeDefined();
  });

  it('should fetch radio options on conseguirDatosGeneralesOpcionDeRadio', () => {
    const mockResponse: DatosGeneralesDeLaSolicitudRadioLista = {
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
            label: 'Póliza revolvente',
            value: 1,
          },
          {
            label: 'Póliza individual',
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
    };
    solicitudServiceMock.conseguirDatosGeneralesOpcionDeRadio.mockReturnValue(
      of(mockResponse)
    );

    component.conseguirDatosGeneralesOpcionDeRadio();
  });

  it('should fetch catalog data on conseguirDatosGeneralesCatologo', () => {
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
    solicitudServiceMock.conseguirDatosGeneralesCatologo.mockReturnValue(
      of(mockResponse)
    );

    component.conseguirDatosGeneralesCatologo();

  });

  it('should emit true on aceptarImmexProgram', () => {
    const emitSpy = jest.spyOn(component.modificarImmexValor, 'emit');

    component.aceptarImmexProgram();

    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
