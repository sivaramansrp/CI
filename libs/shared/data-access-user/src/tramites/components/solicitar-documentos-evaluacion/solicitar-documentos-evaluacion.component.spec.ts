import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarDocumentosEvaluacionComponent } from './solicitar-documentos-evaluacion.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocumentosStates } from '../../../core/estados/documentos.store';
import { SolicitudDocumentosQuery } from '../../../core/queries/documentos.query';

describe('SolicitarDocumentosEvaluacionComponent', () => {
  let component: SolicitarDocumentosEvaluacionComponent;
  let fixture: ComponentFixture<SolicitarDocumentosEvaluacionComponent>;
  let documentosStatesMock: any;
  let solicitudRequerimientoQueryMock: any;

  beforeEach(async () => {
    documentosStatesMock = {
      setSolicitudDocumentos: jest.fn(),
      setOtroValor: jest.fn()
    };
    solicitudRequerimientoQueryMock = {
      selectSolicitud$: { pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() }) }
    };

    await TestBed.configureTestingModule({
      imports: [SolicitarDocumentosEvaluacionComponent, CommonModule, FormsModule, ReactiveFormsModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: DocumentosStates, useValue: documentosStatesMock },
        { provide: SolicitudDocumentosQuery, useValue: solicitudRequerimientoQueryMock }
      ]
    })
      .overrideComponent(SolicitarDocumentosEvaluacionComponent, {
        set: {
          providers: [
            { provide: DocumentosStates, useValue: documentosStatesMock },
            { provide: SolicitudDocumentosQuery, useValue: solicitudRequerimientoQueryMock }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(SolicitarDocumentosEvaluacionComponent);
    component = fixture.componentInstance;
    // Estado simulado
    component.solicitudDocumentosState = {
      documentosSeleccionados: []
    } as any;
    // Catálogo simulado
    component.catTipoDocumento = [
      { id: 1, descripcion: 'INE' },
      { id: 2, descripcion: 'CURP' }
    ] as any;
    // Documentos requeridos simulados
    component.exampleDocumentosRequeridos = [
      { requerido: true, tipoDocumento: 'INE', nombreArchivo: 'ine.pdf', estatus: 'Cargado' }
    ] as any;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario correctamente', () => {
    component.crearFormDocumentos();
    expect(component.formSolicitudDocumentos).toBeDefined();
    expect(component.formSolicitudDocumentos.get('tipoDocumento')).toBeTruthy();
  });
  it('agregarDocumento no debe agregar duplicados', () => {
    component.formSolicitudDocumentos = new FormBuilder().group({
      tipoDocumento: 1
    });
    component.documentosSeleccionados = ['INE'];
    component.agregarDocumento();
    expect(component.documentosSeleccionados.filter(d => d === 'INE').length).toBe(1);
  });

  it('eliminarDocumento debe eliminar el documento del array', () => {
    component.documentosSeleccionados = ['INE', 'CURP'];
    component.eliminarDocumento(0);
    expect(component.documentosSeleccionados).toEqual(['CURP']);
  });
});