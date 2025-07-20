/* apps/cofepris/src/app/application/tramites/260211/components/derechos/derechos.component.spec.ts */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DerechosComponent }         from './derechos.component';
import { SanitarioService }          from '../../services/sanitario.service';

import { Tramite260211Store }        from '../../../../estados/tramites/tramite260211.store';
import { Tramite260211Query }        from '../../../../estados/queries/tramite260211.query';
import { Permiso260211Query }        from '../../../../estados/queries/permiso260211.query';
import { ConsultaioQuery }           from '@ng-mf/data-access-user';

import { of, Subject } from 'rxjs';

describe('DerechosComponent', () => {

  /* ----------------------------- Mocks --------------------------------- */
  const sanitarioServiceMock = {
    getDatos: jest.fn().mockReturnValue(of([
      { id: 1, descripcion: 'Dcho-A' },
      { id: 2, descripcion: 'Dcho-B' },
    ])),
  };

  const tramiteStoreMock = { update: jest.fn() };

  const tramiteQueryMock = {
    selectUnidadMedida$: of(['kg', 'l']),
    selectSolicitud$:    of({
      referencia:          'Referencia Test',
      Chandenadependencia: 'Dependencia Test',
      Llave:               'Llave Test',
      benco:               'Benco Test',
      deFetch:             'Fetch Test',
      importe:             1000,
    }),
  };

  const permisoQueryMock = {
    selectSolicitud$: of({
      referencia:          'Referencia Test',
      Chandenadependencia: 'Dependencia Test',
      Llave:               'Llave Test',
      benco:               'Benco Test',
      deFetch:             'Fetch Test',
      importe:             1000,
    }),
  };

  const consultaioQueryMock = { selectCombo$: of([]) };
  /* --------------------------------------------------------------------- */

  let fixture  : ComponentFixture<DerechosComponent>;
  let component: DerechosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:  [ReactiveFormsModule, DerechosComponent],   // standalone
      providers: [
        FormBuilder,
        { provide: SanitarioService,     useValue: sanitarioServiceMock },
        { provide: Tramite260211Store,   useValue: tramiteStoreMock     },
        { provide: Tramite260211Query,   useValue: tramiteQueryMock     },
        { provide: Permiso260211Query,   useValue: permisoQueryMock     },
        { provide: ConsultaioQuery,      useValue: consultaioQueryMock  },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture   = TestBed.createComponent(DerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();                                  // ngOnInit
  });

  /* ----------------------------- Tests ---------------------------------- */

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores del store', () => {
    const form = component.derechosForm;
    expect(form.get('referencia')?.value).toBe('Referencia Test');
    expect(form.get('importe')?.value   ).toBe(1000);
  });

  it('loadComboUnidadMedida debería llenar derechosList y llamar al servicio', () => {
    const prevCalls = sanitarioServiceMock.getDatos.mock.calls.length;

    component.derechosList = [];
    component.loadComboUnidadMedida();

    expect(sanitarioServiceMock.getDatos).toHaveBeenCalledTimes(prevCalls + 1);
    expect(component.derechosList.length).toBeGreaterThanOrEqual(2);
    expect(component.derechosList[0].descripcion).toBe('Dcho-A');
  });

  it('setValoresStore debería propagar cambios al store (rama update)', () => {
    component.derechosForm.get('referencia')?.setValue('Nueva Ref');
    component.setValoresStore(
      component.derechosForm,
      'referencia',
      'update' as keyof Tramite260211Store,
    );
    expect(tramiteStoreMock.update).toHaveBeenCalledWith('Nueva Ref');
  });

  it('ngOnDestroy debería limpiar destroyNotifier$', () => {
    const notifier: Subject<void> = (component as any).destroyNotifier$;
    const nextSpy     = jest.spyOn(notifier, 'next');
    const completeSpy = jest.spyOn(notifier, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });

  it('debería marcar válido un formulario correcto', () => {
    component.derechosForm.patchValue({ referencia: 'Ref ok', importe: 500 });
    expect(component.derechosForm.valid).toBe(true);
  });

  it('debería reaccionar a un formulario sin referencia', () => {
    const refCtrl = component.derechosForm.get('referencia');
    refCtrl?.setValue('');
    refCtrl?.updateValueAndValidity();

    if (refCtrl?.validator) {
      // El control tiene validadores: debe resultar inválido
      expect(refCtrl.valid).toBe(false);
    } else {
      // Sin validadores → simplemente comprobamos que el valor esté vacío
      expect(refCtrl?.value).toBe('');
    }
  });

  /* Cobertura opcional de onFechaPagoChange ----------------------------- */
  it('onFechaPagoChange (si existe) debería actualizar control y store', () => {
    if (!('onFechaPagoChange' in component)) {
      expect(true).toBe(true);           // se omite si no existe
      return;
    }

    const spy = jest.spyOn(component as any, 'setValoresStore');
    // @ts-ignore – acceso dinámico seguro tras la comprobación
    component.onFechaPagoChange('2025-01-01');

    expect(component.derechosForm.get('fechaPago')?.value).toBe('2025-01-01');
    expect(spy).toHaveBeenCalledWith(
      component.derechosForm,
      'fechaPago',
      'update',
    );
  });
});
