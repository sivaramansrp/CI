import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { HttpClientModule } from '@angular/common/http';
import { DatosSolicitud } from '../../models/datos-tramite.model';
import { ElementRef } from '@angular/core';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, HttpClientModule],
      providers: [PhytosanitaryReexportacionService], // Add any necessary providers here
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cerrarModal and close the modal', () => {
    const closeModalElement = document.createElement('button');
    jest.spyOn(closeModalElement, 'click');
    component.closeModal = { nativeElement: closeModalElement } as ElementRef;

    component.cerrarModal();

    expect(closeModalElement.click).toHaveBeenCalled();
  });

  it('should initialize the form in inicializarFormulario', () => {
    component.solicitudState = {
      numeroDeCertificado: '123',
      aduana: 'Test Aduana',
      pais: 'Test Pais',
      entidades: 'Test Entidades',
      descripcionProducto: 'Test Producto',
      unidadDeMedida: 'Test Unidad',
      lungarDeEntrada: 'Test Lugar',
      medioDeTransporte: 'Test Transporte',
      numeroYDescripcion: 'Test Descripcion',
      codigoPostal: '12345',
      estado: 'Test Estado',
      calle: 'Test Calle',
      numeroExterior: '123',
      numeroInterior: '456',
      colonia: 'Test Colonia',
      fraccionArancelaria: 'Test Fraccion',
      descripcionFraccionArancelaria: 'Test Descripcion Fraccion',
      cantidad: 10,
      cantidadLetra: 'Diez',
      genero: 'Test Genero',
      especie: 'Test Especie',
      nombreComun: 'Test Nombre Comun',
    } as any;

    component.inicializarFormulario();

    expect(component.solicitudForm).toBeDefined();
    expect(component.agregarMercanciasForm).toBeDefined();
    expect(
      component.solicitudForm.get('reexportacionForm.numeroDeCertificado')
        ?.value
    ).toBe('123');
  });

  it('should update selectedRows in onSelectedRowsChange', () => {
    const mockSelectedRows = [{ id: 1 }, { id: 2 }] as DatosSolicitud[];

    component.onSelectedRowsChange(mockSelectedRows);

    expect(component.selectedRows).toEqual([1, 2]);
  });

  it('should call agregarSolicitud and update datosSolicitud', () => {
    const mockResponse = {
      success: true,
      datos: { id: 1, fraccionArancelaria: '1234' },
    };
    const mockServiceMethod = jest.fn().mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: (callback: (response: any) => void) => callback(mockResponse),
      }),
    });
    component.phytosanitaryReexportacionService.agregarSolicitud = mockServiceMethod as any;
    const mockStoreMethod = jest.fn();
    component.store.setDatosSolicitud = mockStoreMethod as any;
    const mockCerrarModal = jest.fn();
    component.cerrarModal = mockCerrarModal;

    component.agregarSolicitud();

    expect(component.datosSolicitud.length).toBe(1);
    expect(mockStoreMethod).toHaveBeenCalledWith(component.datosSolicitud);
    expect(mockCerrarModal).toHaveBeenCalled();
  });

});
