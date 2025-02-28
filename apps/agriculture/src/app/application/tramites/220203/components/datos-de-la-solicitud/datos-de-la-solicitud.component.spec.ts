import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { ImportacionDeAcuiculturaService } from '@ng-mf/data-access-user';
describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        ImportacionDeAcuiculturaService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should create datosMercanciaFormGroup on ngOnInit', () => {
    expect(component.datosMercanciaFormGroup).toBeDefined();
    expect(component.datosMercanciaFormGroup.contains('realizarGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('mercanciaGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('detalles')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('aduanaIngreso')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('oficinaInspeccion')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('puntoInspeccion')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('mercanciaGroup')?.get('tipoRequisito')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('mercanciaGroup')?.get('requisito')).toBeTruthy();
  });
});
