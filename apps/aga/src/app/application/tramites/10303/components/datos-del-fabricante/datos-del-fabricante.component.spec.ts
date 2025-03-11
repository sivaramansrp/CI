import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AlertComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';
import { DatosDelFabricanteComponent } from './datos-del-fabricante.component';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';

const MOCK_PAISES: Catalogo[] = [
  { id: 1, descripcion: 'País 1' },
  { id: 2, descripcion: 'País 2' }
];

const MOCK_CONTRIBUYENTE_RESPUESTA: ContribuyenteRespuesta = {
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
    const SPY = jest.spyOn(service, 'getPaises').mockReturnValue(of({ code: 200, data: MOCK_PAISES, message: 'Success' }));
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('should initialize catalogos', () => {
    jest.spyOn(service, 'getPaises').mockReturnValue(of({ code: 200, data: MOCK_PAISES, message: 'Success' }));
    component.inicializaCatalogos();
    expect(component.pais).toEqual(MOCK_PAISES);
  });

  it('should search contribuyente by RFC', () => {
    jest.spyOn(service, 'buscarContribuyente').mockReturnValue(of(MOCK_CONTRIBUYENTE_RESPUESTA));
    component.buscarContribuyenteRfc(6, 'XAXX010101000');
    expect(component.nombreFabricante).toEqual('Nombre Ejemplo Apellido Paterno Apellido Materno');
  });

  it('should process the fabricante data', () => {
    const CONTRIBUYENTE = MOCK_CONTRIBUYENTE_RESPUESTA.data[0];
    component.fabricante(CONTRIBUYENTE, true);
    expect(component.nombreFabricante).toEqual('Nombre Ejemplo Apellido Paterno Apellido Materno');
    expect(component.calleFabricante).toEqual('Calle Ejemplo');
  });

  it('should reset the form', () => {
    component.restablecerFormulario();
    expect(component.rfcFabricante).toEqual('');
    expect(component.nombreFabricante).toEqual('');
  });
});
