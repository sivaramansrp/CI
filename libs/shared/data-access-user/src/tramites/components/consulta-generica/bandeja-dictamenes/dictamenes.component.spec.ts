import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DictamenesComponent } from './dictamenes.component';

describe('DictamenesComponent', () => {
  let component: DictamenesComponent;
  let fixture: ComponentFixture<DictamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictamenesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
