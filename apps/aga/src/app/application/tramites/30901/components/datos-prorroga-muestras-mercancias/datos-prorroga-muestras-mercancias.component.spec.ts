import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { DatosProrrogaMuestrasMercanciasComponent } from './datos-prorroga-muestras-mercancias.component';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { InputFechaComponent } from '@ng-mf/data-access-user';

fdescribe('DatosProrrogaMuestrasMercanciasComponent', () => {
  let component: DatosProrrogaMuestrasMercanciasComponent;
  let fixture: ComponentFixture<DatosProrrogaMuestrasMercanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        InputFechaComponent,
        DatosProrrogaMuestrasMercanciasComponent,
      ],
      declarations: [],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosProrrogaMuestrasMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.formDatosProrroga.get('fechaInicioVigencia')?.value).toBe(
      '01/01/2024'
    );
    expect(component.formDatosProrroga.get('fechaFinVigencia')?.value).toBe(
      '31/12/2024'
    );
    expect(
      component.formDatosProrroga.get('fechaInicioVigencia')?.disabled
    ).toBe(true);
    expect(
      component.formDatosProrroga.get('fechaFinVigencia')?.disabled
    ).toBe(true);
  });

  it('should update fechaInicioVigencia when onFechaFinVigenciaChange is called', () => {
    const newDate = '15/01/2024';
    component.onFechaFinVigenciaChange(newDate);
    expect(component.formDatosProrroga.get('fechaInicioVigencia')?.value).toBe(
      newDate
    );
  });

  it('should update fechaFinVigencia when onFechaInicioChange is called', () => {
    const newDate = '15/01/2024';
    component.onFechaInicioChange(newDate);
    expect(component.formDatosProrroga.get('fechaFinVigencia')?.value).toBe(
      newDate
    );
  });
});
