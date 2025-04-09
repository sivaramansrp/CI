import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { ModificarDestinatarioComponent } from '../../components/modificar-destinatario/modificar-destinatario.component';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Fabricante } from '../../models/fabricante.model';


describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260910Store: jest.Mocked<Solicitud260910Store>;
  let solicitud260910Query: jest.Mocked<Solicitud260910Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerDestinatarioListo: jest.fn(),
      obtenerFabricanteListo: jest.fn(),
    };

    const solicitud260910StoreMock = {
      setDestinatarioDatos: jest.fn(),
      removeDestinatarioDato: jest.fn(),
    };

    const solicitud260910QueryMock = {
      seleccionarSolicitud$: of({
        destinatarioDatos: [],
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent, ModificarDestinatarioComponent],
      imports: [ReactiveFormsModule, TituloComponent, AlertComponent, TablaDinamicaComponent, InputRadioComponent, CatalogoSelectComponent],
      providers: [SolicitudDatosService, Solicitud260910Store, Solicitud260910Query, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;

    solicitudDatosService = TestBed.inject(SolicitudDatosService) as jest.Mocked<SolicitudDatosService>;
    solicitud260910Store = TestBed.inject(Solicitud260910Store) as jest.Mocked<Solicitud260910Store>;
    solicitud260910Query = TestBed.inject(Solicitud260910Query) as jest.Mocked<Solicitud260910Query>;

    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty destinatarioDatos and subscribe to seleccionarSolicitud$', () => {
    expect(component.destinatarioDatos).toEqual([]);
    expect(solicitud260910Query.seleccionarSolicitud$).toBeDefined();
  });

  it('should add destinatarioDatos to selectedDestinatario', () => {
    const mockDestinatarios: Fabricante[] = [{ nombre: 'Fabricante 1' }] as Fabricante[];
    component.getDestinatarioDatos(mockDestinatarios);
    expect(component.selectedDestinatario).toEqual(mockDestinatarios);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
