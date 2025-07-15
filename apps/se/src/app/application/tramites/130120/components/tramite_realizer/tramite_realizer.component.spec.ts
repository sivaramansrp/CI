import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramiteRealizerComponent } from './tramite_realizer.component';

describe('TramiteRealizerComponent', () => {
  let component: TramiteRealizerComponent;
  let fixture: ComponentFixture<TramiteRealizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteRealizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TramiteRealizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
