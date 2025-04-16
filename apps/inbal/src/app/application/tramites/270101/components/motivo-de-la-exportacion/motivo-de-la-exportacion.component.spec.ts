import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoDeLaExportacionComponent } from './motivo-de-la-exportacion.component';

describe('MotivoDeLaExportacionComponent', () => {
  let component: MotivoDeLaExportacionComponent;
  let fixture: ComponentFixture<MotivoDeLaExportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoDeLaExportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotivoDeLaExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
