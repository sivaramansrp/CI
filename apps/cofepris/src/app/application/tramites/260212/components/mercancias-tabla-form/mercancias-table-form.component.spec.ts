import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasTableFormComponent } from './mercancias-table-form.component';

describe('MercanciasTableFormComponent', () => {
  let component: MercanciasTableFormComponent;
  let fixture: ComponentFixture<MercanciasTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercanciasTableFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
