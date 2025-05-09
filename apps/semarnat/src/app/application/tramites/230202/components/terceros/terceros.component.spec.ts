import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AlertComponent, AnexarDocumentosComponent, CatalogosService, TituloComponent } from '@ng-mf/data-access-user';
import { provideToastr, ToastrService } from 'ngx-toastr'; // Import ToastrService and provideToastr
import { TercerosComponent } from './terceros.component';
import { DestinatarioConfiguracionItem } from '../../enum/destinatario-tabla.enum';
import { TemplateRef } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent], // Import standalone components
      declarations: [],
      providers: [
        CatalogosService,
        provideHttpClient(), // Provide HttpClient
        ToastrService, // Provide ToastrService
        provideToastr({
          positionClass: 'toast-top-right', // Example configuration for Toastr
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call crearFormularioDestinatario and cargarDatos on ngOnInit', () => {
  const crearFormularioDestinatarioSpy = jest.spyOn(component, 'crearFormularioDestinatario');
  const cargarDatosSpy = jest.spyOn(component, 'cargarDatos');
  component.ngOnInit();
  expect(crearFormularioDestinatarioSpy).toHaveBeenCalled();
  expect(cargarDatosSpy).toHaveBeenCalled();
});

it('should initialize agregarMercanciasForm in crearFormularioDestinatario', () => {
  component.crearFormularioDestinatario();
  expect(component.agregarMercanciasForm).toBeDefined();
  expect(component.agregarMercanciasForm.get('nacionalidad')?.value).toBe('nacional');
});

it('should update validators on onTipoPersonaChange', () => {
  component.crearFormularioDestinatario();
  component.onTipoPersonaChange('fisica');
  expect(component.agregarMercanciasForm.get('nombre')?.validator).toBeDefined();
  expect(component.agregarMercanciasForm.get('razonSocial')?.validator).toBeNull();
});

it('should update filaSeleccionada and botonModificarHabilitado on manejarFilaSeleccionada', () => {
  const mockRow: DestinatarioConfiguracionItem = {
    pais: 1, ciudad: 'CDMX', domicilio: 'Calle 123', codigoPostal: 12345,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    razonSocial: '',
    paisStr: ''
  }; // Assuming 1 corresponds to 'Mexico'
  component.manejarFilaSeleccionada([mockRow]);
  expect(component.filaSeleccionada).toEqual([mockRow]);
  expect(component.botonModificarHabilitado).toBe(true);
});

it('should open popup on abrirPopup if botonModificarHabilitado is true', () => {
  component.botonModificarHabilitado = true;
  component.abrirPopup();
  expect(component.popupAbierto).toBe(true);
});

it('should close popup on cerrarPopup', () => {
  component.cerrarPopup();
  expect(component.popupAbierto).toBe(false);
  expect(component.popupCerrado).toBe(false);
});

it('should open modal on abrirModal', () => {
  const modalServiceSpy = jest.spyOn(component['modalService'], 'show');
  const templateRef = {} as TemplateRef<unknown>;
  component.abrirModal(templateRef);
  expect(modalServiceSpy).toHaveBeenCalledWith(templateRef, { class: 'modal-xl' });
});

it('should return true if form control is invalid and touched in isInvalid', () => {
  component.crearFormularioDestinatario();
  component.agregarMercanciasForm.get('pais')?.markAsTouched();
  expect(component.isInvalid('pais')).toBe(true);
});

it('should clean up subscriptions on ngOnDestroy', () => {
  const destroyNotifierSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
  const destroyNotifierCompleteSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
  component.ngOnDestroy();
  expect(destroyNotifierSpy).toHaveBeenCalled();
  expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
});

});

