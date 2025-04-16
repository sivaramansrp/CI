import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodoEnElExtranjeroComponent } from './periodo-en-el-extranjero.component';

describe('PeriodoEnElExtranjeroComponent', () => {
  let component: PeriodoEnElExtranjeroComponent;
  let fixture: ComponentFixture<PeriodoEnElExtranjeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodoEnElExtranjeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodoEnElExtranjeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
