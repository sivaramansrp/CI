import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from './solicitante.component';

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SolicitanteComponent,
        ReactiveFormsModule,
        CommonModule,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;

    component.establecerSolicitudForm();

    fixture.detectChanges();
  });

  it('should call establecerValoresDeFormulario on ngOnInit', () => {
    const spy = spyOn(
      component,
      'establecerValoresDeFormulario'
    ).and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudForm with correct controls and disabled state', () => {
    const form = component.solicitudForm;

    expect(form.contains('rfc')).toBe(true);
    expect(form.contains('denominacion')).toBe(true);
    expect(form.contains('actividadEconomica')).toBe(true);
    expect(form.contains('correoElectronico')).toBe(true);

    expect(form.get('rfc')?.disabled).toBe(true);
    expect(form.get('denominacion')?.disabled).toBe(true);
    expect(form.get('actividadEconomica')?.disabled).toBe(true);
    expect(form.get('correoElectronico')?.disabled).toBe(true);
  });

  it('should set default values for form controls correctly', () => {
    component.establecerValoresDeFormulario();

    expect(component.solicitudForm.get('rfc')?.value).toBe('AALM87326');
    expect(component.solicitudForm.get('denominacion')?.value).toBe(
      'SVHGSA ASCV 332'
    );
    expect(component.solicitudForm.get('actividadEconomica')?.value).toBe(
      'SIMa gsys'
    );
    expect(component.solicitudForm.get('correoElectronico')?.value).toBe(
      'SV US'
    );
    expect(component.solicitudForm.get('pais')?.value).toBe(
      'ESTADOS UNIDOS MEXICANOS'
    );
  });

  it('should call establecerValoresDeFormulario on initialization', () => {
    const spy = spyOn(
      component,
      'establecerValoresDeFormulario'
    ).and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initialize solicitudForm with correct controls and disabled state', () => {
    const fixture = TestBed.createComponent(SolicitanteComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
  
    const form = component.solicitudForm;
  });
  
  it('should call establecerValoresDeFormulario on initialization', () => {
    const fixture = TestBed.createComponent(SolicitanteComponent);
    const component = fixture.componentInstance;
    const spy = spyOn(
      component,
      'establecerValoresDeFormulario'
    );
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
