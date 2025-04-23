import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilesMensajeriaComponent } from './perfiles-mensajeria.component';

describe('ProfilesMansajeriaComponent', () => {
  let component: PerfilesMensajeriaComponent;
  let fixture: ComponentFixture<PerfilesMensajeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilesMensajeriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilesMensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
