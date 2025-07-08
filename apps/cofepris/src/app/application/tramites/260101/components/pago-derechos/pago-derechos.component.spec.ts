import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDerechosComponent } from './pago-derechos.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src/core/queries/consulta.query';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mocks
const mockSolicitud260101State = {
  claveDeReferencia: 'REF123',
  cadenaDeDependencia: 'CADENA',
  banco: 'BANCO1',
  liaveDePago: 'LLAVE123',
  fechaDePago: '2024-06-01',
  importeDePago: '1000'
};

const mockCatalogosSelect = { bancos: [{ id: 'BANCO1', nombre: 'Banco 1' }] };

class MockSolicitudDatosService {
  obtenerPagoDerechos = jest.fn(() => of(mockCatalogosSelect));
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
      imports: [ReactiveFormsModule,
        PagoDerechosComponent,
         CommonModule,
              FormsModule,
              InputFechaComponent,
              CatalogoSelectComponent,
              TituloComponent,
              HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useClass: MockSolicitudDatosService },
        { provide: Solicitud260101Store, useClass: MockSolicitud260101Store },
        { provide: Solicitud260101Query, useClass: MockSolicitud260101Query },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery }
      ]
    })
      .overrideComponent(PagoDerechosComponent, {
        set: {
          providers: [
            { provide: SolicitudDatosService, useClass: MockSolicitudDatosService },
            { provide: Solicitud260101Store, useClass: MockSolicitud260101Store },
            { provide: Solicitud260101Query, useClass: MockSolicitud260101Query },
            { provide: ConsultaioQuery, useClass: MockConsultaioQuery }
          ]
        }
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

  it('should initialize bancoCatalogo on obtenerPagoDerechos', () => {
    component.obtenerPagoDerechos();
    expect(component.bancoCatalogo).toEqual(mockCatalogosSelect);
  });

  it('should initialize the form with state values', () => {
    component.inicializarFormulario();
    expect(component.pagoDeDerechosForm.value).toEqual(mockSolicitud260101State);
  });

  it('should call setClaveDeReferencia on store', () => {
    const event = { target: { value: 'NEWREF' } } as any;
    component.setClaveDeReferencia(event);
    expect(store.setClaveDeReferencia).toHaveBeenCalledWith('NEWREF');
  });

  it('should call setCadenaDeDependencia on store', () => {
    const event = { target: { value: 'NEWCADENA' } } as any;
    component.setCadenaDeDependencia(event);
    expect(store.setCadenaDeDependencia).toHaveBeenCalledWith('NEWCADENA');
  });

  it('should call setBanco on store', () => {
    const banco = { id: 'BANCO2' } as any;
    component.setBanco(banco);
    expect(store.setBanco).toHaveBeenCalledWith('BANCO2');
  });

  it('should call setLiaveDePago on store', () => {
    const event = { target: { value: 'NEWLLAVE' } } as any;
    component.setLiaveDePago(event);
    expect(store.setLiaveDePago).toHaveBeenCalledWith('NEWLLAVE');
  });

  it('should call setFechaDePago on store', () => {
    component.seleccionarFechaInicio('2024-07-01');
    expect(store.setFechaDePago).toHaveBeenCalledWith('2024-07-01');
  });

  it('should call setImporteDePago on store', () => {
    const event = { target: { value: '2000' } } as any;
    component.setImporteDePago(event);
    expect(store.setImporteDePago).toHaveBeenCalledWith('2000');
  });

  it('should disable form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.pagoDeDerechosForm.enabled).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});