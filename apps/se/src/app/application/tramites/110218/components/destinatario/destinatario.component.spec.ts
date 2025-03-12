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
      setnombre: jest.fn(),
      setprimerApellido: jest.fn(),
      setnúmeroderegistroFiscal: jest.fn(),
      setrazónSocial: jest.fn(),
      setcalle: jest.fn(),
      setnúmeroLetra: jest.fn(),
      setciudad: jest.fn(),
      setcorreoElectrónico: jest.fn(),
      setfax: jest.fn(),
      setteléfono: jest.fn(),
    };

    mockQuery = {
      nombre$: of('John'),
      primerApellido$: of('Doe'),
      númeroderegistroFiscal$: of('ABC123'),
      razónSocial$: of('Company Ltd'),
      calle$: of('123 Street'),
      númeroLetra$: of('A1'),
      ciudad$: of('Tokyo'),
      correoElectrónico$: of('test@example.com'),
      fax$: of('123456'),
      teléfono$: of('987654'),
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
    expect(component.datosdeldestinatario.value).toEqual({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      númeroderegistroFiscal: '',
      razónSocial: '',
    });

    expect(component.domiciliodeldestinatario.value).toEqual({
      calle: '',
      númeroLetra: '',
      ciudad: '',
      correoElectrónico: '',
      fax: '',
      teléfono: '',
    });
  });

  it('should validate required fields', () => {
    component.datosdeldestinatario.get('nombre')?.setValue('');
    component.datosdeldestinatario.get('primerApellido')?.setValue('');
    component.datosdeldestinatario.get('númeroderegistroFiscal')?.setValue('');
    component.datosdeldestinatario.get('razónSocial')?.setValue('');

    expect(component.datosdeldestinatario.get('nombre')?.valid).toBeFalsy();
    expect(component.datosdeldestinatario.get('primerApellido')?.valid).toBeFalsy();
    expect(component.datosdeldestinatario.get('númeroderegistroFiscal')?.valid).toBeFalsy();
    expect(component.datosdeldestinatario.get('razónSocial')?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    component.domiciliodeldestinatario.get('correoElectrónico')?.setValue('invalid-email');
    expect(component.domiciliodeldestinatario.get('correoElectrónico')?.valid).toBeFalsy();

    component.domiciliodeldestinatario.get('correoElectrónico')?.setValue('test@example.com');
    expect(component.domiciliodeldestinatario.get('correoElectrónico')?.valid).toBeTruthy();
  });

  it('should patch form values when getTabledatas() is called', () => {
    jest.spyOn(mockService, 'getdestinatario');

    component.getTabledatas();
    fixture.detectChanges();

    expect(component.datosdeldestinatario.get('segundoApellido')?.value).toBe('Smith');
    expect(mockService.getdestinatario).toHaveBeenCalled();
  });

  it('should update store on form field changes', () => {
    component.onDatosdeldestinatarioChange('nombre');
    expect(mockStore.setnombre).toHaveBeenCalled();

    component.onDatosdeldestinatarioChange('primerApellido');
    expect(mockStore.setprimerApellido).toHaveBeenCalled();

    component.onDatosdeldestinatarioChange('númeroderegistroFiscal');
    expect(mockStore.setnúmeroderegistroFiscal).toHaveBeenCalled();

    component.onDatosdeldestinatarioChange('razónSocial');
    expect(mockStore.setrazónSocial).toHaveBeenCalled();
  });

  it('should update store on address form field changes', () => {
    component.onDomiciliodeldestinatarioChange('calle');
    expect(mockStore.setcalle).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('númeroLetra');
    expect(mockStore.setnúmeroLetra).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('ciudad');
    expect(mockStore.setciudad).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('correoElectrónico');
    expect(mockStore.setcorreoElectrónico).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('fax');
    expect(mockStore.setfax).toHaveBeenCalled();

    component.onDomiciliodeldestinatarioChange('teléfono');
    expect(mockStore.setteléfono).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
