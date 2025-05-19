import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SeleccionDelCupoComponent } from './seleccion-del-cupo.component';
import { SeleccionDelCupoService } from '@ng-mf/data-access-user';
import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipoNotificacionEnum, CategoriaMensaje } from '@ng-mf/data-access-user';
import { TablaAcciones } from '@ng-mf/data-access-user';

describe('SeleccionDelCupoComponent', () => {
  let component: SeleccionDelCupoComponent;
  let fixture: ComponentFixture<SeleccionDelCupoComponent>;
  let seleccionDelCupoService: jest.Mocked<SeleccionDelCupoService>;
  let tramite120402Store: jest.Mocked<Tramite120402Store>;
  let tramite120402Query: jest.Mocked<Tramite120402Query>;

  // Datos mock para pruebas
  const mockRegimen = [
    { id: '1', descripcion: 'Régimen 1' },
    { id: '2', descripcion: 'Régimen 2' }
  ];

  const mockTratado = [
    { id: '1', descripcion: 'Tratado 1' },
    { id: '2', descripcion: 'Tratado 2' }
  ];

  const mockProducto = [
    { id: '1', descripcion: 'Producto 1' },
    { id: '2', descripcion: 'Producto 2' }
  ];

  const mockSeleccionDelCupo = [
    {
      description: 'Descripción del cupo 1',
      assignmentType: 'Tipo de asignación 1',
      codes: ['001', '002'],
      quota: 'Tipo de cupo 1'
    }
  ];

  beforeEach(async () => {
    // Crear mocks para los servicios
    const seleccionDelCupoServiceMock = {
      getRegimen: jest.fn(() => of({ data: mockRegimen })),
      getTratado: jest.fn(() => of({ tratado: mockTratado })),
      getProducto: jest.fn(() => of({ data: mockProducto })),
      getSeleccionDelCupo: jest.fn(() => of(mockSeleccionDelCupo))
    };

    const tramite120402QueryMock = {
      regimen$: of(null),
      tratado$: of(null),
      producto$: of(null),
      subproducto$: of(null),
      getValue: jest.fn(() => ({
        entidad: 'Entidad Test',
        representacion: 'Representación Test'
      }))
    };

    const tramite120402StoreMock = {
      setRegimen: jest.fn(),
      setTratado: jest.fn(),
      setProducto: jest.fn(),
      setSubproducto: jest.fn(),
      setCupoSeleccionado: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SeleccionDelCupoComponent],
      providers: [
        { provide: SeleccionDelCupoService, useValue: seleccionDelCupoServiceMock },
        { provide: Tramite120402Query, useValue: tramite120402QueryMock },
        { provide: Tramite120402Store, useValue: tramite120402StoreMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar componentes hijos en las pruebas unitarias
    }).compileComponents();

    seleccionDelCupoService = TestBed.inject(SeleccionDelCupoService) as jest.Mocked<SeleccionDelCupoService>;
    tramite120402Query = TestBed.inject(Tramite120402Query) as jest.Mocked<Tramite120402Query>;
    tramite120402Store = TestBed.inject(Tramite120402Store) as jest.Mocked<Tramite120402Store>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDelCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Pruebas de creación e inicialización
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos requeridos', () => {
    expect(component.seleccionForm).toBeDefined();
    expect(component.seleccionForm.get('regimen')).toBeDefined();
    expect(component.seleccionForm.get('tratado')).toBeDefined();
    expect(component.seleccionForm.get('producto')).toBeDefined();
    expect(component.seleccionForm.get('subproducto')).toBeDefined();
    expect(component.seleccionForm.get('regimen')?.validator).toBeTruthy();
  });

  // Pruebas de carga de datos
  it('debería cargar los datos de régimen al inicializar', () => {
    expect(seleccionDelCupoService.getRegimen).toHaveBeenCalled();
    expect(component.regimen).toEqual(mockRegimen);
  });

  it('debería cargar los datos de tratado al inicializar', () => {
    expect(seleccionDelCupoService.getTratado).toHaveBeenCalled();
    expect(component.tratado).toEqual(mockTratado);
  });

  it('debería cargar los datos de producto al inicializar', () => {
    expect(seleccionDelCupoService.getProducto).toHaveBeenCalled();
    expect(component.producto).toEqual(mockProducto);
    expect(component.subproducto).toEqual(mockProducto);
  });

  // Pruebas de validación y notificaciones
  it('debería mostrar notificación si faltan campos obligatorios al buscar', () => {
    component.seleccionForm.get('regimen')?.setValue('');
    component.manejarBuscar();
    
    expect(component.modalAbierto).toBeTruthy();
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.mensaje).toEqual(component.MENSAJE_CONFIRMACION);
    expect(component.nuevaNotificacion.tipoNotificacion).toEqual(TipoNotificacionEnum.ALERTA);
    expect(component.nuevaNotificacion.categoria).toEqual(CategoriaMensaje.ALERTA);
    expect(component.nuevaNotificacion.txtBtnAceptar).toEqual('Aceptar');
  });

  it('debería cargar datos de selección del cupo cuando todos los campos obligatorios están completos', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    
    expect(seleccionDelCupoService.getSeleccionDelCupo).toHaveBeenCalled();
    expect(component.datosTablaCupo.length).toBeGreaterThan(0);
  });

  // Pruebas de los métodos setters en el store
  it('debería establecer régimen en el store cuando se llama a getRegimen', () => {
    const regimen = mockRegimen[0];
    component.seleccionForm.get('regimen')?.setValue(regimen);
    component.getRegimen();
    
    expect(tramite120402Store.setRegimen).toHaveBeenCalledWith(regimen);
  });

  it('debería establecer tratado en el store cuando se llama a getTratado', () => {
    const tratado = mockTratado[0];
    component.seleccionForm.get('tratado')?.setValue(tratado);
    component.getTratado();
    
    expect(tramite120402Store.setTratado).toHaveBeenCalledWith(tratado);
  });

  it('debería establecer producto en el store cuando se llama a obtenerValorProducto', () => {
    const producto = mockProducto[0];
    component.seleccionForm.get('producto')?.setValue(producto);
    component.obtenerValorProducto();
    
    expect(tramite120402Store.setProducto).toHaveBeenCalledWith(producto);
  });

  it('debería establecer subproducto en el store cuando se llama a getSubproducto', () => {
    const subproducto = mockProducto[0];
    component.seleccionForm.get('subproducto')?.setValue(subproducto);
    component.getSubproducto();
    
    expect(tramite120402Store.setSubproducto).toHaveBeenCalledWith(subproducto);
  });

  // Pruebas de acciones en la tabla
  it('debería manejar correctamente la acción de cupo seleccionado', () => {
    const row = { id: '1', descripcion: 'Cupo 1' };
    component.onAccionCupo({ row, column: 'editar' });
    
    expect(tramite120402Store.setCupoSeleccionado).toHaveBeenCalledWith(row);
    expect(component.mostrarDescripcionCupo).toBeTruthy();
  });

  it('debería formatear correctamente los datos de la tabla de cupo', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    
    expect(component.datosTablaCupo[0].descripcion).toEqual(mockSeleccionDelCupo[0].description);
    expect(component.datosTablaCupo[0].tipoAsignacion).toEqual(mockSeleccionDelCupo[0].assignmentType);
    expect(component.datosTablaCupo[0].fracciones).toEqual(mockSeleccionDelCupo[0].codes);
    expect(component.datosTablaCupo[0].tipoCupo).toEqual(mockSeleccionDelCupo[0].quota);
  });

  // Pruebas del modal
  it('debería cerrar el modal cuando se llama a cerrarModal', () => {
    component.modalAbierto = true;
    component.cerrarModal();
    
    expect(component.modalAbierto).toBeFalsy();
  });

  // Pruebas de ciclo de vida
  it('debería limpiar observables al destruir el componente', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    
    component.ngOnDestroy();
    
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  // Pruebas para suscripciones de observables
  it('debería actualizar formulario cuando regimen$ emite un valor', () => {
    // Crear un nuevo componente con un mock que emita un valor
    const newQuery = {
      ...tramite120402Query,
      regimen$: of(mockRegimen[0])
    };
    
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SeleccionDelCupoComponent],
      providers: [
        { provide: SeleccionDelCupoService, useValue: seleccionDelCupoService },
        { provide: Tramite120402Query, useValue: newQuery },
        { provide: Tramite120402Store, useValue: tramite120402Store }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    
    const newFixture = TestBed.createComponent(SeleccionDelCupoComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    
    expect(newComponent.seleccionForm.get('regimen')?.value).toEqual(mockRegimen[0]);
  });

  it('debería actualizar formulario cuando tratado$ emite un valor', () => {
    const newQuery = {
      ...tramite120402Query,
      tratado$: of(mockTratado[0])
    };
    
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SeleccionDelCupoComponent],
      providers: [
        { provide: SeleccionDelCupoService, useValue: seleccionDelCupoService },
        { provide: Tramite120402Query, useValue: newQuery },
        { provide: Tramite120402Store, useValue: tramite120402Store }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    
    const newFixture = TestBed.createComponent(SeleccionDelCupoComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    
    expect(newComponent.seleccionForm.get('tratado')?.value).toEqual(mockTratado[0]);
  });

  it('debería actualizar formulario cuando producto$ emite un valor', () => {
    const newQuery = {
      ...tramite120402Query,
      producto$: of(mockProducto[0])
    };
    
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SeleccionDelCupoComponent],
      providers: [
        { provide: SeleccionDelCupoService, useValue: seleccionDelCupoService },
        { provide: Tramite120402Query, useValue: newQuery },
        { provide: Tramite120402Store, useValue: tramite120402Store }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    
    const newFixture = TestBed.createComponent(SeleccionDelCupoComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    
    expect(newComponent.seleccionForm.get('producto')?.value).toEqual(mockProducto[0]);
  });

  it('debería actualizar formulario cuando subproducto$ emite un valor', () => {
    const newQuery = {
      ...tramite120402Query,
      subproducto$: of(mockProducto[0])
    };
    
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SeleccionDelCupoComponent],
      providers: [
        { provide: SeleccionDelCupoService, useValue: seleccionDelCupoService },
        { provide: Tramite120402Query, useValue: newQuery },
        { provide: Tramite120402Store, useValue: tramite120402Store }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    
    const newFixture = TestBed.createComponent(SeleccionDelCupoComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    
    expect(newComponent.seleccionForm.get('subproducto')?.value).toEqual(mockProducto[0]);
  });

  // Pruebas para casos particulares de datos
  it('debería manejar correctamente los datos de cupo cuando se recibe un objeto en lugar de un array', () => {
    // Mock con un solo objeto en lugar de un array
    const singleObjectResponse = {
      description: 'Descripción única',
      assignmentType: 'Tipo único',
      codes: ['010', '020'],
      quota: 'Cupo único'
    };
    
    seleccionDelCupoService.getSeleccionDelCupo.mockReturnValue(of(singleObjectResponse));
    
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    
    expect(component.datosTablaCupo.length).toBe(1);
    expect(component.datosTablaCupo[0].descripcion).toEqual(singleObjectResponse.description);
  });

  it('debería manejar correctamente los datos de cupo cuando codes es un string en lugar de un array', () => {
    // Mock con códigos como string
    const stringCodesResponse = [{
      description: 'Descripción con códigos string',
      assignmentType: 'Tipo de asignación',
      codes: '001, 002',
      quota: 'Cupo con string'
    }];
    
    seleccionDelCupoService.getSeleccionDelCupo.mockReturnValue(of(stringCodesResponse));
    
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    
    expect(component.datosTablaCupo[0].fracciones).toEqual(stringCodesResponse[0].codes);
  });

  // Pruebas de validación de formulario
  it('debería marcar el formulario como inválido cuando régimen está vacío', () => {
    component.seleccionForm.get('regimen')?.setValue('');
    expect(component.seleccionForm.valid).toBeFalsy();
  });

  it('debería marcar el formulario como inválido cuando tratado está vacío', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.seleccionForm.get('tratado')?.setValue('');
    expect(component.seleccionForm.valid).toBeFalsy();
  });

  it('debería marcar el formulario como inválido cuando producto está vacío', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.seleccionForm.get('tratado')?.setValue(mockTratado[0]);
    component.seleccionForm.get('producto')?.setValue('');
    expect(component.seleccionForm.valid).toBeFalsy();
  });

  it('debería marcar el formulario como inválido cuando subproducto está vacío', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.seleccionForm.get('tratado')?.setValue(mockTratado[0]);
    component.seleccionForm.get('producto')?.setValue(mockProducto[0]);
    component.seleccionForm.get('subproducto')?.setValue('');
    expect(component.seleccionForm.valid).toBeFalsy();
  });

  it('debería marcar el formulario como válido cuando todos los campos están llenos', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.seleccionForm.get('tratado')?.setValue(mockTratado[0]);
    component.seleccionForm.get('producto')?.setValue(mockProducto[0]);
    component.seleccionForm.get('subproducto')?.setValue(mockProducto[0]);
    expect(component.seleccionForm.valid).toBeTruthy();
  });
});