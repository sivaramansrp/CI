import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMiembroDeLaEmpresaComponent } from './agregar-miembro-de-la-empresa.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';

describe('AgregarMiembroDeLaEmpresaComponent', () => {
  let component: AgregarMiembroDeLaEmpresaComponent;
  let fixture: ComponentFixture<AgregarMiembroDeLaEmpresaComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;
  let miembrodelaempresaTable: any[];

  beforeEach(async () => {
    mockStore = {
      agregarMiembrodelaempresaTable: jest.fn(),
      eliminarMiembrodelaempresaTable: jest.fn(),
      setTipoDePersonaMiembro: jest.fn(),
      setEnsucaracterde: jest.fn(),
      setObligadoaTributarenMexico: jest.fn(),
      setNacionalidad: jest.fn(),
      setSquemaIntegral: jest.fn(),
      setSidoModificadas: jest.fn(),
      setRfc: jest.fn(),
      setNombreMiembro: jest.fn(),
      setApellidoPaternoMiembro: jest.fn(),
      setApellidoMaternoMiembro: jest.fn(),
      setNombreDeLaEmpresaMiembro: jest.fn()
    };
    mockQuery = {
      selectSolicitud$: of({
        miembrosSeleccionados: [],
        ensucaracterde: '',
        rfc: '',
        obligadoaTributarenMexico: '',
        nacionalidad: '',
        registroFederaldeContribuyentes: '',
        nombreCompleto: '',
        tipoDePersonaMiembro: '',
        nombreMiembro: '',
        apellidoPaternoMiembro: '',
        apellidoMaternoMiembro: '',
        nombreDeLaEmpresaMiembro: '',
        squemaIntegral: '',
        sidoModificadas: ''
      })
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    miembrodelaempresaTable = [{ id: 1, nombre: 'Test Miembro' }];

    await TestBed.configureTestingModule({
      imports: [AgregarMiembroDeLaEmpresaComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite31601Store, useValue: mockStore },
        { provide: Tramite31601Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarMiembroDeLaEmpresaComponent);
    component = fixture.componentInstance;

    // Mock modal instance and element
    component.AgregarMOdel = { nativeElement: document.createElement('div') } as ElementRef;
    component.AgregarModelInstance = {
      show: jest.fn(),
      hide: jest.fn(),
      toggle: jest.fn(),
      handleUpdate: jest.fn(),
      dispose: jest.fn()
    };

    (component as any).miembrodelaempresaTable = miembrodelaempresaTable;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and state', () => {
    expect(component.agregarMiembroDeLaEmpresaFrom).toBeDefined();
    expect(component.checkBoxesForm).toBeDefined();
    expect(component.solicitudState).toBeDefined();
  });

  it('should set esFormularioSoloLectura from consultaioQuery', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('should update miembrosSeleccionados on obtenerMiembroSeleccionadas', () => {
    const miembros = [{ id: 1 }];
    component.obtenerMiembroSeleccionadas(miembros as any);
    expect(component.miembrosSeleccionados).toEqual(miembros as any);
  });

  it('should set value in store on setValoresStore', () => {
    component.agregarMiembroDeLaEmpresaFrom.get('tipoDePersonaMiembro')?.setValue('física');
    component.setValoresStore(component.agregarMiembroDeLaEmpresaFrom, 'tipoDePersonaMiembro', 'setTipoDePersonaMiembro');
    expect(mockStore.setTipoDePersonaMiembro).toHaveBeenCalled();
  });

  it('should update pagination on onPageChange', () => {
    jest.spyOn(component, 'updatePagination');
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.updatePagination).toHaveBeenCalled();
  });

  it('should update itemsPerPage and pagination on onItemsPerPageChange', () => {
    jest.spyOn(component, 'updatePagination');
    component.onItemsPerPageChange(10);
    expect(component.itemsPerPage).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(component.updatePagination).toHaveBeenCalled();
  });

  it('should open modal and reset form on openAgregarModal', () => {
    jest.spyOn(component.agregarMiembroDeLaEmpresaFrom, 'reset');
    component.openAgregarModal();
    expect(component.AgregarModelInstance.show).toHaveBeenCalled();
    expect(component.agregarMiembroDeLaEmpresaFrom.reset).toHaveBeenCalled();
  });

  it('should close modal on closeAgregarModal', () => {
    component.closeAgregarModal();
    expect(component.AgregarModelInstance.hide).toHaveBeenCalled();
  });

  it('should show modal and set form value on modificarModal if miembrosSeleccionados exists', () => {
    component.miembrosSeleccionados = [{ id: 1, nombreMiembro: 'Test' }] as any;
    jest.spyOn(component.agregarMiembroDeLaEmpresaFrom, 'setValue');
    component.modificarModal();
    expect(component.agregarMiembroDeLaEmpresaFrom.setValue).toHaveBeenCalledWith(component.miembrosSeleccionados[0]);
    expect(component.AgregarModelInstance.show).toHaveBeenCalled();
  });

  it('should show alert if modificarModal called with no seleccion', () => {
    component.miembrosSeleccionados = [];
    component.modificarModal();
    expect(component.alertaNotificacion?.mensaje).toContain('Seleccione un registro');
  });

  it('should show alert if eliminarMiembro called with no seleccion', () => {
    component.miembrosSeleccionados = [];
    component.eliminarMiembro();
    expect(component.alertaNotificacion?.mensaje).toContain('Seleccione un registro');
  });

  it('should show confirmation alert if eliminarMiembro called with seleccion', () => {
    component.miembrosSeleccionados = [{ id: 1 }] as any;
    component.eliminarMiembro();
    expect(component.alertaNotificacion?.ttl).toBe('eliminar confirmation');
  });

  it('should call eliminarMiembrodelaempresaTable and show success on confirmarEliminacion', async () => {
    component.miembrosSeleccionados = [{ id: 1 }] as any;
    component.alertaNotificacion = { ttl: 'eliminar confirmation' } as any;
    component.confirmarEliminacion(true);
    expect(mockStore.eliminarMiembrodelaempresaTable).toHaveBeenCalledWith(component.miembrosSeleccionados[0]);
    await new Promise((resolve) => setTimeout(resolve, 350));
    expect(component.alertaNotificacion?.mensaje).toContain('Datos eliminados correctamente');
  });

  it('should not call eliminarMiembrodelaempresaTable if not confirmed', () => {
    component.miembrosSeleccionados = [{ id: 1 }] as any;
    component.alertaNotificacion = { ttl: 'eliminar confirmation' } as any;
    component.confirmarEliminacion(false);
    expect(mockStore.eliminarMiembrodelaempresaTable).not.toHaveBeenCalled();
  });

  it('should show alert on mostrarAlertaSeleccionarRegistro', () => {
    component.mostrarAlertaSeleccionarRegistro();
    expect(component.alertaNotificacion?.mensaje).toContain('Seleccione un registro');
  });

  it('should mark all as touched if aceptar called with invalid form', () => {
    jest.spyOn(component.agregarMiembroDeLaEmpresaFrom, 'markAllAsTouched');
    component.agregarMiembroDeLaEmpresaFrom.setErrors({ invalid: true });
    component.aceptar();
    expect(component.agregarMiembroDeLaEmpresaFrom.markAllAsTouched).toHaveBeenCalled();
  });

  it('should add member, close modal, and show success if aceptar called with valid form', () => {
    jest.spyOn(component.agregarMiembroDeLaEmpresaFrom, 'markAllAsTouched');
    jest.spyOn(component, 'closeAgregarModal');
    component.agregarMiembroDeLaEmpresaFrom.setErrors(null);
    Object.defineProperty(component.agregarMiembroDeLaEmpresaFrom, 'valid', { get: () => true });
    component.aceptar();
    expect(mockStore.agregarMiembrodelaempresaTable).toHaveBeenCalled();
    expect(component.closeAgregarModal).toHaveBeenCalled();
    expect(component.alertaNotificacion?.mensaje).toContain('Datos guardados correctamente');
  });

  it('should set required validators for RFC, registroFederaldeContribuyentes, nombreCompleto if obligadoaTributarenMexico is "Si"', () => {
    component.agregarMiembroDeLaEmpresaFrom.get('obligadoaTributarenMexico')?.setValue('Si');
    component.setValidacionesObligadoa();
    ['registroFederaldeContribuyentes', 'rfc', 'nombreCompleto'].forEach(campo => {
      expect(component.agregarMiembroDeLaEmpresaFrom.get(campo)?.validator).toBeTruthy();
    });
  });

  it('should set required validators for tipoDePersonaMiembro if obligadoaTributarenMexico is not "Si"', () => {
    component.agregarMiembroDeLaEmpresaFrom.get('obligadoaTributarenMexico')?.setValue('No');
    component.setValidacionesObligadoa();
    expect(component.agregarMiembroDeLaEmpresaFrom.get('tipoDePersonaMiembro')?.validator).toBeTruthy();
  });

  it('should set required validators for nombreMiembro, apellidoPaternoMiembro, apellidoMaternoMiembro if tipoDePersonaMiembro is 1', () => {
    component.agregarMiembroDeLaEmpresaFrom.get('tipoDePersonaMiembro')?.setValue(1);
    component.setValidacionestipo();
    ['nombreMiembro', 'apellidoPaternoMiembro', 'apellidoMaternoMiembro'].forEach(campo => {
      expect(component.agregarMiembroDeLaEmpresaFrom.get(campo)?.validator).toBeTruthy();
    });
  });

  it('should set required validator for nombreDeLaEmpresaMiembro if tipoDePersonaMiembro is not 1', () => {
    component.agregarMiembroDeLaEmpresaFrom.get('tipoDePersonaMiembro')?.setValue(2);
    component.setValidacionestipo();
    expect(component.agregarMiembroDeLaEmpresaFrom.get('nombreDeLaEmpresaMiembro')?.validator).toBeTruthy();
  });

  it('should update tipoDePersonaMiembro in form and call setValoresStore on tipoDePersonaMiembroChange', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    const catalogo = { id: 2, descripcion: 'Moral' };
    component.agregarMiembroDeLaEmpresaFrom.get('tipoDePersonaMiembro')?.setValue('');
    component.tipoDePersonaMiembroChange(catalogo as any);
    expect(component.agregarMiembroDeLaEmpresaFrom.get('tipoDePersonaMiembro')?.value).toBe(2);
    expect(spy).toHaveBeenCalledWith(
      component.agregarMiembroDeLaEmpresaFrom,
      'tipoDePersonaMiembro',
      'setTipoDePersonaMiembro'
    );
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});