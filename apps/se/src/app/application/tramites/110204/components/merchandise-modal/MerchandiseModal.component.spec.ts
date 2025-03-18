import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerchandiseModalComponent } from '../MerchandiseModal.component';

describe('MerchandiseModalComponent', () => {
  let component: MerchandiseModalComponent;
  let fixture: ComponentFixture<MerchandiseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchandiseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MerchandiseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
