import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoVistaUnoComponent } from './anexo-vista-uno.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ANEXO_I_SERVICIO, ANEXO_IMPORTACION_SERVICIO } from '../../../../shared/enum/anexo-dos-y-tres.enum';
import { AnexoImportacionEncabezado, AnexoUnoEncabezado, RutaNombre } from '../../../../shared/models/se-shared.model';

describe('AnexoVistaUnoComponent', () => {
  let component: AnexoVistaUnoComponent;
  let fixture: ComponentFixture<AnexoVistaUnoComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoVistaUnoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoVistaUnoComponent);
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
      ENCABEZADO_FRACCION: 'sample',
      ENCABEZADO_FRACCION_ARANCELARIA: 'sample',
      ENCABEZADO_DESCRIPCION_COMERCIAL: 'sample',
      ENCABEZADO_ANEXO_II: 'sample',
      ENCABEZADO_TIPO: '',
      ENCABEZADO_UMT: '',
      ENCABEZADO_CATEGORIA: '',
      ENCABEZADO_VALOR_EN_MERCADO: '',
      estatus: false
    }];
    component.obtenerAnexoUnoDevolverLaLlamada(MOCK_EVENT);
    expect(component.anexoUnoTablaLista).toEqual(MOCK_EVENT);
  });

  it('should update anexoDosTablaLista on obtenerAnexoDosDevolverLaLlamada', () => {
    const mockEvent: AnexoImportacionEncabezado[] = [{
      ENCABEZADO_FRACCION: '',
      ENCABEZADO_FRACCION_EXPORTACION: '',
      ENCABEZADO_DESCRIPCION_COMERCIAL: '',
      ENCABEZADO_FRACCION_IMPORTACION: '',
      estatus: false
    }];
    component.obtenerAnexoDosDevolverLaLlamada(mockEvent);
    expect(component.anexoDosTablaLista).toEqual(mockEvent);
  });

});