import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduaneroComponent } from './aduanero.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';
import { createInitialState } from '../../../../estados/tramites/tramite31601.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock JSON imports
jest.mock('@libs/shared/theme/assets/json/31601/prejson.json', () => ({
  __esModule: true,
  default: {
    radio1: { description: 'Test description for radio1' },
    radio2: { description: 'Test description for radio2' },
    radio3: { description: 'Test description for radio3' },
    radio4: { description: 'Test description for radio4' },
    radio5: { description: 'Test description for radio5' },
    radio6: { description: 'Test description for radio6' },
    radio7: { description: 'Test description for radio7' },
    radio8: { description: 'Test description for radio8' },
    radio9: { description: 'Test description for radio9' },
    radio10: { description: 'Test description for radio10' },
    radio11: { description: 'Test description for radio11' },
    radio12: { description: 'Test description for radio12' },
    radio13: { description: 'Test description for radio13' },
    radio14: { description: 'Test description for radio14' },
    radio15: { description: 'Test description for radio15' },
    radio16: { description: 'Test description for radio16' },
    radio17: { description: 'Test description for radio17' },
    radio18: { description: 'Test description for radio18' },
    radio19: { description: 'Test description for radio19' },
    radio20: { description: 'Test description for radio20' }
  }
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/productivo.json', () => ([]), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/serviciosAgace.json', () => ([]), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/comboBimestres.json', () => ([]), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/entidadFederative.json', () => ([]), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/miembroDeLaEmpresa .json', () => ({
  __esModule: true,
  default: [
    {
      ensucaracterde: "1",
      rfc: "HEUE780514BVA",
      obligadoaTributarenMexico: "Si",
      nacionalidad: "1",
      registroFederaldeContribuyentes: "HEUE780514BVA",
      nombreCompleto: "ERNESTO HERNANDEZ URIBE",
      tipoDePersonaMiembro: "Fisica 1",
      nombreMiembro: "ERNESTO",
      apellidoPaternoMiembro: "HERNANDEZ",
      apellidoMaternoMiembro: "URIBE",
      nombreDeLaEmpresaMiembro: ""
    },
    {
      ensucaracterde: "2",
      rfc: "HEUE780514BVA",
      obligadoaTributarenMexico: "Si",
      nacionalidad: "1",
      registroFederaldeContribuyentes: "HEUE780514BVA",
      nombreCompleto: "ERNESTO HERNANDEZ URIBE",
      tipoDePersonaMiembro: "Fisica 2",
      nombreMiembro: "ERNESTO",
      apellidoPaternoMiembro: "HERNANDEZ",
      apellidoMaternoMiembro: "URIBE",
      nombreDeLaEmpresaMiembro: ""
    }
  ]
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/controlInventarios.json', () => ({
  __esModule: true,
  default: {
    tableHeader: [
      "Nombre del sistema o datos para su identificación",
      "Lugar de radicación",
      "Indique si se trata de un sistema de control de inventarios conforme el anexo 24"
    ],
    tableBody: [
      {
        tbodyData: ["Inv", "Mx"],
        lastColumnSelected: false
      }
    ]
  }
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/comboIMMEX.json', () => ([]), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/preOperativo.json', () => ({
  __esModule: true,
  default: [
    { label: 'Si', value: 'Si', radio1: 'Si' },
    { label: 'No', value: 'No', radio1: 'No' }
  ]
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/220401/establecimiento-table.json', () => ({
  __esModule: true,
  default: {
    tableHeader: [
      "Nombre/Denominación o Razón Social",
      "Teléfono",
      "Correo Electrónico",
      "Tipo de Actividad del Establecimiento",
      "Otro",
      "Número de Certificado",
      "Domicilio"
    ],
    tableBody: [
      {
        tbodyData: [
          "Establecimiento 1",
          "123-456-7890",
          "correo",
          "Actividad 1",
          "Otro detalle",
          "Certificado 001",
          "Domicilio 1"
        ]
      }
    ]
  }
}));
jest.mock('@libs/shared/theme/assets/json/220401/destinatario-table.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Col1', 'Col2'],
    tableBody: [{ Col1: 'A', Col2: 'B' }]
  }
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/empleadosSubcontratacion.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Empleado'],
    tableBody: [{ Empleado: 'Juan' }]
  }
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/applicantRegistrados.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Domicilio'],
    tableBody: [{ Domicilio: 'Calle 1' }]
  }
}), { virtual: true });
jest.mock('@libs/shared/theme/assets/json/31601/Instalaciones.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Instalacion'],
    tableBody: [{ Instalacion: 'Bodega' }]
  }
}), { virtual: true });

