import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { Tramite240107Store } from '../../estados/tramite240107Store.store';
import { ActivatedRoute } from '@angular/router';
import { Injectable, Directive, Input, PipeTransform, Pipe } from '@angular/core';

@Injectable()
class MockTramite240107Store {
  updateMercanciaTablaDatos = jest.fn();
}

@Injectable()
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: jest.fn().mockReturnValue('mockParamValue'),
    },
  };
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class MockPhoneNumberPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class MockSafeHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('DatosMercanciaContenedoraComponent', () => {
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;
  let component: DatosMercanciaContenedoraComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosMercanciaContenedoraComponent],
      declarations: [
        MockTranslatePipe,
        MockPhoneNumberPipe,
        MockSafeHtmlPipe,
        MyCustomDirective,
      ],
      providers: [
        { provide: Tramite240107Store, useClass: MockTramite240107Store },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateMercanciaTablaDatos when updateMercanciaDetalle is invoked', () => {
    const mockEvent = [{ id: 1, name: 'Test Mercancia' }];
    const tramiteStore = TestBed.inject(Tramite240107Store);
    const mockMercanciaDetalle = [
      {
      id: 1,
      name: 'Test Mercancia',
      fraccionArancelaria: '12345678',
      descripcionFraccion: 'Test Description',
      unidadMedidaTarifa: 'kg',
      umc: 'unit',
      cantidad: 10,
      valorUnitario: 100,
      valorTotal: 1000,
      paisOrigen: 'MX',
      cantidadUMT: 5,
      valorComercial: 500,
      tipoMoneda: 'MXN',
      descripcion: 'Detailed description',
      },
    ];
    component.updateMercanciaDetalle(mockMercanciaDetalle);
    expect(tramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(mockEvent);
  });
});