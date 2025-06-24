import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduaneroComponent } from './aduanero.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';
import { createInitialState } from '../../../../estados/tramites/tramite31601.store';

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
      imports: [ReactiveFormsModule, AduaneroComponent],
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
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AduaneroComponent);
    component = fixture.componentInstance;
    (component as any).tramite31601Store = tramite31601StoreMock;
    (component as any).tramite31601Query = tramite31601QueryMock;
    (component as any).modalService = modalServiceMock;
    (component as any).consultaioQuery = consultaioQueryMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize preOperativeForm with controls', () => {
    component.solicitudState = createInitialState();
    component.inicializarEstadoFormulario();
    expect(component.preOperativeForm).toBeInstanceOf(FormGroup);
    expect(component.preOperativeForm.get('autorizacionIVAIEPS')).toBeDefined();
  });

  it('should disable controls if esFormularioSoloLectura is true', () => {
    component.solicitudState = createInitialState();
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    Object.keys(component.preOperativeForm.controls).forEach(key => {
      expect(component.preOperativeForm.get(key)?.disabled).toBe(true);
    });
  });

  it('should enable controls if esFormularioSoloLectura is false', () => {
    component.solicitudState = createInitialState();
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    Object.keys(component.preOperativeForm.controls).forEach(key => {
      expect(component.preOperativeForm.get(key)?.enabled).toBe(true);
    });
  });

  it('should set establecimientoHeaderData and establecimientoBodyData in getEstablecimiento', () => {
    component.getEstablecimiento();
    expect((component.establecimientoHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.establecimientoBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('should set empleadosHeaderData and empleadosBodyData in getEmpleadosData', () => {
    component.getEmpleadosData();
    expect((component.empleadosHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.empleadosBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('should set domiciliosHeaderData and domiciliosBodyData in getDomiciliosData', () => {
    component.getDomiciliosData();
    expect((component.domiciliosHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.domiciliosBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('should set InstalacionesHeaderData and InstalacionesBodyData in getInstalaciones', () => {
    component.getInstalaciones();
    expect((component.InstalacionesHeaderData as any[]).length).toBeGreaterThan(0);
    expect((component.InstalacionesBodyData as any[]).length).toBeGreaterThan(0);
  });

  it('should update pagination on updatePagination', () => {
    component.fullEstablecimientoBodyData = Array(10).fill({ Col1: 'A', Col2: 'B' });
    component.itemsPerPage = 5;
    component.currentPage = 1;
    component.updatePagination();
    expect((component.establecimientoBodyData as any[]).length).toBe(5);
  });

  it('should change currentPage and update pagination on onPageChange', () => {
    const spy = jest.spyOn(component, 'updatePagination');
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should change itemsPerPage and update pagination on onItemsPerPageChange', () => {
    const spy = jest.spyOn(component, 'updatePagination');
    component.onItemsPerPageChange(10);
    expect(component.itemsPerPage).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const form = new FormBuilder().group({ test: ['value'] });
    tramite31601StoreMock.setNombreMiembro = jest.fn();
    component.setValoresStore(form, 'test', 'setNombreMiembro');
    expect(tramite31601StoreMock.setNombreMiembro).toHaveBeenCalledWith('value');
  });

  it('should open and close modals', () => {
    component.modalInstance = { show: jest.fn(), hide: jest.fn() } as any;
    component.openModifyModal();
    expect(component.modalInstance.show).toHaveBeenCalled();
    component.closeModifyModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  it('should open instalaciones modal', () => {
    component.modalInstanceInstalaciones = { show: jest.fn() } as any;
    component.openInstalacionesModal();
    expect(component.modalInstanceInstalaciones.show).toHaveBeenCalled();
  });

  it('should show modal and set noSeHaSubidoNingunArchivo in subirArchivo', () => {
    const template = {} as any;
    component.preOperativeForm = new FormBuilder().group({ archivoNacionales: [''] });
    component.subirArchivo(template);
    expect(modalServiceMock.show).toHaveBeenCalledWith(template);
    expect(component.noSeHaSubidoNingunArchivo).toBe(true);
  });

  it('should hide modal and reset noSeHaSubidoNingunArchivo in cerrar', () => {
    component.modalRef = { hide: jest.fn() } as unknown as BsModalRef;
    component.noSeHaSubidoNingunArchivo = true;
    component.cerrar();
    expect(component.modalRef.hide).toHaveBeenCalled();
    expect(component.noSeHaSubidoNingunArchivo).toBe(false);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyNotifier$;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});