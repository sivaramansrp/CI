import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { DatosDelGeneradorDeResiduosComponent } from './datos-del-generador-de-residuos.component';
import { Catalogo, CATALOGOS_ID, CatalogosService } from '@libs/shared/data-access-user/src';

describe('DatosDelGeneradorDeResiduosComponent', () => {
  let component: DatosDelGeneradorDeResiduosComponent;
  let fixture: ComponentFixture<DatosDelGeneradorDeResiduosComponent>;
  let catalogosService: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    const catalogosServiceSpy: jest.Mocked<CatalogosService> = {
      getCatalogo: jest.fn(),
      // add other methods if needed
    } as any;

    await TestBed.configureTestingModule({
      imports: [DatosDelGeneradorDeResiduosComponent, ReactiveFormsModule],
      providers: [{ provide: CatalogosService, useValue: catalogosServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelGeneradorDeResiduosComponent);
    component = fixture.componentInstance;
    catalogosService = TestBed.inject(CatalogosService) as jest.Mocked<CatalogosService>;
  });
  
    it('should initialize the form on ngOnInit', () => {
      catalogosService.getCatalogo.mockReturnValue(of([])); // Mock the service call
      component.ngOnInit();
      expect(component.datosForm).toBeDefined();
      expect(component.datosForm.get('aduanas')).toBeDefined();
    });
  
    it('should fetch aduanas data on ngOnInit', () => {
      const mockAduanas: Catalogo[] = [{ id: 1, descripcion: 'Aduana 1' }];
      catalogosService.getCatalogo.mockReturnValue(of(mockAduanas)); // Mock the service call
  
      component.ngOnInit();
  
      expect(catalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_ADUANAS);
      expect(component.aduanas).toEqual(mockAduanas);
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
      jest.spyOn(console, 'log').mockImplementation();
      // Mock the service call to avoid undefined subscribe error
      catalogosService.getCatalogo.mockReturnValue(of([]));
      component.solicitudForm = component.fb.group({
        datosdelForm: component.fb.group({
          numeroRegistroAmbiental: ['123', Validators.required],
          descripcionGenerica1: ['Description', Validators.required],
          numeroProgramaImmex: ['456', Validators.required],
        })
      });
  
      fixture.detectChanges(); // Ensure form state is updated
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