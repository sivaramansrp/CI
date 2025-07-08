jest.mock('@libs/shared/theme/assets/json/110101/tratados-table.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Tratado', 'País', 'Origen'],
    tableBody: [
      ['TLCAN', 'México', 'Nacional']
    ]
  }
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TratadosComponent } from './tratados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { PantallasSvcService } from '../../services/pantallas-svc.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

describe('TratadosComponent (Jest)', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;

  const MOCK_SOLICITANTE_STATE = {
    rfc: 'XAXX010101000',
    denominacion: 'Empresa S.A.',
    actividadEconomica: 'Industria',
    correoElectronico: 'correo@empresa.com',
    pais: 'MX',
    tratado: 'TLCAN',
    origen: 'Nacional',
    nombreComercial: 'Comercial SA',
    nombreIngles: 'Commercial Inc.',
    fraccionArancelaria: '1234.56.78',
    descripcion: 'Producto industrial',
    valorTransaccion: '500000',
    entidad: 'CDMX',
    representacion: 'Legal'
  };

  const MOCK_CATALOGOS = {
    pais: [{ id: 1, nombre: 'México' }],
    tratado: [{ id: 1, nombre: 'TLCAN' }],
    origen: [{ id: 1, nombre: 'Nacional' }]
  };

  const MOCK_CONSULTAIO_STATE = {
    procedureId: '123',
    parameter: 'param',
    department: 'Dept',
    folioTramite: 'FT123456',
    tipoDeTramite: 'Importación',
    estadoDeTramite: 'En Proceso',
    readonly: false,
    create: true,
    update: true,
    consultaioSolicitante: null
  };

  const mockPantallaService = {
    getCatalogoDatos: jest.fn().mockReturnValue(of(MOCK_CATALOGOS))
  };

  const mockSolicitanteQuery = {
    selectSolicitante$: of(MOCK_SOLICITANTE_STATE)
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
  };

  const mockTramiteStore = {
    actualizarPais: jest.fn(),
    actualizarTratado: jest.fn(),
    actualizarOrigen: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TratadosComponent,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent,
        TableComponent,
        AlertComponent,
        CatalogoSelectComponent
      ],
      providers: [
        { provide: PantallasSvcService, useValue: mockPantallaService },
        { provide: Solicitante110101Query, useValue: mockSolicitanteQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: Tramite110101Store, useValue: mockTramiteStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los catálogos correctamente', () => {
    component.getCatalogoList();
    expect(component.paisCatalogo).toEqual(MOCK_CATALOGOS.pais);
    expect(component.tratadoCatalogo).toEqual(MOCK_CATALOGOS.tratado);
    expect(component.origenCatalogo).toEqual(MOCK_CATALOGOS.origen);
  });

  it('debe inicializar el formulario con valores del store', () => {
    component.inicializarFormulario();
    expect(component.formularioTratados.value).toEqual({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'Nacional'
    });
  });

  it('debe deshabilitar el formulario en modo solo lectura', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formularioTratados.disabled).toBe(true);
  });

  it('debe habilitar el formulario en modo editable', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.formularioTratados.enabled).toBe(true);
  });

  it('debe resetear el formulario cuando es válido al agregarTratado', () => {
    component.inicializarFormulario();
    component.formularioTratados.setValue({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'Nacional'
    });
    const resetSpy = jest.spyOn(component.formularioTratados, 'reset');
    component.agregarTratado();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('no debe resetear el formulario cuando es inválido al agregarTratado', () => {
    component.inicializarFormulario();
    component.formularioTratados.get('pais')?.setValue(null);
    const resetSpy = jest.spyOn(component.formularioTratados, 'reset');
    component.agregarTratado();
    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('debe actualizar el store usando setValoresStore', () => {
    component.inicializarFormulario();
    component.formularioTratados.setValue({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'Nacional'
    });

    component.setValoresStore(component.formularioTratados, 'pais', 'actualizarPais' as keyof Tramite110101Store);
    component.setValoresStore(component.formularioTratados, 'tratado', 'actualizarTratado' as keyof Tramite110101Store);
    component.setValoresStore(component.formularioTratados, 'origen', 'actualizarOrigen' as keyof Tramite110101Store);

    expect(mockTramiteStore.actualizarPais).toHaveBeenCalledWith('MX');
    expect(mockTramiteStore.actualizarTratado).toHaveBeenCalledWith('TLCAN');
    expect(mockTramiteStore.actualizarOrigen).toHaveBeenCalledWith('Nacional');
  });

  it('debe completar destroy$ en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe activar modo edición y cargar valores al formulario en modificarTratado', () => {
  component.registroDeSolicitudesTablaDatos = [
    { pais: 'México', tratado: 'TLCAN', origen: 'Nacional' }
  ];
  component.paisCatalogo = [{ id: 1, descripcion: 'México' }];
  component.tratadoCatalogo = [{ id: 1, descripcion: 'TLCAN' }];
  component.origenCatalogo = [{ id: 1, descripcion: 'Nacional' }];

  component.selectedRowIndex = 0;
  component.inicializarFormulario();
  component.modificarTratado();

  expect(component.isEditMode).toBe(true);
  expect(component.formularioTratados.value).toEqual({
    pais: 1,
    tratado: 1,
    origen: 1
  });
});

it('debe seleccionar una fila correctamente', () => {
  const row = { pais: 'México', tratado: 'TLCAN', origen: 'Nacional' };
  component.registroDeSolicitudesTablaDatos = [row];
  component.inicializarFormulario();
  component.onSeleccionChange([row]);

  expect(component.selectedRows).toEqual([row]);
  expect(component.selectedRowIndex).toBe(0);
});

it('debe limpiar selección y resetear formulario si múltiples filas son seleccionadas', () => {
  const row1 = { pais: 'México', tratado: 'TLCAN', origen: 'Nacional' };
  const row2 = { pais: 'Canadá', tratado: 'CPTPP', origen: 'Internacional' };
  component.inicializarFormulario();
  const resetSpy = jest.spyOn(component.formularioTratados, 'reset');
  component.onSeleccionChange([row1, row2]);

  expect(component.selectedRows).toEqual([]);
  expect(component.selectedRowIndex).toBeNull();
  expect(resetSpy).toHaveBeenCalled();
});

it('debe eliminar tratados seleccionados correctamente', () => {
  const row1 = { pais: 'México', tratado: 'TLCAN', origen: 'Nacional' };
  const row2 = { pais: 'Canadá', tratado: 'CPTPP', origen: 'Internacional' };
  component.registroDeSolicitudesTablaDatos = [row1, row2];
  component.selectedRows = [row1];

  component.eliminarTratado();

  expect(component.registroDeSolicitudesTablaDatos).toEqual([row2]);
  expect(component.selectedRows).toEqual([]);
});

it('no debe eliminar si no hay selección', () => {
  const initial = [{ pais: 'México', tratado: 'TLCAN', origen: 'Nacional' }];
  component.registroDeSolicitudesTablaDatos = [...initial];
  component.selectedRows = [];

  component.eliminarTratado();

  expect(component.registroDeSolicitudesTablaDatos).toEqual(initial);
});


});
