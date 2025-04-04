import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud.component';
import { SOLICITUD } from '../../constants/cancelacion-donaciones.enum';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SolicitudComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('folioOriginal')).toBeDefined();
  });

  it('should set initial form values in setFormValues', () => {
    component.ngOnInit();
    component.setFormValues();
    expect(component.solicitudForm.get(SOLICITUD.FOLIO_ORIGINAL)?.value).toBe(
      ''
    );
  });

  it('should disable the "folioOriginal" field on form initialization', () => {
    component.ngOnInit();
    expect(component.solicitudForm.get('folioOriginal')?.disabled).toBe(true);
  });

  it('should emit continuarEvento when continuar is called', () => {
    const spy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(spy).toHaveBeenCalledWith('');
  });
});
