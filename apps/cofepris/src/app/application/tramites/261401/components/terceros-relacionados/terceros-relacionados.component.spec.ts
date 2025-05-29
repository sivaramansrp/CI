import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Destinatario } from '../../enums/destinatario.enum';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitudModificacionPermisoSalidaTerritorio.service';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudDatosServiceMock: jest.Mocked<SolicitudModificacionPermisoSalidaTerritorioService>;
  let tramite261401StoreMock: jest.Mocked<Tramite261401Store>;

  beforeEach(async () => {
    solicitudDatosServiceMock = {
      obtenerDestinatarioListo: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Destinatario 1' }])),
      getPaisData: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<SolicitudModificacionPermisoSalidaTerritorioService>;

    tramite261401StoreMock = {
      setDestinatarioDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite261401Store>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: SolicitudModificacionPermisoSalidaTerritorioService, useValue: solicitudDatosServiceMock },
        { provide: Tramite261401Store, useValue: tramite261401StoreMock },
        { 
          provide: Tramite261401Query, 
          useValue: { 
            selectSolicitud$: of({}),
            someObservable$: of([]),
            pipe: jest.fn().mockReturnValue(of([]))
          } 
        }, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDestinatarioListo on ngOnInit', () => {
    const obtenerDestinatarioListoSpy = jest.spyOn(component, 'obtenerDestinatarioListo');
    component.ngOnInit();
    expect(obtenerDestinatarioListoSpy).toHaveBeenCalled();
  });

  it('should populate destinatarioDatos and call setDestinatarioDatos in the store', () => {
    const mockDestinatarios: Destinatario[] = [
      {
        nombre: 'Destinatario 1',
        curp: 'RFC123456',
        calle: 'CURP123456',
        telefono: '1234567890',
        correoElectronico: 'destinatario1@example.com',
        rfc: 'Address 1',
        numeroExterior: '123',
        numeroInterior: 'A',
        pais: 'Mexico',
        colonia: 'Colonia 1',
        municipio: 'Municipio 1',
        estado: 'Estado 1',
        estado2: 'Estado 2',
        codigo: '12345',
        localidad: 'Localidad 1',
        id: 0,
        primerApellido: '',
        segundoApellido: '',
        denominacion: '',
        domicilio: '',
        codigopostal: '',
        lada: 0,
        tipoPersona: ''
      },
    ];
  
    solicitudDatosServiceMock.obtenerDestinatarioListo.mockReturnValue(of(mockDestinatarios));
  
    component.obtenerDestinatarioListo();
  
    expect(component.destinatarioDatos).toEqual(mockDestinatarios);
    expect(tramite261401StoreMock.setDestinatarioDatos).toHaveBeenCalledWith(mockDestinatarios);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

describe('TercerosRelacionadosComponent additional logic', () => {
  beforeEach(() => {
    // Set up mocks and initial state for each test
    component.agregarDestinatarioState = {
      tipoPersona: 'Física',
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      denominacion: 'Empresa',
      pais: '1',
      domicilio: 'Calle 1',
      estado: 'CDMX',
      codigopostal: '12345',
      calle: 'Calle 1',
      numeroExterior: '10',
      numeroInterior: '2',
      lada: '55',
      telefono: '1234567890',
      correoElectronico: 'test@mail.com'
    } as any;
    component.crearFormTransporte();
  });

  it('should create form with expected controls and validators', () => {
    expect(component.destinatarioForm.contains('tipoPersona')).toBe(true);
    expect(component.destinatarioForm.contains('nombre')).toBe(true);
    expect(component.destinatarioForm.get('nombre')?.validator).toBeTruthy();
  });

  it('should set paisData.catalogos from getPaisData', () => {
    const paises = [{ id: 1, descripcion: 'México' }];
    component.solicitudDatosService.getPaisData = jest.fn().mockReturnValue(of(paises));
    component.getPaisData();
    expect(component.paisData.catalogos).toEqual(paises);
  });

  it('should set tipoPersonaSeleccionada in setTipoPersona', () => {
    component.setTipoPersona('Moral');
    expect(component.tipoPersonaSeleccionada).toBe('Moral');
  });

  it('should set esFormularioVisible to false on cancelarFormulario', () => {
    component.esFormularioVisible = true;
    component.cancelarFormulario();
    expect(component.esFormularioVisible).toBe(false);
  });

  it('should reset form on limpiarFormulario', () => {
    const resetSpy = jest.spyOn(component.destinatarioForm, 'reset');
    component.limpiarFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should update selectedRows and hide form on onSelectedRowsChange', () => {
    const rows = [{ id: 5 } as any];
    component.esFormularioVisible = true;
    component.onSelectedRowsChange(rows);
    expect(component.selectedRows.has(5)).toBe(true);
    expect(component.esFormularioVisible).toBe(false);
  });

  it('should patch form and show form on openModificarMercancias if one row selected', () => {
    component.tableData = [{ id: 1, tipoPersona: 'Física', nombre: 'Juan', primerApellido: 'Pérez', segundoApellido: '', denominacion: '', pais: '', domicilio: '', estado: '', codigopostal: '', calle: '', numeroExterior: '', numeroInterior: '', lada: '', telefono: '', correoElectronico: '' }] as any;
    component.selectedRows = new Set([1]);
    const patchSpy = jest.spyOn(component.destinatarioForm, 'patchValue');
    component.openModificarMercancias();
    expect(patchSpy).toHaveBeenCalled();
    expect(component.esFormularioVisible).toBe(true);
  });

  it('should call abrirModal on onDeleted if rows selected', () => {
    const modalSpy = jest.spyOn(component, 'abrirModal');
    component.selectedRows = new Set([1]);
    component.onEliminar();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should set nuevaNotificacion for delete success in abrirModal', () => {
    component.abrirModal(0, true);
    expect(component.nuevaNotificacion?.categoria).toBe('success');
    expect(component.nuevaNotificacion?.mensaje).toContain('eliminados');
  });

  it('should set nuevaNotificacion for confirm in abrirModal', () => {
    component.selectedRows = new Set([1]);
    component.abrirModal(2, false);
    expect(component.nuevaNotificacion?.categoria).toBe('danger');
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('esInvalido should return true if control is invalid and touched', () => {
    const control = component.destinatarioForm.get('nombre');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.esInvalido('nombre')).toBe(true);
  });

  it('esInvalido should return false if control is valid', () => {
    const control = component.destinatarioForm.get('nombre');
    control?.setValue('Juan');
    control?.markAsTouched();
    expect(component.esInvalido('nombre')).toBe(false);
  });

  it('getPaisName should return country name if found', () => {
    component.paisData.catalogos = [{ id: 1, descripcion: 'México' }];
    expect((component as any).getPaisName('1')).toBe('México');
  });

  it('getPaisName should return N/A if not found', () => {
    component.paisData.catalogos = [{ id: 2, descripcion: 'USA' }];
    expect((component as any).getPaisName('1')).toBe('N/A');
  });
});
});
