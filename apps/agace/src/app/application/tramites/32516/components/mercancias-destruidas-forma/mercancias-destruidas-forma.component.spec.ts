// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, Subject } from 'rxjs';

import { MercanciasDestruidasFormaComponent } from './mercancias-destruidas-forma.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CatalogosService } from '../../servicios/catalogo.service';

@Injectable()
class MockHttpClient {
  post() {}
}
@Injectable()
class MockRouter {
  navigate() {}
}

@Injectable()
class MockCatalogosService {
  obtenerUnidadDesplegable = jest.fn().mockReturnValue(
    observableOf([
      { id: 1, descripcion: 'Kilogramos' },
      { id: 2, descripcion: 'Litros' },
    ])
  );
}


describe('MercanciasDestruidasFormaComponent', () => {
  let component: MercanciasDestruidasFormaComponent;
  let fixture: ComponentFixture<MercanciasDestruidasFormaComponent>;
  let mockCatalogosService: any;

  beforeEach(() => {
    // Mock del servicio CatalogosService
    mockCatalogosService = {
      obtenerUnidadDesplegable: jest.fn().mockReturnValue(
        observableOf([
          { id: 1, descripcion: 'Kilogramos' },
          { id: 2, descripcion: 'Litros' },
        ])
      ),
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [MercanciasDestruidasFormaComponent, FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService }, // Proveer el servicio mock
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasDestruidasFormaComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a obtenerUnidadDesplegable en obtenerUnidadMedidaSelectList', () => {
    // Llamar al método
    component.obtenerUnidadMedidaSelectList();

    // Verificar que el método mock haya sido llamado con el argumento correcto
    expect(mockCatalogosService.obtenerUnidadDesplegable).toHaveBeenCalledWith('unidad-de-medida.json');

    // Verificar que la propiedad unidadMedida del componente se actualice con los datos mock
    expect(component.unidadMedida).toEqual([
      { id: 1, descripcion: 'Kilogramos' },
      { id: 2, descripcion: 'Litros' },
    ]);
  });

  it('debería manejar la limpieza en ngOnDestroy', () => {
    // Acceder a la propiedad privada unsubscribe$ usando notación de corchetes
  (component as any).destroyNotifier$ = new Subject<void>();
  jest.spyOn((component as any).destroyNotifier$, 'next');
  jest.spyOn((component as any).destroyNotifier$, 'complete');
  component.ngOnDestroy();
  expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
  expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
  });
});