import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { RepresentanteLegalComponent } from './representante-legal.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let serviceMock: jest.Mocked<CertificadoTecnicoJaponService>;
  let storeMock: jest.Mocked<Tramite110218Store>;
  let queryMock: jest.Mocked<Tramite110218Query>;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    serviceMock = {
      getrepresentante: jest.fn(),
    } as unknown as jest.Mocked<CertificadoTecnicoJaponService>;

    storeMock = {
      setTramite110218State: jest.fn(),
    } as unknown as jest.Mocked<Tramite110218Store>;

    queryMock = {
      selectTramite110218State$: of({
        nombredelRepresentante: 'Juan Pérez',
        cargo: 'Gerente',
        telefonos: '1234567890',
        faxs: '0987654321',
        correoElectronicos: 'juan.perez@example.com',
      }),
    } as unknown as jest.Mocked<Tramite110218Query>;

    destroyed$ = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RepresentanteLegalComponent],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: serviceMock },
        { provide: Tramite110218Store, useValue: storeMock },
        { provide: Tramite110218Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
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
    expect(component.datosdelexportador.value).toEqual({
      nombredelRepresentante: 'Juan Pérez',
      empresa: '',
      cargo: 'Gerente',
      telefonos: '1234567890',
      faxs: '0987654321',
      correoElectronicos: 'juan.perez@example.com',
    });
  });

  it('debería obtener los datos del representante legal desde el servicio', () => {
    const representanteMock = { empresa: 'Empresa XYZ' };
    serviceMock.getrepresentante.mockReturnValue(of(representanteMock));

    component.obtenerDatosDeTabla();

    expect(serviceMock.getrepresentante).toHaveBeenCalled();
    expect(component.datosdelexportador.get('empresa')?.value).toEqual('Empresa XYZ');
  });

  it('debería actualizar un valor en el store', () => {
    component.datosdelexportador = component.formBuilder.group({
      nombredelRepresentante: ['Nuevo Representante'],
    });

    component.setValorStore(component.datosdelexportador, 'nombredelRepresentante');

    expect(storeMock.setTramite110218State).toHaveBeenCalledWith({
      nombredelRepresentante: 'Nuevo Representante',
    });
  });

  it('debería obtener el estado actual del trámite desde el store', () => {
    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual({
      nombredelRepresentante: 'Juan Pérez',
      cargo: 'Gerente',
      telefonos: '1234567890',
      faxs: '0987654321',
      correoElectronicos: 'juan.perez@example.com',
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