import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifDomicileComponent } from './NotifDomicile.component';

describe('NotifDomicileComponent', () => {
  let component: NotifDomicileComponent;
  let fixture: ComponentFixture<NotifDomicileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifDomicileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotifDomicileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
