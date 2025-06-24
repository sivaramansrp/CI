import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarResiduosComponent } from './administrar-residuos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdministrarResiduosService } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarResiduosComponent', () => {
  let component: AdministrarResiduosComponent;
  let fixture: ComponentFixture<AdministrarResiduosComponent>;
  let serviceMock: jest.Mocked<AdministrarResiduosService>;

beforeEach(async () => {
  serviceMock = {
    getAdministrarResiduos: jest.fn().mockReturnValue(of([])) // <-- FIXED
  } as any;

  await TestBed.configureTestingModule({
    imports: [AdministrarResiduosComponent, ReactiveFormsModule],
    providers: [
      FormBuilder,
      { provide: AdministrarResiduosService, useValue: serviceMock }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  fixture = TestBed.createComponent(AdministrarResiduosComponent);
  component = fixture.componentInstance;
  // If destroyed$ is not declared in your component, add it for test
  if (!(component as any).destroyed$) {
    (component as any).destroyed$ = new Subject<void>();
  }
  fixture.detectChanges();
});

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getEstablecimiento', () => {
    it('should set tableHeaderData and tableBodyData from getEstablecimientoTableData', () => {
      component.getEstablecimientoTableData = {
        tableHeader: ['header1', 'header2'],
        tableBody: [{ tbodyData: ['row1'] }, { tbodyData: ['row2'] }]
      };
      component.getEstablecimiento();
      expect(component.tableHeaderData).toEqual(['header1', 'header2']);
      expect(component.tableBodyData).toEqual([{ tbodyData: ['row1'] }, { tbodyData: ['row2'] }]);
    });
  });

  describe('actualizarRecuentoTotalDeFilas', () => {
    it('should patch the form with the total row count', () => {
      component.formularioParaRecuentoTotal = new FormBuilder().group({
        recuentoTotalDeFilas: [{ value: '', disabled: true }]
      });
      component.tableBodyData = [{ tbodyData: ['a'] }, { tbodyData: ['b'] }, { tbodyData: ['c'] }];
      component.actualizarRecuentoTotalDeFilas();
      expect(component.formularioParaRecuentoTotal.get('recuentoTotalDeFilas')?.value).toBe(3);
    });
  });

  describe('loadAdministrarResiduos', () => {
    it('should load data, call getEstablecimiento and actualizarRecuentoTotalDeFilas', () => {
      const mockData = {
        tableHeader: ['header1'],
        tableBody: [{ tbodyData: ['row1'] }]
      };
      serviceMock.getAdministrarResiduos.mockReturnValue(of(mockData));
      const getEstablecimientoSpy = jest.spyOn(component, 'getEstablecimiento');
      const actualizarRecuentoSpy = jest.spyOn(component, 'actualizarRecuentoTotalDeFilas');
      component.loadAdministrarResiduos();
      expect(component.getEstablecimientoTableData).toEqual(mockData);
      expect(getEstablecimientoSpy).toHaveBeenCalled();
      expect(actualizarRecuentoSpy).toHaveBeenCalled();
    });
  });
});