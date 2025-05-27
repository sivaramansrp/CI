import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FabricanteDatosComponent } from './fabricante-datos.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { ImportacionRetornoSanitarioService } from '../../service/importacion-retorno-sanitario.service';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';

// Mocking child components since they might not be standalone or needed fully
import { Component } from '@angular/core';

@Component({ selector: 'app-titulo', template: '' })
class MockTituloComponent {}

@Component({ selector: 'app-input-radio', template: '' })
class MockInputRadioComponent {}

describe('FabricanteDatosComponent', () => {
  let component: FabricanteDatosComponent;
  let fixture: ComponentFixture<FabricanteDatosComponent>;

  // Mocks
  const mockDatosSolicitudService = {
    obtenerListaPaises: () => of([]),
  };

  const mockImportacionRetornoSanitarioService = {
    obtenerOstro: () => of({}),
  };

  const mockTramiteQuery = {
    getFabricanteTablaDatos$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FabricanteDatosComponent, // ✅ standalone component imported here
      ],
      declarations: [
        MockTituloComponent,
        MockInputRadioComponent,
      ],
      providers: [
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: ImportacionRetornoSanitarioService, useValue: mockImportacionRetornoSanitarioService },
        { provide: Tramite260103Query, useValue: mockTramiteQuery },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FabricanteDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.agregarDatosForm).toBeDefined();
    expect(component.agregarDatosForm.get('nombres')).not.toBeNull();
  });
});
