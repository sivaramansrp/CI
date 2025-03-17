import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentacionComponent } from './representacion.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('RepresentacionComponent', () => {
  let component: RepresentacionComponent;
  let fixture: ComponentFixture<RepresentacionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepresentacionComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CommonModule,
        CatalogoSelectComponent,
        TituloComponent,
        AlertComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.frmRepresentacion).toBeDefined();
    expect(component.frmRepresentacion.controls['entidad']).toBeDefined();
    expect(component.frmRepresentacion.controls['representacion']).toBeDefined();
  });

  it('should initialize the form with default values', () => {
    expect(component.frmRepresentacion.value).toEqual({
      entidad: '',
      representacion: '',
    });
  });

  it('should validate the form fields', () => {
    const form = component.frmRepresentacion;
    form.controls['entidad'].setValue('');
    form.controls['representacion'].setValue('');
    expect(form.valid).toBeFalsy();
    expect(form.controls['entidad'].errors?.['required']).toBeTruthy();
    expect(form.controls['representacion'].errors?.['required']).toBeTruthy();

    form.controls['entidad'].setValue('Entidad 1');
    form.controls['representacion'].setValue('Representacion 1');
    expect(form.valid).toBeTruthy();
  });

  it('should fetch entidad federativa options', () => {
    const mockEntidadFederativa = [{ id: 1, nombre: 'Entidad 1' }];
    component.fetchEntidadFederativa();
    const req = httpMock.expectOne('/assets/json/130109/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntidadFederativa);
    expect(component.entidadFederativa).toEqual(mockEntidadFederativa);
  });

  it('should fetch entidadFederativa options successfully', () => {
    spyOn(component['http'], 'get').and.returnValue(of([{ id: 1, name: 'Option 1' }]));
    component.fetchEntidadFederativa();
    expect(component.entidadFederativa).toEqual([{ id: 1, name: 'Option 1' }]);
  });

  it('should handle fetch entidadFederativa error', () => {
    spyOn(component['http'], 'get').and.returnValue(throwError('Error'));
    component.fetchEntidadFederativa();
    expect(component.entidadFederativa).toEqual([]);
  });

  it('should fetch representacion federal options', () => {
    const mockRepresentacionFederal = [{ id: 1, nombre: 'Representacion 1' }];
    component.fetchRepresentacionFederal();
    const req = httpMock.expectOne('/assets/json/130109/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepresentacionFederal);
    expect(component.representacionFederal).toEqual(mockRepresentacionFederal);
  });

  it('should fetch representacionFederal options successfully', () => {
    spyOn(component['http'], 'get').and.returnValue(of([{ id: 1, name: 'Option 1' }]));
    component.fetchRepresentacionFederal();
    expect(component.representacionFederal).toEqual([{ id: 1, name: 'Option 1' }]);
  });

  it('should handle fetch representacionFederal error', () => {
    spyOn(component['http'], 'get').and.returnValue(throwError('Error'));
    component.fetchRepresentacionFederal();
    expect(component.representacionFederal).toEqual([]);
  });

  it('should submit the form when valid', () => {
    const form = component.frmRepresentacion;
    form.controls['entidad'].setValue('Entidad 1');
    form.controls['representacion'].setValue('Representacion 1');
    expect(form.valid).toBeTruthy();
    // Add form submission logic here
  });

  it('should not submit the form when invalid', () => {
    const form = component.frmRepresentacion;
    form.controls['entidad'].setValue('');
    form.controls['representacion'].setValue('');
    expect(form.valid).toBeFalsy();
    // Add form submission logic here
  });

  it('should display validation messages when form fields are touched and left empty', () => {
    const form = component.frmRepresentacion;
    form.controls['entidad'].markAsTouched();
    form.controls['representacion'].markAsTouched();
    fixture.detectChanges();

    const entidadError = fixture.nativeElement.querySelector('.text-danger small');
    expect(entidadError.textContent).toContain('Debe seleccionar un valor.');

    const representacionError = fixture.nativeElement.querySelector('.text-danger small');
    expect(representacionError.textContent).toContain('Debe seleccionar un valor.');
  });

  afterEach(() => {
    httpMock.verify();
  });
});