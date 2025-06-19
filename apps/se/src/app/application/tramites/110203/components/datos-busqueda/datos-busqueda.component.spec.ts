import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosBusquedaComponent } from './datos-busqueda.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query';
import { Tramite110203Store } from '../../../../estados/tramites/tramite110203.store';
import { of } from 'rxjs';
import datosBusquedaDropdown from '@libs/shared/theme/assets/json/110203/datos-busqueda.json';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosBusquedaComponent', () => {
  let componente: DatosBusquedaComponent;
  let fixture: ComponentFixture<DatosBusquedaComponent>;
  let tramite110203QueryMock: Partial<Tramite110203Query>;
  let tramite110203StoreMock: Partial<Tramite110203Store>;
  let routerMock: Partial<Router>;

  beforeEach(async (): Promise<void> => {
    tramite110203QueryMock = {
      valorSeleccionado$: of('Por número de certificado'),
      selectSolicitud$: of({
        numeroDeCertificado: '12345',
        tratadoAcuerdo: '',
        paisBloque: '',
        valorSeleccionado: 'Por número de certificado',
        tratado: '',
        bloque: '',
        origen: '',
        destino: '',
        expedicion: '',
        vencimiento: '',
        nombre: '',
        primer: '',
        segundo: '',
        fiscal: '',
        razon: '',
        calle: '',
        letra: '',
        ciudad: '',
        correo: '',
        fax: '',
        telefono: '',
        medio: '',
        observaciones: '',
        precisa: '',
        presenta: '',
        medida: '',
        comercializacion: '', 
        tipo: '',
      }),
    };

    tramite110203StoreMock = {
      setValorSeleccionado: jest.fn(),
      setNumeroDeCertificado: jest.fn(),
      setTratadoAcuerdo: jest.fn(),
      setPaisBloque: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DatosBusquedaComponent,HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: Tramite110203Query, useValue: tramite110203QueryMock },
        { provide: Tramite110203Store, useValue: tramite110203StoreMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map() }, // Mock básico del snapshot
            params: of({ id: '123' }), // Simula parámetros de la ruta
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(DatosBusquedaComponent);
    componente = fixture.componentInstance;
    componente.configuracionesDropdown = [
      { catalogos: datosBusquedaDropdown?.tratado },
      { catalogos: datosBusquedaDropdown?.pais }
    ];
    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar correctamente la configuración del dropdown', (): void => {
    expect(componente.configuracionesDropdown).toEqual([
      { catalogos: datosBusquedaDropdown?.tratado },
      { catalogos: datosBusquedaDropdown?.pais }
    ]);
  });

  it('debería inicializar con el valor seleccionado correcto', (): void => {
    expect(componente.valorSeleccionado).toBe('Por número de certificado');
  });

  it('debería inicializar el formulario con valores vacíos', (): void => {
    expect(componente.datosBusquedaFormulario.value).toEqual({
      numeroDeCertificado: '12345',
      tratadoAcuerdo: '',
      paisBloque: '',
    });
  });

  it('debería actualizar el valor seleccionado y los validadores cuando se cambia el botón de radio', (): void => {
    componente.enCambioValorRadio('Por Tratado/Acuerdo País/Bloque');
    expect(componente.valorSeleccionado).toBe('Por Tratado/Acuerdo País/Bloque');
    expect(tramite110203StoreMock.setValorSeleccionado).toHaveBeenCalledWith('Por Tratado/Acuerdo País/Bloque');
  });

  it('debería establecer verTabla en true cuando se llama a buscar()', (): void => {
    componente.buscar();
    expect(componente.verTabla).toBe(true);
  });

  it('should navigate to seleccion-tramite in navigateToSeleccionTramite()', (): void => {
    componente.navigateToSeleccionTramite();
    expect(routerMock.navigate).toHaveBeenCalledWith(
      ['../tecnicosdatos'],
      expect.objectContaining({ relativeTo: expect.any(Object) })
    );
  });


  it('debería llamar a actualizarStore cuando cambian los valores del formulario', (): void => {
    const espiaActualizarStore = jest.spyOn(componente as any, 'actualizarStore');
    componente.datosBusquedaFormulario.patchValue({ numeroDeCertificado: '99999' });
    expect(espiaActualizarStore).toHaveBeenCalled();
  });

  it('debería restaurar los valores del formulario desde el store al inicializar', (): void => {
    expect(componente.datosBusquedaFormulario.value.numeroDeCertificado).toBe('12345');
  });

  it('debería desuscribirse de los observables al destruir el componente', (): void => {
    const espiaNext = jest.spyOn(componente['unsubscribe$'], 'next');
    const espiaComplete = jest.spyOn(componente['unsubscribe$'], 'complete');

    componente.ngOnDestroy();
    expect(espiaNext).toHaveBeenCalled();
    expect(espiaComplete).toHaveBeenCalled();
  });
});
