import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificacionesComponent } from './certificaciones.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite5601Store } from '../../estados/stores/tramite5601.store';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';
import { CommonModule } from '@angular/common';
import { InputCheckComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite5601State } from '../../estados/stores/tramite5601.store';

describe('CertificacionesComponent', (): void => {
  let componente: CertificacionesComponent;
  let fixture: ComponentFixture<CertificacionesComponent>;
  let mockStore: Partial<Tramite5601Store>;
  let mockQuery: Partial<Tramite5601Query>;
  let destroyed$: Subject<void>;

  const ESTADO_INICIAL: Tramite5601State = {
    tieneCertificacion: true,
    certificacionEmpresa: 'ISO 9001',
    otraCertificacion: 'Certificado Verde',
  };

  beforeEach(async (): Promise<void> => {
    destroyed$ = new Subject<void>();

    mockStore = {
      setTieneCertificacion: jest.fn(),
    };

    mockQuery = {
      selectCertificacion$: of(ESTADO_INICIAL),
    };

    await TestBed.configureTestingModule({
      imports: [
        CertificacionesComponent,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent,
        InputCheckComponent,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite5601Store, useValue: mockStore },
        { provide: Tramite5601Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificacionesComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario con el estado del query', (): void => {
    const VALORES = componente.formularioCertificacion.value;
    expect(VALORES.tieneCertificacion).toBe(true);
    expect(VALORES.certificacionEmpresa).toBe('ISO 9001');
    expect(VALORES.otraCertificacion).toBe('Certificado Verde');
  });

  it('debería mostrar el modal si el checkbox está seleccionado', (): void => {
    const EVENTO = { target: { checked: true } } as unknown as Event;
    componente.mostrarModalSiSeleccionado(EVENTO);
    expect(componente.modal).toBe('show');
    expect(componente.tituloModal).toBeDefined();
    expect(componente.mensajeModal).toBeDefined();
  });

  it('debería cerrar el modal correctamente', (): void => {
    componente.modal = 'show';
    componente.tituloModal = 'Título';
    componente.mensajeModal = 'Mensaje';
    componente.cerrarModal();
    expect(componente.modal).toBe('');
    expect(componente.tituloModal).toBe('');
    expect(componente.mensajeModal).toBe('');
  });

  it('debería llamar setTieneCertificacion al cambiar el valor del checkbox', (): void => {
    const mockEvent = { target: { checked: true } } as unknown as Event;
    componente.onTieneCertificacionChange(mockEvent);
    expect(mockStore.setTieneCertificacion).toHaveBeenCalledWith(true);
  });

  it('debería limpiar el observable destroyed$ en ngOnDestroy', (): void => {
    const spyNext = jest.spyOn(componente['destroyed$'], 'next');
    const spyComplete = jest.spyOn(componente['destroyed$'], 'complete');
    componente.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
