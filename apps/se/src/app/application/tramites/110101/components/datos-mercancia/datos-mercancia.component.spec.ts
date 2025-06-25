jest.mock('@libs/shared/theme/assets/json/110101/mercancia.json', () => ({
  __esModule: true,
  default: {
    fraccionArancelaria: '99998888',
    descripcion: 'Descripción Mock',
    valorTransaccion: '2000'
  }
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import mercanciaMock from '@libs/shared/theme/assets/json/110101/mercancia.json';
import { Solicitante110101State } from '../../estados/tramites/solicitante110101.store';


describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let mockConsultaioQuery: Partial<ConsultaioQuery>;
  let mockSolicitanteQuery: Partial<Solicitante110101Query>;

  const destroy$ = new Subject<void>();

  const SOLICITANTE_STATE: Solicitante110101State = {
    rfc: 'RFC123',
    denominacion: 'Empresa SA',
    actividadEconomica: 'Exportación',
    correoElectronico: 'correo@test.com',
    pais: 'México',
    tratado: 'TLC',
    origen: 'México',
    nombreComercial: 'Mock Producto',
    nombreIngles: 'Mock Product',
    fraccionArancelaria: '12345678',
    descripcion: 'Descripción del producto',
    valorTransaccion: '1000',
    entidad: 'CDMX',
    representacion: 'Representante'
  };

let mockTramiteStore: Partial<Tramite110101Store>;

beforeEach(async () => {
  mockTramiteStore = {
    setNombreComercial: jest.fn(),
    setNombreIngles: jest.fn(),
    setFraccionArancelaria: jest.fn(),
    setDescripcion: jest.fn(),
    setValorTransaccion: jest.fn()
  };

  await TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      DatosMercanciaComponent // because it's standalone
    ],
    providers: [
      { provide: Tramite110101Store, useValue: mockTramiteStore },
      {
        provide: ValidacionesFormularioService,
        useValue: { isValid: jest.fn().mockReturnValue(true) }
      },
      {
        provide: Solicitante110101Query,
        useValue: {
          selectSolicitante$: of({
            // minimal mock state
            nombreComercial: 'Mock Producto',
            nombreIngles: 'Mock Product',
            fraccionArancelaria: '12345678',
            descripcion: 'Descripción',
            valorTransaccion: '1000'
          })
        }
      },
      {
        provide: ConsultaioQuery,
        useValue: {
          selectConsultaioState$: of({ readonly: false })
        }
      }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(DatosMercanciaComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


it('debe crear el componente', () => {
  expect(component).toBeTruthy();
});

it('debe inicializar el formulario con los valores del estado', () => {
  const form = component.formMercancia;
  expect(form).toBeDefined();
  expect(form.get('nombreComercial')?.value).toBe(SOLICITANTE_STATE.nombreComercial);
  expect(form.get('nombreIngles')?.value).toBe(SOLICITANTE_STATE.nombreIngles);
  expect(form.get('fraccionArancelaria')?.value).toBe(mercanciaMock.fraccionArancelaria);
  expect(form.get('descripcion')?.value).toBe(mercanciaMock.descripcion);
  expect(form.get('valorTransaccion')?.value).toBe(mercanciaMock.valorTransaccion);
});

it('debe deshabilitar el formulario cuando esFormularioSoloLectura es true', () => {
  component.esFormularioSoloLectura = true;
  component.guardarDatosFormulario();
  expect(component.formMercancia.disabled).toBe(true);
});

it('debe habilitar el formulario cuando esFormularioSoloLectura es false', () => {
  component.esFormularioSoloLectura = false;
  component.guardarDatosFormulario();
  expect(component.formMercancia.enabled).toBe(true);
});

it('debe llamar al método del store cuando se llama setValoresStore', () => {
  const dummyForm = component.formMercancia;
  dummyForm.get('nombreComercial')?.setValue('Nuevo Nombre');
  component.setValoresStore(dummyForm, 'nombreComercial', 'setNombreComercial');
  expect(mockTramiteStore.setNombreComercial).toHaveBeenCalledWith('Nuevo Nombre');
});

it('debe llamar destroy$ en ngOnDestroy', () => {
  const spy = jest.spyOn(component['destroy$'], 'next');
  const spyComplete = jest.spyOn(component['destroy$'], 'complete');

  component.ngOnDestroy();

  expect(spy).toHaveBeenCalled();
  expect(spyComplete).toHaveBeenCalled();
});

it('debe validar el control del formulario con el método isValid', () => {
  const result = component.isValid('nombreComercial');
  expect(result).toBe(true);
});
});
