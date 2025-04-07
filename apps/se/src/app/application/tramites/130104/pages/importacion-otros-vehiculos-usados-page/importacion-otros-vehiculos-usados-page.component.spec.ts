import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionOtrosVehiculosUsadosPageComponent } from './importacion-otros-vehiculos-usados-page.component';

describe('PageComponent', () => {
  let component: ImportacionOtrosVehiculosUsadosPageComponent;
  let fixture: ComponentFixture<ImportacionOtrosVehiculosUsadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportacionOtrosVehiculosUsadosPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionOtrosVehiculosUsadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
