import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvocarActionService } from 'libs/shared/data-access-user/src/core/services/230401/invocar-action.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';


describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let invocarService: InvocarActionService;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, TituloComponent, AlertComponent,
        
      ],
  
    })
    .compileComponents();
    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    invocarService = TestBed.inject(InvocarActionService);
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
    expect(invocarService).toBeDefined();
  });
  it('should have defined a variable listoBanco', () => {  
    expect(invocarService.listoBanco).toBeDefined();
  });
  it('should have defined listoBanco array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.listoBanco.length).toBe(0);
  });
  it('should have defined a variable tiposSolicitud', () => {  
    expect(invocarService.tiposSolicitud).toBeDefined();
  });
  it('should have defined tiposSolicitud array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.tiposSolicitud.length).toBe(0);
  });
  it('should have defined a variable noDePermisocoferprise', () => {  
    expect(invocarService.noDePermisocoferprise).toBeDefined();
  });
  it('should have defined noDePermisocoferprise array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.noDePermisocoferprise.length).toBe(0);
  });
  it('should have defined a variable fraccionArancelaria', () => {  
    expect(invocarService.fraccionArancelaria).toBeDefined();
  });
  it('should have defined fraccionArancelaria array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.fraccionArancelaria.length).toBe(0);
  });
  it('should have defined a variable tipoPersona', () => {  
    expect(invocarService.numeroCas).toBeDefined();
  });
  it('should have defined numeroCas array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.numeroCas.length).toBe(0);
  });
  it('should have defined a variable clasificacion', () => {  
    expect(invocarService.clasificacion).toBeDefined();
  });
  it('should have defined clasificacion array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.clasificacion.length).toBe(0);
  });
  it('should have defined a variable estadoFisico', () => {  
    expect(invocarService.estadoFisico).toBeDefined();
  });
  it('should have defined estadoFisico array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.estadoFisico.length).toBe(0);
  });
  it('should have defined a variable datosObjecto', () => {  
    expect(invocarService.datosObjecto).toBeDefined();
  });
  it('should have defined datosObjecto array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.datosObjecto.length).toBe(0);
  });
  it('should have defined a variable unidadDeMedida', () => {  
    expect(invocarService.unidadDeMedida).toBeDefined();
  });
  it('should have defined unidadDeMedida array empty', () => {  
    invocarService.initicializaPagoDerechosCatalogo();
    fixture.detectChanges();
    expect(invocarService.unidadDeMedida.length).toBe(0);
  });
  it('should call ngOnInit', () => {
    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit').mockImplementation();
    component.ngOnInit();
    expect(ngOnInitSpy).toHaveBeenCalled();
  });
  it('should call ngOnDestroy', () => {
    const ngOnDestroySpy = jest.spyOn(component, 'ngOnDestroy').mockImplementation();
    component.ngOnDestroy();
    expect(ngOnDestroySpy).toHaveBeenCalled();
  });
  it('should format and set cantidad value correctly', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore').mockImplementation();
    form.get('cantidad')?.setValue('65'); // ASCII code for 'A'
    component.setValoresStore(form, 'cantidad', 'setCantidadLetra');
    expect(setValoresStoreSpy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(form.get('cantidad')?.value).toEqual('65');
    form.get('cantidad')?.setValue('60'); // ASCII code for 'A'
    component.setValoresStore(form, 'cantidad', 'setCantidadLetra');
    fixture.detectChanges();
    expect(form.get('cantidad')?.value).not.toEqual('65');
  });
  it('should call tipoSolicitudSeleccion', () => {
    const tipoSolicitudSeleccionySpy = jest.spyOn(component, 'tipoSolicitudSeleccion').mockImplementation();
    component.tipoSolicitudSeleccion();
    expect(tipoSolicitudSeleccionySpy).toHaveBeenCalled();
  });
  it('should call noDePermisocoferpriseSeleccion', () => {
    const noDePermisocoferpriseSeleccionSpy = jest.spyOn(component, 'noDePermisocoferpriseSeleccion').mockImplementation();
    component.noDePermisocoferpriseSeleccion();
    expect(noDePermisocoferpriseSeleccionSpy).toHaveBeenCalled();
  });
  it('should call fraccionArancelariaSeleccion', () => {
    const fraccionArancelariaSeleccionSpy = jest.spyOn(component, 'fraccionArancelariaSeleccion').mockImplementation();
    component.fraccionArancelariaSeleccion();
    expect(fraccionArancelariaSeleccionSpy).toHaveBeenCalled();
  });
  it('should call seleccioneAutorizacion', () => {
    const seleccioneAutorizacionSpy = jest.spyOn(component, 'seleccioneAutorizacion').mockImplementation();
    component.seleccioneAutorizacion();
    expect(seleccioneAutorizacionSpy).toHaveBeenCalled();
  });
  it('should call numeroCasSeleccione', () => {
    const numeroCasSeleccioneSpy = jest.spyOn(component, 'numeroCasSeleccione').mockImplementation();
    component.numeroCasSeleccione();
    expect(numeroCasSeleccioneSpy).toHaveBeenCalled();
  });
  it('should call clasificacionSeleccione', () => {
    const clasificacionSeleccioneSpy = jest.spyOn(component, 'clasificacionSeleccione').mockImplementation();
    component.clasificacionSeleccione();
    expect(clasificacionSeleccioneSpy).toHaveBeenCalled();
  });
  it('should call estadoFisicoSeleccione', () => {
    const estadoFisicoSeleccioneSpy = jest.spyOn(component, 'estadoFisicoSeleccione').mockImplementation();
    component.estadoFisicoSeleccione();
    expect(estadoFisicoSeleccioneSpy).toHaveBeenCalled();
  });
  it('should call datosObjectoSeleccione', () => {
    const datosObjectoSeleccioneSpy = jest.spyOn(component, 'datosObjectoSeleccione').mockImplementation();
    component.datosObjectoSeleccione();
    expect(datosObjectoSeleccioneSpy).toHaveBeenCalled();
  });
  it('should call unidadDeMedidaSeleccione', () => {
    const unidadDeMedidaSeleccioneSpy = jest.spyOn(component, 'unidadDeMedidaSeleccione').mockImplementation();
    component.unidadDeMedidaSeleccione();
    expect(unidadDeMedidaSeleccioneSpy).toHaveBeenCalled();
  });
  it('should call creatFormSolicitud', () => {
    const creatFormSolicitudSpy = jest.spyOn(component, 'creatFormSolicitud').mockImplementation();
    component.creatFormSolicitud();
    expect(creatFormSolicitudSpy).toHaveBeenCalled();
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
  it('should initialize the form', () => {
    expect(component.FormSolicitud).toBeDefined();
    expect(
      component.FormSolicitud.controls['tipoSolicitud'] &&
      component.FormSolicitud.controls['autorizacion'] &&
      component.FormSolicitud.controls['noDePermisocoferprise'] &&
      component.FormSolicitud.controls['nombreComercial'] &&
      component.FormSolicitud.controls['cantidadAtorizada'] &&
      component.FormSolicitud.controls['cantidad'] &&
      component.FormSolicitud.controls['fraccionArancelaria'] &&
      component.FormSolicitud.controls['descripcionDeLaFraccion'] &&
      component.FormSolicitud.controls['numeroCas'] &&
      component.FormSolicitud.controls['descripcionNoArancelaria'] &&
      component.FormSolicitud.controls['nombreQuimico'] &&
      component.FormSolicitud.controls['nombreDeLaMercancia'] &&
      component.FormSolicitud.controls['unNumero'] &&
      component.FormSolicitud.controls['datosNombreComercial'] &&
      component.FormSolicitud.controls['datosNumeroComun'] &&
      component.FormSolicitud.controls['datosPorcentaje'] &&
      component.FormSolicitud.controls['datosComponentes'] &&
      component.FormSolicitud.controls['clasificacion'] &&
      component.FormSolicitud.controls['estadoFisico'] &&
      component.FormSolicitud.controls['datosObjecto'] &&
      component.FormSolicitud.controls['especifique'] &&
      component.FormSolicitud.controls['especifiqueDos'] &&
      component.FormSolicitud.controls['unidadDeMedida']
    ).toBeDefined();
  });
});