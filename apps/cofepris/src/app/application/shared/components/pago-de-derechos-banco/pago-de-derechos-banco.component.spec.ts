import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TramitePagoBancoQuery } from '../../estados/queries/pago-banco.query'; // Adjust the path as needed
import { PermisoPlaguicidasDatosService } from '../../services/permiso-plaguicidas-datos.service'; // Adjust the path as needed
import { TramitePagoBancoStore } from '../../estados/stores/pago-banco.store';
import { PagoDeDerechosComponent } from '../pago-de-derechos/pago-de-derechos.component';
import {
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramitePagoBancoQuery: TramitePagoBancoQuery;
  let tramitePagoBancoStore: TramitePagoBancoStore;
  let service: PermisoPlaguicidasDatosService;

  beforeEach(async () => {
    const mockTramitePagoBancoQuery = {
      selectSolicitud$: of({ claveDeReferencia: 'test', banco: 'testBanco' }), // Mock observable
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PagoDeDerechosComponent, // Import the standalone component here
        TituloComponent,
        CatalogoSelectComponent,
      ],
      providers: [
        FormBuilder,
        { provide: TramitePagoBancoQuery, useValue: mockTramitePagoBancoQuery }, // Provide the mock
        TramitePagoBancoStore,
        service,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;

    tramitePagoBancoQuery = TestBed.inject(TramitePagoBancoQuery);
    tramitePagoBancoStore = TestBed.inject(TramitePagoBancoStore);
    service = TestBed.inject(PermisoPlaguicidasDatosService);

    jest.spyOn(service, 'getBancoData').mockReturnValue(of([]));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formSolicitud', () => {
    expect(component.formSolicitud).toBeDefined();
    expect(
      component.formSolicitud.get('datosImportadorExportador')
    ).toBeDefined();
  });

  it('should fetch banco data on initialization', () => {
    expect(service.getBancoData).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([]);
  });

  it('should set valores in store', () => {
    const form = component.formSolicitud;
    form
      .get('datosImportadorExportador')
      ?.get('claveDeReferencia')
      ?.setValue('testValue');
    jest.spyOn(tramitePagoBancoStore, 'setClaveDeReferencia');

    component.setValoresStore(
      form,
      'datosImportadorExportador.claveDeReferencia',
      'setClaveDeReferencia'
    );

    expect(tramitePagoBancoStore.setClaveDeReferencia).toHaveBeenCalledWith(
      'testValue'
    );
  });

  it('should unsubscribe on destroy', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });

  it('should get datosImportadorExportador form group', () => {
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
    const mockBancoData = [{ id: 1, nombre: 'Banco 1' }];
    jest.spyOn(service, 'getBancoData').mockReturnValue(
      of(
        mockBancoData.map((banco) => ({
          id: banco.id,
          descripcion: banco.nombre,
        })) // Mock transformation
      )
    );
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos).toEqual(mockBancoData);
  });

  it('should call tramite301Query.selectSolicitud$ on initialization', () => {
    expect(tramitePagoBancoQuery.selectSolicitud$).toBeTruthy();
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
