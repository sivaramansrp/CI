import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { TransporteComponent } from './transporte.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';

// Mock Services
@Injectable()
class MockExportaccionAcuicolaService {
  getDatos = jest.fn().mockReturnValue(observableOf({}));
}

@Injectable()
class MockTramite220403Query {
  setPagoDerechos$ = observableOf({});
}

@Injectable()
class MockTramite220403Store {
  setTransporte = jest.fn();
}

describe('TransporteComponent', () => {
  let fixture: ComponentFixture<TransporteComponent>;
  let component: TransporteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [TransporteComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  

  it('should run #crearFormulario()', () => {
    const fbSpy = jest.spyOn(TestBed.inject(FormBuilder), 'group');
  
    component.crearFormulario();
  
    expect(fbSpy).toHaveBeenCalled(); // Ensure FormBuilder.group() was called
  });

  it('should run #getRadioData()', () => {
    // Get the injected service and create a spy on 'getDatos'
    const mockExportService = TestBed.inject(ExportaccionAcuicolaService);
    jest.spyOn(mockExportService, 'getDatos').mockReturnValue(observableOf([]));
    // Provide valid arguments (assuming the first parameter should be a string)
    const mockParametro1 = 'someValidString';  // Adjust based on actual method requirement
    const mockParametro2 = {};  // Adjust as needed
  
    // Call the function
    const mockCallback = jest.fn(); // Create a Jest mock function

    component.getRadioData(mockParametro1, mockCallback);

    expect(mockCallback).toHaveBeenCalled();
      
    // Ensure 'getDatos' was called
    expect(mockExportService.getDatos).toHaveBeenCalled();
  });
  

  it('should run #obtenerValoresCatalogo()', () => {
    // Mock dependencies
    (component as any).catalogosServicios = {
        getCatalogo: jest.fn().mockReturnValue(observableOf({}))
    };

    (component as any).configuracion = {
        indiceGrupo: {
            menu: {
                indiceMenu: {
                    props: {
                        catalogos: {}
                    }
                }
            }
        }
    };

    // Use a valid number instead of an empty object
    const mockNumero: number = 123; // First parameter should be a number
    const mockParam1: number = 123;// Adjust based on actual function signature
    const mockParam2: string = 'test-param';  // Adjust type if needed

    // Call the method
    component.obtenerValoresCatalogo(mockNumero, mockParam1, mockParam2);

    // Expect the catalog service method to be called
    expect((component as any).catalogosServicios.getCatalogo).toHaveBeenCalled();
});




  it('should run #onSubmit()', () => {
    // Mock tramite220403store
    const mockTramiteStore = {
      setTransporte: jest.fn()
    };
    (component as any).tramite220403store = mockTramiteStore;

    // Mock formulario with the expected structure
    (component as any).formulario = { value: { transporte: {} } };

    // Call the function
    component.onSubmit();

    // Expectation: setTransporte should have been called
    expect(mockTramiteStore.setTransporte).toHaveBeenCalled();
});


});
