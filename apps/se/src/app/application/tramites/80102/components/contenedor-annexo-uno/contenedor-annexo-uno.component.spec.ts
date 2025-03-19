import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ANEXO_I_SERVICIO, ANEXO_IMPORTACION_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoDosEncabezado, AnexoUnoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { ContenedorAnnexoUnoComponent } from './contenedor-annexo-uno.component';

describe('ContenedorAnnexoUnoComponent', () => {
  let component: ContenedorAnnexoUnoComponent;
  let fixture: ComponentFixture<ContenedorAnnexoUnoComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorAnnexoUnoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorAnnexoUnoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize anexoUnoConfig correctly', () => {
    expect(component.anexoUnoConfig.anexoUnoTablaSeleccionRadio).toBe(TablaSeleccion.RADIO);
    expect(component.anexoUnoConfig.anexoUnoEncabezadoDeTabla).toBe(ANEXO_I_SERVICIO);
  });

  it('should initialize anexoImportacionConfig correctly', () => {
    expect(component.anexoImportacionConfig.anexoDosTablaSeleccionRadio).toBe(TablaSeleccion.RADIO);
    expect(component.anexoImportacionConfig.anexoDosEncabezadoDeTabla).toBe(ANEXO_IMPORTACION_SERVICIO);
  });

  it('should update anexoUnoTablaLista on obtenerAnexoUnoDevolverLaLlamada', () => {
    const MOCK_EVENT: AnexoUnoEncabezado[] = [{
      encabezadoFraccion: 'sample',
      encabezadoFraccionArancelaria: 'sample',
      encabezadoDescripcionComercial: 'sample',
      encabezadoAnexoII: 'sample',
      encabezadoTipo: '',
      encabezadoUmt: '',
      encabezadoCategoria: '',
      encabezadoValorEnMercado: '',
      estatus: false
    }];
    component.obtenerAnexoUnoDevolverLaLlamada(MOCK_EVENT);
    expect(component.anexoUnoTablaLista).toEqual(MOCK_EVENT);
  });

  it('should update anexoDosTablaLista on obtenerAnexoDosDevolverLaLlamada', () => {
    const mockEvent: AnexoDosEncabezado[] = [{
      encabezadoFraccion: '',
      encabezadoFraccionExportacion: '',
      encabezadoDescripcionComercial: '',
      encabezadoFraccionImportacion: '',
      estatus: false
    }];
    component.obtenerAnexoDosDevolverLaLlamada(mockEvent);
    expect(component.anexoDosTablaLista).toEqual(mockEvent);
  });

});