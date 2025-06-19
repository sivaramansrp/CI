import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { CertificadosComponent } from './certificados.component';
import { CertificadosService } from '../../services/certificados.service';

describe('CertificadosComponent', () => {
  let component: CertificadosComponent;
  let fixture: ComponentFixture<CertificadosComponent>;
  let certificadosServiceMock: any;

  beforeEach(async () => {
    certificadosServiceMock = {
      getFitosanitoriosEncabezadoDeTabla: jest.fn().mockReturnValue(of({ columns: ['Fito1', 'Fito2'] })),
      getPermisoCertificadosDeTabla: jest.fn().mockReturnValue(of({ columns: ['Permiso1', 'Permiso2'] })),
      getCertificadosDeTabla: jest.fn().mockReturnValue(of({ columns: ['Cert1', 'Cert2'] })),
    };

    await TestBed.configureTestingModule({
      imports:[CertificadosComponent],
      declarations: [],
      providers: [{ provide: CertificadosService, useValue: certificadosServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and set table data on ngOnInit', () => {
    expect(certificadosServiceMock.getFitosanitoriosEncabezadoDeTabla).toHaveBeenCalled();
    expect(certificadosServiceMock.getPermisoCertificadosDeTabla).toHaveBeenCalled();
    expect(certificadosServiceMock.getCertificadosDeTabla).toHaveBeenCalled();

    expect(component.tablaFitosanitoriosData).toEqual(['Fito1', 'Fito2']);
    expect(component.tablaPermisoCertificadosData).toEqual(['Permiso1', 'Permiso2']);
    expect(component.tablaCertificadosData).toEqual(['Cert1', 'Cert2']);
  });

  it('should toggle showTableDiv and showFitosanitariosModal when cambiarCertificadosFitosanitarios is called', () => {
    component.showTableDiv = true;
    component.showFitosanitariosModal = false;

    component.cambiarCertificadosFitosanitarios();

    expect(component.showTableDiv).toBe(false);
    expect(component.showFitosanitariosModal).toBe(true);
  });

  it('should toggle showTableDiv and showAutorizacionesModal when cambiarCertificadosAutorizaciones is called', () => {
    component.showTableDiv = true;
    component.showAutorizacionesModal = false;

    component.cambiarCertificadosAutorizaciones();

    expect(component.showTableDiv).toBe(false);
    expect(component.showAutorizacionesModal).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

    it('should assign tablaCertificadosData from getCertificadosDeTabla', () => {
    expect(component.tablaCertificadosData).toEqual(['col1', 'col2']);
  });

  it('should assign tablaCertificadosFilaDatos from getCertificadosFilaDeTabla', () => {
    expect(component.tablaCertificadosFilaDatos).toEqual([{ row: 1 }]);
  });

  it('should assign tablaFitosanitoriosFilaDatos from getCertificadosFitoFilaDeTabla', () => {
    expect(component.tablaFitosanitoriosFilaDatos).toEqual([{ fito: 2 }]);
  });
});
