import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MercanciaComponent } from './mercancia.component';

describe('MercanciaComponent', () => {
  let component: MercanciaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MercanciaComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MercanciaComponent);
    component = fixture.componentInstance;
    if (component.ngOnInit) {
      component.ngOnInit();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.mercanciaForm.value;
    expect(formValues).toEqual({
      estado: 'Nuevo',
      cantidad: 1,
      formapartadepatrimonia: 'SI',
      descripcion: 'asd',
      valor: 1,
      unidadmedida: 'Amperiso',
      fraccionarancelaria: 123456,
      nico: 0,
      marca: 'adsfsdg',
      modelo: 'rewte',
      numerodeserie: 134,
      moneda: 'fronca de africa ',
      fin: 'seleccion van valor',
      especifique: 'textarea',
    });
  });

  it('should reset the form values', () => {
    component.mercanciaForm.setValue({
      estado: 'Test',
      cantidad: 10,
      formapartadepatrimonia: 'NO',
      descripcion: 'Test description',
      valor: 100,
      unidadmedida: 'Test unit',
      fraccionarancelaria: 654321,
      nico: 1,
      marca: 'Test brand',
      modelo: 'Test model',
      numerodeserie: 999,
      moneda: 'Test currency',
      fin: 'Test fin',
      especifique: 'Test textarea',
    });

    component.mercanciaForm.reset();
    const formValues = component.mercanciaForm.value;
    expect(formValues).toEqual({
      estado: null,
      cantidad: null,
      formapartadepatrimonia: null,
      descripcion: null,
      valor: null,
      unidadmedida: null,
      fraccionarancelaria: null,
      nico: null,
      marca: null,
      modelo: null,
      numerodeserie: null,
      moneda: null,
      fin: null,
      especifique: null,
    });
  });
});