import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ModificacionDonacionesImmexService } from '../../services/modificacion-donaciones-immex.service';
import { Tramite11102Store } from '../../estados/tramite11102.store';
import { Tramite11102Query } from '../../estados/tramite11102.query';
import { of, Subject } from 'rxjs';
import {
  BtnContinuarComponent,
  CatalogoSelectComponent,
  InputCheckComponent,
  TableComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let modificacionService: ModificacionDonacionesImmexService;
  let store: Tramite11102Store;
  let query: Tramite11102Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TableComponent,
        TituloComponent,
        CatalogoSelectComponent,
        FormsModule,
        ReactiveFormsModule,
        AlertComponent,
        InputCheckComponent,
      ],
      declarations: [DatosDelTramiteComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: ModificacionDonacionesImmexService,
          useValue: {
            getAduana: jest.fn().mockReturnValue(of({ data: [] })),
            getTipoDeMercancia: jest.fn().mockReturnValue(of({ data: [] })),
            getCondicionMercancia: jest.fn().mockReturnValue(of({ data: [] })),
            getUnidadMedida: jest.fn().mockReturnValue(of({ data: [] })),
            getAno: jest.fn().mockReturnValue(of({ data: [] })),
            getPais: jest.fn().mockReturnValue(of({ data: [] })),
          },
        },
        {
          provide: Tramite11102Store,
          useValue: {
            setAduana: jest.fn(),
            setTipoDeMercancia: jest.fn(),
            setCondicionMercancia: jest.fn(),
            setUnidadMedida: jest.fn(),
            setAno: jest.fn(),
            setPais: jest.fn(),
            setOrganismoPublico: jest.fn(),
          },
        },
        {
          provide: Tramite11102Query,
          useValue: {
            selectSolicitud$: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    modificacionService = TestBed.inject(ModificacionDonacionesImmexService);
    store = TestBed.inject(Tramite11102Store);
    query = TestBed.inject(Tramite11102Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    expect(component.tramiteForm).toBeDefined();
    expect(
      component.tramiteForm.get('modificacionDonacionesImmex')
    ).toBeDefined();
  });

  it('should call setValoresStore when RFC input changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const rfcInput = fixture.debugElement.query(By.css('#rfc')).nativeElement;
    
    rfcInput.value = 'TEST123456789';
    rfcInput.dispatchEvent(new Event('change'));

    expect(setValoresStoreSpy).toHaveBeenCalledWith(
      component.tramiteForm.get('modificacionDonacionesImmex'),
      'rfc',
      'setRfc'
    );
  });

  it('should call setValoresStore when "usoEspecifico" textarea changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const usoEspecificoTextarea = fixture.debugElement.query(
      By.css('#usoEspecifico')
    ).nativeElement;

    usoEspecificoTextarea.value = 'Test usage';
    usoEspecificoTextarea.dispatchEvent(new Event('change'));

    expect(setValoresStoreSpy).toHaveBeenCalledWith(
      component.tramiteForm.get('modificacionDonacionesImmex'),
      'usoEspecifico',
      'setUsoEspecifico'
    );
  });

  it('should call modifySeleccionada when "Modificar" button is clicked', () => {
    const modifySeleccionadaSpy = jest.spyOn(component, 'modifySeleccionada');
    const modifyButton = fixture.debugElement.query(
      By.css('button[data-bs-target="#modalAgregarMercancias"]')
    ).nativeElement;

    modifyButton.click();

    expect(modifySeleccionadaSpy).toHaveBeenCalled();
  });

  it('should call setValoresStore when "correoElectronicoOpcional" input changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const correoElectronicoOpcionalInput = fixture.debugElement.query(
      By.css('#correoElectronicoOpcional')
    ).nativeElement;

    correoElectronicoOpcionalInput.value = 'test@example.com';
    correoElectronicoOpcionalInput.dispatchEvent(new Event('change'));

    expect(setValoresStoreSpy).toHaveBeenCalledWith(
      component.tramiteForm.get('modificacionDonacionesImmex'),
      'correoElectronicoOpcional',
      'setCorreoElectronicoOpcional'
    );
  });

  it('should call setValoresStore when "telefonoOpcional" input changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const telefonoOpcionalInput = fixture.debugElement.query(
      By.css('#telefonoOpcional')
    ).nativeElement;

    telefonoOpcionalInput.value = '1234567890';
    telefonoOpcionalInput.dispatchEvent(new Event('change'));

    expect(setValoresStoreSpy).toHaveBeenCalledWith(
      component.tramiteForm.get('modificacionDonacionesImmex'),
      'telefonoOpcional',
      'setTelefonoOpcional'
    );
  });

  it('should call modificarConfirmarModal when "Modificar" button in modal is clicked', () => {
    const modificarConfirmarModalSpy = jest.spyOn(
      component,
      'modificarConfirmarModal'
    );
    const modalModifyButton = fixture.debugElement.query(
      By.css('.modal-footer .btn-primary')
    ).nativeElement;

    modalModifyButton.click();

    expect(modificarConfirmarModalSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(
      component['destroyNotifier$'],
      'next'
    );
    const destroyNotifierCompleteSpy = jest.spyOn(
      component['destroyNotifier$'],
      'complete'
    );

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
