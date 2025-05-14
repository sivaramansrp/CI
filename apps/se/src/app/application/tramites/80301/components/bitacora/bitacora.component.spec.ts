import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BitacoraComponent } from './bitacora.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of as observableOf, throwError } from 'rxjs';
import { CONFIGURACION_BITACORA_TABLA } from '../../constantes/modificacion.enum';
import { Bitacora } from '../../models/plantas-consulta.model';

describe('BitacoraComponent', () => {
  let fixture;
  let component: BitacoraComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [BitacoraComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BitacoraComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should execute #ngOnDestroy()', () => {
    component.destroyNotifier$ = {
      next: jest.fn(),
      unsubscribe: jest.fn()
    } as any;

    component.ngOnDestroy();

    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

  it('should initialize table configuration correctly', () => {
    expect(component.configuracionTabla).toBe(CONFIGURACION_BITACORA_TABLA);
  });

  it('should fetch bitacora data in ngOnInit', () => {
    const mockData: Bitacora[] = [{
      tipoModificion: 'mockTipo',
      fetchModificion: 'mockFetch',
      valoresAnteriores: 'mockValoresAnteriores',
      valoresNuevos: 'mockValoresNuevos'
    }];

    jest.spyOn(component.modificionService, 'obtenerBitacora').mockReturnValue(observableOf(mockData));

    component.ngOnInit();

    expect(component.datos).toEqual(mockData);
  });

  it('should handle errors when fetching bitacora data', () => {
    const toastrSpy = jest.spyOn(component.toastr, 'error');

    jest.spyOn(component.modificionService, 'obtenerBitacora').mockReturnValue(
      throwError(() => new Error('Simulated Error'))
    );

    component.ngOnInit();

    expect(toastrSpy).toHaveBeenCalledWith('Error al cargar los estados');
  });
});
