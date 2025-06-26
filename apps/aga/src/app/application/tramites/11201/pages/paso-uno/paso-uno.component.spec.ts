// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasoUnoComponent } from './paso-uno.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { fakeAsync, tick } from '@angular/core/testing';



describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let datosTramiteServiceMock: any;
  let tramite11201StoreMock: any;
  let consultaioQueryMock: any;

  beforeEach(() => {
    datosTramiteServiceMock = {
      getDatosConsulta: jest.fn().mockReturnValue(of({
        success: true,
        datos: {
          tipoBusqueda: 'Busqueda 1',
          aduana: 'Aduana 1',
          fechaIngreso: '2023-01-01',
          inicialesContenedor: 'ABC',
          numeroContenedor: '12345',
          digitoDeControl: '1',
          contenedores: [],
          fechaDeIngreso: '2023-01-01',
          aduanaMenuDesplegable: [],
          menuDesplegable: [],
          numeroManifiesta: '123',
          datosDelContenedor: {},
        },
      })),
    };

    tramite11201StoreMock = {
      setTipoBusqueda: jest.fn(),
      setAduana: jest.fn(),
      setFechaIngreso: jest.fn(),
      setInicialesContenedor: jest.fn(),
      setNumeroContenedor: jest.fn(),
      setDigitoDeControl: jest.fn(),
      setContenedores: jest.fn(),
      setFechaDeIngreso: jest.fn(),
      setAduanaMenuDesplegable: jest.fn(),
      setMenuDesplegable: jest.fn(),
      setNumeroManifiesta: jest.fn(),
      setDelContenedor: jest.fn(),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ update: true }),
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PasoUnoComponent],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: DatosTramiteService, useValue: datosTramiteServiceMock },
        { provide: Tramite11201Store, useValue: tramite11201StoreMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.ngAfterViewInit();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab({});
  });
  it('should call fetchGetDatosConsulta if consultaDatos.update is true', () => {
    consultaioQueryMock.selectConsultaioState$ = of({ update: true });
    const spy = jest.spyOn(component, 'fetchGetDatosConsulta');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit continuarEvento when continuar is called', () => {
    const spy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should reset solicitudForm, set indice to 1, and emit cancelarEvento when cancelar is called', () => {
    component.contenedorComponent = { solicitudForm: { reset: jest.fn() } } as any;
    const resetSpy = jest.spyOn(component.contenedorComponent.solicitudForm, 'reset');
    const cancelarSpy = jest.spyOn(component.cancelarEvento, 'emit');
    const obtenerTipoPersonaSpy = jest.spyOn(component, 'obtenerTipoPersona');

    component.cancelar();

    expect(resetSpy).toHaveBeenCalled();
    expect(component.indice).toBe(1);
    expect(cancelarSpy).toHaveBeenCalled();
    expect(obtenerTipoPersonaSpy).toHaveBeenCalled();
  });

  // it('should fetch datosConsulta and update tramite11201Store when fetchGetDatosConsulta is called', () => {
  //   component.fetchGetDatosConsulta();
  //   tick();
  //   expect(datosTramiteServiceMock.getDatosConsulta).toHaveBeenCalled();
  //   expect(tramite11201StoreMock.setTipoBusqueda).toHaveBeenCalledWith('Busqueda 1');
  //   expect(tramite11201StoreMock.setAduana).toHaveBeenCalledWith('Aduana 1');
  //   expect(tramite11201StoreMock.setFechaIngreso).toHaveBeenCalledWith('2023-01-01');
  //   expect(tramite11201StoreMock.setInicialesContenedor).toHaveBeenCalledWith('ABC');
  //   expect(tramite11201StoreMock.setNumeroContenedor).toHaveBeenCalledWith('12345');
  //   expect(tramite11201StoreMock.setDigitoDeControl).toHaveBeenCalledWith('1');
  //   expect(tramite11201StoreMock.setContenedores).toHaveBeenCalledWith([]);
  //   expect(tramite11201StoreMock.setFechaDeIngreso).toHaveBeenCalledWith('2023-01-01');
  //   expect(tramite11201StoreMock.setAduanaMenuDesplegable).toHaveBeenCalledWith([]);
  //   expect(tramite11201StoreMock.setMenuDesplegable).toHaveBeenCalledWith([]);
  //   expect(tramite11201StoreMock.setNumeroManifiesta).toHaveBeenCalledWith('123');
  //   expect(tramite11201StoreMock.setDelContenedor).toHaveBeenCalledWith({});
  // });

  it('should clean up subscriptions when ngOnDestroy is called', () => {
    const destroySpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

});