describe('AduaneroComponent', () => {
  let component: AduaneroComponent;
  let fixture: ComponentFixture<AduaneroComponent>;
  let tramite31601StoreMock: any;
  let tramite31601QueryMock: any;
  let modalServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    tramite31601StoreMock = {
      setNombreMiembro: jest.fn(),
      setOtroCampo: jest.fn(),
      setMencioneTablaDatos: jest.fn(),
      setControlInventariosTablaDatos: jest.fn(),
    };
    tramite31601QueryMock = {
      selectSolicitud$: of(createInitialState()),
    };
    modalServiceMock = {
      show: jest.fn().mockReturnValue({}),
    };
    consultaioQueryMock = {
      selectConsultaioState$: new Subject<any>(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AduaneroComponent,HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: BsModalService, useValue: modalServiceMock },
        { provide: 'Tramite31601Store', useValue: tramite31601StoreMock },
        { provide: 'Tramite31601Query', useValue: tramite31601QueryMock },
        { provide: 'ConsultaioQuery', useValue: consultaioQueryMock },
      ],
    })
      .overrideComponent(AduaneroComponent, {
        set: {
          providers: [
            { provide: BsModalService, useValue: modalServiceMock },
            { provide: 'Tramite31601Store', useValue: tramite31601StoreMock },
            { provide: 'Tramite31601Query', useValue: tramite31601QueryMock },
            { provide: 'ConsultaioQuery', useValue: consultaioQueryMock },
          ],
           template: `<div *ngIf="preOperativeForm"> <ng-container></ng-container> </div>`
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AduaneroComponent);
    component = fixture.componentInstance;
    (component as any).tramite31601Store = tramite31601StoreMock;
    (component as any).tramite31601Query = tramite31601QueryMock;
    (component as any).modalService = modalServiceMock;
    (component as any).consultaioQuery = consultaioQueryMock;

component.preOperativeForm = new FormBuilder().group({
      autorizacionIVAIEPS: [''],
      regimen_0: [''],
      regimen_1: [''],
      regimen_2: [''],
      regimen_3: [''],
      sectorProductivo: [''],
      servicio: [''],
      preOperativo: [''],
      indiqueSi: [''],
      senale: [''],
      empPropios: [''],
      bimestre: [''],
      senaleSi: [''],
      seMomento: [''],
      cumplir: [''],
      indique: [''],
      encuentra: [''],
      delMismo: [''],
      senaleMomento: [''],
      enCaso: [''],
      comboBimestresIDCSeleccione: [''],
      ingresar: [''],
      encuentraSus: [''],
      registrosQue: [''],
      registrosQue2: [''],
      momentoIngresar: [''],
      indiqueCuenta: [''],
      indiqueCheck: [''],
      nombreDel: [''],
      lugarDeRadicacion: [''],
      contabilidad: [''],
      rmfRadio: [''],
      vinculacionRegistroCancelado: [''],
      proveedoresListadoSAT: [''],
      numeroAutorizacionCITES: [''],
      rfc: [''],
      razonSocial: [''],
      numeroEmpleados: [''],
      empleadosPropios: [''],
      archivoNacionales: [''],
    });

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

   it('debe inicializar preOperativeForm con controles', () => {
    expect(component.preOperativeForm).toBeInstanceOf(FormGroup);
    expect(component.preOperativeForm.get('autorizacionIVAIEPS')).toBeDefined();
    expect(component.preOperativeForm.get('numeroAutorizacionCITES')).toBeDefined();
  });

    it('debe deshabilitar los controles si esFormularioSoloLectura es true', () => {
    component.esFormularioSoloLectura = true;
    Object.keys(component.preOperativeForm.controls).forEach(key => {
      component.preOperativeForm.get(key)?.disable();
    });
    Object.keys(component.preOperativeForm.controls).forEach(key => {
      expect(component.preOperativeForm.get(key)?.disabled).toBe(true);
    });
  });
  
  it('debe establecer establecimientoHeaderData y establecimientoBodyData en getEstablecimiento', () => {
    component.getEstablecimiento();
    expect((component.establecimientoHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.establecimientoBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('debe establecer empleadosHeaderData y empleadosBodyData en getEmpleadosData', () => {
    component.getEmpleadosData();
    expect((component.empleadosHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.empleadosBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('debe establecer domiciliosHeaderData y domiciliosBodyData en getDomiciliosData', () => {
    component.getDomiciliosData();
    expect((component.domiciliosHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.domiciliosBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('debe establecer InstalacionesHeaderData y InstalacionesBodyData en getInstalaciones', () => {
    component.getInstalaciones();
    expect((component.InstalacionesHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.InstalacionesBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('debe actualizar la paginación en updatePagination', () => {
    component.fullEstablecimientoBodyData = Array(10).fill({ Col1: 'A', Col2: 'B' });
    component.itemsPerPage = 5;
    component.currentPage = 1;
    component.updatePagination();
    expect((component.establecimientoBodyData as any[]).length).toBe(5);
  });

  it('debe cambiar currentPage y actualizar la paginación en onPageChange', () => {
    const spy = jest.spyOn(component, 'updatePagination');
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('debe cambiar itemsPerPage y actualizar la paginación en onItemsPerPageChange', () => {
    const spy = jest.spyOn(component, 'updatePagination');
    component.onItemsPerPageChange(10);
    expect(component.itemsPerPage).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar al método del store en setValoresStore', () => {
    const form = new FormBuilder().group({ test: ['value'] });
    tramite31601StoreMock.setNombreMiembro = jest.fn();
    component.setValoresStore(form, 'test', 'setNombreMiembro');
    expect(tramite31601StoreMock.setNombreMiembro).toHaveBeenCalledWith('value');
  });

 it('debe abrir el modal de instalaciones', () => {
    component.modalInstanceInstalaciones = { show: jest.fn() } as any;
    component.openInstalacionesModal();
    expect(component.modalInstanceInstalaciones.show).toHaveBeenCalled();
  });

  it('debe mostrar el modal y establecer noSeHaSubidoNingunArchivo en subirArchivo', () => {
    const template = {} as any;
    component.preOperativeForm = new FormBuilder().group({ archivoNacionales: [''] });
    component.subirArchivo(template);
    expect(modalServiceMock.show).toHaveBeenCalledWith(template);
    expect(component.noSeHaSubidoNingunArchivo).toBe(true);
  });

  it('debe ocultar el modal y resetear noSeHaSubidoNingunArchivo en cerrar', () => {
    component.modalRef = { hide: jest.fn() } as unknown as BsModalRef;
    component.noSeHaSubidoNingunArchivo = true;
    component.cerrar();
    expect(component.modalRef.hide).toHaveBeenCalled();
    expect(component.noSeHaSubidoNingunArchivo).toBe(false);
  });

  it('debe limpiar destroyNotifier$ en ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyNotifier$;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  describe('AduaneroComponent manejarFilaSeleccionada', () => {
  it('debe deshabilitar los botones y limpiar la selección si fila está vacía', () => {
    component.enableModficarBoton = true;
    component.enableEliminarBoton = true;
    component.listaFilaSeleccionadaMencione = [{ id: 1 } as any];
    component.filaSeleccionadaMencione = { id: 1 } as any;

    component.manejarFilaSeleccionada([]);

    expect(component.enableModficarBoton).toBe(false);
    expect(component.enableEliminarBoton).toBe(false);
  });

  it('debe establecer la selección y habilitar los botones si fila no está vacía', () => {
    const fila = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' }
    ] as any[];

    component.manejarFilaSeleccionada(fila);

    expect(component.listaFilaSeleccionadaMencione).toBe(fila);
    expect(component.filaSeleccionadaMencione).toBe(fila[1]);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
  });
it('should update existing data if indiceEditando is not null', () => {
  component.indiceEditando = 0;

  component.modificarDatos = [
    {
      principales: 'X',
      instalacion: 'Y',
      federativa: 'Z',
      municipio: 'W',
      colonia: 'V'
    }
  ];

  component.modificarForm.setValue({
    principales: 'P',
    instalacion: 'I',
    federativa: 'F',
    municipio: 'M',
    colonia: 'C',
    registro: null,
    postal: null,
    proceso: 'NuevoProceso',
    inmueble: 'NuevoInmueble'
  });

  component.closeModal = { nativeElement: { click: jest.fn() } } as any;

  component.guardarModificarDatos();

  expect(component.modificarDatos[0]).toEqual({
    principales: 'P',
    instalacion: 'I',
    federativa: 'F',
    municipio: 'M',
    colonia: 'C'
  });

  expect(component.indiceEditando).toBeNull();
  expect(component.closeModal.nativeElement.click).toHaveBeenCalled();
});



it('debe agregar un nuevo dato si indiceEditando es null', () => {
  component.modificarForm.setValue({
    principales: 'Nuevo',
    instalacion: 'Inst',
    federativa: 'Fed',
    municipio: 'Mun',
    colonia: 'Col',
    registro: null,
    postal: null,
    proceso: 'Proc',
    inmueble: 'Inm'
  });
  component.indiceEditando = null;
  component.modificarDatos = [];
  component.closeModal = { nativeElement: { click: jest.fn() } } as any;
  component.guardarModificarDatos();
  expect(component.modificarDatos.length).toBe(1);
  expect(component.modificarDatos[0].principales).toBe('Nuevo');
});

it('no debe guardar si el formulario es inválido', () => {
  component.modificarForm.get('principales')?.setValue('');
  jest.spyOn(component.modificarForm, 'markAllAsTouched');
  const spy = jest.spyOn(component, 'guardarModificarDatos');

  component.guardarModificarDatos();

  expect(component.modificarForm.markAllAsTouched).toHaveBeenCalled();
});
it('debe eliminar la fila seleccionada si selectedFilaIndex no es null', () => {
  component.modificarDatos = [
    { principales: 'A', instalacion: 'B', federativa: 'C', municipio: 'D', colonia: 'E' }
  ];
  component.selectedFilaIndex = 0;
  component.selectedFila = component.modificarDatos[0];
  component.hayFilasSeleccionadas = true;

  component.eliminarFilaSeleccionada();

  expect(component.modificarDatos.length).toBe(0);
  expect(component.selectedFila).toBeNull();
  expect(component.selectedFilaIndex).toBeNull();
  expect(component.hayFilasSeleccionadas).toBe(false);
});
it('debe agregar datos usando Instalaciones.tableBody[0] en acceptarValor', () => {
  component.Instalaciones = {
    tableHeader: [],
    tableBody: [
      {
        tbodyData: ['FedValue', 'MunValue', 'ColValue']
      }
    ]
  };
  component.modificarForm.get('principales')?.setValue('TestPrincipal');
  component.modificarForm.get('instalacion')?.setValue('TestInst');
  component.modificarDatos = [];
  component.acceptarValor();
  expect(component.modificarDatos.length).toBe(1);
  expect(component.modificarDatos[0]).toEqual({
    principales: 'TestPrincipal',
    municipio: 'MunValue',
    instalacion: 'TestInst',
    federativa: 'FedValue',
    colonia: 'ColValue'
  });
});

it('debe manejar tabla de instalaciones vacía en acceptarValor', () => {
  component.Instalaciones = {
    tableHeader: [],
    tableBody: []
  };
  component.modificarForm.get('principales')?.setValue('');
  component.modificarForm.get('instalacion')?.setValue('');
  component.modificarDatos = [];
  component.acceptarValor();
  expect(component.modificarDatos[0]).toEqual({
    principales: '',
    municipio: '',
    instalacion: '',
    federativa: '',
    colonia: ''
  });
});
describe('addNewMencioneItem', () => {
  beforeEach(() => {
    component.comboBimestresIDC = [
      { id: 1, descripcion: 'Primer Bimestre' },
      { id: 2, descripcion: 'Segundo Bimestre' }
    ];

    component.datosTablaMencione = [];
    component.modoEdicion = false;
    component.filaSeleccionadaIndex = null;

    component.preOperativeForm.patchValue({
      rfc: 'ABC123',
      razonSocial: 'Empresa X',
      numeroEmpleados: 50,
      numeroAutorizacionCITES: 'AUT-001',
      bimestreValor: 1
    });
  });

 

 it('debe editar un elemento existente si está en modo edición', () => {
  component.datosTablaMencione = [{
    id: '1',
    rfc: 'ABC123',
    social: 'Empresa X',
    noumero: '50',
    bimestre: 'Primer Bimestre'
  }];
  
  component.comboBimestresIDC = [
    { id: 1, descripcion: 'Primer Bimestre' },
    { id: 2, descripcion: 'Segundo Bimestre' }
  ];

  component.modoEdicion = true;
  component.filaSeleccionadaIndex = 0;

  component.preOperativeForm.get('rfc')?.setValue('ABC123');
  component.preOperativeForm.get('razonSocial')?.setValue('Empresa X');
  component.preOperativeForm.get('numeroEmpleados')?.setValue('50');
  component.preOperativeForm.get('numeroAutorizacionCITES')?.setValue('AUTH001');
  component.preOperativeForm.get('bimestreValor')?.setValue(1);

  component.addNewMencioneItem();

  expect(component.datosTablaMencione.length).toBe(1);
  expect(component.datosTablaMencione[0]).toEqual({
    id: '1',
    rfc: 'ABC123',
    social: 'Empresa X',
    noumero: "50",
    bimestre: 'Primer Bimestre'
  });
});


  it('no debe agregar ni editar si algún campo obligatorio está inválido', () => {
    component.preOperativeForm.get('rfc')?.setValue('');
    component.addNewMencioneItem();
    expect(component.datosTablaMencione.length).toBe(0);
  });
});

it('should open modal and populate form if selectedFila exists', () => {
  component.selectedFila = {
    principales: 'PrincipalTest',
    instalacion: 'InstalacionTest',
    federativa: 'FederativaTest',
    municipio: 'MunicipioTest',
    colonia: 'ColoniaTest'
  };
  component.selectedFilaIndex = 2;

  component.abrirModal();

  expect(component.modal).toBe('show');
  expect(component.indiceEditando).toBe(2);
  expect(component.modificarForm.value).toEqual(expect.objectContaining({
    principales: 'PrincipalTest',
    instalacion: 'InstalacionTest',
    federativa: 'FederativaTest',
    municipio: 'MunicipioTest',
    colonia: 'ColoniaTest'
  }));
});
it('should only open modal without populating form if selectedFila is null', () => {
  component.selectedFila = null;
  component.selectedFilaIndex = null;

  const patchSpy = jest.spyOn(component.modificarForm, 'patchValue');

  component.abrirModal();

  expect(component.modal).toBe('show');
  expect(component.indiceEditando).toBeNull();
  expect(patchSpy).not.toHaveBeenCalled();
})


  it('should only open modal without populating form if selectedFila is null', () => {
    const patchSpy = jest.spyOn(component.modificarForm, 'patchValue');

    component.selectedFila = null;
    component.selectedFilaIndex = null;

    component.abrirModal();

    expect(component.modal).toBe('show');
    expect(component.indiceEditando).toBeNull();
    expect(patchSpy).not.toHaveBeenCalled();
  });

  it('should open modal and populate form if selectedFila and index are defined', () => {
    const patchSpy = jest.spyOn(component.modificarForm, 'patchValue');

    component.selectedFila = {
      principales: 'P',
      instalacion: 'I',
      federativa: 'F',
      municipio: 'M',
      colonia: 'C',
    };
    component.selectedFilaIndex = 2;

    component.abrirModal();

    expect(component.modal).toBe('show');
    expect(component.indiceEditando).toBe(2);
    expect(patchSpy).toHaveBeenCalledWith({
      principales: 'P',
      instalacion: 'I',
      federativa: 'F',
      municipio: 'M',
      colonia: 'C',
    });
       });


it('should not open confirmation popup if no items are selected', () => {
  component.listaFilaSeleccionadaMencione = [];
  const spy = jest.spyOn(component, 'abrirElimninarConfirmationopup');
  
  component.confirmEliminarMencioneItem();

  expect(spy).not.toHaveBeenCalled();
});
  
it('should open confirmation popup if items are selected', () => {
  component.listaFilaSeleccionadaMencione = [{
    id: '',
    social: '',
    rfc: '',
    noumero: '',
    bimestre: ''
  }]; 
  const spy = jest.spyOn(component, 'abrirElimninarConfirmationopup');

  component.confirmEliminarMencioneItem();

  expect(spy).toHaveBeenCalled();
});
it('should open multiple selection popup if enableModficarBoton is true', () => {
  component.enableModficarBoton = true;

  component.abrirMultipleSeleccionPopup();

  expect(component.multipleSeleccionPopupAbierto).toBe(true);
});

it('should not open multiple selection popup if enableModficarBoton is false', () => {
  component.enableModficarBoton = false;

  component.abrirMultipleSeleccionPopup();

  expect(component.multipleSeleccionPopupAbierto).toBeFalsy();
});
it('should close multiple selection popup', () => {
  component.multipleSeleccionPopupAbierto = true;
  component.multipleSeleccionPopupCerrado = false;

  component.cerrarMultipleSeleccionPopup();

  expect(component.multipleSeleccionPopupAbierto).toBe(false);
  expect(component.multipleSeleccionPopupCerrado).toBe(false);
});
it('should open confirmation popup for delete', () => {
  component.confirmEliminarPopupAbierto = false;

  component.abrirElimninarConfirmationopup();

  expect(component.confirmEliminarPopupAbierto).toBe(true);
});
it('should close confirmation popup for delete', () => {
  component.confirmEliminarPopupAbierto = true;
  component.confirmEliminarPopupCerrado = false;

  component.cerrarEliminarConfirmationPopup();

  expect(component.confirmEliminarPopupAbierto).toBe(false);
  expect(component.confirmEliminarPopupCerrado).toBe(false);
});

it('should do nothing if modalInstanceControlInventarios does not exist', () => {
  component.modalInstanceControlInventarios = null as any;

  const patchSpy = jest.spyOn(component.preOperativeForm, 'patchValue');

  component.openControlInventariosModal();

  expect(patchSpy).not.toHaveBeenCalled();
});
it('should reset and show modal if modalInstanceControlInventarios exists', () => {
  component.modalInstanceControlInventarios = { show: jest.fn() } as any;

  const patchSpy = jest.spyOn(component.controlInventariosModalForm, 'reset');

  component.openControlInventariosModal();

  expect(patchSpy).toHaveBeenCalledWith({
    nombreDel: '',
    lugarDeRadicacion: '',
    indiqueCheck: false
  });

  expect(component.modalInstanceControlInventarios.show).toHaveBeenCalled();
});

it('should do nothing if modalInstanceControlInventarios does not exist', () => {
  component.modalInstanceControlInventarios = null as any;

  const patchSpy = jest.spyOn(component.preOperativeForm, 'patchValue');

  component.openControlInventariosModal();

  expect(patchSpy).not.toHaveBeenCalled();
});
it('should hide the modal if modalInstanceControlInventarios exists', () => {
  component.modalInstanceControlInventarios = { hide: jest.fn() } as any;

  component.closeControlInventariosModal();

  expect(component.modalInstanceControlInventarios.hide).toHaveBeenCalled();
});

it('should do nothing if modalInstanceControlInventarios is null', () => {
  component.modalInstanceControlInventarios = null as any;

  component.closeControlInventariosModal();

 expect(component.modalInstanceControlInventarios).toBeNull();
});
it('should open delete confirmation popup if items are selected', () => {
  component.listaFilaSeleccionadaControlInventarios = [{
    id: '1',
    nombreSistema: '',
    lugarRadicacion: '',
    anexo24: false
  }];

  const spy = jest.spyOn(component, 'abrirEliminarConfirmationPopupControlInventarios');

  component.confirmEliminarControlInventariosItem();

  expect(spy).toHaveBeenCalled();
});

it('should do nothing if no items are selected', () => {
  component.listaFilaSeleccionadaControlInventarios = [];

  const spy = jest.spyOn(component, 'abrirEliminarConfirmationPopupControlInventarios');

  component.confirmEliminarControlInventariosItem();

  expect(spy).not.toHaveBeenCalled();
});
it('should open delete confirmation popup for control inventarios', () => {
  component.abrirEliminarConfirmationPopupControlInventarios();

  expect(component.confirmEliminarPopupAbiertoControlInventarios).toBe(true);
});
it('should close delete confirmation popup for control inventarios', () => {
  component.confirmEliminarPopupAbiertoControlInventarios = true;

  component.cerrarEliminarConfirmationPopupControlInventarios();

  expect(component.confirmEliminarPopupAbiertoControlInventarios).toBeFalsy();
});
it('should delete selected control inventarios items and update the store', () => {
  const mockStoreSpy = jest.spyOn<any, any>(component['tramite31601Store'], 'setNombreMiembro');
  const closePopupSpy = jest.spyOn(component, 'cerrarEliminarConfirmationPopupControlInventarios');

  component.datosTablaControlInventarios = [
    { id: '1', nombreSistema: 'Sys1', lugarRadicacion: '', anexo24: false },
    { id: '2', nombreSistema: 'Sys2', lugarRadicacion: '', anexo24: false },
    { id: '3', nombreSistema: 'Sys3', lugarRadicacion: '', anexo24: false }
  ];

  component.listaFilaSeleccionadaControlInventarios = [
    {
      id: '2', nombreSistema: 'Sys2',
      lugarRadicacion: '',
      anexo24: false
    }
  ];

  component.eliminarControlInventariosItem();

expect(component.datosTablaControlInventarios).toMatchObject([
  { id: '1', nombreSistema: 'Sys1' },
  { id: '3', nombreSistema: 'Sys3' }
]);

});

it('should open agregar modal and reset form values', () => { 
  component.modalInstance = { show: jest.fn() } as any;
  component.preOperativeForm.patchValue = jest.fn();  
  component.openAgregarModal();  
  expect(component.modoEdicion).toBe(false);
  expect(component.filaSeleccionadaIndex).toBeNull();
  expect(component.preOperativeForm.patchValue).toHaveBeenCalledWith({
    rfc: '',
    razonSocial: '',
    numeroEmpleados: '',
    empleadosPropios: '',
    bimestreValor: '',
    numeroAutorizacionCITES: '',
  });
  expect(component.modalInstance.show).toHaveBeenCalled();
});

it('should close modify modal if modalInstance exists', () => {
  
  component.modalInstance = { hide: jest.fn() } as any;
  component.closeModifyModal();
  expect(component.modalInstance.hide).toHaveBeenCalled();
});
describe('onFilasSeleccionadas', () => {
  beforeEach(() => {
    component.modificarDatos = [
      { principales: 'A', instalacion: 'I1', federativa: 'F1', municipio: 'M1', colonia: 'C1' },
      { principales: 'B', instalacion: 'I2', federativa: 'F2', municipio: 'M2', colonia: 'C2' }
    ];
  });

  it('should set selectedFila and selectedFilaIndex if one matching row is selected', () => {
    const fila = component.modificarDatos[1];
    component.onFilasSeleccionadas([fila]);

    expect(component.selectedIndiqueDatos).toEqual([fila]);
    expect(component.hayFilasSeleccionadas).toBe(true);
    expect(component.selectedFila).toBe(fila);
    expect(component.selectedFilaIndex).toBe(1);
  });

  it('should set selectedFilaIndex to null if selected row is not in modificarDatos', () => {
    const nonMatchingRow = {
      principales: 'Z',
      instalacion: 'Ix',
      federativa: 'Fx',
      municipio: 'Mx',
      colonia: 'Cx'
    };

    component.onFilasSeleccionadas([nonMatchingRow]);

    expect(component.selectedIndiqueDatos).toEqual([nonMatchingRow]);
    expect(component.hayFilasSeleccionadas).toBe(true);
    expect(component.selectedFila).toBe(nonMatchingRow);
    expect(component.selectedFilaIndex).toBeNull();
  });

  it('should reset selection if more than one row is selected', () => {
    const filas = [component.modificarDatos[0], component.modificarDatos[1]];

    component.onFilasSeleccionadas(filas);

    expect(component.selectedIndiqueDatos).toEqual(filas);
    expect(component.hayFilasSeleccionadas).toBe(true);
    expect(component.selectedFila).toBeNull();
    expect(component.selectedFilaIndex).toBeNull();
  });

  it('should reset selection if no rows are selected', () => {
    component.onFilasSeleccionadas([]);

    expect(component.selectedIndiqueDatos).toEqual([]);
    expect(component.hayFilasSeleccionadas).toBe(false);
    expect(component.selectedFila).toBeNull();
    expect(component.selectedFilaIndex).toBeNull();
  });
});
it('should enable fields when indiqueCuenta value is "Si"', () => {
  const form = component.preOperativeForm; 
  form.get('nombreDel')?.disable();
  form.get('lugarDeRadicacion')?.disable();
  form.get('indiqueCheck')?.disable();  
  form.get('indiqueCuenta')?.setValue('Si');  
  expect(form.get('nombreDel')?.enabled).toBe(true);
  expect(form.get('lugarDeRadicacion')?.enabled).toBe(true);
  expect(form.get('indiqueCheck')?.enabled).toBe(true);
});
it('should set edit mode, patch form, set index and show modal when a mencione row is selected', () => {

  component.filaSeleccionadaMencione = {
    id: '2',
    rfc: 'RFC123',
    social: 'Empresa X',
    noumero: '25',
    bimestre: 'Segundo Bimestre'
  };

   component.datosTablaMencione = [
    { id: '1', rfc: 'R1', social: 'S1', noumero: '10', bimestre: 'B1' },
    { id: '2', rfc: 'RFC123', social: 'Empresa X', noumero: '25', bimestre: 'Segundo Bimestre' },
    { id: '3', rfc: 'R3', social: 'S3', noumero: '30', bimestre: 'B3' }
  ];

  const modalShowSpy = jest.fn();
  component.modalInstance = { show: modalShowSpy } as any;

  const patchSpy = jest.spyOn(component.preOperativeForm, 'patchValue');

  component.openModifyModal();

  expect(component.modoEdicion).toBe(true);
  expect(component.filaSeleccionadaIndex).toBe(1);
  expect(patchSpy).toHaveBeenCalledWith({
    rfc: 'RFC123',
    razonSocial: 'Empresa X',
    numeroEmpleados: '25',
    empleadosPropios: 'Segundo Bimestre'
  });
  expect(modalShowSpy).toHaveBeenCalled();
});
it('should set selectedFileName when a file is selected', () => {
  const file = new File(['dummy content'], 'test-file.pdf', { type: 'application/pdf' });

  const event = {
    target: {
      files: [file]
    }
  } as unknown as Event;

  component.onFileSelected(event);

  expect(component.selectedFileName).toBe('test-file.pdf');
});

it('should clear selectedFileName when no file is selected', () => {
  const event = {
    target: {
      files: []
    }
  } as unknown as Event;

  component.selectedFileName = 'old-file.txt';

  component.onFileSelected(event);

  expect(component.selectedFileName).toBe('');
});



});
});