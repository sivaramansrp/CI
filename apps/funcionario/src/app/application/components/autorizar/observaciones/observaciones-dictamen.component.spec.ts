import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservacionesDictamenComponent } from './observaciones-dictamen.component';

describe('ObservacionesDictamenComponent', () => {
  let component: ObservacionesDictamenComponent;
  let fixture: ComponentFixture<ObservacionesDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservacionesDictamenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservacionesDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
