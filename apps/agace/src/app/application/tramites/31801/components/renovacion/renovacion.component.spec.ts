import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RenovacionComponent } from './renovacion.component';
import { RenovacionService } from '../../services/renovacion/renovacion.service';
import { Tramite31801Store } from '../../../../estados/tramites/tramite31801.store';
import { Tramite31801Query } from '../../../../estados/queries/tramite31801.query';
import { RenovacionRespuesta, ManifiestosRespuesta } from '../../models/renovacion.model';
import { HttpClientModule } from '@angular/common/http';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';

describe('RenovacionComponent', () => {
  let component: RenovacionComponent;
  let fixture: ComponentFixture<RenovacionComponent>;
  let mockRenovacionService: jest.Mocked<RenovacionService>;
  let mockTramite31801Store: jest.Mocked<Tramite31801Store>;
  let mockTramite31801Query: jest.Mocked<Tramite31801Query>;

  beforeEach(async () => {
    mockRenovacionService = {
      obtenerRenovacionDatos: jest.fn(() => of({ code: 200, data: [], message: 'Success' } as RenovacionRespuesta)),
      getManifiestos: jest.fn(() => of({ code: 200, data: [], message: 'Success' } as ManifiestosRespuesta)),
      obtenerDocumentosSeleccionados: jest.fn(),
    } as unknown as jest.Mocked<RenovacionService>;

    mockTramite31801Store = {
      setSeleccionadaManifiesto: jest.fn(),
      setFechaPago: jest.fn(),
    } as unknown as jest.Mocked<Tramite31801Store>;

    mockTramite31801Query = {
      selectSeccionState$: of({
        numeroOficio: '12345',
        fechaInicialInput: '21/03/2025',
        fechaFinalInput: '21/04/2025',
        fechaPago: '09/01/2025',
        monedaNacional: 1,
        numeroOperacion: '67890',
        llavePago: 'LLAVE123',
        seleccionadaManifiesto: []
      })
    } as unknown as jest.Mocked<Tramite31801Query>;

    await TestBed.configureTestingModule({
      imports: [
        RenovacionComponent,
        HttpClientModule,
        InputFechaComponent
      ],
      providers: [
        { provide: RenovacionService, useValue: mockRenovacionService },
        { provide: Tramite31801Store, useValue: mockTramite31801Store },
        { provide: Tramite31801Query, useValue: mockTramite31801Query },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RenovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form on ngOnInit', () => {
    const spyCrearRenovacionForm = jest.spyOn(component, 'crearRenovacionForm');
    component.ngOnInit();
    expect(spyCrearRenovacionForm).toHaveBeenCalled();
  });

  it('should call obtenerRenovacionDatos on ngOnInit', () => {
    const spyObtenerRenovacionDatos = jest.spyOn(component, 'obtenerRenovacionDatos');
    component.ngOnInit();
    expect(spyObtenerRenovacionDatos).toHaveBeenCalled();
  });

  it('should call obtenerManifiestos on ngOnInit', () => {
    const spyObtenerManifiestos = jest.spyOn(component, 'obtenerManifiestos');
    component.ngOnInit();
    expect(spyObtenerManifiestos).toHaveBeenCalled();
  });

  it('should patch form values when obtenerRenovacionDatos is successful', () => {
    const mockResponse: RenovacionRespuesta = {
      code: 200,
      data: [
        {
          numeroOficio: '12345',
          fechaFinalInput: '21/03/2025',
          fechaInicialInput: '21/04/2025',
        },
      ],
      message: 'Success'
    };
    mockRenovacionService.obtenerRenovacionDatos.mockReturnValue(of(mockResponse));

    component.obtenerRenovacionDatos();

    expect(component.renovacionForm.get('numeroOficio')?.value).toBe('12345');
    expect(component.renovacionForm.get('fechaFinalInput')?.value).toBe('21/03/2025');
    expect(component.renovacionForm.get('fechaInicialInput')?.value).toBe('21/04/2025');
  });

  it('should populate manifiestos when obtenerManifiestos is successful', () => {
    const mockResponse: ManifiestosRespuesta = {
      code: 200,
      data: [
        {
          declaracion: {
            clave: '1',
            descripcion: 'Manifiesto 1'
          },
          manifiestoDeclaracion: true
        }
      ],
      message: 'Success'
    };
    mockRenovacionService.getManifiestos.mockReturnValue(of(mockResponse));

    component.obtenerManifiestos();

    expect(component.manifiestos).toEqual(mockResponse.data);
  });

  it('should update seleccionadaManifiesto on checkbox change', () => {
    component.crearRenovacionForm();
    component.renovacionForm.setControl('seleccionadaManifiesto', new FormArray([new FormControl(false)]));

    const mockEvent = { target: { checked: true } } as unknown as Event;
    component.onManifiestoCheckboxCambiar(mockEvent, 0);

    expect(component.seleccionadaManifiesto.controls[0].value).toBe(true);
    expect(mockTramite31801Store.setSeleccionadaManifiesto).toHaveBeenCalledWith([true]);
  });

  it('should update fechaPago on cambioFechaPago', () => {
    component.crearRenovacionForm();

    component.cambioFechaPago('09/01/2025');

    expect(component.renovacionForm.get('fechaPago')?.value).toBe('09/01/2025');
    expect(mockTramite31801Store.setFechaPago).toHaveBeenCalledWith('09/01/2025');
  });

  it('should call setValoresStore with correct parameters', () => {
    const spySetValoresStore = jest.spyOn(component, 'setValoresStore');
    component.crearRenovacionForm();

    component.cambioFechaPago('2023-12-25');

    expect(spySetValoresStore).toHaveBeenCalledWith(component.renovacionForm, 'fechaPago', 'setFechaPago');
  });

  it('should complete destruirNotificador$ on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});