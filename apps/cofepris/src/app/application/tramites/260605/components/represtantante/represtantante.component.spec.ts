import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReprestantanteComponent } from './represtantante.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { of } from 'rxjs';

describe('ReprestantanteComponent', () => {
  let component: ReprestantanteComponent;
  let fixture: ComponentFixture<ReprestantanteComponent>;
  let store: jest.Mocked<Tramite260605Store>;
  let query: jest.Mocked<Tramite260605Query>;

  beforeEach(async () => {
    store = {
      setRfc: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    } as unknown as jest.Mocked<Tramite260605Store>;

    query = {
      selectSolicitud$: of({
        rfc: 'RFC123',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith'
      }),
      getValue: jest.fn().mockReturnValue({
        rfc: 'RFC123',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith'
      })
    } as unknown as jest.Mocked<Tramite260605Query>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ReprestantanteComponent, // Importar el componente independiente
        TituloComponent,
        AlertComponent
      ],
      providers: [
        FormBuilder,
        { provide: Tramite260605Store, useValue: store },
        { provide: Tramite260605Query, useValue: query }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReprestantanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con datos del store', () => {
    expect(component.represtantante).toBeDefined();
    expect(component.represtantante.get('rfc')?.value).toBe('RFC123');
    expect(component.represtantante.get('nombre')?.value).toBe('John');
    expect(component.represtantante.get('apellidoPaterno')?.value).toBe('Doe');
    expect(component.represtantante.get('apellidoMaterno')?.value).toBe('Smith');
  });

  it('debería llamar a setValoresStore con los argumentos correctos', () => {
    component.setValoresStore(component.represtantante, 'rfc', 'setRfc');
    component.setValoresStore(component.represtantante, 'nombre', 'setNombre');
    component.setValoresStore(component.represtantante, 'apellidoPaterno', 'setApellidoPaterno');
    component.setValoresStore(component.represtantante, 'apellidoMaterno', 'setApellidoMaterno');

    expect(store.setRfc).toHaveBeenCalledWith('RFC123');
    expect(store.setNombre).toHaveBeenCalledWith('John');
    expect(store.setApellidoPaterno).toHaveBeenCalledWith('Doe');
    expect(store.setApellidoMaterno).toHaveBeenCalledWith('Smith');
  });

  it('debería destruir el notifier en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});