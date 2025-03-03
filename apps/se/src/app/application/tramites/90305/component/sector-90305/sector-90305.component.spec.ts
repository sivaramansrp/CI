import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sector90305Component } from './sector-90305.component';

import { ProsecModificacionServiceTsService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { SECTOR_MODEL } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('Sector90305Component', () => {
  let component: Sector90305Component;
  let fixture: ComponentFixture<Sector90305Component>;
  let mockService: ProsecModificacionServiceTsService;

  const MOCK_SECTOR: SECTOR_MODEL[] = [
    { listaDeSectores: 'Sector A', claveDelSector: '123', eStatus: 'Activo' },
    { listaDeSectores: 'Sector B', claveDelSector: '456', eStatus: 'Inactivo' }
  ];

  beforeEach(async () => {
    // Creating a simple mock service manually
    mockService = {
      getSector: () => of(MOCK_SECTOR),
    } as ProsecModificacionServiceTsService;

    await TestBed.configureTestingModule({
      declarations: [Sector90305Component],
      imports: [CommonModule, TablaDinamicaComponent, TituloComponent],
      providers: [{ provide: ProsecModificacionServiceTsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Sector90305Component);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and call loadSector()', () => {
    component.ngOnInit();
    expect(component.sectorData).toEqual(MOCK_SECTOR);
  });

  it('should have the correct table configuration', () => {
    const EXPECTED_CONFIG: ConfiguracionColumna<SECTOR_MODEL>[] = [
      { encabezado: 'Lista de sectores', clave: (item: SECTOR_MODEL) => item.listaDeSectores, orden: 1 },
      { encabezado: 'Clave del sector', clave: (item: SECTOR_MODEL) => item.claveDelSector, orden: 2 },
      { encabezado: 'Estatus', clave: (item: SECTOR_MODEL) => item.eStatus, orden: 3 }
    ];
    expect(component.configuracionTabla).toEqual(EXPECTED_CONFIG);
  });

  it('should call loadSector() and populate sectorData', () => {
    component.loadSector();
    expect(component.sectorData).toEqual(MOCK_SECTOR);
  });
});
