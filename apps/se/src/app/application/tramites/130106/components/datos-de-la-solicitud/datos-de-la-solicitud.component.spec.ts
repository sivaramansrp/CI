import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';
import RadioOptionsData from 'libs/shared/theme/assets/json/130106/radioButton.json';
import SolicitudeDropdown from 'libs/shared/theme/assets/json/130106/datos-de-la-solicitud.json';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudeComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent,DatosDeLaSolicitudComponent],
      declarations: [],
      providers: [
        FormBuilder
      ]
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;

    // Mock Solicitud130106State
    component.solicitudState = {
      regimen: 'some-regimen',
      clasificacion: 'some-classification',
      solicitudDescripcion: 'some-description'
    } as Solicitud130106State;

    // Initialize the component
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values from solicitudState', () => {
    expect(component.formulario).toBeTruthy();
    expect(component.formulario.get('solicitud')?.value).toBe('');
    expect(component.formulario.get('regimen')?.value).toBe('some-regimen');
    expect(component.formulario.get('clasificacion')?.value).toBe('some-classification');
    expect(component.formulario.get('solicitudDescripcion')?.value).toBe('some-description');
  });

  it('should have required validators for form controls', () => {
    const solicitudControl = component.formulario.get('solicitud');
    const regimenControl = component.formulario.get('regimen');
    const clasificacionControl = component.formulario.get('clasificacion');
    const descripcionControl = component.formulario.get('solicitudDescripcion');

    expect(solicitudControl?.hasError('required')).toBeTruthy();
    expect(regimenControl?.hasError('required')).toBeTruthy();
    expect(clasificacionControl?.hasError('required')).toBeTruthy();
    expect(descripcionControl?.hasError('required')).toBeTruthy();
  });

  it('should call ngOnDestroy and complete destroyNotifier$', () => {
    spyOn(component['destroyNotifier$'], 'next');
    spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });

  it('should have correct radio options', () => {
    expect(component.radioOptions).toEqual(RadioOptionsData);
  });

  it('should initialize configuracionesDropdown with the correct catalogs', () => {
    expect(component.configuracionesDropdown.length).toBe(4);
    expect(component.configuracionesDropdown[0].catalogos).toEqual(SolicitudeDropdown.tramite);
    expect(component.configuracionesDropdown[1].catalogos).toEqual(SolicitudeDropdown.regimen);
    expect(component.configuracionesDropdown[2].catalogos).toEqual(SolicitudeDropdown.arancelaria);
    expect(component.configuracionesDropdown[3].catalogos).toEqual(SolicitudeDropdown.umt);
  });
});
