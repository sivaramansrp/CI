import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';  // To inject FormBuilder
import { ImportacionDeAcuiculturaService } from '@ng-mf/data-access-user';
describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        ImportacionDeAcuiculturaService  // Mock this service if needed
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // This will call ngOnInit() automatically
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create datosMercanciaFormGroup on ngOnInit', () => {
    expect(component.datosMercanciaFormGroup).toBeDefined();
    // Check that the form group contains the correct controls
    expect(component.datosMercanciaFormGroup.contains('realizarGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('mercanciaGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('detalles')).toBeTruthy();

    // Check that 'realizarGroup' has required fields
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('aduanaIngreso')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('oficinaInspeccion')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('puntoInspeccion')).toBeTruthy();

    // Check that 'mercanciaGroup' has required fields
    expect(component.datosMercanciaFormGroup.get('mercanciaGroup')?.get('tipoRequisito')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('mercanciaGroup')?.get('requisito')).toBeTruthy();
  });
});
