import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';

import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { DatosDelGeneradorDeResiduosComponent } from './datos-del-generador-de-residuos.component';

describe('DatosDelGeneradorDeResiduosComponent', () => {
  let component: DatosDelGeneradorDeResiduosComponent;
  let fixture: ComponentFixture<DatosDelGeneradorDeResiduosComponent>;
  let catalogosService: jasmine.SpyObj<CatalogosService>;
  
    beforeEach(async () => {
      const catalogosServiceSpy = jasmine.createSpyObj('CatalogosService', ['getCatalogo']);
  
      await TestBed.configureTestingModule({
        declarations: [DatosDelGeneradorDeResiduosComponent],
        imports: [ReactiveFormsModule],
        providers: [{ provide: CatalogosService, useValue: catalogosServiceSpy }]
      }).compileComponents();
  
      fixture = TestBed.createComponent(DatosDelGeneradorDeResiduosComponent);
      component = fixture.componentInstance;
      catalogosService = TestBed.inject(CatalogosService) as jasmine.SpyObj<CatalogosService>;
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should initialize the form on ngOnInit', () => {
      catalogosService.getCatalogo.and.returnValue(of([])); // Mock the service call
      component.ngOnInit();
      expect(component.datosForm).toBeDefined();
      expect(component.datosForm.get('aduanas')).toBeDefined();
    });
  
    it('should fetch aduanas data on ngOnInit', () => {
      const mockAduanas: Catalogo[] = [{ id: 1, descripcion: 'Aduana 1' }];
      catalogosService.getCatalogo.and.returnValue(of(mockAduanas));
  
      component.ngOnInit();
  
      expect(catalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_ADUANAS);
      expect(component.aduanas).toEqual(mockAduanas);
    });
  
    it('should set selectedAduana on onAduanaSelect', () => {
      component.datosForm = component.fb.group({
        aduanas: ['Aduana 1']
      });
  
      component.onAduanaSelect();
  
      expect(component.selectedAduana).toBe('Aduana 1');
    });
  
    it('should validate form controls correctly', () => {
      component.solicitudForm = component.fb.group({
        datosdelForm: component.fb.group({
          numeroRegistroAmbiental: ['', Validators.required],
          descripcionGenerica1: ['', Validators.required],
          numeroProgramaImmex: ['', Validators.required],
        })
      });
  
      const control = component.solicitudForm.get('datosdelForm.numeroRegistroAmbiental');
      control?.markAsTouched();
  
      expect(component.isInvalid('numeroRegistroAmbiental')).toBe(true);
    });
  
    it('should handle form submission correctly', () => {
      spyOn(console, 'log');
      component.solicitudForm = component.fb.group({
        datosdelForm: component.fb.group({
          numeroRegistroAmbiental: ['123', Validators.required],
          descripcionGenerica1: ['Description', Validators.required],
          numeroProgramaImmex: ['456', Validators.required],
        })
      });
  
      component.onSubmit();
  
      expect(console.log).toHaveBeenCalledWith('Formulario Enviado!', component.solicitudForm.value);
    });
  
    it('should log error if form is invalid on submission', () => {
      spyOn(console, 'log');
      component.solicitudForm = component.fb.group({
        datosdelForm: component.fb.group({
          numeroRegistroAmbiental: ['', Validators.required],
          descripcionGenerica1: ['', Validators.required],
          numeroProgramaImmex: ['', Validators.required],
        })
      });
  
      component.onSubmit();
  
      expect(console.log).toHaveBeenCalledWith('El formulario es inválido');
    });
  });