import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProveedorExtranjeroComponent } from './proveedorExtranjero.component';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent, AlertComponent } from '@ng-mf/data-access-user';

describe('ProveedorExtranjeroComponent', () => {
  let component: ProveedorExtranjeroComponent;
  let fixture: ComponentFixture<ProveedorExtranjeroComponent>;
  let storeMock: jest.Mocked<Tramite32301Store>;
  let queryMock: jest.Mocked<Tramite32301Query>;

  beforeEach(async () => {
    storeMock = {
      setRegistrosProveedoresExtranjeros: jest.fn(),
    } as unknown as jest.Mocked<Tramite32301Store>;

    queryMock = {
      select: jest.fn().mockReturnValue(of({ archivoExtranjero: [], registrosProveedoresExtranjeros: '0' })),
    } as unknown as jest.Mocked<Tramite32301Query>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent, ProveedorExtranjeroComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite32301Store, useValue: storeMock },
        { provide: Tramite32301Query, useValue: queryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorExtranjeroComponent);
    component = fixture.componentInstance;
    component.proveedortype = 'extranjero';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ProveedoresTitulo based on proveedortype', () => {
    expect(component.ProveedoresTitulo).toBe('Aviso de modificaciones de clientes y proveedores extranjeros');
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.proveedorXtranjForm).toBeDefined();
    expect(component.proveedorXtranjForm.get('archivoExtranjero')).toBeTruthy();
    expect(component.proveedorXtranjForm.get('registrosProveedoresExtranjeros')).toBeTruthy();
  });

  it('should call setRegistrosProveedoresExtranjeros on inicializaProveedorExtranjer', () => {
    component.inicializaProveedorExtranjer();
    expect(storeMock.setRegistrosProveedoresExtranjeros).toHaveBeenCalledWith({
      archivoExtranjero: [],
      registrosProveedoresExtranjeros: '0',
    });
  });

  it('should validate file type with fileValidator', () => {
    const validFile = { name: 'test.xlsx' } as File;
    const invalidFile = { name: 'test.txt' } as File;

    expect(ProveedorExtranjeroComponent.fileValidator({ value: validFile } as any)).toBeNull();
    expect(ProveedorExtranjeroComponent.fileValidator({ value: invalidFile } as any)).toEqual({ invalidFileType: true });
  });

  it('should patch file value on onFileSelected', () => {
    const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);
    expect(component.proveedorXtranjForm.get('archivoExtranjero')?.value).toBe(file);
  });

  it('should open modal if no file is selected in onFileSelected', () => {
    jest.spyOn(component, 'openCargaExtranjeroModel');
    const event = { target: { files: [] } } as unknown as Event;

    component.onFileSelected(event);
    expect(component.openCargaExtranjeroModel).toHaveBeenCalled();
  });

  it('should call setRegistrosProveedoresExtranjeros if form is valid in cargarArchivoAjax', () => {
    component.proveedorXtranjForm.setValue({
      archivoExtranjero: new File([''], 'test.xlsx'),
      registrosProveedoresExtranjeros: '1',
    });

    component.cargarArchivoAjax();
    expect(storeMock.setRegistrosProveedoresExtranjeros).toHaveBeenCalled();
  });

  it('should open modal if form is invalid in cargarArchivoAjax', () => {
    jest.spyOn(component, 'openCargaExtranjeroModel');
    component.proveedorXtranjForm.setValue({
      archivoExtranjero: null,
      registrosProveedoresExtranjeros: '1',
    });

    component.cargarArchivoAjax();
    expect(component.openCargaExtranjeroModel).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});