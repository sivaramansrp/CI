import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import {
  AccionBoton,
  AlertComponent,
  AVISO,
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { ExportarIlustracionesService } from '../../services/exportar-ilustraciones.service';
import { By } from '@angular/platform-browser';
import { ERROR_DE_REGISTRO_ALERT, ERROR_FORMA_ALERT } from '../../constantes/exportar-ilustraciones.enum';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;
  let mockExportarIlustracionesService: ExportarIlustracionesService;
  let wizardComponent: WizardComponent;
  
  beforeEach(async () => {
    mockExportarIlustracionesService = {
      aduanaArray: [],
      datosDeSolicitudArray: [],
      formsMap: new Map(),
      formValues: {},
      http: null,
      setAduanaArray: jest.fn(),
      setDatosDeSolicitudArray: jest.fn(),
      getFormValidity: jest.fn().mockReturnValue(true),
      getFormValues: jest.fn(),
      setFormValues: jest.fn(),
    } as unknown as ExportarIlustracionesService;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AlertComponent,
        WizardComponent,
        BtnContinuarComponent,
        SolicitanteComponent
      ],
      declarations: [
        PantallasComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent
      ],
      providers: [
        { provide: ExportarIlustracionesService, useValue: mockExportarIlustracionesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    wizardComponent = fixture.debugElement.query(By.directive(WizardComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with default values', () => {
    const component = new PantallasComponent(mockExportarIlustracionesService);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.registroAlert).toBe(ERROR_DE_REGISTRO_ALERT);
    expect(component.itinerarioError).toBe(false);
    expect(component.formaErrorAlert).toBe(ERROR_FORMA_ALERT);
    expect(component.esValido).toBe(false);
    expect(component.indiceDePestanaSeleccionada).toBe(1);
    expect(component.avisoPrivacidadAlert).toBe(AVISO.Aviso);
  });
  
  it('should not update indice if action is invalid', () => {
    const mockEvent: AccionBoton = { valor: 0, accion: 'cont' };
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(1);
  });

  it('should update selected tab index correctly', () => {
    const event = 3;
    component.pestanaCambiado(event);
    expect(component.indiceDePestanaSeleccionada).toBe(3);
  });

  it('should return true when all forms are valid', () => {
    jest.spyOn(mockExportarIlustracionesService, 'getFormValidity').mockReturnValue(true);
    expect(component.formaError).toBe(true);
  });

  it('should return false when any form is invalid', () => {
    jest.spyOn(mockExportarIlustracionesService, 'getFormValidity').mockReturnValue(false);
    expect(component.formaError).toBe(false);
  });

  it('should not change step if form is invalid', () => {
    jest.spyOn(mockExportarIlustracionesService, 'getFormValidity').mockReturnValue(false);
    const mockEvent: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(1);
  });
});
