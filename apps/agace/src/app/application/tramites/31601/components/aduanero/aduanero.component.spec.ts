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
});
});