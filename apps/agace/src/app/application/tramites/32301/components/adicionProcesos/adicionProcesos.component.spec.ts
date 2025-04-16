import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, TituloComponent } from "@ng-mf/data-access-user";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AdicionProcesosComponent } from './adicionProcesos.component';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

describe('AdicionProcesosComponent', () => {
  let component: AdicionProcesosComponent;
  let fixture: ComponentFixture<AdicionProcesosComponent>;
  let mockStore: jest.Mocked<Tramite32301Store>;
  let mockQuery: jest.Mocked<Tramite32301Query>;

  beforeEach(async () => {
    mockStore = {
      setRegistrosProveedoresExtranjeros: jest.fn(),
    } as unknown as jest.Mocked<Tramite32301Store>;

    mockQuery = {
      select: jest.fn().mockReturnValue(of({ archivoExtranjero: [], registrosProveedoresExtranjeros: '0' })),
    } as unknown as jest.Mocked<Tramite32301Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent, AdicionProcesosComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite32301Store, useValue: mockStore },
        { provide: Tramite32301Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize titles and call store methods on ngOnInit', () => {
    component.ngOnInit();
    expect(component.ProveedoresTitulo).toBe('Proceso(s) productivo(s)*');
    expect(mockStore.setRegistrosProveedoresExtranjeros).toHaveBeenCalledWith({
      archivoExtranjero: [],
      registrosProveedoresExtranjeros: '0',
    });
  });

  it('should create the form with correct initial values', () => {
    component.crearFormProveedorExtranjer();
    expect(component.proveedorXtranjForm.value).toEqual({
      archivoExtranjero: null,
      registrosProveedoresExtranjeros: { value: '0', disabled: true },
    });
  });

  it('should patch form value on file selection', () => {
    const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [mockFile] } } as unknown as Event;

    component.crearFormProveedorExtranjer();
    component.onFileSelected(event);

    expect(component.proveedorXtranjForm.get('archivoExtranjero')?.value).toBe(mockFile);
  });

  it('should open the modal when no file is selected', () => {
    const modalInstance = { show: jest.fn() } as unknown as Modal;
    component.CargaExtranjeroModelInstance = modalInstance;

    const event = { target: { files: null } } as unknown as Event;
    component.onFileSelected(event);

    expect(modalInstance.show).toHaveBeenCalled();
  });

  it('should close the modal when closeCargaExtranjeroModel is called', () => {
    const modalInstance = { hide: jest.fn() } as unknown as Modal;
    component.CargaExtranjeroModelInstance = modalInstance;

    component.closeCargaExtranjeroModel();
    expect(modalInstance.hide).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});