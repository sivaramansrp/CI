import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerritorioNacionalSolicitudeComponent } from './territorio-nacional-solicitude.component';

describe('TerritorioNacionalSolicitudeComponent', () => {
  let component: TerritorioNacionalSolicitudeComponent;
  let fixture: ComponentFixture<TerritorioNacionalSolicitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritorioNacionalSolicitudeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerritorioNacionalSolicitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
