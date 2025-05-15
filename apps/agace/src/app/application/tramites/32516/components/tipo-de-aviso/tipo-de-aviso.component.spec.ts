import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of as observableOf, Subject } from 'rxjs';

import { TipoDeAvisoComponent } from './tipo-de-aviso.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CatalogosService } from '../../servicios/catalogo.service';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
class MockHttpClient {
  post() {}
}

@Injectable()
class MockCatalogosService {
  obtenerMenuDesplegable = jest.fn().mockReturnValue(
    observableOf([
      { id: 1, descripcion: 'Opción 1' },
      { id: 2, descripcion: 'Opción 2' },
    ])
  );
  obtenerLevantarActaDesplegable = jest.fn().mockReturnValue(
    observableOf([
      { id: 1, descripcion: 'Acta 1' },
      { id: 2, descripcion: 'Acta 2' },
    ])
  );
}

@Injectable()
class MockHechosTablaServicios {
  obtenerDatos = jest.fn().mockReturnValue(
    observableOf([
      { id: 1, descripcion: 'Dato 1' },
      { id: 2, descripcion: 'Dato 2' },
    ])
  );
}

@Injectable()
class MockRouter {
  navigate = jest.fn();
}

describe('TipoDeAvisoComponent', () => {
  let component: TipoDeAvisoComponent;
  let fixture: ComponentFixture<TipoDeAvisoComponent>;
  let mockCatalogosService: MockCatalogosService;
  let mockHechosTablaServicios: MockHechosTablaServicios;

  beforeEach(() => {
    mockCatalogosService = new MockCatalogosService();
    mockHechosTablaServicios = new MockHechosTablaServicios();

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TipoDeAvisoComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: HechosTablaServicios, useValue: mockHechosTablaServicios },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: 'url', params: {}, queryParams: {}, data: {} },
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDeAvisoComponent);
    component = fixture.componentInstance;
  });

  it('debería manejar la validación condicional', () => {
    // Accediendo a la propiedad privada 'fb' usando notación de corchetes
    const fb = (component as any).fb;

    component.solicitudForm = fb.group({
      cantidadBienes: ['1'],
      descripcionGenerica3: [''],
    });

    const cantidadBienesControl = component.solicitudForm.get('cantidadBienes');
    const descripcionGenerica3Control = component.solicitudForm.get('descripcionGenerica3');

    jest.spyOn(descripcionGenerica3Control!, 'setValidators');
    jest.spyOn(descripcionGenerica3Control!, 'clearValidators');
    jest.spyOn(descripcionGenerica3Control!, 'updateValueAndValidity');

    // Accediendo al método privado usando notación de corchetes
    (component as any).handleConditionalValidation();

    cantidadBienesControl?.setValue('1');
    expect(descripcionGenerica3Control?.setValidators).toHaveBeenCalledWith([Validators.required]);
    expect(descripcionGenerica3Control?.updateValueAndValidity).toHaveBeenCalled();

    cantidadBienesControl?.setValue('0');
    expect(descripcionGenerica3Control?.clearValidators).toHaveBeenCalled();
    expect(descripcionGenerica3Control?.updateValueAndValidity).toHaveBeenCalled();
  });
});