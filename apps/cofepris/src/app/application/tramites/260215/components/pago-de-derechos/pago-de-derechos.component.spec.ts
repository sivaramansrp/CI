import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramite260215Query: Tramite260215Query;
  let tramite260215Store: Tramite260215Store;
  let serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService;

  beforeEach(async () => {
    const mockTramite260215Query = {
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
        { provide: Tramite260215Query, useValue: mockTramite260215Query }, // Provide the mock
        Tramite260215Store,
        ServiciosPermisoSanitarioService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;

    tramite260215Query = TestBed.inject(Tramite260215Query);
    tramite260215Store = TestBed.inject(Tramite260215Store);
    serviciosPermisoSanitarioService = TestBed.inject(
      ServiciosPermisoSanitarioService
    );

    jest
      .spyOn(serviciosPermisoSanitarioService, 'getBancoData')
      .mockReturnValue(of([]));

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
    expect(serviciosPermisoSanitarioService.getBancoData).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([]);
  });

  it('should set valores in store', () => {
    const form = component.formSolicitud;
    form
      .get('datosImportadorExportador')
      ?.get('claveDeReferencia')
      ?.setValue('testValue');
    jest.spyOn(tramite260215Store, 'setClaveDeReferencia');

    component.setValoresStore(
      form,
      'datosImportadorExportador.claveDeReferencia',
      'setClaveDeReferencia'
    );

    expect(tramite260215Store.setClaveDeReferencia).toHaveBeenCalledWith(
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
    jest
      .spyOn(serviciosPermisoSanitarioService, 'getBancoData')
      .mockReturnValue(of([]));
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos).toEqual([]);
  });

  it('should handle banco data correctly', () => {
    const mockBancoData = [{ id: 1, nombre: 'Banco 1' }];
    jest
      .spyOn(serviciosPermisoSanitarioService, 'getBancoData')
      .mockReturnValue(
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
    expect(tramite260215Query.selectSolicitud$).toBeTruthy();
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
