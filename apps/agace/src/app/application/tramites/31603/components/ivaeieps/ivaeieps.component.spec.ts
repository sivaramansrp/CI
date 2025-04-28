import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IvaeiepsComponent } from './ivaeieps.component';

describe('IvaeiepsComponent', () => {
  let component: IvaeiepsComponent;
  let fixture: ComponentFixture<IvaeiepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvaeiepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IvaeiepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
