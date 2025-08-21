import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Tramite140205Store } from '../../../../estados/tramites/tramite140205.store';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';
import { of } from 'rxjs';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    storeMock = {
      setPasoActivo: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        pestanaActiva: 1,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        WizardComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        AlertComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        provideHttpClient(),
        { provide: Tramite140205Store, useValue: storeMock },
        { provide: Tramite140205Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    const wizardComponentSpySiguiente = jest.spyOn(
      component.wizardComponent,
      'siguiente'
    );
    const wizardComponentSpyAtras = jest.spyOn(
      component.wizardComponent,
      'atras'
    );
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(wizardComponentSpySiguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpyAtras).not.toHaveBeenCalled();
    expect(storeMock.setPasoActivo).not.toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(
      component.destroyNotifier$,
      'complete'
    );
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('should render the wizard component', () => {
    const wizardElement =
      fixture.debugElement.nativeElement.querySelector('app-wizard');
    expect(wizardElement).toBeTruthy();
  });

  it('should render app-paso-uno when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    const pasoUnoElement =
      fixture.debugElement.nativeElement.querySelector('app-paso-uno');
    expect(pasoUnoElement).toBeTruthy();
  });
  it('should not render app-paso-uno when indice is not 1', () => {
    component.indice = 2;
    fixture.detectChanges();
    const pasoUnoElement =
      fixture.debugElement.nativeElement.querySelector('app-paso-uno');
    expect(pasoUnoElement).toBeFalsy();
  });

  it('should not render ng-alert when indice is not 1', () => {
    component.indice = 2;
    fixture.detectChanges();
    const alertElement =
      fixture.debugElement.nativeElement.querySelector('ng-alert');
    expect(alertElement).toBeFalsy();
  });

  it('should call buscarEmpresa and datosEmpresaBuscar when indice and pasoUnoComponent.indice are 1', () => {
    component.indice = 1;
    component.pasoUnoComponent = {
      indice: 1,
      datosEmpresaComponent: {
        buscarEmpresa: jest.fn(),
        BUSCAR_EMPRESA_ERROR: 'Empresa no encontrada',
      },
      cancelacionCertificadosComponent: {
        BUSCAR_EMPRESA_ERROR: 'Certificado inválido',
      },
    } as any;
    component.datosEmpresaBuscar = jest.fn();
    component.esValido = false;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(
      component.pasoUnoComponent.datosEmpresaComponent.buscarEmpresa
    ).toHaveBeenCalled();
    expect(component.datosEmpresaBuscar).toHaveBeenCalledWith(true);
  });

  it('should set datosPasos.indice to 1 and return if esValido is true', () => {
    component.esValido = true;
    component.datosPasos.indice = 2;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should update indice, call wizardComponent.siguiente and setPasoActivo when accion is cont', () => {
    const wizardComponentSpy = jest.spyOn(
      component.wizardComponent,
      'siguiente'
    );
    component.esValido = false;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(1);
  });

  it('should update indice, call wizardComponent.atras and setPasoActivo when accion is atras', () => {
    const wizardComponentSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.esValido = false;
    component.getValorIndice({ accion: 'atras', valor: 3 });
    expect(component.indice).toBe(1);
  });

  it('datosEmpresaBuscar should push errors, set mensajeError and esValido if errors exist', () => {
    component.pasoUnoComponent = {
      datosEmpresaComponent: {
        BUSCAR_EMPRESA_ERROR: 'Error empresa',
      },
      cancelacionCertificadosComponent: {
        BUSCAR_EMPRESA_ERROR: 'Error certificado',
      },
    } as any;
    component.mensajesDeValidacion = [];
    component.esValido = false;
    component.datosEmpresaBuscar(true);
    expect(component.mensajesDeValidacion).toContain('Error empresa');
    expect(component.mensajesDeValidacion).toContain('Error certificado');
    expect(component.mensajeError).toContain('Corrija los siguientes errores:');
    expect(component.esValido).toBe(true);
  });

  it('datosEmpresaBuscar should not set mensajeError or esValido if no errors', () => {
    component.pasoUnoComponent = {
      datosEmpresaComponent: {},
      cancelacionCertificadosComponent: {},
    } as any;
    component.mensajesDeValidacion = [];
    component.esValido = false;
    component.datosEmpresaBuscar(true);
    expect(component.mensajesDeValidacion.length).toBe(0);
    expect(component.mensajeError).toEqual("");
    expect(component.esValido).toBe(false);
  });

  it('generarValidacionHTML should return formatted HTML with error messages', () => {
    component.mensajesDeValidacion = ['Error uno', 'Error dos'];
    const html = component.generarValidacionHTML();
    expect(html).toContain('Corrija los siguientes errores:');
    expect(html).toContain('Error uno');
    expect(html).toContain('Error dos');
    expect(html).toContain('validation-index');
    expect(html).toContain('validation-message');
  });
});
