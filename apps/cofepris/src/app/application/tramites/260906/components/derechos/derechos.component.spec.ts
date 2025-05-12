import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DerechosComponent } from './derechos.component';
import { SanitarioService } from '../../services/sanitario.service';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { Permiso260906Query } from '../../../../estados/queries/permiso260906.query';
import { of, Subject } from 'rxjs';

describe('DerechosComponent', () => {
  let component: DerechosComponent;
  let sanitarioServiceMock: any;
  let sanitarioStoreMock: any;
  let permisoQueryMock: any;

  beforeEach(() => {
    sanitarioServiceMock = {
      getDatos: jest.fn().mockReturnValue(of([])),
    };

    sanitarioStoreMock = {
      update: jest.fn(),
    };

    permisoQueryMock = {
      selectSolicitud$: of({
        referencia: 'Referencia Test',
        Chandenadependencia: 'Dependencia Test',
        Llave: 'Llave Test',
        benco: 'Benco Test',
        deFetch: 'Fetch Test',
        importe: 1000,
      }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SanitarioService, useValue: sanitarioServiceMock },
        { provide: Sanitario260906Store, useValue: sanitarioStoreMock },
        { provide: Permiso260906Query, useValue: permisoQueryMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new DerechosComponent(fb, sanitarioServiceMock, sanitarioStoreMock, permisoQueryMock);
    component.ngOnInit(); // Asegurarse de inicializar el componente
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario derechosForm en ngOnInit', () => {
    expect(component.derechosForm).toBeDefined();
    expect(component.derechosForm.controls['referencia'].value).toBe('Referencia Test');
    expect(component.derechosForm.controls['importe'].value).toBe(1000);
  });

  it('debería cargar la lista de derechos en loadComboUnidadMedida', () => {
    component.loadComboUnidadMedida();
    expect(sanitarioServiceMock.getDatos).toHaveBeenCalled();
    expect(component.derechosList).toEqual([]);
  });

  it('debería actualizar el valor en el store cuando se llama a setValoresStore', () => {
    component.derechosForm.controls['referencia'].setValue('Nueva Referencia');
    component.setValoresStore(component.derechosForm, 'referencia', 'update');
    expect(sanitarioStoreMock.update).toHaveBeenCalledWith('Nueva Referencia');
  });

  it('debería limpiar los observables en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalledTimes(1);
    expect(destroyNotifierSpy).toHaveBeenCalledTimes(1);
  });

  it('debería manejar un formulario válido', () => {
    component.derechosForm.controls['referencia'].setValue('Referencia Válida');
    component.derechosForm.controls['importe'].setValue(500);
    expect(component.derechosForm.valid).toBe(true);
  });

  it('debería manejar un formulario inválido', () => {
    component.derechosForm.controls['referencia'].setValue('');
    expect(component.derechosForm.valid).toBe(false);
  });
});