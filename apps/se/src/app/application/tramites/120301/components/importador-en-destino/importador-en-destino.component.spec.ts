import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportadorEnDestinoComponent } from './importador-en-destino.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule, TituloComponent } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('ImportadorEnDestinoComponent', () => {
  let component: ImportadorEnDestinoComponent;
  let fixture: ComponentFixture<ImportadorEnDestinoComponent>;
  let elegibilidadTextilesService: ElegibilidadTextilesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportadorEnDestinoComponent],
      imports: [ReactiveFormsModule, TituloComponent,CommonModule,SharedModule, HttpClientTestingModule],
      providers: [ElegibilidadTextilesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorEnDestinoComponent);
    component = fixture.componentInstance;
    elegibilidadTextilesService = TestBed.inject(ElegibilidadTextilesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create importadorForm with default values', () => {
    expect(component.importadorForm).toBeDefined();
    expect(component.importadorForm.get('tipo')?.value).toBe('');
    expect(component.importadorForm.get('cantidadTotal')?.value).toBe('');
    expect(component.importadorForm.get('razonSocial')?.value).toBe('');
    expect(component.importadorForm.get('domicilio')?.value).toBe('');
    expect(component.importadorForm.get('ciudad')?.value).toBe('');
    expect(component.importadorForm.get('cp')?.value).toBe('');
    expect(component.importadorForm.get('pais')?.value).toBe('');
  });

  it('should create importadorEnDestino form with default values', () => {
    expect(component.importadorEnDestino).toBeDefined();
    expect(component.importadorEnDestino.get('tipo')?.value).toBe('');
  });

  it('should call obtenerIngresoSelectList and set tipo', () => {
    const MOCKDATA = [{ id: 1, descripcion: 'Tipo 1' }];
    spyOn(elegibilidadTextilesService, 'obtenerMenuDesplegable').and.returnValue(of(MOCKDATA));

    component.obtenerIngresoSelectList();

    expect(elegibilidadTextilesService.obtenerMenuDesplegable).toHaveBeenCalledWith('tipo.json');
    expect(component.tipoData).toEqual(MOCKDATA);
  });

  it('should validate importadorForm fields', () => {
    const form = component.importadorForm;
    form.get('tipo')?.setValue('');
    form.get('cantidadTotal')?.setValue('abc');
    form.get('razonSocial')?.setValue('');
    form.get('domicilio')?.setValue('');
    form.get('ciudad')?.setValue('');
    form.get('cp')?.setValue('1234');
    form.get('pais')?.setValue('');

    expect(form.valid).toBeFalsy();

    form.get('tipo')?.setValue('Tipo 1');
    form.get('cantidadTotal')?.setValue('100');
    form.get('razonSocial')?.setValue('Empresa S.A.');
    form.get('domicilio')?.setValue('Calle 123');
    form.get('ciudad')?.setValue('Ciudad');
    form.get('cp')?.setValue('12345');
    form.get('pais')?.setValue('País');

    expect(form.valid).toBeTruthy();
  });
});