import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { of } from 'rxjs';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  const mockImportacionState = { some: 'state' };
  const tramite130103QueryMock = {
    selectImportacion$: of(mockImportacionState),
  };
  let storeMock: any;
  beforeEach(async () => {
    storeMock = {
      setDynamicFieldValue: jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [RepresentacionFederalComponent],
      providers: [
        { provide: Tramite130103Query, useValue: tramite130103QueryMock },
        { provide: Tramite130103Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer importacionstate desde selectImportacion$', () => {
    component.ngOnInit();
    expect(component.importacionstate).toEqual(mockImportacionState);
  });

  it('debería llamar a setDynamicFieldValue con object.id si valor es un objeto con id', () => {
    const event = { campo: 'entidad', valor: 'CDMX' };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('entidad', 'CDMX');
  });

  it('debería llamar a setDynamicFieldValue con valor primitivo si valor no es un objeto', () => {
    const event = { campo: 'nombre', valor: 'Juan' };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('nombre', 'Juan');
  });

  it('debería llamar a setDynamicFieldValue con objeto completo si valor es un objeto sin id', () => {
    const event = { campo: 'custom', valor: 'sin ID' };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('custom', 'sin ID');
  });

  it('debería no lanzar error cuando event.valor es null', () => {
    const event = { campo: 'otro', valor: null };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('otro', null);
  });

  it('no debería lanzar error cuando event es undefined o null', () => {
    expect(() => component.establecerCambioDeValor(null as any)).not.toThrow();
    expect(() => component.establecerCambioDeValor(undefined as any)).not.toThrow();
  });
});
