import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

describe('ManifiestoComponent', () => {
  let componente: ManifiestoComponent;
  let fixture: ComponentFixture<ManifiestoComponent>;
  let tiendaMock: jest.Mocked<Tramite630104Store>;
  let consultaMock: jest.Mocked<Tramite630104Query>;

  beforeEach(async () => {
    tiendaMock = {
      setTramite630104State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630104Store>;

    consultaMock = {
      selectTramite630104State$: of({
        declaracion: 'Declaración de prueba',
      }) as Subject<any>,
    } as unknown as jest.Mocked<Tramite630104Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite630104Store, useValue: tiendaMock },
        { provide: Tramite630104Query, useValue: consultaMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifiestoComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario con los valores por defecto', () => {
    expect(componente.manifiestoFormulario.value).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería actualizar la declaración en el formulario y en la tienda al llamar setValorStore', () => {
    const nuevoValor = 'Nueva declaración';
    componente.manifiestoFormulario.patchValue({ declaracion: nuevoValor });

    componente.setValorStore(componente.manifiestoFormulario, 'declaracion');

    expect(tiendaMock.setTramite630104State).toHaveBeenCalledWith('declaracion', nuevoValor);
  });

  it('debería obtener el estado desde la tienda y establecer estadoSeleccionado', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const spyDestroyed = jest.spyOn(componente['destroyed$'], 'next');
    const spyComplete = jest.spyOn(componente['destroyed$'], 'complete');

    componente.ngOnDestroy();

    expect(spyDestroyed).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
