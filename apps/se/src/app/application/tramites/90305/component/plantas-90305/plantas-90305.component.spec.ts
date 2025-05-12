import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plantas90305Component } from './plantas-90305.component';
import { of } from 'rxjs';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service.ts.service';
import { PLANTAS } from '../../models/prosec-modificacion.model';

describe('Plantas90305Component', () => {
  let component: Plantas90305Component;
  let fixture: ComponentFixture<Plantas90305Component>;
  let mockService: ProsecModificacionServiceTsService;

  const MOCK_DATA: PLANTAS[] = [
    {
      calle: "CARRETERA INTERNACIONAL NO. 15 MEX-NOG KM 203", 
      numeroExterior: "SN",
      numeroInterior : " ",
      codigoPostal: "81210",
      colonia: "MIGUEL HIDALGO",
      municipioOAlcaldia:"AHOME",
      entidadFederativa:"SINALOA",
      pais:"pais",
      telefono:"telefono"
  },
  
    {
      calle: "CARRETERA INTERNACIONAL NO. 15 MEX-NOG KM 2033", 
      numeroExterior: "SN",
      numeroInterior : " ",
      codigoPostal: "81210",
      colonia: "MIGUEL HIDALGO",
      municipioOAlcaldia:"AHOME",
      entidadFederativa:"SINALOA",
      pais:"pais",
      telefono:"telefono"
  }
  ];

  beforeEach(async () => {
    // Creating a manual mock service
    mockService = {
      getPlantaComplementaria: () => of(MOCK_DATA),
    } as ProsecModificacionServiceTsService;

    await TestBed.configureTestingModule({
      imports: [Plantas90305Component, CommonModule, TituloComponent, TablaDinamicaComponent],
      providers: [{ provide: ProsecModificacionServiceTsService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Plantas90305Component);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and call loadPlantaComplementaria()', () => {
    component.ngOnInit();
    expect(component.personaparas).toEqual(MOCK_DATA);
  });

  it('should have the correct table configuration', () => {
    const EXPECTED_CONFIGUE: ConfiguracionColumna<PLANTAS>[] = [
      { encabezado: 'Calle', clave: (item: PLANTAS) => item.calle, orden: 1 },
      { encabezado: 'Número exterior', clave: (item: PLANTAS) => item.numeroExterior, orden: 2 },
      { encabezado: 'Número interior', clave: (item: PLANTAS) => item.numeroInterior, orden: 3 },
      { encabezado: 'Código postal', clave: (item: PLANTAS) => item.codigoPostal, orden: 4 },
      { encabezado: 'Colonia', clave: (item: PLANTAS) => item.colonia, orden: 5 },
      { encabezado: 'Municipio o alcaldía', clave: (item: PLANTAS) => item.municipioOAlcaldia, orden: 6 },
      { encabezado: 'Entidad Federativa', clave: (item: PLANTAS) => item.entidadFederativa, orden: 7 },
      { encabezado: 'País', clave: (item: PLANTAS) => item.pais, orden: 8 },
      { encabezado: 'Teléfono', clave: (item: PLANTAS) => item.telefono, orden: 9 },
    ];
    expect(component.configuracionTabla).toEqual(EXPECTED_CONFIGUE);
  });

  it('should call loadPlantaComplementaria() and populate personaparas', () => {
    component.loadPlantaComplementaria();
    expect(component.personaparas).toEqual(MOCK_DATA);
  });
});
