import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregardestinatarioComponent } from './agregardestinatario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';

describe('AgregardestinatarioComponent', () => {
  let component: AgregardestinatarioComponent;
  let fixture: ComponentFixture<AgregardestinatarioComponent>;
  let routerMock: any;
  let routeMock: any;
  let queryMock: any;
  let serviceMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jest.fn() };
    routeMock = { snapshot: { paramMap: new Map([['id', '123']]) } };
    queryMock = {
      seleccionarTercerosRelacionados$: of([
        {
          tipoMercancia: 'yes',
          nombre: 'Juan',
          primerApellido: 'Perez',
          razonSocial: 'Empresa',
          pais: '1',
          codigoPostal: '12345',
          estado: 'Estado',
          calle: 'Calle 1',
          numeroExterior: '10'
        }
      ])
    };
    serviceMock = {
      updateTercerosRelacionado: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AgregardestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: CertificadoZoosanitarioServiceService, useValue: serviceMock },
        { provide: ZoosanitarioQuery, useValue: queryMock },
        {
          provide: TercerosrelacionadosService,
          useValue: {
            obtenerSelectorList: jest.fn().mockReturnValue(of([]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregardestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from query', () => {
    expect(component.destinatarioForm.get('nombre')?.value).toBe('Juan');
  });

  it('should call updateTercerosRelacionado and navigate on valid form submission', () => {
    component.destinatarioForm.patchValue({
      tipoMercancia: 'yes',
      nombre: 'Carlos',
      primerApellido: 'Sanchez',
      razonSocial: 'MiEmpresa',
      pais: '1',
      codigoPostal: '12345',
      estado: 'Estado',
      calle: 'Calle',
      numeroExterior: '5'
    });

    component.onGuardarDestinatario();

    expect(serviceMock.updateTercerosRelacionado).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pago/certificado-zoosanitario/zoosanitario']);
  });

  it('should not call service on invalid form submission', () => {
    component.destinatarioForm.patchValue({
      nombre: '', // invalid
      primerApellido: '',
    });

    component.onGuardarDestinatario();

    expect(serviceMock.updateTercerosRelacionado).not.toHaveBeenCalled();
  });

  it('should reset and patch form when clearing', () => {
    component.onLimpiarDestinatario();
    expect(component.destinatarioForm.get('tipoMercancia')?.value).toBe('yes');
    expect(component.destinatarioForm.get('pais')?.value).toBe('1');
  });

  it('should remove validator when tipoMercancia is no', () => {
    component.destinatarioForm.patchValue({ tipoMercancia: 'no' });
    component.enCambioValorRadio();

    const ctrl = component.destinatarioForm.get('razonSocial');
    expect(ctrl?.validator).toBeFalsy();
  });

  it('should add required validator when tipoMercancia is yes', () => {
    component.destinatarioForm.patchValue({ tipoMercancia: 'yes' });
    component.enCambioValorRadio();

    const ctrl = component.destinatarioForm.get('razonSocial');
    expect(ctrl?.validator).toBeTruthy();
  });
});
