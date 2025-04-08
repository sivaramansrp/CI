import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarOtrosComponent } from './agregar-otros.component';

describe('AgregarOtrosComponent', () => {
  let component: AgregarOtrosComponent;
  let fixture: ComponentFixture<AgregarOtrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarOtrosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarOtrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
