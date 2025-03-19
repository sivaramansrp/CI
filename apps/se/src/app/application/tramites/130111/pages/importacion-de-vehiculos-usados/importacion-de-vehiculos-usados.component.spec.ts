import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionDeVehiculosUsadosComponent } from './importacion-de-vehiculos-usados.component';

describe('ImportacionDeVehiculosUsadosComponent', () => {
  let component: ImportacionDeVehiculosUsadosComponent;
  let fixture: ComponentFixture<ImportacionDeVehiculosUsadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportacionDeVehiculosUsadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionDeVehiculosUsadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
