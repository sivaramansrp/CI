import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosCertificadoComponent } from './datos-certificado.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { CompliMentaria } from '../../models/certificado-tecnico-japon.enum';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let serviceMock: jest.Mocked<CertificadoTecnicoJaponService>;
  let storeMock: jest.Mocked<Tramite110218Store>;
  let queryMock: jest.Mocked<Tramite110218Query>;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    serviceMock = {
      getDatosCertificado: jest.fn(),
    } as unknown as jest.Mocked<CertificadoTecnicoJaponService>;

    storeMock = {
      setTramite110218State: jest.fn(),
    } as unknown as jest.Mocked<Tramite110218Store>;

    queryMock = {
      selectTramite110218State$: of({
        lugar: 'México',
        observaciones: 'Observaciones de prueba',
      }),
    } as unknown as jest.Mocked<Tramite110218Query>;

    destroyed$ = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosCertificadoComponent],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: serviceMock },
        { provide: Tramite110218Store, useValue: storeMock },
        { provide: Tramite110218Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
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

  it('debería inicializar el formulario con valores predeterminados', () => {
    component.inicializarFormulario();
    expect(component.datosDelCertificado.value).toEqual({
      lugar: 'México',
      observaciones: 'Observaciones de prueba',
    });
  });

  it('debería emitir un evento al modificar el formulario', () => {
    const modificarSpy = jest.spyOn(component.modificarEventCertificado, 'emit');

    component.enModificarFormulario();

    expect(modificarSpy).toHaveBeenCalledWith(false);
  });

  it('debería actualizar un valor en el store', () => {
    component.datosDelCertificado = component.formBuilder.group({
      lugar: ['Nuevo Lugar'],
    });

    component.setValorStore(component.datosDelCertificado, 'lugar');

    expect(storeMock.setTramite110218State).toHaveBeenCalledWith({
      lugar: 'Nuevo Lugar',
    });
  });

  it('debería obtener el estado actual del trámite desde el store', () => {
    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual({
      lugar: 'México',
      observaciones: 'Observaciones de prueba',
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