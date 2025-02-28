import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DatosDelFabricanteComponent } from './datos-del-fabricante.component';
import { DonacionesExtranjerasService } from 'libs/shared/data-access-user/src/core/services/10303/donaciones-extranjeras/donaciones-extranjeras.service';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Contribuyente, ContribuyenteRespuesta } from 'libs/shared/data-access-user/src/core/models/10303/donaciones-extranjeras.model';
// import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { AlertComponent, CatalogoSelectComponent } from '@ng-mf/data-access-user';

const mockPaises: Catalogo[] = [
  { id: 1, descripcion: 'País 1' },
  { id: 2, descripcion: 'País 2' }
];

const mockContribuyenteRespuesta: ContribuyenteRespuesta = {
  data: [{
    rfc: 'XAXX010101000',
    razonSocial: 'Empresa Ejemplo',
    nombre: 'Nombre Ejemplo',
    apellidoPaterno: 'Apellido Paterno',
    apellidoMaterno: 'Apellido Materno',
    calle: 'Calle Ejemplo',
    numeroExterior: '123',
    numeroInterior: '456',
    estado: 'Estado Ejemplo',
    colonia: 'Colonia Ejemplo',
    codigoPostal: '12345',
    pais: 'País Ejemplo',
    correoElectronico: 'ejemplo@correo.com',
    telefono: '1234567890'
  }]
};

describe('DatosDelFabricanteComponent', () => {
  let component: DatosDelFabricanteComponent;
  let fixture: ComponentFixture<DatosDelFabricanteComponent>;
  let service: DonacionesExtranjerasService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatosDelFabricanteComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        CatalogoSelectComponent,
        AlertComponent
      ],
      providers: [DonacionesExtranjerasService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelFabricanteComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DonacionesExtranjerasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the catalogos on ngOnInit', () => {
    const spy = jest.spyOn(service, 'getPaises').mockReturnValue(of({ code: 200, data: mockPaises, message: 'Success' }));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initialize catalogos', () => {
    jest.spyOn(service, 'getPaises').mockReturnValue(of({ code: 200, data: mockPaises, message: 'Success' }));
    component.inicializaCatalogos();
    expect(component.pais).toEqual(mockPaises);
  });

  it('should search contribuyente by RFC', () => {
    jest.spyOn(service, 'buscarContribuyente').mockReturnValue(of(mockContribuyenteRespuesta));
    component.buscarContribuyenteRfc(6, 'XAXX010101000');
    expect(component.nombreFabricante).toEqual('Nombre Ejemplo Apellido Paterno Apellido Materno');
  });

  it('should process the fabricante data', () => {
    const contribuyente = mockContribuyenteRespuesta.data[0];
    component.fabricante(contribuyente, true);
    expect(component.nombreFabricante).toEqual('Nombre Ejemplo Apellido Paterno Apellido Materno');
    expect(component.calleFabricante).toEqual('Calle Ejemplo');
  });

  it('should reset the form', () => {
    component.restablecerFormulario();
    expect(component.rfcFabricante).toEqual('');
    expect(component.nombreFabricante).toEqual('');
  });
});
