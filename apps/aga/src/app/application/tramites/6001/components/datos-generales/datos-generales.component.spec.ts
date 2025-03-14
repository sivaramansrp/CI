import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DatosGeneralesComponent', () => {
    let component: DatosGeneralesComponent;
    let fixture: ComponentFixture<DatosGeneralesComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, DatosGeneralesComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DatosGeneralesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize formDatosGenerales on ngOnInit', () => {
      component.ngOnInit();
      expect(component.formDatosGenerales).toBeDefined();
      expect(component.formDatosGenerales.get('aduanaAdicional')).toBeDefined();
      expect(component.formDatosGenerales.get('nombre')).toBeDefined();
      expect(component.formDatosGenerales.get('federalDeContribuyentes')).toBeDefined();
      expect(component.formDatosGenerales.get('tipoDePersona')).toBeDefined();
    });

    it('should have form controls disabled by default', () => {
      component.ngOnInit();
      expect(component.formDatosGenerales.get('aduanaAdicional')?.disabled).toBeTruthy();
      expect(component.formDatosGenerales.get('nombre')?.disabled).toBeTruthy();
      expect(component.formDatosGenerales.get('federalDeContribuyentes')?.disabled).toBeTruthy();
      expect(component.formDatosGenerales.get('tipoDePersona')?.disabled).toBeTruthy();
    });
  });
});
