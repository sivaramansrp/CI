/* eslint-disable dot-notation */
import { CatalogoSelectComponent,TituloComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvocarActionService } from '../../services/invocar-action.service';
import { InvocarModuloModule } from '../../invocar-modulo.module';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let invocarService: InvocarActionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [
        CatalogoSelectComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TituloComponent,InvocarModuloModule
      ], 
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    invocarService = TestBed.inject(InvocarActionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
  it('should initialize the form', () => {
    expect(component.pagoDerechos).toBeDefined();
    expect(
      // eslint-disable-next-line dot-notation
      component.pagoDerechos.controls['clave'] &&
      component.pagoDerechos.controls['dependencia'] &&
      component.pagoDerechos.controls['banco'] &&
      component.pagoDerechos.controls['llavePago'] &&
      component.pagoDerechos.controls['fecha'] &&
      component.pagoDerechos.controls['importePago']
    ).toBeDefined();
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
  it('should have a form with default values', () => {
    expect(component.pagoDerechos.get('clave')?.value).toBe('084001963');
    expect(component.pagoDerechos.get('dependencia')?.value).toBe('0100160910791');
    expect(component.pagoDerechos.get('llavePago')?.value).toBe('12345LLPCI');
    expect(component.pagoDerechos.get('importePago')?.value).toBe('1842');
    expect(component.pagoDerechos.get('fecha')?.value).toBe('');
    expect(component.pagoDerechos.get('banco')?.value).toBe('');
  });
  it('should validate the form', () => {
    const BANCOINPUT = component.pagoDerechos.controls['banco'];
    const FECHAINPUT = component.pagoDerechos.controls['fecha'];

    BANCOINPUT.setValue('');
    FECHAINPUT.setValue('');
    expect(BANCOINPUT.valid).toBeFalsy();
    expect(FECHAINPUT.valid).toBeFalsy();

    BANCOINPUT.setValue('Bancomer');
    FECHAINPUT.setValue('12/12/2021');
    expect(BANCOINPUT.valid).toBeTruthy();
    expect(FECHAINPUT.valid).toBeTruthy();
  });
  it('should show validation errors', () => {
    const FECHAINPUT = component.pagoDerechos.controls['fecha'];
    FECHAINPUT.setValue('');
    fixture.detectChanges();
  
    const COMPILIED = fixture.nativeElement;
    const FECHA_ERROR = COMPILIED.querySelector('.fecha-error');

    expect(FECHA_ERROR ? FECHA_ERROR.textContent : '').toContain('');
  });
  it('should validate form clave', () => {
    const CLAVE = component.pagoDerechos.controls['clave'];
    CLAVE.enable();
    CLAVE.setValue('');
    CLAVE.updateValueAndValidity();
    fixture.detectChanges();
    expect(CLAVE.valid).toBeTruthy();
    CLAVE.setValue('084001963');
    CLAVE.updateValueAndValidity();
    fixture.detectChanges();
    expect(CLAVE.valid).toBeTruthy();
  });
  it('should validate form dependencia', () => {
    const DEPENDENCIA = component.pagoDerechos.controls['dependencia'];
    DEPENDENCIA.enable();
    DEPENDENCIA.setValue('');
    DEPENDENCIA.updateValueAndValidity();
    fixture.detectChanges();
    expect(DEPENDENCIA.valid).toBeTruthy();
    DEPENDENCIA.setValue('0100160910791');
    DEPENDENCIA.updateValueAndValidity();
    fixture.detectChanges();
    expect(DEPENDENCIA.valid).toBeTruthy();
  });
  it('should validate form llavePago', () => {
    const LLAVEPAGO = component.pagoDerechos.controls['llavePago'];
    LLAVEPAGO.enable();
    LLAVEPAGO.setValue('');
    LLAVEPAGO.updateValueAndValidity();
    fixture.detectChanges();
    expect(LLAVEPAGO.valid).toBeTruthy();
    LLAVEPAGO.setValue('12345LLPCI');
    LLAVEPAGO.updateValueAndValidity();
    fixture.detectChanges();
    expect(LLAVEPAGO.valid).toBeTruthy();
  });
  it('should validate form importePago', () => {
    const IMPORTEPAGO = component.pagoDerechos.controls['importePago'];
    IMPORTEPAGO.enable();
    IMPORTEPAGO.setValue('');
    IMPORTEPAGO.updateValueAndValidity();
    fixture.detectChanges();
    expect(IMPORTEPAGO.valid).toBeTruthy();
    IMPORTEPAGO.setValue('1842');
    IMPORTEPAGO.updateValueAndValidity();
    fixture.detectChanges();
    expect(IMPORTEPAGO.valid).toBeTruthy();
  });
  it('should validate form banco', () => {
    const BANCO = component.pagoDerechos.controls['banco'];
    BANCO.enable();
    BANCO.setValue('');
    BANCO.updateValueAndValidity();
    fixture.detectChanges();
    expect(BANCO.valid).toBeFalsy();
    BANCO.setValue('Bancomer');
    BANCO.updateValueAndValidity();
    fixture.detectChanges();
    expect(BANCO.valid).toBeTruthy();
  });
  it('should validate form fecha', () => {
    const FECHA = component.pagoDerechos.controls['fecha'];
    FECHA.enable();
    FECHA.setValue('');
    FECHA.updateValueAndValidity();
    fixture.detectChanges();
    expect(FECHA.valid).toBeFalsy();
    FECHA.setValue('12/12/2021');
    FECHA.updateValueAndValidity();
    fixture.detectChanges();
    expect(FECHA.valid).toBeTruthy();
  });
  it('should validate form importePago', () => {
    const IMPORTEPAGO = component.pagoDerechos.controls['importePago'];
    IMPORTEPAGO.enable();
    IMPORTEPAGO.setValue('');
    IMPORTEPAGO.updateValueAndValidity();
    fixture.detectChanges();
    expect(IMPORTEPAGO.valid).toBeTruthy();
    IMPORTEPAGO.setValue('1842');
    IMPORTEPAGO.updateValueAndValidity();
    fixture.detectChanges();
    expect(IMPORTEPAGO.valid).toBeTruthy();
  });
  it('should validate form fecha', () => {
    const FECHA = component.pagoDerechos.controls['fecha'];
    FECHA.enable();
    FECHA.setValue('');
    FECHA.updateValueAndValidity();
    fixture.detectChanges();
    expect(FECHA.valid).toBeFalsy();
    FECHA.setValue('12/12/2021');
    FECHA.updateValueAndValidity();
    fixture.detectChanges();
    expect(FECHA.valid).toBeTruthy();
  });
  it('should validate form banco', () => {
    const BANCO = component.pagoDerechos.controls['banco'];
    BANCO.enable();
    BANCO.setValue('');
    BANCO.updateValueAndValidity();
    fixture.detectChanges();
    expect(BANCO.valid).toBeFalsy();
    BANCO.setValue('Bancomer');
    BANCO.updateValueAndValidity();
    fixture.detectChanges();
    expect(BANCO.valid).toBeTruthy();
  });
  
  it('should call clasificacionSeleccione', () => {
    const CLASIFICACION_SPY = jest.spyOn(component, 'clasificacionSeleccione').mockImplementation();
    component.clasificacionSeleccione();
    expect(CLASIFICACION_SPY).toHaveBeenCalled();
  });
  it('should call initicializaPagoDerechosCatalogo', () => {
    const INITICIALIZA_PAGO_DERECHOS_CATALOGO_SPY = jest.spyOn(invocarService, 'initicializaPagoDerechosCatalogo').mockImplementation();
    invocarService.initicializaPagoDerechosCatalogo();
    expect(INITICIALIZA_PAGO_DERECHOS_CATALOGO_SPY).toHaveBeenCalled();
  });
  it('should call createPagoDerechos', () => {
    const CREATEPAGODERECHOSSPY = jest.spyOn(component, 'createPagoDerechos').mockImplementation();
    component.createPagoDerechos();
    expect(CREATEPAGODERECHOSSPY).toHaveBeenCalled();
  });
  it('should call ngOnInit', () => {
    const NG_ON_INIT_SPY = jest.spyOn(component, 'ngOnInit').mockImplementation();
    component.ngOnInit();
    expect(NG_ON_INIT_SPY).toHaveBeenCalled();
  });

});
