import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoPorFusionComponent } from './aviso-por-fusion.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Solicitud33304Query } from '../../estados/solicitud33304Query';
import { Solicitud33304Store } from '../../estados/solicitud33304Store';
import { CatalogoSelectComponent, ConsultaioQuery, InputFechaComponent, InputRadioComponent, NotificacionesComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../services/solicitud.service';
import { CommonModule } from '@angular/common';
import { DatosEmpresasFusionadasComponent } from '../datos-empresas-fusionadas/datos-empresas-fusionadas.component';

describe('AvisoPorFusionComponent', () => {
  let component: AvisoPorFusionComponent;
  let fixture: ComponentFixture<AvisoPorFusionComponent>;

  const mockSolicitudQuery = {
    selectSolicitud$: of({
      avisoDeOperacion: '1',
      tipoOperacion: '1',
      cuenta: '1',
      rfc: 'RFC123',
      denominacion: 'Empresa S.A.',
      fechaFusioneEfecto: '2025-01-01',
      folioAcuse: 'FAC-001',
    }),
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: false }),
  };

  const mockStore = {
    actualizarEstado: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TituloComponent,
        ReactiveFormsModule,
        FormsModule,
        TablaDinamicaComponent,
        CatalogoSelectComponent,
        NotificacionesComponent,
        InputRadioComponent,
        InputFechaComponent,
        DatosEmpresasFusionadasComponent
        ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Solicitud33304Query, useValue: mockSolicitudQuery },
        { provide: Solicitud33304Store, useValue: mockStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoPorFusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Inicializa el ciclo de vida de Angular
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores del store', () => {
    expect(component.formularioAvisoFusion.value).toEqual({
      avisoDeOperacion: '1',
      tipoOperacion: '1',
      cuenta: '1',
      rfc: 'RFC123',
      denominacion: 'Empresa S.A.',
      fechaFusioneEfecto: '2025-01-01',
      folioAcuse: 'FAC-001',
    });
  });

  it('debería actualizar el store cuando se llama setValoresStore()', () => {
    component.setValoresStore(component.formularioAvisoFusion, 'rfc');
    expect(mockStore.actualizarEstado).toHaveBeenCalledWith({
      rfc: 'RFC123',
    });
  });

  it('debería deshabilitar el formulario si está en modo solo lectura', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formularioAvisoFusion.disabled).toBe(true);
  });

  it('debería actualizar la fecha correctamente', () => {
    component.actualizarFecha('2025-07-31', 'fechaFusioneEfecto');
    const fecha = component.formularioAvisoFusion.get('fechaFusioneEfecto')?.value;
    expect(fecha).toBe('2025-07-31');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = jest.spyOn((component as any).destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
