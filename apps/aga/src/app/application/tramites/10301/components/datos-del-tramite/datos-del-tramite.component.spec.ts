import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { ImportadorExportadorService } from '../../services/importador-exportador.service';
import { of as observableOf } from 'rxjs';
import { SELECCION } from '../../constantes/importador-exportador.enum';


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
    // Instantiate the component with a dummy service
    // component = new DatosDelTramiteComponent(new DummyImportadorExportadorService());
    // Initialize arrays with some test values
    component.selectRangoDias = []; // will be set per test
    component.fechasSeleccionadas = [];
    component.fechasSeleccionadas = ['date1', 'date2', 'date3'];
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

  // it('should run #agregar() with "t"', () => {
  //   component.selectRangoDias = ['2021-01-01', '2021-01-02'];
  //   component.agregar('t');
  //   expect(component.fechasSeleccionadas).toEqual(component.selectRangoDias);
  //   expect(component.fechasDatos).toEqual([]);
  // });

  

  // it('should run #quitar() with "t"', () => {
  //   component.fechasSeleccionadas = ['2021-01-01', '2021-01-02'];
  //   component.quitar('t');
  //   expect(component.fechasDatos).toEqual(['2021-01-01', '2021-01-02']);
  //   expect(component.fechasSeleccionadas).toEqual([]);
  // });

  it('should copy selectRangoDias into fechasSeleccionadas and clear fechasDatos when tipo is SELECT_ALL', () => {
    // Arrange
    component.selectRangoDias = ['day1', 'day2', 'day3'];
    component.fechasDatos = ['irrelevant']; // will be cleared
    // Act
    component.agregar(SELECCION.SELECT_ALL);
    // Assert
    expect(component.fechasSeleccionadas).toEqual(['day1', 'day2', 'day3']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should move one date from fechasDatos to fechasSeleccionadas when tipo is not SELECT_ALL', () => {
    // Arrange
    component.fechasDatos = ['a', 'b', 'c'];
    component.fechasSeleccionadas = [];
    // Simulate that the form control "fecha" returns an array with a string index "1"
    // When mapped, it becomes [1] (and when used for indexing, JavaScript converts it to "1")
    component.fecha = { value: ['1'] } as any;
    // Act
    component.agregar('nonSelectAllType');
    // Assert:
    // It should add the element at index 1 ("b") into fechasSeleccionadas.
    expect(component.fechasSeleccionadas).toEqual(['b']);
    // And remove that element from fechasDatos (leaving "a" and "c")
    expect(component.fechasDatos).toEqual(['a', 'c']);
  });

  it('should move all dates when tipo is SELECT_ALL', () => {
    // Act
    component.quitar(SELECCION.SELECT_ALL);
    // Assert: fechasDatos should become a copy of fechasSeleccionadas and then fechasSeleccionadas becomes empty
    expect(component.fechasDatos).toEqual(['date1', 'date2', 'date3']);
    expect(component.fechasSeleccionadas).toEqual([]);
  });

  it('should move a single date when tipo is not SELECT_ALL', () => {
    // Setup: Reset arrays for this test
    component.fechasSeleccionadas = ['date1', 'date2', 'date3'];
    component.fechasDatos = [];
    // Simulate the FormControl value for fechaSeleccionada as an array with one string element.
    // For example, selecting index 1 (i.e. 'date2'):
    component.fechaSeleccionada = { value: ['1'] } as any;
    // Act: Call quitar() without parameters
    component.quitar();
    // Since fechaSeleccionada.value.map(Number) will yield [1],
    // the code uses that as the index to move the element from fechasSeleccionadas.
    // Thus, it should move the element at index 1 ('date2').
    expect(component.fechasDatos).toEqual(['date2']);
    // And remove it from fechasSeleccionadas, leaving the remaining dates.
    expect(component.fechasSeleccionadas).toEqual(['date1', 'date3']);
  });

  it('should run #quitar() without "t"', () => {
    component.fechasSeleccionadas = ['2021-01-01', '2021-01-02'];
    component.fechaSeleccionada.setValue([0]);
    component.quitar('');
    expect(component.fechasDatos).toContain('2021-01-01');
    expect(component.fechasSeleccionadas).not.toContain('2021-01-01');
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