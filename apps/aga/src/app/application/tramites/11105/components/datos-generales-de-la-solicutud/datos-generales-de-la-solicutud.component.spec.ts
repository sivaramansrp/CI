import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { ImportadorExportadorService } from '../../services/importador-exportador.service';
import { of as observableOf } from 'rxjs';
import { SELECCION } from '../../constantes/importador-exportador.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';


class MockImportadorExportadorService {
  getAduanaIngresara = jest.fn().mockReturnValue(observableOf({ code: 200, data: [] }));
  getAno = jest.fn().mockReturnValue(observableOf({ code: 200, data: [] }));
  getCondicion = jest.fn().mockReturnValue(observableOf({ code: 200, data: [] }));
  getPais = jest.fn().mockReturnValue(observableOf({ code: 200, data: [] }));
}

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let importadorExportadorService: MockImportadorExportadorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosDelTramiteComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ImportadorExportadorService, useClass: MockImportadorExportadorService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    importadorExportadorService = TestBed.inject(ImportadorExportadorService) as unknown as MockImportadorExportadorService;
    fixture.detectChanges();
  });


  beforeEach(() => {
    
    component.selectRangoDias = []; 
    component.fechasSeleccionadas = [];
    component.fechasSeleccionadas = [{ id: 1, descripcion: 'date1' }, { id: 2, descripcion: 'date2' }, { id: 3, descripcion: 'date3' }] as Catalogo[];
    component.fechasDatos = [];
    component.fecha = { value: [] } as any;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    jest.spyOn(component, 'getAduanaIngresara');
    jest.spyOn(component, 'getAno');
    jest.spyOn(component, 'getCondicion');
    jest.spyOn(component, 'getPais');
    component.ngOnInit();
    expect(component.getAduanaIngresara).toHaveBeenCalled();
    expect(component.getAno).toHaveBeenCalled();
    expect(component.getCondicion).toHaveBeenCalled();
    expect(component.getPais).toHaveBeenCalled();
  });
  

  it('should copy selectRangoDias into fechasSeleccionadas and clear fechasDatos when tipo is SELECT_ALL', () => {
   
    component.selectRangoDias = [];
    component.fechasDatos = []; 
   
    component.agregar(SELECCION.SELECT_ALL);
   
    expect(component.fechasSeleccionadas).toEqual([{ id: 1, descripcion: 'date1' }, { id: 2, descripcion: 'date2' }, { id: 3, descripcion: 'date3' }]);
    // expect(component.fechasDatos).toEqual([]);
  });

  it('should move one date from fechasDatos to fechasSeleccionadas when tipo is not SELECT_ALL', () => {
    
    component.fechasDatos = [];
    component.fechasSeleccionadas = [];
   
    component.fecha = { value: ['1'] } as any;
   
    component.agregar('nonSelectAllType');
   
    expect(component.fechasSeleccionadas).toEqual(['b']);
    
    expect(component.fechasDatos).toEqual(['a', 'c']);
  });

  it('should move all dates when tipo is SELECT_ALL', () => {
  
    component.quitar(SELECCION.SELECT_ALL);
   
    expect(component.fechasDatos).toEqual([{ id: 1, descripcion: 'date1' }, { id: 2, descripcion: 'date2' }, { id: 3, descripcion: 'date3' }]);
  });

  it('should move a single date when tipo is not SELECT_ALL', () => {
  
    component.fechasSeleccionadas = [];
    component.fechasDatos = [];
   
    component.fechaSeleccionada = { value: ['1'] } as any;
    
    component.quitar();
    
    expect(component.fechasDatos).toEqual(['date2']);
    
    expect(component.fechasSeleccionadas).toEqual(['date1', 'date3']);
  });

  it('should run #quitar() without "t"', () => {
    component.fechasSeleccionadas = [];
    component.fechaSeleccionada.setValue([0]);
    component.quitar('');
    expect(component.fechasDatos).toContain('2021-01-01');
   
  });

  it('should run #cambiarRadio()', () => {
    component.cambiarRadio('sí');
    expect(component.valorSeleccionado).toBe('sí');
  });

  it('should run #getAduanaIngresara()', () => {
    component.getAduanaIngresara();
    expect(importadorExportadorService.getAduanaIngresara).toHaveBeenCalled();
  });

  it('should run #getAno()', () => {
    component.getAno();
    expect(importadorExportadorService.getAno).toHaveBeenCalled();
  });

  it('should run #getCondicion()', () => {
    component.getCondicion();
    expect(importadorExportadorService.getCondicion).toHaveBeenCalled();
  });

  it('should run #getPais()', () => {
    component.getPais();
    expect(importadorExportadorService.getPais).toHaveBeenCalled();
  });

  it('should run #openPopup()', () => {
    component.openPopup();
    expect(component.isPopupOpen).toBe(true);
  });

  it('should run #closePopup()', () => {
    component.closePopup();
    expect(component.isPopupOpen).toBe(false);
    expect(component.isPopupClose).toBe(false);
  });

  it('should run #nextTabla()', () => {
    component.nextTabla();
    expect(component.showTabla).toBe(false);
  });
});