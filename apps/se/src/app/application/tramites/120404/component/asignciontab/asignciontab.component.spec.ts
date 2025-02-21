import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciontabComponent } from './asignciontab.component';

describe('AsignciontabComponent', () => {
  let component: AsignciontabComponent;
  let fixture: ComponentFixture<AsignciontabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignciontabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciontabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
