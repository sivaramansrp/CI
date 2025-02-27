import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import

import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { InvocarActionService } from 'libs/shared/data-access-user/src/core/services/230401/invocar-action.service';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let invocarService: InvocarActionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [HttpClientTestingModule, CatalogoSelectComponent,
         ReactiveFormsModule, TituloComponent], 
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
    const bancoInput = component.pagoDerechos.controls['banco'];
    const fechaInput = component.pagoDerechos.controls['fecha'];

    bancoInput.setValue('');
    fechaInput.setValue('');
    expect(bancoInput.valid).toBeFalsy();
    expect(fechaInput.valid).toBeFalsy();

    bancoInput.setValue('Bancomer');
    fechaInput.setValue('12/12/2021');
    expect(bancoInput.valid).toBeTruthy();
    expect(fechaInput.valid).toBeTruthy();
  });
  it('should show validation errors', () => {
    const fechaInput = component.pagoDerechos.controls['fecha'];
    fechaInput.setValue('');
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    const fechaError = compiled.querySelector('.fecha-error');

    expect(fechaError ? fechaError.textContent : '').toContain('');
  });
  it('should validate form clave', () => {
    const clave = component.pagoDerechos.controls['clave'];
    clave.enable();
    clave.setValue('');
    clave.updateValueAndValidity();
    fixture.detectChanges();
    expect(clave.valid).toBeTruthy();
    clave.setValue('084001963');
    clave.updateValueAndValidity();
    fixture.detectChanges();
    expect(clave.valid).toBeTruthy();
  });
  it('should validate form dependencia', () => {
    const dependencia = component.pagoDerechos.controls['dependencia'];
    dependencia.enable();
    dependencia.setValue('');
    dependencia.updateValueAndValidity();
    fixture.detectChanges();
    expect(dependencia.valid).toBeTruthy();
    dependencia.setValue('0100160910791');
    dependencia.updateValueAndValidity();
    fixture.detectChanges();
    expect(dependencia.valid).toBeTruthy();
  });
  it('should validate form llavePago', () => {
    const llavePago = component.pagoDerechos.controls['llavePago'];
    llavePago.enable();
    llavePago.setValue('');
    llavePago.updateValueAndValidity();
    fixture.detectChanges();
    expect(llavePago.valid).toBeTruthy();
    llavePago.setValue('12345LLPCI');
    llavePago.updateValueAndValidity();
    fixture.detectChanges();
    expect(llavePago.valid).toBeTruthy();
  });
  it('should validate form importePago', () => {
    const importePago = component.pagoDerechos.controls['importePago'];
    importePago.enable();
    importePago.setValue('');
    importePago.updateValueAndValidity();
    fixture.detectChanges();
    expect(importePago.valid).toBeTruthy();
    importePago.setValue('1842');
    importePago.updateValueAndValidity();
    fixture.detectChanges();
    expect(importePago.valid).toBeTruthy();
  });
  it('should validate form banco', () => {
    const banco = component.pagoDerechos.controls['banco'];
    banco.enable();
    banco.setValue('');
    banco.updateValueAndValidity();
    fixture.detectChanges();
    expect(banco.valid).toBeFalsy();
    banco.setValue('Bancomer');
    banco.updateValueAndValidity();
    fixture.detectChanges();
    expect(banco.valid).toBeTruthy();
  });
  it('should validate form fecha', () => {
    const fecha = component.pagoDerechos.controls['fecha'];
    fecha.enable();
    fecha.setValue('');
    fecha.updateValueAndValidity();
    fixture.detectChanges();
    expect(fecha.valid).toBeFalsy();
    fecha.setValue('12/12/2021');
    fecha.updateValueAndValidity();
    fixture.detectChanges();
    expect(fecha.valid).toBeTruthy();
  });
  it('should validate form importePago', () => {
    const importePago = component.pagoDerechos.controls['importePago'];
    importePago.enable();
    importePago.setValue('');
    importePago.updateValueAndValidity();
    fixture.detectChanges();
    expect(importePago.valid).toBeTruthy();
    importePago.setValue('1842');
    importePago.updateValueAndValidity();
    fixture.detectChanges();
    expect(importePago.valid).toBeTruthy();
  });
  it('should validate form fecha', () => {
    const fecha = component.pagoDerechos.controls['fecha'];
    fecha.enable();
    fecha.setValue('');
    fecha.updateValueAndValidity();
    fixture.detectChanges();
    expect(fecha.valid).toBeFalsy();
    fecha.setValue('12/12/2021');
    fecha.updateValueAndValidity();
    fixture.detectChanges();
    expect(fecha.valid).toBeTruthy();
  });
  it('should validate form banco', () => {
    const banco = component.pagoDerechos.controls['banco'];
    banco.enable();
    banco.setValue('');
    banco.updateValueAndValidity();
    fixture.detectChanges();
    expect(banco.valid).toBeFalsy();
    banco.setValue('Bancomer');
    banco.updateValueAndValidity();
    fixture.detectChanges();
    expect(banco.valid).toBeTruthy();
  });
  
  it('should call clasificacionSeleccione', () => {
    const clasificacionSpy = jest.spyOn(component, 'clasificacionSeleccione').mockImplementation();
    component.clasificacionSeleccione();
    expect(clasificacionSpy).toHaveBeenCalled();
  });
  it('should call initicializaPagoDerechosCatalogo', () => {
    const initicializaPagoDerechosCatalogoSpy = jest.spyOn(invocarService, 'initicializaPagoDerechosCatalogo').mockImplementation();
    invocarService.initicializaPagoDerechosCatalogo();
    expect(initicializaPagoDerechosCatalogoSpy).toHaveBeenCalled();
  });
  it('should call createPagoDerechos', () => {
    const createPagoDerechosSpy = jest.spyOn(component, 'createPagoDerechos').mockImplementation();
    component.createPagoDerechos();
    expect(createPagoDerechosSpy).toHaveBeenCalled();
  });
  it('should call ngOnInit', () => {
    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit').mockImplementation();
    component.ngOnInit();
    expect(ngOnInitSpy).toHaveBeenCalled();
  });

});
