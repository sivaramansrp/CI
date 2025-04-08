import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let mockStore: Partial<Tramite110218Store>;
  let mockQuery: Partial<Tramite110218Query>;
  let mockService: Partial<CertificadoTecnicoJaponService>;

  beforeEach(async () => {
    mockStore = {
      establecerNombre: jest.fn(),
      establecerPrimerApellido: jest.fn(),
      establecerNúmeroderegistroFiscal: jest.fn(),
      establecerRazónSocial: jest.fn(),
      establecerCalle: jest.fn(),
      establecerNúmeroLetra: jest.fn(),
      establecerCiudad: jest.fn(),
      establecerCorreoElectrónico: jest.fn(),
      establecerFax: jest.fn(),
      establecerTeléfono: jest.fn(),
    };

    mockQuery = {
      nombre$: of('John'),
      primerApellido$: of('Doe'),
      numeroderegistroFiscal$: of('ABC123'),
      razonSocial$: of('Company Ltd'),
      calle$: of('123 Street'),
      numeroLetra$: of('A1'),
      ciudad$: of('Tokyo'),
      correoElectronico$: of('test@example.com'),
      fax$: of('123456'),
      telefono$: of('987654'),
    };

    mockService = {
      getdestinatario: jest.fn().mockReturnValue(of({ segundoApellido: 'Smith' })),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, DestinatarioComponent],
      providers: [
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms with default values', () => {
    expect(component.datosDelDestinatario.value).toEqual({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      numeroderegistroFiscal: '',
      razonSocial: '',
    });

    expect(component.domicilioDelDestinatario.value).toEqual({
      calle: '',
      numeroLetra: '',
      ciudad: '',
      correoElectronico: '',
      fax: '',
      telefono: '',
    });
  });

  it('should validate required fields', () => {
    component.datosDelDestinatario.get('nombre')?.setValue('');
    component.datosDelDestinatario.get('primerApellido')?.setValue('');
    component.datosDelDestinatario.get('numeroderegistroFiscal')?.setValue('');
    component.datosDelDestinatario.get('razonSocial')?.setValue('');

    expect(component.datosDelDestinatario.get('nombre')?.valid).toBeFalsy();
    expect(component.datosDelDestinatario.get('primerApellido')?.valid).toBeFalsy();
    expect(component.datosDelDestinatario.get('numeroderegistroFiscal')?.valid).toBeFalsy();
    expect(component.datosDelDestinatario.get('razonSocial')?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    component.domicilioDelDestinatario.get('correoElectronico')?.setValue('invalid-email');
    expect(component.domicilioDelDestinatario.get('correoElectronico')?.valid).toBeFalsy();

    component.domicilioDelDestinatario.get('correoElectronico')?.setValue('test@example.com');
    expect(component.domicilioDelDestinatario.get('correoElectronico')?.valid).toBeTruthy();
  });

  it('should patch form values when obtenerDatosDeTabla() is called', () => {
    jest.spyOn(mockService, 'getdestinatario');

    component.obtenerDatosDeTabla();
    fixture.detectChanges();

    expect(component.datosDelDestinatario.get('segundoApellido')?.value).toBe('Smith');
    expect(mockService.getdestinatario).toHaveBeenCalled();
  });

  it('should update store on form field changes', () => {
    component.onDatosdeldestinatarioChange('nombre');
    expect(mockStore.establecerNombre).toHaveBeenCalled();

    component.onDatosdeldestinatarioChange('primerApellido');
    expect(mockStore.establecerPrimerApellido).toHaveBeenCalled();

    component.onDatosdeldestinatarioChange('numeroderegistroFiscal');
    expect(mockStore.establecerNúmeroderegistroFiscal).toHaveBeenCalled();

    component.onDatosdeldestinatarioChange('razonSocial');
    expect(mockStore.establecerRazónSocial).toHaveBeenCalled();
  });

  it('should update store on address form field changes', () => {
    component.onDomiciliodeldestinatarioChange('calle');
    expect(mockStore.establecerCalle).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('numeroLetra');
    expect(mockStore.establecerNúmeroLetra).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('ciudad');
    expect(mockStore.establecerCiudad).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('correoElectronico');
    expect(mockStore.establecerCorreoElectrónico).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('fax');
    expect(mockStore.establecerFax).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('telefono');
    expect(mockStore.establecerTeléfono).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
