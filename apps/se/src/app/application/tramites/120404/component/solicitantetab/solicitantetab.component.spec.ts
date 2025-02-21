import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantetabComponent } from './solicitantetab.component';

describe('SolicitantetabComponent', () => {
  let component: SolicitantetabComponent;
  let fixture: ComponentFixture<SolicitantetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitantetabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
