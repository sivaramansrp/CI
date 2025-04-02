import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatosDeLaSolicitudComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        TablaDinamicaComponent,
        AlertComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.datosSolicitudFormState = {
      rfcSanitario: '',
      denominacionRazon: '',
      correoElectronico: '',
      codigoPostal: '',
      estado: '',
      municipioAlcaldia: '',
      localidad: '',
      colonia: '',
      calle: '',
      lada: '',
      telefono: '',
      aviso: '',
      licenciaSanitaria: '',
      regimen: '',
      adunasDeEntradas: '',
      aeropuerto: false,
      publico: '',
      representanteRfc: '',
      representanteNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    jest.spyOn(component, 'crearDatosSolicitudForm');
    component.ngOnInit();
    expect(component.crearDatosSolicitudForm).toHaveBeenCalled();
  });

  it('should update form fields when buscarRepresentanteRfc is called', () => {
    component.datosSolicitudForm.patchValue({ representanteRfc: 'RFC123' });
    component.buscarRepresentanteRfc();
    expect(component.datosSolicitudForm.get('representanteNombre')?.value).toBe(
      'EUROFOODS DE MEXICO'
    );
    expect(component.datosSolicitudForm.get('apellidoPaterno')?.value).toBe(
      'GONZALEZ'
    );
    expect(component.datosSolicitudForm.get('apellidoMaterno')?.value).toBe(
      'PINAL'
    );
  });

  it('should emit scianSeleccionado when eliminarScian is called', () => {
    jest.spyOn(component.scianSeleccionado, 'emit');
    component.scianConfig = { datos: [{ clave: '123' }] } as any;
    component.scianLista = [{ clave: '123' }] as any;
    component.eliminarScian();
    expect(component.scianSeleccionado.emit).toHaveBeenCalledWith([]);
  });

  it('should emit mercanciasSeleccionado when eliminarMercancias is called', () => {
    jest.spyOn(component.mercanciasSeleccionado, 'emit');
    component.tablaMercanciasConfig = {
      datos: [{ clasificacionProducto: 'A1' }],
    } as any;
    component.tablaMercanciasLista = [{ clasificacionProducto: 'A1' }] as any;
    component.eliminarMercancias();
    expect(component.mercanciasSeleccionado.emit).toHaveBeenCalledWith([]);
  });

  it('should navigate to the correct path when irAAcciones is called', () => {
    const routerSpy = jest.spyOn(component.router, 'navigate');
    component.irAAcciones('test-path');
    expect(routerSpy).toHaveBeenCalledWith(['test-path'], {
      relativeTo: component.activatedRoute,
    });
  });

  it('should emit datosDeTablaSeleccionados when modificarDatos is called', () => {
    jest.spyOn(component.datosDeTablaSeleccionados, 'emit');
    component.scianLista = [{ clave: '123' }] as any;
    component.tablaMercanciasLista = [{ clasificacionProducto: 'A1' }] as any;
    component.opcionLista = [{ opcion: 'Option1' }] as any;
    component.modificarDatos();
    expect(component.datosDeTablaSeleccionados.emit).toHaveBeenCalledWith({
      scianSeleccionados: component.scianLista,
      mercanciasSeleccionados: component.tablaMercanciasLista,
      opcionSeleccionados: component.opcionLista,
    });
  });

  it('should toggle opcionesColapsable when mostrarColapsable is called with 1', () => {
    component.opcionesColapsable = false;
    component.mostrarColapsable(1);
    expect(component.opcionesColapsable).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
