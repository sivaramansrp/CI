import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModificarPartidaComponent } from './modificar-partida.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { of } from 'rxjs'; 

describe('ModificarPartidaComponent', () => {
  let componente: ModificarPartidaComponent;
  let fixture: ComponentFixture<ModificarPartidaComponent>;
  let routerMock: any;
  let tramite130109QueryMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
    };

    tramite130109QueryMock = {
      filaSeleccionada$: of({
        tbodyData: ['10', 'dummy', 'desc', 'itemDesc', 'dummy', '100'],
      }),
    };

    TestBed.configureTestingModule({
      imports: [ModificarPartidaComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Tramite130109Query, useValue: tramite130109QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPartidaComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debe inicializar el formulario con los controles necesarios', () => {
    expect(componente.form.contains('cantidad')).toBeTruthy();
    expect(componente.form.contains('valorPartidaUSD')).toBeTruthy();
    expect(componente.form.contains('descripcion')).toBeTruthy();
  });

  it('debería marcar los controles como no válidos cuando estén vacíos', () => {
    const controlCantidad = componente.form.get('cantidad');
    controlCantidad?.setValue('');
    expect(controlCantidad?.valid).toBeFalsy();

    const controlDescripcion = componente.form.get('descripcion');
    controlDescripcion?.setValue('');
    expect(controlDescripcion?.valid).toBeFalsy();
  });

  it('debe validar el método "esInvalido" para el control del formulario no válido', () => {
    const nombreControl = 'cantidad';
    const control = componente.form.get(nombreControl);
    control?.setValue('');
    control?.markAsTouched();

    expect(componente.esInvalido(nombreControl)).toBe(true);
  });

  it('debería asignar los valores al formulario en loadSelectedRow', () => {
    const filaDatos = {
      tbodyData: ['10', 'dummy', 'desc', 'itemDesc', 'dummy', '100'],
    };

    tramite130109QueryMock.filaSeleccionada$ = of(filaDatos);
    componente.loadSelectedRow();

    expect(componente.form.get('cantidad')?.value).toBe('10');
    expect(componente.form.get('descripcion')?.value).toBe('itemDesc');
    expect(componente.form.get('valorPartidaUSD')?.value).toBe('100');
  });

  it('debe navegar a /se/importacion al enviar un formulario válido', () => {
    componente.form.setValue({
      cantidad: '10',
      valorPartidaUSD: '100',
      descripcion: 'descripción',
    });
  });

  it('debe navegar a la página anterior con los parámetros de consulta correctos en navegar', () => {
    componente.navegar();
    expect(routerMock.navigate).toHaveBeenCalledWith(
      ['/pago/importacion/vehiculos-usados-adaptados'],
      { queryParams: { indice: 2 } }
    );
  });
});
