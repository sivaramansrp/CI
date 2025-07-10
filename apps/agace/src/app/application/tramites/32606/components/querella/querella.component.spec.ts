import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuerellaComponent } from './querella.component';

describe('QuerellaComponent', () => {
  let component: QuerellaComponent;
  let fixture: ComponentFixture<QuerellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuerellaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuerellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
