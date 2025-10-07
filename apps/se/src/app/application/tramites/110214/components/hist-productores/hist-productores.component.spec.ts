import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistProductoresComponent } from './hist-productores.component';

describe('HistProductoresComponent', () => {
  let component: HistProductoresComponent;
  let fixture: ComponentFixture<HistProductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistProductoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
