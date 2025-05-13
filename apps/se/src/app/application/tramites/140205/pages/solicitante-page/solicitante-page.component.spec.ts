import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { AlertComponent, BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { Tramite110216Store } from '../../../../estados/tramites/tramite110216.store';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';
import { of } from 'rxjs';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';

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
      imports: [WizardComponent, BtnContinuarComponent, PasoUnoComponent,  AlertComponent],
      declarations: [],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        provideHttpClient(),
        { provide: Tramite110216Store, useValue: storeMock },
        { provide: Tramite110216Query, useValue: queryMock },
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
    const wizardComponentSpySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const wizardComponentSpyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1); // Default value
    expect(wizardComponentSpySiguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpyAtras).not.toHaveBeenCalled();
    expect(storeMock.setPasoActivo).not.toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('should render the wizard component', () => {
    const wizardElement = fixture.debugElement.nativeElement.querySelector('app-wizard');
    expect(wizardElement).toBeTruthy();
  });

  it('should render app-paso-uno when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    const pasoUnoElement = fixture.debugElement.nativeElement.querySelector('app-paso-uno');
    expect(pasoUnoElement).toBeTruthy();
  });
  it('should not render app-paso-uno when indice is not 1', () => {
    component.indice = 2;
    fixture.detectChanges();
    const pasoUnoElement = fixture.debugElement.nativeElement.querySelector('app-paso-uno');
    expect(pasoUnoElement).toBeFalsy();
  });
 
  it('should not render ng-alert when indice is not 1', () => {
    component.indice = 2;
    fixture.detectChanges();
    const alertElement = fixture.debugElement.nativeElement.querySelector('ng-alert');
    expect(alertElement).toBeFalsy();
  });
});