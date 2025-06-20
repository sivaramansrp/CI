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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load catalogs correctly', () => {
    component.getCatalogoList();
    expect(component.paisCatalogo).toEqual(MOCK_CATALOGOS.pais);
    expect(component.tratadoCatalogo).toEqual(MOCK_CATALOGOS.tratado);
    expect(component.origenCatalogo).toEqual(MOCK_CATALOGOS.origen);
  });

  it('should initialize form with values from store', () => {
    component.inicializarFormulario();
    expect(component.formularioTratados.value).toEqual({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'Nacional'
    });
  });

  it('should disable form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formularioTratados.disabled).toBe(true);
  });

  it('should enable form in editable mode', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.formularioTratados.enabled).toBe(true);
  });

  it('should reset form when valid on agregarTratado', () => {
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

  it('should not reset form when invalid on agregarTratado', () => {
    component.inicializarFormulario();
    component.formularioTratados.get('pais')?.setValue(null);
    const resetSpy = jest.spyOn(component.formularioTratados, 'reset');
    component.agregarTratado();
    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should update store using setValoresStore', () => {
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

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
