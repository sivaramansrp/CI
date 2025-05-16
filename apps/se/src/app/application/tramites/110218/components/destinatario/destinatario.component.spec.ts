import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DestinatarioComponent } from './destinatario.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let serviceMock: jest.Mocked<CertificadoTecnicoJaponService>;
  let storeMock: jest.Mocked<Tramite110218Store>;
  let queryMock: jest.Mocked<Tramite110218Query>;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    serviceMock = {
      getdestinatario: jest.fn(),
    } as unknown as jest.Mocked<CertificadoTecnicoJaponService>;

    storeMock = {
      setTramite110218State: jest.fn(),
    } as unknown as jest.Mocked<Tramite110218Store>;

    queryMock = {
      selectTramite110218State$: of({
        nombre: 'Juan',
        primerApellido: 'Pérez',
        numeroderegistroFiscal: '123456789',
        razonSocial: 'Empresa XYZ',
        calle: 'Calle 1',
        numeroLetra: '123',
        ciudad: 'Ciudad A',
        correoElectronico: 'juan.perez@example.com',
        fax: '987654321',
        telefono: '1234567890',
      }),
    } as unknown as jest.Mocked<Tramite110218Query>;

    destroyed$ = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DestinatarioComponent],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: serviceMock },
        { provide: Tramite110218Store, useValue: storeMock },
        { provide: Tramite110218Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroyed$.next();
    destroyed$.complete();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario de datos personales con valores predeterminados', () => {
    component.crearFormularioDatosDelDestinatario();
    expect(component.datosDelDestinatario.value).toEqual({
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: '',
      numeroderegistroFiscal: '123456789',
      razonSocial: 'Empresa XYZ',
    });
  });

  it('debería inicializar el formulario de domicilio con valores predeterminados', () => {
    component.crearFormularioDomicilioDelDestinatario();
    expect(component.domicilioDelDestinatario.value).toEqual({
      calle: 'Calle 1',
      numeroLetra: '123',
      ciudad: 'Ciudad A',
      correoElectronico: 'juan.perez@example.com',
      fax: '987654321',
      telefono: '1234567890',
    });
  });

  it('debería obtener los datos del destinatario desde el servicio', () => {
    const destinatarioMock = { segundoApellido: 'Gómez' };
    serviceMock.getdestinatario.mockReturnValue(of(destinatarioMock));

    component.obtenerDatosDeTabla();

    expect(serviceMock.getdestinatario).toHaveBeenCalled();
    expect(component.datosDelDestinatario.get('segundoApellido')?.value).toEqual('Gómez');
  });

  it('debería actualizar un valor en el store', () => {
    component.datosDelDestinatario = component.formBuilder.group({
      nombre: ['Nuevo Nombre'],
    });

    component.setValorStore(component.datosDelDestinatario, 'nombre');

    expect(storeMock.setTramite110218State).toHaveBeenCalledWith({
      nombre: 'Nuevo Nombre',
    });
  });

  it('debería obtener el estado actual del trámite desde el store', () => {
    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual({
      nombre: 'Juan',
      primerApellido: 'Pérez',
      numeroderegistroFiscal: '123456789',
      razonSocial: 'Empresa XYZ',
      calle: 'Calle 1',
      numeroLetra: '123',
      ciudad: 'Ciudad A',
      correoElectronico: 'juan.perez@example.com',
      fax: '987654321',
      telefono: '1234567890',
    });
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const destroyedSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});