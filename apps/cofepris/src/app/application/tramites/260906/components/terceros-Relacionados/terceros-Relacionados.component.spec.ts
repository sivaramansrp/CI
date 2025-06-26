import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TercerosRelacionadoesComponent } from './terceros-Relacionados.component';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { SanitarioService } from '../../services/sanitario.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { Permiso260906Query } from '../../../../estados/queries/permiso260906.query';

describe('TercerosRelacionadoesComponent', () => {
  let component: TercerosRelacionadoesComponent;
  let fixture: ComponentFixture<TercerosRelacionadoesComponent>;
  let mockSanitarioStore: Partial<Sanitario260906Store>;
  let mockSanitarioService: Partial<SanitarioService>;

  let permiso260906QueryMock = {
    selectSolicitud$: of({
      tercerosNacionalidad: 'nacional',
      tipoPersona: 'fisica',
      rfc: 'RFC123456789',
      curp: 'CURP123456789',
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      denominacionRazonSocial: '',
      pais: 'México',
      estadoLocalidad: 'Estado de México',
      municipioAlcaldia: 'Toluca',
      localidad: 'Centro',
      entidadFederativa: 'Edomex',
      codigoPostaloEquivalente: '50000',
      colonia: 'Colonia Centro',
      coloniaoEquivalente: '',
      calle: 'Calle Principal',
      numeroExterior: '123',
      numeroInterior: 'A',
      lada: '722',
      telefono: '1234567',
      correoElectronico: 'juan.perez@example.com',
      extranjeroCodigo: '',
      extranjeroEstado: '',
      extranjeroColonia: '',
    }),
  };

  beforeEach(async () => {
    mockSanitarioStore = {
      setFabricante: jest.fn(),
      setDestinatario: jest.fn(),
      setProveedor: jest.fn(),
      setFacturador: jest.fn(),
    };

    mockSanitarioService = {
      getData: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule, TercerosRelacionadoesComponent],
      providers: [ provideHttpClient(),
        { provide: Sanitario260906Store, useValue: mockSanitarioStore },
        { provide: SanitarioService, useValue: mockSanitarioService },
        { provide: Permiso260906Query, useValue: permiso260906QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los formularios reactivos', () => {
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('debería alternar la visibilidad de la sección de fabricante', () => {
    expect(component.showFabricante).toBe(false);
    component.toggleDivFabricante();
    expect(component.showFabricante).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('debería alternar la visibilidad de la sección de destinatario', () => {
    expect(component.showDestinatario).toBe(false);
    component.toggleDivDestinatario();
    expect(component.showDestinatario).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('debería deshabilitar los formularios en modo de solo lectura', () => {
    component.soloLectura = true;
    component.inicializarEstadoFormulario();

    expect(component.agregarFabricanteFormGroup.disabled).toBe(true);
    expect(component.agregarDestinatarioFormGroup.disabled).toBe(true);
    expect(component.agregarProveedorFormGroup.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.disabled).toBe(true);
  });
});