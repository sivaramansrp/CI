import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from './solicitante.component';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CommonModule, TituloComponent,SolicitanteComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize solicitudForm with correct controls and disabled state', () => {
  //   const form = component.solicitudForm;

 
  //   expect(form.contains('rfc')).toBe(true);
  //   expect(form.contains('denominacion')).toBe(true);
  //   expect(form.contains('actividadEconomica')).toBe(true);
  //   expect(form.contains('correoElectronico')).toBe(true);

  //   expect(form.get('rfc')?.disabled).toBe(true);;
  //   expect(form.get('denominacion')?.disabled).toBe(true);
  //   expect(form.get('actividadEconomica')?.disabled).toBe(true);
  //   expect(form.get('correoElectronico')?.disabled).toBe(true);
  // });

  it('should set default values for form controls correctly', () => {
    component.establecerValoresDeFormulario();

    expect(component.solicitudForm.get('rfc')?.value).toBe('AALM87326');
    expect(component.solicitudForm.get('denominacion')?.value).toBe('SVHGSA ASCV 332');
    expect(component.solicitudForm.get('actividadEconomica')?.value).toBe('SIMa gsys');
    expect(component.solicitudForm.get('correoElectronico')?.value).toBe('SV US');
    expect(component.solicitudForm.get('pais')?.value).toBe('ESTADOS UNIDOS MEXICANOS');
  });

  it('should call establecerValoresDeFormulario on initialization', () => {
    const spy = jest.spyOn(component, 'establecerValoresDeFormulario').mockImplementation(() => {});
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call establecerValoresDeFormulario on initialization', () => {
    const spy = jest.spyOn(component, 'establecerValoresDeFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
})
