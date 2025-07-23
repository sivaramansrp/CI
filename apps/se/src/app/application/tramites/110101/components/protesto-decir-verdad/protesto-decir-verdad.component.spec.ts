import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtestoDecirVerdadComponent } from './protesto-decir-verdad.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('ProtestoDecirVerdadComponent', () => {
  let component: ProtestoDecirVerdadComponent;
  let fixture: ComponentFixture<ProtestoDecirVerdadComponent>;
  let mockConsultaioQuery: any;
  let consultaioState$: Subject<any>;

  beforeEach(async () => {
    consultaioState$ = new Subject();

    mockConsultaioQuery = {
      selectConsultaioState$: consultaioState$.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [ProtestoDecirVerdadComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProtestoDecirVerdadComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with manifiesto false and not readonly by default', () => {
    fixture.detectChanges();
    expect(component.protestoForm).toBeDefined();
    expect(component.protestoForm.get('manifiesto')?.value).toBe(false);
    expect(component.protestoForm.get('manifiesto')?.disabled).toBe(false);
  });

  it('should disable the field when esFormularioSoloLectura is true', () => {
    consultaioState$.next({ readonly: true, update: false });
    fixture.detectChanges();

    component.ngOnInit(); 
    expect(component.protestoForm.get('manifiesto')?.disabled).toBe(true);
  });

  it('should set esFormularioSoloLectura and actualizacionCounsulta on state change', () => {
    consultaioState$.next({ readonly: true, update: true });
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.actualizacionCounsulta).toBe(true);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
