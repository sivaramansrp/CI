import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDerechosComponent } from './pago-derechos.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { CatalogoSelectComponent, ConsultaioQuery, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// Mocks
const mockSolicitud260101State = {
  claveDeReferencia: 'ref123',
  cadenaDeDependencia: 'dep456',
  banco: 'banco789',
  liaveDePago: 'llave101',
  fechaDePago: '2024-01-01',
  importeDePago: '1000',
};

const mockCatalogosSelect = {
  bancos: [{ id: 'banco789', nombre: 'Banco Test' }],
};

class MockSolicitudDatosService {
  obtenerPagoDerechos = jest.fn().mockReturnValue(of(mockCatalogosSelect));
}

class MockSolicitud260101Store {
  setClaveDeReferencia = jest.fn();
  setCadenaDeDependencia = jest.fn();
  setBanco = jest.fn();
  setLiaveDePago = jest.fn();
  setFechaDePago = jest.fn();
  setImporteDePago = jest.fn();
}

class MockSolicitud260101Query {
  seleccionarSolicitud$ = of(mockSolicitud260101State);
}

class MockConsultaioQuery {
  selectConsultaioState$ = of({ readonly: false });
}

describe('PagoDerechosComponent', () => {
  let component: PagoDerechosComponent;
  let fixture: ComponentFixture<PagoDerechosComponent>;
  let store: MockSolicitud260101Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PagoDerechosComponent,
        CommonModule,
        InputFechaComponent,
        CatalogoSelectComponent,
        TituloComponent,
      ],
      declarations: [],
      providers: [
        provideHttpClientTesting(),
        FormBuilder,
        {
          provide: SolicitudDatosService,
          useClass: MockSolicitudDatosService,
        },
        { provide: Solicitud260101Store, useClass: MockSolicitud260101Store },
        { provide: Solicitud260101Query, useClass: MockSolicitud260101Query },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
      ],
    })
      .overrideComponent(PagoDerechosComponent, {
        set: {
          providers: [
            { provide: FormBuilder, useValue: new FormBuilder() },
            {
              provide: 'SolicitudDatosService',
              useClass: MockSolicitudDatosService,
            },
            {
              provide: 'Solicitud260101Store',
              useClass: MockSolicitud260101Store,
            },
            {
              provide: 'Solicitud260101Query',
              useClass: MockSolicitud260101Query,
            },
            { provide: 'ConsultaioQuery', useClass: MockConsultaioQuery },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(PagoDerechosComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Solicitud260101Store) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize bancoCatalogo from obtenerPagoDerechos', () => {
    expect(component.bancoCatalogo).toEqual(mockCatalogosSelect);
  });

  it('should initialize the form with values from state', () => {
    expect(component.pagoDeDerechosForm.value).toEqual({
      claveDeReferencia: 'ref123',
      cadenaDeDependencia: 'dep456',
      banco: 'banco789',
      liaveDePago: 'llave101',
      fechaDePago: '2024-01-01',
      importeDePago: '1000',
    });
  });

  it('should call setClaveDeReferencia on store when setClaveDeReferencia is called', () => {
    const event = { target: { value: 'newRef' } } as any as Event;
    component.setClaveDeReferencia(event);
    expect(store.setClaveDeReferencia).toHaveBeenCalledWith('newRef');
  });

  it('should call setCadenaDeDependencia on store when setCadenaDeDependencia is called', () => {
    const event = { target: { value: 'newDep' } } as any as Event;
    component.setCadenaDeDependencia(event);
    expect(store.setCadenaDeDependencia).toHaveBeenCalledWith('newDep');
  });

  it('should call setBanco on store when setBanco is called', () => {
    const banco = { id: 'banco999' };
    component.setBanco(banco as any);
    expect(store.setBanco).toHaveBeenCalledWith('banco999');
  });

  it('should call setLiaveDePago on store when setLiaveDePago is called', () => {
    const event = { target: { value: 'llaveNueva' } } as any as Event;
    component.setLiaveDePago(event);
    expect(store.setLiaveDePago).toHaveBeenCalledWith('llaveNueva');
  });

  it('should call setFechaDePago on store when seleccionarFechaInicio is called', () => {
    component.seleccionarFechaInicio('2024-06-01');
    expect(store.setFechaDePago).toHaveBeenCalledWith('2024-06-01');
  });

  it('should call setImporteDePago on store when setImporteDePago is called', () => {
    const event = { target: { value: '2000' } } as any as Event;
    component.setImporteDePago(event);
    expect(store.setImporteDePago).toHaveBeenCalledWith('2000');
  });

  it('should disable the form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.enabled).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = jest.spyOn(
      (component as any).destroyNotifier$,
      'complete'
    );
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
