import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CertificadoKimberleyComponent } from './certificado-kimberley.component';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';

describe('CertificadoKimberleyComponent', () => {
  let component: CertificadoKimberleyComponent;
  let fixture: ComponentFixture<CertificadoKimberleyComponent>;
  let mockStore: jest.Mocked<Tramite130203Store>;
  let mockQuery: jest.Mocked<Tramite130203Query>;
  let mockService: jest.Mocked<ExportacionDeDiamantesEnBrutoService>;

  beforeEach(async () => {
    mockStore = {
      setNombreExportador: jest.fn(),
      setDireccionExportador: jest.fn(),
      setNombreImportador: jest.fn(),
      setDireccionImportador: jest.fn(),
      setNumeroEnLetraDeLosLotes: jest.fn(),
      setNumeroEnLetraDeLosLotesEnIngles: jest.fn(),
      setNumeroDeFactura: jest.fn(),
      setCantidadEnQuilates: jest.fn(),
      setValorDeLosDiamantes: jest.fn(),
    } as any;

    mockQuery = {
      nombreExportador$: of('Test Exporter'),
      direccionExportador$: of('Test Address'),
      nombreImportador$: of('Test Importer'),
      direccionImportador$: of('Importer Address'),
      numeroEnLetraDeLosLotes$: of('One'),
      numeroEnLetraDeLosLotesEnIngles$: of('One (English)'),
      numeroDeFactura$: of('12345'),
      cantidadEnQuilates$: of('100'),
      valorDeLosDiamantes$: of('5000'),
      select: jest.fn((selector: any) => of(selector)),
    } as any;

    mockService = {
      getPaisesEmisores: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Country1' }])),
      getNombresIngles: jest.fn().mockReturnValue(of([{ codigo: '1', nombre: 'Country1' }])),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CertificadoKimberleyComponent],
      declarations: [],
      providers: [
        { provide: Tramite130203Store, useValue: mockStore },
        { provide: Tramite130203Query, useValue: mockQuery },
        { provide: ExportacionDeDiamantesEnBrutoService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoKimberleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize forms and load data', fakeAsync(() => {
      expect(component.formularioEmpresa).toBeDefined();
      tick();
      expect(mockService.getPaisesEmisores).toHaveBeenCalled();
      expect(mockService.getNombresIngles).toHaveBeenCalled();
      expect(component.paisesEmisores.length).toBe(1);
      expect(component.nombresIngles.length).toBe(1);
    }));

    it('should subscribe to observables and update form values', () => {
      expect(component.datosDelExportador.get('nombreExportador')?.value).toBe('Test Exporter');
      expect(component.datosDelExportador.get('direccionExportador')?.value).toBe('Test Address');
    });
  });

  describe('updateNombreIngles', () => {
    it('should update the nombre field based on the selected country', () => {
      component.nombresIngles = [{ idDelPais: 1, name: 'Country1' }];
      component.updateNombreIngles(1);
      expect(component.formularioEmpresa.get('nombre')?.value).toBe('Country1');
    });

    it('should handle empty nombresIngles gracefully', () => {
      component.nombresIngles = [];
      component.updateNombreIngles(1);
      expect(component.formularioEmpresa.get('nombre')?.value).toBe('');
    });
  });

  describe('setValoresStore', () => {
    it('should call the appropriate store method with the correct value', () => {
      component.formularioEmpresa.get('nombre')?.setValue('Test Name');
      component.setValoresStore(component.formularioEmpresa, 'nombre', 'setNombreExportador');
      expect(mockStore.setNombreExportador).toHaveBeenCalledWith('Test Name');
    });
  });

  describe('isInvalid', () => {
    it('should return true for invalid form controls', () => {
      component.formularioEmpresa.get('numero')?.setValue('');
      expect(component.isInvalid('numero')).toBe(true);
    });
  });

  describe('ngOnDestroy', () => {
    it('should clean up subscriptions', () => {
      const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      component.ngOnDestroy();
      expect(destroyedSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});