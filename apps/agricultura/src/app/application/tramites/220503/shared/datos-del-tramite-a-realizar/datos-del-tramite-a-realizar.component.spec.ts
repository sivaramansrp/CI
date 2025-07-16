import { TestBed } from '@angular/core/testing';
import { DatosDelTramiteARealizarComponent } from './datos-del-tramite-a-realizar.component';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Catalogo, CatalogoSelectComponent, InputFechaComponent, TituloComponent , ConsultaioQuery } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosDelTramiteARealizarComponent', () => {
  let component: DatosDelTramiteARealizarComponent;
  let fixture: any;
  let mockSolicitudService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;
  let mockCdRef: any;
  let parentFormGroup: FormGroup;

  beforeEach(async () => {
    mockSolicitudService = {
      getDataDatosDelTramite: jest.fn().mockReturnValue(of({
        pendientesCertificados: [],
        horaInspeccion: [],
        aduanaIngreso: [],
        sanidadAgropecuaria: [],
        puntoInspeccion: []
      }))
    };
    mockStore = {
      setFechaDeInspeccion: jest.fn(),
      setCertificadosAutorizados: jest.fn(),
      setHoraDeInspeccion: jest.fn(),
      setAduanaDeIngreso: jest.fn(),
      setSanidadAgropecuaria: jest.fn(),
      setPuntoDeInspeccion: jest.fn()
    };
    mockQuery = {
      selectSolicitud$: of({
        certificadosAutorizados: 'cert1',
        horaDeInspeccion: 'hora1',
        aduanaDeIngreso: 'aduana1',
        sanidadAgropecuaria: 'sanidad1',
        puntoDeInspeccion: 'punto1',
        fechaDeInspeccion: '2024-01-01'
      })
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };
    mockCdRef = { detectChanges: jest.fn() };

    parentFormGroup = new FormGroup({});
    const mockControlContainer = {
      control: parentFormGroup,
      get controlContainer() {
        return this;
      }
    };

    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteARealizarComponent, 
         ReactiveFormsModule,
          CommonModule,
          TituloComponent,
          CatalogoSelectComponent,
          InputFechaComponent,
          HttpClientTestingModule
        ],
      providers: [
        { provide: SolicitudPantallasService, useValue: mockSolicitudService },
        { provide: Solicitud220503Store, useValue: mockStore },
        { provide: Solicitud220503Query, useValue: mockQuery },
        { provide: ChangeDetectorRef, useValue: mockCdRef },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ControlContainer, useValue: mockControlContainer }
      ]
    }).overrideComponent(DatosDelTramiteARealizarComponent, {
      set: {
        providers: [
          { provide: SolicitudPantallasService, useValue: mockSolicitudService },
          { provide: Solicitud220503Store, useValue: mockStore },
          { provide: Solicitud220503Query, useValue: mockQuery },
          { provide: ChangeDetectorRef, useValue: mockCdRef },
          { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
          { provide: ControlContainer, useValue: mockControlContainer }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteARealizarComponent);
    component = fixture.componentInstance;
    component.claveDeControl = 'datosServicio';
    (component as any).consultaioQuery = mockConsultaioQuery;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group on ngOnInit', () => {
    component.ngOnInit();
    expect(parentFormGroup.contains('datosServicio')).toBe(true);
  });

  it('should patch form values when selectSolicitud$ emits', () => {
    component.ngOnInit();
    const formGroup = parentFormGroup.get('datosServicio') as FormGroup;
    expect(formGroup.value.certificadosAutorizados).toBe('cert1');
    expect(formGroup.value.horaDeInspeccion).toBe('hora1');
    expect(formGroup.value.aduanaDeIngreso).toBe('aduana1');
    expect(formGroup.value.sanidadAgropecuaria).toBe('sanidad1');
    expect(formGroup.value.puntoDeInspeccion).toBe('punto1');
    expect(formGroup.value.fechaDeInspeccion).toBe('2024-01-01');
  });

  it('should update form control value on certificadosSeleccion', () => {
    component.ngOnInit();
    component.certificadosSeleccion({ descripcion: 'nuevoCert' } as Catalogo);
    const formGroup = parentFormGroup.get('datosServicio') as FormGroup;
    expect(formGroup.value.certificadosAutorizados).toBe('nuevoCert');
  });

  it('should update form control value on horaDeSeleccion', () => {
    component.ngOnInit();
    component.horaDeSeleccion({ descripcion: 'nuevaHora' } as Catalogo);
    const formGroup = parentFormGroup.get('datosServicio') as FormGroup;
    expect(formGroup.value.horaDeInspeccion).toBe('nuevaHora');
  });

  it('should update form control value on aduanaDeSeleccion', () => {
    component.ngOnInit();
    component.aduanaDeSeleccion({ descripcion: 'nuevaAduana' } as Catalogo);
    const formGroup = parentFormGroup.get('datosServicio') as FormGroup;
    expect(formGroup.value.aduanaDeIngreso).toBe('nuevaAduana');
  });

  it('should update form control value on sanidadSeleccion', () => {
    component.ngOnInit();
    component.sanidadSeleccion({ descripcion: 'nuevaSanidad' } as Catalogo);
    const formGroup = parentFormGroup.get('datosServicio') as FormGroup;
    expect(formGroup.value.sanidadAgropecuaria).toBe('nuevaSanidad');
  });

  it('should update form control value on puntoDeSeleccion', () => {
    component.ngOnInit();
    component.puntoDeSeleccion({ descripcion: 'nuevoPunto' } as Catalogo);
    const formGroup = parentFormGroup.get('datosServicio') as FormGroup;
    expect(formGroup.value.puntoDeInspeccion).toBe('nuevoPunto');
  });

  it('should call setFechaDeInspeccion on cambioFechaInicio', () => {
    component.cambioFechaInicio('2024-06-01');
    expect(mockStore.setFechaDeInspeccion).toHaveBeenCalledWith('2024-06-01');
  });

  it('should call setCertificadosAutorizados on setCertificadosAutorizados', () => {
    component.setCertificadosAutorizados({ id: 123 } as Catalogo);
    expect(mockStore.setCertificadosAutorizados).toHaveBeenCalledWith(123);
  });

  it('should call setHoraDeInspeccion on setHoraDeInspeccion', () => {
    component.setHoraDeInspeccion({ id: 456 } as Catalogo);
    expect(mockStore.setHoraDeInspeccion).toHaveBeenCalledWith(456);
  });

  it('should call setAduanaDeIngreso on setAduanaDeIngreso', () => {
    component.setAduanaDeIngreso({ id: 789 } as Catalogo);
    expect(mockStore.setAduanaDeIngreso).toHaveBeenCalledWith(789);
  });

  it('should call setSanidadAgropecuaria on setSanidadAgropecuaria', () => {
    component.setSanidadAgropecuaria({ id: 101 } as Catalogo);
    expect(mockStore.setSanidadAgropecuaria).toHaveBeenCalledWith(101);
  });

  it('should call setPuntoDeInspeccion on setPuntoDeInspeccion', () => {
    component.setPuntoDeInspeccion({ id: 202 } as Catalogo);
    expect(mockStore.setPuntoDeInspeccion).toHaveBeenCalledWith(202);
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(parentFormGroup.contains('datosServicio')).toBe(true);
    component.ngOnDestroy();
    expect(parentFormGroup.contains('datosServicio')).toBe(false);
  });

  it('should disable datosServicio form group in guardarDatosFormulario when readonly', () => {
    component.ngOnInit();
    component.esFormularioSoloLectura = true;
    const disableSpy = jest.spyOn(component.datosServicio, 'disable');
    component.guardarDatosFormulario();
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should enable datosServicio form group in guardarDatosFormulario when not readonly', () => {
    component.ngOnInit();
    component.esFormularioSoloLectura = false;
    const enableSpy = jest.spyOn(component.datosServicio, 'enable');
    component.guardarDatosFormulario();
    expect(enableSpy).toHaveBeenCalled();
  });

  it('should disable the form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.datosServicio.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.datosServicio.enabled).toBe(true);
  });

  it('should update catalogos on actualizarDatosIniciales', () => {
    const data = {
      pendientesCertificados: [{ id: 1, descripcion: 'cert' }],
      horaInspeccion: [{ id: 2, descripcion: 'hora' }],
      aduanaIngreso: [{ id: 3, descripcion: 'aduana' }],
      sanidadAgropecuaria: [{ id: 4, descripcion: 'sanidad' }],
      puntoInspeccion: [{ id: 5, descripcion: 'punto' }]
    };
    component.certificadosAutorizados = { catalogos: [], labelNombre: '', required: false, primerOpcion: '' };
    component.horaDeInspeccion = { catalogos: [], labelNombre: '', required: false, primerOpcion: '' };
    component.aduanaDeIngreso = { catalogos: [], labelNombre: '', required: false, primerOpcion: '' };
    component.sanidadAgropecuaria = { catalogos: [], labelNombre: '', required: false, primerOpcion: '' };
    component.puntoDeInspeccion = { catalogos: [], labelNombre: '', required: false, primerOpcion: '' };
    component.actualizarDatosIniciales(data as any);
    expect(component.certificadosAutorizados.catalogos.length).toBe(1);
    expect(component.horaDeInspeccion.catalogos.length).toBe(1);
    expect(component.aduanaDeIngreso.catalogos.length).toBe(1);
    expect(component.sanidadAgropecuaria.catalogos.length).toBe(1);
    expect(component.puntoDeInspeccion.catalogos.length).toBe(1);
    expect(mockCdRef.detectChanges).toHaveBeenCalled();
  });
});
