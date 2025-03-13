import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { DatosCertificadoComponent } from '../datos-certificado/datos-certificado.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110204Store } from '../../estados/tramite110204.store';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform, Directive, Injectable, Input } from '@angular/core';

@Injectable()
class MockTramite110204Store {}

@Injectable()
class MockTramite110204Query {
  formDatesCerticado$ = observableOf({});
  selectIdioma$ = observableOf([]);
  selectEntidadFederativa$ = observableOf([]);
  selectrepresentaconFederal$ = observableOf([]);
}

@Injectable()
class MockCertificadosOrigenGridService {
  obtenerIdioma = jest.fn().mockReturnValue(observableOf([]));
  obtenerRepresentacionFederal = jest.fn().mockReturnValue(observableOf([]));
  obtenerEntidadFederativa = jest.fn().mockReturnValue(observableOf([]));
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) { return value; }
}

describe('DatosCertificadoComponent', () => {
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let component: DatosCertificadoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        DatosCertificadoComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: Tramite110204Store, useClass: MockTramite110204Store },
        { provide: Tramite110204Query, useClass: MockTramite110204Query },
        { provide: CertificadosOrigenGridService, useClass: MockCertificadosOrigenGridService },
        ToastrService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formDatesCerticado).toBeDefined();
  });

  it('should call cargarIdioma on ngOnInit', () => {
    const cargarIdiomaSpy = jest.spyOn(component, 'cargarIdioma');
    component.ngOnInit();
    expect(cargarIdiomaSpy).toHaveBeenCalled();
  });

  it('should call cargarEntidadFederativa on ngOnInit', () => {
    const cargarEntidadFederativaSpy = jest.spyOn(component, 'cargarEntidadFederativa');
    component.ngOnInit();
    expect(cargarEntidadFederativaSpy).toHaveBeenCalled();
  });

  it('should call cargarRepresentacionFederal on ngOnInit', () => {
    const cargarRepresentacionFederalSpy = jest.spyOn(component, 'cargarRepresentacionFederal');
    component.ngOnInit();
    expect(cargarRepresentacionFederalSpy).toHaveBeenCalled();
  });

  it('should validate form correctly', () => {
    component.formDatesCerticado.controls['observacionesDates'].setValue('');
    expect(component.formDatesCerticado.controls['observacionesDates'].valid).toBeFalsy();

    component.formDatesCerticado.controls['observacionesDates'].setValue('valid');
    expect(component.formDatesCerticado.controls['observacionesDates'].valid).toBeTruthy();
  });

  it('should call obtenerIdioma and setIdiomaDatos on cargarIdioma', () => {
    component.cargarIdioma();
    expect(component.certificadoService.obtenerIdioma).toHaveBeenCalled();
    expect(component.store.setIdiomaDatos).toHaveBeenCalled();
  });

  it('should call obtenerRepresentacionFederal and setRepresentacionFederalDatos on cargarRepresentacionFederal', () => {
    component.cargarRepresentacionFederal();
    expect(component.certificadoService.obtenerRepresentacionFederal).toHaveBeenCalled();
    expect(component.store.setRepresentacionFederalDatos).toHaveBeenCalled();
  });

  it('should call obtenerEntidadFederativa and setEntidadFederativaDatos on cargarEntidadFederativa', () => {
    component.cargarEntidadFederativa();
    expect(component.certificadoService.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.store.setEntidadFederativaDatos).toHaveBeenCalled();
  });

  it('should call ngOnDestroy and complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});