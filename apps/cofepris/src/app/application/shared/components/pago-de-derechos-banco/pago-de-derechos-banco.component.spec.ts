import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { TramitePagoBancoQuery } from '../../estados/queries/pago-banco.query';
import { TramitePagoBancoStore } from '../../estados/stores/pago-banco.store';
import { PagoBancoService } from '../../services/pago-banco.service';
import { PagoDeDerechosBancoComponent } from './pago-de-derechos-banco.component';
import {
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosBancoComponent', () => {
  let component: PagoDeDerechosBancoComponent;
  let fixture: ComponentFixture<PagoDeDerechosBancoComponent>;
  let tramitePagoBancoQuery: TramitePagoBancoQuery;
  let tramitePagoBancoStore: TramitePagoBancoStore;
  let service: PagoBancoService;

  beforeEach(async () => {
    const mockTramitePagoBancoQuery = {
      selectSolicitud$: of({
        claveDeReferencia: 'testClave',
        cadenaDependencia: 'testCadena',
        banco: 'testBanco',
        llaveDePago: 'testLlave',
        fechaPago: '2025-03-28',
        importePago: 1000,
      }),
    };

    const mockTramitePagoBancoStore = {
      setClaveDeReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setllaveDePago: jest.fn(),
      setFechaPago: jest.fn(),
      setImportePago: jest.fn(),
    };

    const mockPagoBancoService = {
      getBancoData: jest
        .fn()
        .mockReturnValue(of([{ id: 1, descripcion: 'Banco 1' }])),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        PagoDeDerechosBancoComponent, // Import the standalone component here
        TituloComponent,
        CatalogoSelectComponent,
      ],
      providers: [
        FormBuilder,
        { provide: TramitePagoBancoQuery, useValue: mockTramitePagoBancoQuery },
        { provide: TramitePagoBancoStore, useValue: mockTramitePagoBancoStore },
        { provide: PagoBancoService, useValue: mockPagoBancoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosBancoComponent);
    component = fixture.componentInstance;

    tramitePagoBancoQuery = TestBed.inject(TramitePagoBancoQuery);
    tramitePagoBancoStore = TestBed.inject(TramitePagoBancoStore);
    service = TestBed.inject(PagoBancoService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formSolicitud with default values', () => {
    expect(component.formSolicitud).toBeDefined();
    const formGroup = component.formSolicitud.get('datosImportadorExportador');
    expect(formGroup?.get('claveDeReferencia')?.value).toBe('testClave');
    expect(formGroup?.get('cadenaDependencia')?.value).toBe('testCadena');
    expect(formGroup?.get('banco')?.value).toBe('testBanco');
    expect(formGroup?.get('llaveDePago')?.value).toBe('testLlave');
    expect(formGroup?.get('fechaPago')?.value).toBe('2025-03-28');
    expect(formGroup?.get('importePago')?.value).toBe(1000);
  });

  it('should fetch banco data on initialization', () => {
    expect(service.getBancoData).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([
      { id: 1, descripcion: 'Banco 1' },
    ]);
  });

  it('should set valores in store when setValoresStore is called', () => {
    const form = component.formSolicitud;
    form
      .get('datosImportadorExportador')
      ?.get('claveDeReferencia')
      ?.setValue('newClave');
    component.setValoresStore(
      form,
      'datosImportadorExportador.claveDeReferencia',
      'setClaveDeReferencia'
    );
    expect(tramitePagoBancoStore.setClaveDeReferencia).toHaveBeenCalledWith(
      'newClave'
    );
  });

  it('should unsubscribe from destroyNotifier$ on destroy', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });

  it('should return datosImportadorExportador form group', () => {
    const formGroup = component.datosImportadorExportador;
    expect(formGroup).toBe(
      component.formSolicitud.get('datosImportadorExportador')
    );
  });

  it('should handle empty banco data gracefully', () => {
    jest.spyOn(service, 'getBancoData').mockReturnValue(of([]));
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos).toEqual([]);
  });

  it('should handle banco data correctly', () => {
    const mockBancoData = [{ id: 2, descripcion: 'Banco 2' }];
    jest.spyOn(service, 'getBancoData').mockReturnValue(of(mockBancoData));
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos).toEqual(mockBancoData);
  });

  it('should handle null solicitudState gracefully', () => {
    component.solicitudState = null as any;
    component.ngOnInit();
    expect(component.formSolicitud).toBeDefined();
  });

  it('should handle destroyNotifier$ being called multiple times', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    component.ngOnDestroy(); // Call again to ensure no errors occur

    expect(component['destroyNotifier$'].next).toHaveBeenCalledTimes(1);
    expect(component['destroyNotifier$'].complete).toHaveBeenCalledTimes(1);
  });
});
