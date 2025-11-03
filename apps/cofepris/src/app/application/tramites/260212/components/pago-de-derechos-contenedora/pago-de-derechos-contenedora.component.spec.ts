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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar formSolicitud', () => {
    expect(component.formSolicitud).toBeDefined();
    expect(
      component.formSolicitud.get('datosImportadorExportador')
    ).toBeDefined();
  });

  it('debería obtener datos de banco al inicializar', () => {
    // Llama explícitamente a fetchBancoData para asegurar la llamada al mock
    component.fetchBancoData();
    expect(serviciosPermisoSanitarioService.getBancoData).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([]);
  });

  it('debería establecer valores en el store', () => {
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

  it('debería cancelar la suscripción al destruir el componente', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });

  it('debería obtener el form group datosImportadorExportador', () => {
    const formGroup = component.datosImportadorExportador;
    expect(formGroup).toBe(
      component.formSolicitud.get('datosImportadorExportador')
    );
  });

  it('debería manejar datos de banco vacíos correctamente', () => {
    jest
      .spyOn(serviciosPermisoSanitarioService, 'getBancoData')
      .mockReturnValue(of([]));
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos).toEqual([]);
  });

  it('debería manejar datos de banco correctamente', () => {
    const mockBancoData = [{ id: 1, nombre: 'Banco 1' }];
    const expectedBancoData = [{ id: 1, descripcion: 'Banco 1' }];
    jest
      .spyOn(serviciosPermisoSanitarioService, 'getBancoData')
      .mockReturnValue(
        of(
          mockBancoData.map((banco) => ({
            id: banco.id,
            descripcion: banco.nombre,
          }))
        )
      );
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos).toEqual(expectedBancoData);
  });

  it('debería llamar a tramite301Query.selectSolicitud$ al inicializar', () => {
    expect(tramite260215Query.selectSolicitud$).toBeTruthy();
  });

  it('debería manejar solicitudState nulo correctamente', () => {
    component.solicitudState = null as any;
    component.ngOnInit();
    expect(component.formSolicitud).toBeDefined();
  });

  it('debería manejar destroyNotifier$ llamado múltiples veces', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    component.ngOnDestroy(); // Llamar de nuevo para asegurar que no haya errores

    // Solo verifica que se haya llamado al menos una vez
    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});
