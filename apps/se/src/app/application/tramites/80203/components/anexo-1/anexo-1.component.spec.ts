// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Anexo1Component } from './anexo-1.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';
import { NicoService } from '../../servicios/nico/nico.service';
import { ImmexRegistroQuery } from '../../estados/queries/tramite80203.query';
import { ImmexRegistroStore } from '../../estados/tramites/tramite80203.store';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('../../servicios/immex/permiso-immex-datos.service');
jest.mock('../../servicios/nico/nico.service');
jest.mock('../../estados/queries/tramite80203.query');
jest.mock('../../estados/tramites/tramite80203.store');

describe('Anexo1Component (Jest)', () => {
  let component: Anexo1Component;
  let fixture: ComponentFixture<Anexo1Component>;
  
  let permisoImmexDatosService: jest.Mocked<PermisoImmexDatosService>;
  let nicoService: jest.Mocked<NicoService>;
  let immexRegistroQuery: jest.Mocked<ImmexRegistroQuery>;
  let immexRegistroStore: jest.Mocked<ImmexRegistroStore>;

  beforeEach(async () => {
    permisoImmexDatosService = {
      getDatos: jest.fn().mockReturnValue(of({
        permisoImmexDatos: [],  
        fraccionDatos: [],
        nicoDatos: []
      })),
    } as unknown as jest.Mocked<PermisoImmexDatosService>;

    nicoService = {
      obtenerMenuDesplegable: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<NicoService>;

    immexRegistroQuery = {
      selectImmexRegistro$: of({
        immexRegistro: {
          candidadPorPeriodo: 0,
          capacidadPeriodo: 0,
          candiadAnual: 0,
          commodityNicoDescImportacion: '',
          permisoImmexDatos: [],
          fraccionDatos: [],
          nicoDatos: [],
        }
      }),
      select: jest.fn().mockReturnValue(of({})), 
    } as unknown as jest.Mocked<ImmexRegistroQuery>;

    immexRegistroStore = {
      update: jest.fn()
    } as unknown as jest.Mocked<ImmexRegistroStore>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, Anexo1Component], 
      providers: [
        { provide: PermisoImmexDatosService, useValue: permisoImmexDatosService },
        { provide: NicoService, useValue: nicoService },
        { provide: ImmexRegistroQuery, useValue: immexRegistroQuery },
        { provide: ImmexRegistroStore, useValue: immexRegistroStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    

    fixture = TestBed.createComponent(Anexo1Component);
    component = fixture.componentInstance;
  });

  // ✅ Add at least one test case
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
