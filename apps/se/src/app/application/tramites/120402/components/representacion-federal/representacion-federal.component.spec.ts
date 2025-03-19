import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
 
describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent],
      declarations: [RepresentacionFederalComponent]
    }).compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize the form with empty values', () => {
    expect(component.representacionForm.value).toEqual({
      entidad: '',
      representacion: ''
    });
  });
 
  it('should have required validators for entidad and representacion fields', () => {
    const entidadControl = component.representacionForm.get('entidad');
    const representacionControl = component.representacionForm.get('representacion');
 
    expect(entidadControl?.hasError('required')).toBeTruthy();
    expect(representacionControl?.hasError('required')).toBeTruthy();
  });
 
  it('should populate entidad and representacion arrays from JSON files', () => {
    expect(component.entidad.length).toBeGreaterThan(0);
    expect(component.representacion.length).toBeGreaterThan(0);
  });
 
  it('should log message on entidad change', () => {
    spyOn(console, 'log');
    const select = fixture.debugElement.query(By.css('select[name="entidad"]'));
    select.triggerEventHandler('change', { target: select.nativeElement });
    expect(console.log).toHaveBeenCalledWith('Cambio en la entidad seleccionada', jasmine.any(Object));
  });
 
  it('should log message on representacion change', () => {
    spyOn(console, 'log');
    const select = fixture.debugElement.query(By.css('select[name="representacion"]'));
    select.triggerEventHandler('change', { target: select.nativeElement });
    expect(console.log).toHaveBeenCalledWith('Cambio en la representación seleccionada', jasmine.any(Object));
  });
});
 