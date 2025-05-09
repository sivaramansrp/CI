import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf } from 'rxjs';

import { TipoDeAvisoComponent } from './tipo-de-aviso.component';
import { FormBuilder } from '@angular/forms';
import { DestruccionStore } from '../../estados/Tramite32509.store';
import { DestruccionQuery } from '../../estados/Tramite32509.query';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';

@Injectable()
class MockDestruccionStore {
  metodoNombre = jest.fn();
  update = jest.fn(); // Assuming your component calls an 'update' method
}

@Injectable()
class MockDestruccionQuery {
  selectDestruccion$ = observableOf({});
}

@Injectable()
class MockSeccionLibStore {}

@Injectable()
class MockSeccionLibQuery {
  selectSeccionState$ = observableOf({});
}

describe('TipoDeAvisoComponent', () => {
  let fixture: ComponentFixture<TipoDeAvisoComponent>;
  let component: TipoDeAvisoComponent;
  let formBuilder: FormBuilder;
  let destruccionStore: MockDestruccionStore;
  let destruccionQuery: MockDestruccionQuery;
  let seccionLibQuery: MockSeccionLibQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        TipoDeAvisoComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: DestruccionStore, useClass: MockDestruccionStore },
        { provide: DestruccionQuery, useClass: MockDestruccionQuery },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore },
        { provide: SeccionLibQuery, useClass: MockSeccionLibQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDeAvisoComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    destruccionStore = TestBed.inject(DestruccionStore) as unknown as MockDestruccionStore;
    destruccionQuery = TestBed.inject(DestruccionQuery) as MockDestruccionQuery;
    seccionLibQuery = TestBed.inject(SeccionLibQuery) as MockSeccionLibQuery;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.avisoForm instanceof FormGroup).toBeTruthy();
  });

  it('should call store.update with form values when setValoresStore is called', () => {
    component.avisoForm = formBuilder.group({
      tipoDeAviso: ['testValue'],
      nombre: ['testName'],
      rfc: ['testRFC'],
      // Add other form controls as needed
    });
  
    const mockElement = {
      getAttribute: (name: string) => name,
      querySelector: (selector: string) => ({ value: component.avisoForm.get(selector.substring(1))?.value || '' })
    } as any;
  
    const mockEvent = 'nombre'; // Pass a string instead of an empty object
    const mockFormDirective = 'update'; // Mock the directive or method name as a string
  
    component.setValoresStore(mockElement, mockEvent, mockFormDirective);
  
    expect(destruccionStore.update).toHaveBeenCalledWith({
      tipoDeAviso: 'testValue',
      nombre: 'testName',
      rfc: 'testRFC',
      // Add expectations for other form values
    });
    expect(destruccionStore.metodoNombre).not.toHaveBeenCalled(); // Ensure the old expectation is removed
  });

  // Keep other relevant tests (cambioFecha, avisoValorRadio, etc.)
  // ...
});