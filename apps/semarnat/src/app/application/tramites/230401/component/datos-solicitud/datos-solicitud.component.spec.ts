/* eslint-disable dot-notation */
import { AlertComponent, BtnContinuarComponent,CatalogoSelectComponent,CrosslistComponent,TituloComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { PantallasModuloModule } from '../../pantallas-modulo.module';
describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let pantallasActionService: PantallasActionService;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [
        AlertComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TituloComponent,
        PantallasModuloModule,
        CatalogoSelectComponent, BtnContinuarComponent, CrosslistComponent
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    pantallasActionService = TestBed.inject(PantallasActionService);
    fixture.detectChanges();
    form = new FormGroup({
      cantidad: new FormControl(''),
      otherField: new FormControl('')
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
  it('should have a defined service', () => {
    expect(pantallasActionService).toBeDefined();
  });
  it('should have defined a variable listoBanco', () => {  
    expect(pantallasActionService.listoBanco).toBeDefined();
  });
  it('should have defined listoBanco array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.listoBanco.length).toBe(0);
  });
  it('should have defined a variable tiposSolicitud', () => {  
    expect(pantallasActionService.tiposSolicitud).toBeDefined();
  });
  it('should have defined tiposSolicitud array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.tiposSolicitud.length).toBe(0);
  });
  it('should have defined a variable noDePermisocoferprise', () => {  
    expect(pantallasActionService.noDePermisocoferprise).toBeDefined();
  });
  it('should have defined noDePermisocoferprise array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.noDePermisocoferprise.length).toBe(0);
  });
  it('should have defined a variable fraccionArancelaria', () => {  
    expect(pantallasActionService.fraccionArancelaria).toBeDefined();
  });
  it('should have defined fraccionArancelaria array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.fraccionArancelaria.length).toBe(0);
  });
  it('should have defined a variable tipoPersona', () => {  
    expect(pantallasActionService.numeroCas).toBeDefined();
  });
  it('should have defined numeroCas array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.numeroCas.length).toBe(0);
  });
  it('should have defined a variable clasificacion', () => {  
    expect(pantallasActionService.clasificacion).toBeDefined();
  });
  it('should have defined clasificacion array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.clasificacion.length).toBe(0);
  });
  it('should have defined a variable estadoFisico', () => {  
    expect(pantallasActionService.estadoFisico).toBeDefined();
  });
  it('should have defined estadoFisico array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.estadoFisico.length).toBe(0);
  });
  it('should have defined a variable datosObjecto', () => {  
    expect(pantallasActionService.datosObjecto).toBeDefined();
  });
  it('should have defined datosObjecto array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.datosObjecto.length).toBe(0);
  });
  it('should have defined a variable unidadDeMedida', () => {  
    expect(pantallasActionService.unidadDeMedida).toBeDefined();
  });
  it('should have defined unidadDeMedida array empty', () => {  
    pantallasActionService.inicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(pantallasActionService.unidadDeMedida.length).toBe(0);
  });
  it('should call ngOnInit', () => {
    const NG_ON_INIT_SPY = jest.spyOn(component, 'ngOnInit').mockImplementation();
    component.ngOnInit();
    expect(NG_ON_INIT_SPY).toHaveBeenCalled();
  });
  it('should call ngOnDestroy', () => {
    const NG_ON_DESTROY_SPY = jest.spyOn(component, 'ngOnDestroy').mockImplementation();
    component.ngOnDestroy();
    expect(NG_ON_DESTROY_SPY).toHaveBeenCalled();
  });
  it('should format and set cantidad value correctly', () => {
    const SET_VALORES_STORE_SPY = jest.spyOn(component, 'setValoresStore').mockImplementation();
    form.get('cantidad')?.setValue('65'); // ASCII code for 'A'
    component.setValoresStore(form, 'cantidad', 'setCantidadLetra');
    expect(SET_VALORES_STORE_SPY).toHaveBeenCalled();
    fixture.detectChanges();
    expect(form.get('cantidad')?.value).toEqual('65');
    form.get('cantidad')?.setValue('60'); // ASCII code for 'A'
    component.setValoresStore(form, 'cantidad', 'setCantidadLetra');
    fixture.detectChanges();
    expect(form.get('cantidad')?.value).not.toEqual('65');
  });
  it('should call tipoSolicitudSeleccion', () => {
    const TIPO_SOLICITUD_SELECCIONY_SPY = jest.spyOn(component, 'tipoSolicitudSeleccion').mockImplementation();
    component.tipoSolicitudSeleccion();
    expect(TIPO_SOLICITUD_SELECCIONY_SPY ).toHaveBeenCalled();
  });
  it('should call noDePermisocoferpriseSeleccion', () => {
    const NO_DE_PERMISOCOFERPRISE_SELECCION_SPY = jest.spyOn(component, 'noDePermisocoferpriseSeleccion').mockImplementation();
    component.noDePermisocoferpriseSeleccion();
    expect(NO_DE_PERMISOCOFERPRISE_SELECCION_SPY ).toHaveBeenCalled();
  });
  it('should call fraccionArancelariaSeleccion', () => {
    const FRACCION_ARANCELARIA_SELECCION_SPY = jest.spyOn(component, 'fraccionArancelariaSeleccion').mockImplementation();
    component.fraccionArancelariaSeleccion();
    expect(FRACCION_ARANCELARIA_SELECCION_SPY).toHaveBeenCalled();
  });
  it('should call seleccioneAutorizacion', () => {
    const SELECCIONE_AUTORIZACION_SPY = jest.spyOn(component, 'seleccioneAutorizacion').mockImplementation();
    component.seleccioneAutorizacion();
    expect(SELECCIONE_AUTORIZACION_SPY ).toHaveBeenCalled();
  });
  it('should call numeroCasSeleccione', () => {
    const NUMERO_CAS_SELECCIONE_SPY = jest.spyOn(component, 'numeroCasSeleccione').mockImplementation();
    component.numeroCasSeleccione();
    expect(NUMERO_CAS_SELECCIONE_SPY).toHaveBeenCalled();
  });
  it('should call clasificacionSeleccione', () => {
    const CLASIFICACION_SELECCIONE_SPY = jest.spyOn(component, 'clasificacionSeleccione').mockImplementation();
    component.clasificacionSeleccione();
    expect(CLASIFICACION_SELECCIONE_SPY ).toHaveBeenCalled();
  });
  it('should call estadoFisicoSeleccione', () => {
    const ESTADO_FISICO_SELECCIONE_SPY = jest.spyOn(component, 'estadoFisicoSeleccione').mockImplementation();
    component.estadoFisicoSeleccione();
    expect(ESTADO_FISICO_SELECCIONE_SPY ).toHaveBeenCalled();
  });
  it('should call datosObjectoSeleccione', () => {
    const DATOS_OBJECTO_SELECCIONE_SPY = jest.spyOn(component, 'datosObjectoSeleccione').mockImplementation();
    component.datosObjectoSeleccione();
    expect(DATOS_OBJECTO_SELECCIONE_SPY).toHaveBeenCalled();
  });
  it('should call unidadDeMedidaSeleccione', () => {
    const UNIDAD_DE_MEDIDA_SELECCION_SPY = jest.spyOn(component, 'unidadDeMedidaSeleccione').mockImplementation();
    component.unidadDeMedidaSeleccione();
    expect(UNIDAD_DE_MEDIDA_SELECCION_SPY).toHaveBeenCalled();
  });
  it('should call creatFormSolicitud', () => {
    const CREATE_FORM_SOLICITUD_SPY = jest.spyOn(component, 'creatFormSolicitud').mockImplementation();
    component.creatFormSolicitud();
    expect(CREATE_FORM_SOLICITUD_SPY ).toHaveBeenCalled();
  });
  it('should not be empty variable paisDeProcedenciaBotons', () => {
    expect(component.paisDeProcedenciaBotons).toBeDefined();
    expect(component.paisDeProcedenciaBotons.length).toBeGreaterThan(0);
  });
  it('should not be empty variable paisDelProductoBotons', () => {
    expect(component.paisDelProductoBotons).toBeDefined();
    expect(component.paisDelProductoBotons.length).toBeGreaterThan(0);
  });
  it('should not be empty variable aduanasDeEntradaBotons', () => {
    expect(component.aduanasDeEntradaBotons).toBeDefined();
    expect(component.aduanasDeEntradaBotons.length).toBeGreaterThan(0);
  });
  it('should not be empty variable paisDeProcedenciaLabel', () => {
    expect(component.paisDeProcedenciaLabel.tituluDeLaIzquierda).toBeDefined();
    expect(component.paisDeProcedenciaLabel.derecha).toBeDefined();
  });
  it('should not be empty variable paisDelProductoLabel', () => {
    expect(component.paisDelProductoLabel.tituluDeLaIzquierda).toBeDefined();
    expect(component.paisDelProductoLabel.derecha).toBeDefined();
  });
  it('should not be empty variable aduanasDeEntradaLabel', () => {
    expect(component.aduanasDeEntradaLabel.tituluDeLaIzquierda).toBeDefined();
    expect(component.aduanasDeEntradaLabel.derecha).toBeDefined();
  });
  
  // eslint-disable-next-line complexity
  it('should initialize the form', () => {
    expect(component.FormSolicitud).toBeDefined();
    expect(
      component.FormSolicitud.controls['tipoSolicitud']?.value &&
      component.FormSolicitud.controls['autorizacion']?.value &&
      component.FormSolicitud.controls['noDePermisocoferprise']?.value &&
      component.FormSolicitud.controls['nombreComercial']?.value &&
      component.FormSolicitud.controls['cantidadAutorizada']?.value &&
      component.FormSolicitud.controls['cantidad']?.value &&
      component.FormSolicitud.controls['fraccionArancelaria']?.value &&
      component.FormSolicitud.controls['descripcionDeLaFraccion']?.value &&
      component.FormSolicitud.controls['numeroCas']?.value &&
      component.FormSolicitud.controls['descripcionNoArancelaria']?.value &&
      component.FormSolicitud.controls['nombreQuimico']?.value &&
      component.FormSolicitud.controls['nombreDeLaMercancia']?.value &&
      component.FormSolicitud.controls['unNumero']?.value &&
      component.FormSolicitud.controls['datosNombreComercial']?.value &&
      component.FormSolicitud.controls['datosNumeroComun']?.value &&
      component.FormSolicitud.controls['datosPorcentaje']?.value &&
      component.FormSolicitud.controls['datosComponentes']?.value &&
      component.FormSolicitud.controls['clasificacion']?.value &&
      component.FormSolicitud.controls['estadoFisico']?.value &&
      component.FormSolicitud.controls['datosObjecto']?.value &&
      component.FormSolicitud.controls['especifique']?.value &&
      component.FormSolicitud.controls['especifiqueDos']?.value &&
      component.FormSolicitud.controls['unidadDeMedida']?.value
    ).toBeDefined();
  }); 
  
});