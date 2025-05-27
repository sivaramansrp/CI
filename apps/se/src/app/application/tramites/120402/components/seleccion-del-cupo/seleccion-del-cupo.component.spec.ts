import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SeleccionDelCupoComponent } from './seleccion-del-cupo.component';
import { SeleccionDelCupoService } from '@ng-mf/data-access-user';
import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipoNotificacionEnum, CategoriaMensaje } from '@ng-mf/data-access-user';
import { TablaAcciones } from '@ng-mf/data-access-user';

// These tests assume Jest and Angular TestBed setup

describe('SeleccionDelCupoComponent', () => {
  let component: SeleccionDelCupoComponent;
  let fixture: ComponentFixture<SeleccionDelCupoComponent>;
  let seleccionDelCupoService: jest.Mocked<SeleccionDelCupoService>;
  let tramite120402Store: jest.Mocked<Tramite120402Store>;
  let tramite120402Query: jest.Mocked<Tramite120402Query>;

  // Mock data
  const mockRegimen = [{ id: '1', descripcion: 'Régimen 1' }];
  const mockTratado = [{ id: '1', descripcion: 'Tratado 1' }];
  const mockProducto = [{ id: '1', descripcion: 'Producto 1' }];
  const mockSeleccionDelCupo = [{
    description: 'Desc',
    assignmentType: 'Tipo',
    codes: ['001'],
    quota: 'Cupo'
  }];

  beforeEach(async () => {
    const seleccionDelCupoServiceMock = {
      getRegimen: jest.fn(() => of({ data: mockRegimen })),
      getTratado: jest.fn(() => of({ tratado: mockTratado })),
      getProducto: jest.fn(() => of({ data: mockProducto })),
      getSeleccionDelCupo: jest.fn(() => of(mockSeleccionDelCupo))
    };
    const tramite120402QueryMock = {
      selectSolicitud$: of({}),
      getValue: jest.fn(() => ({ entidad: 'Entidad', representacion: 'Rep' }))
    };
    const tramite120402StoreMock = {
      setCupoSeleccionado: jest.fn(),
      setTramite120402State: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SeleccionDelCupoComponent],
      providers: [
        { provide: SeleccionDelCupoService, useValue: seleccionDelCupoServiceMock },
        { provide: Tramite120402Query, useValue: tramite120402QueryMock },
        { provide: Tramite120402Store, useValue: tramite120402StoreMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    seleccionDelCupoService = TestBed.inject(SeleccionDelCupoService) as any;
    tramite120402Query = TestBed.inject(Tramite120402Query) as any;
    tramite120402Store = TestBed.inject(Tramite120402Store) as any;
    fixture = TestBed.createComponent(SeleccionDelCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load regimen, tratado, producto on init', () => {
    expect(seleccionDelCupoService.getRegimen).toHaveBeenCalled();
    expect(seleccionDelCupoService.getTratado).toHaveBeenCalled();
    expect(seleccionDelCupoService.getProducto).toHaveBeenCalled();
    expect(component.regimen).toEqual(mockRegimen);
    expect(component.tratado).toEqual(mockTratado);
    expect(component.producto).toEqual(mockProducto);
  });

  it('should show notification if required fields missing on buscar', () => {
    component.seleccionForm.get('regimen')?.setValue('');
    component.manejarBuscar();
    expect(component.modalAbierto).toBeTruthy();
    expect(component.nuevaNotificacion).toBeDefined();
  });

  it('should call loadSeleccionDelCupo if all required fields present', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    expect(seleccionDelCupoService.getSeleccionDelCupo).toHaveBeenCalled();
    expect(component.datosTablaCupo.length).toBeGreaterThan(0);
  });

  it('should handle onAccionCupo and set mostrarDescripcionCupo', () => {
    const row = { descripcion: 'Desc', tipoAsignacion: 'Tipo', fracciones: ['001'], tipoCupo: 'Cupo' };
    component.onAccionCupo({ row, column: 'editar' });
    expect(tramite120402Store.setCupoSeleccionado).toHaveBeenCalledWith(row);
    expect(component.mostrarDescripcionCupo).toBeTruthy();
  });

  it('should close modal on cerrarModal', () => {
    component.modalAbierto = true;
    component.cerrarModal();
    expect(component.modalAbierto).toBeFalsy();
  });

  it('should clean up observables on destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should mark form as invalid if regimen is empty', () => {
    component.seleccionForm.get('regimen')?.setValue('');
    expect(component.seleccionForm.valid).toBeFalsy();
  });

  it('should mark form as valid if all fields are filled', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.seleccionForm.get('tratado')?.setValue(mockTratado[0]);
    component.seleccionForm.get('producto')?.setValue(mockProducto[0]);
    component.seleccionForm.get('subproducto')?.setValue(mockProducto[0]);
    expect(component.seleccionForm.valid).toBeTruthy();
  });

  it('should format datosTablaCupo correctly', () => {
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    expect(component.datosTablaCupo[0].descripcion).toEqual(mockSeleccionDelCupo[0].description);
    expect(component.datosTablaCupo[0].tipoAsignacion).toEqual(mockSeleccionDelCupo[0].assignmentType);
    expect(component.datosTablaCupo[0].fracciones).toEqual(mockSeleccionDelCupo[0].codes);
    expect(component.datosTablaCupo[0].tipoCupo).toEqual(mockSeleccionDelCupo[0].quota);
  });

  it('should handle single object response in loadSeleccionDelCupo', () => {
    const singleObj = { description: 'Unico', assignmentType: 'Tipo', codes: ['010'], quota: 'Cupo' };
    seleccionDelCupoService.getSeleccionDelCupo.mockReturnValue(of(singleObj));
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    expect(component.datosTablaCupo.length).toBe(1);
    expect(component.datosTablaCupo[0].descripcion).toEqual(singleObj.description);
  });

  it('should handle codes as string in loadSeleccionDelCupo', () => {
    const stringCodes = [{ description: 'Desc', assignmentType: 'Tipo', codes: '001,002', quota: 'Cupo' }];
    seleccionDelCupoService.getSeleccionDelCupo.mockReturnValue(of(stringCodes));
    component.seleccionForm.get('regimen')?.setValue(mockRegimen[0]);
    component.manejarBuscar();
    expect(component.datosTablaCupo[0].fracciones).toEqual(stringCodes[0].codes);
  });
});