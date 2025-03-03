import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { ImportadorExportadorService } from '@ng-mf/data-access-user';
import { of as observableOf } from 'rxjs';


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
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [DatosDelTramiteComponent],
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

  it('should run #agregar() with "t"', () => {
    component.selectRangoDias = ['2021-01-01', '2021-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(component.selectRangoDias);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should run #agregar() without "t"', () => {
    component.fechasDatos = ['2021-01-01', '2021-01-02'];
    component.fecha.setValue([0]);
    component.agregar('');
    expect(component.fechasSeleccionadas).toContain('2021-01-01');
    expect(component.fechasDatos).not.toContain('2021-01-01');
  });

  it('should run #quitar() with "t"', () => {
    component.fechasSeleccionadas = ['2021-01-01', '2021-01-02'];
    component.quitar('t');
    expect(component.fechasDatos).toEqual(['2021-01-01', '2021-01-02']);
    expect(component.fechasSeleccionadas).toEqual([]);
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