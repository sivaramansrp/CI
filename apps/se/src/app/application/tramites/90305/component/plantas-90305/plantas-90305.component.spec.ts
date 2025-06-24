import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plantas90305Component } from './plantas-90305.component';
import { of } from 'rxjs';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service';
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

it('should have the correct table configuration headers and order', () => {
  const EXPECTED_HEADERS = [
    'Calle',
    'Número exterior',
    'Número interior',
    'Código postal',
    'Colonia',
    'Municipio o alcaldía',
    'Entidad Federativa',
    'País',
    'Teléfono',
  ];

  const encabezados = component.configuracionTabla.map(c => c.encabezado);
  const ordenes = component.configuracionTabla.map(c => c.orden);

  expect(encabezados).toEqual(EXPECTED_HEADERS);
  expect(ordenes).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});


  it('should call loadPlantaComplementaria() and populate personaparas', () => {
    component.loadPlantaComplementaria();
    expect(component.personaparas).toEqual(MOCK_DATA);
  });
});
