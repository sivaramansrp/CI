import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifestacionesDeCancelacionComponent } from './manifestaciones-de-cancelacion.component';

describe('ManifestacionesDeCancelacionComponent', () => {
  let component: ManifestacionesDeCancelacionComponent;
  let fixture: ComponentFixture<ManifestacionesDeCancelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestacionesDeCancelacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifestacionesDeCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
