import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of,  } from 'rxjs';
import { PerfilesComponent } from './perfiles.component';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';

describe('PerfilesComponent', () => {
  let component: PerfilesComponent;
  let store: Solicitud32605Store;
  let query: Solicitud32605Query;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PerfilesComponent,ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: Solicitud32605Store,
          useValue: {
            actualizarEstado: jest.fn(),
          },
        },
        {
          provide: Solicitud32605Query,
          useValue: {
            selectSolicitud$: of({
              domicilio: 'Test Domicilio',
              antiguedad: '5 años',
              productos: 'Test Productos',
              embarquesExp: '10',
              embarquesImp: '15',
              empleados: '50',
              superficie: '1000 m2',
              nombre: 'Test Nombre',
              categoria: 'A',
              vigencia: '2025',
            }),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PerfilesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Solicitud32605Store);
    query = TestBed.inject(Solicitud32605Query);
    // Asigna el mock del store a la propiedad utilizada en el componente si es necesario
    (component as any).tramite32605Store = store;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario en ngOnInit', () => {
    component.ngOnInit();
    expect(component.profileForm).toBeDefined();
  });

  it('debe alternar el valor de mostrarContenido', () => {
    expect(component.mostrarContenido).toBe(false);
    component.alternarContenido();
    expect(component.mostrarContenido).toBe(true);
  });

  it('debe alternar el valor de mostrarSeguridad', () => {
    expect(component.mostrarSeguridad).toBe(false);
    component.alternarSeguridad();
    expect(component.mostrarSeguridad).toBe(true);
  });

  it('debe actualizar antiguedad en el store', () => {
    component.profileForm.get('antiguedad')?.setValue('antiguedad');
    component.actualizarAntiguedad();
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"antiguedad": "antiguedad"}});
  });

  it('debe actualizar productos en el store', () => {
    component.profileForm.get('productos')?.setValue('New Product');
    component.actualizarProductos();
    expect(store.actualizarEstado).toHaveBeenCalledWith( {"perfiles": {"productos": "New Product"}});
  });

  it('debe actualizar embarquesExp en el store', () => {
    component.profileForm.get('embarquesExp')?.setValue('20');
    component.actualizarEmbarquesExp();
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"embarquesExp": "20"}});
  });

  it('debe actualizar embarquesImp en el store', () => {
    component.profileForm.get('embarquesImp')?.setValue('25');
    component.actualizarEmbarquesImp();
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"embarquesImp": "25"}});
  });

  it('debe actualizar empleados en el store', () => {
    component.profileForm.get('empleados')?.setValue('100');
    component.actualizarEmpleados();
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"empleados": "100"}}
);
  });

  it('debe actualizar superficie en el store', () => {
    component.profileForm.get('superficie')?.setValue('2000 m2');
    component.actualizarSuperficie();
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"superficie": "2000 m2"}});
  });

  it('debe establecer vigencia en el store', () => {
    component.seleccionarVigenciaUno('2026');
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"vigencia": "2026"}});
  });

  it('debe establecer vigenciaDos en el store', () => {
    component.seleccionarVigenciaDos('2027');
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"vigencia2": "2027"}});
  });

  it('debe establecer vigenciaTres en el store', () => {
    component.seleccionarVigenciaTres('2028');
    expect(store.actualizarEstado).toHaveBeenCalledWith({"perfiles": {"vigencia3": "2028"}});
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});