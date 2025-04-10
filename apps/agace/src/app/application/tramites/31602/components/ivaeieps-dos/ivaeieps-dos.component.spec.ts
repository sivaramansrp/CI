import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IvaeiepsDosComponent } from './ivaeieps-dos.component';

describe('IvaeiepsDosComponent', () => {
  let component: IvaeiepsDosComponent;
  let fixture: ComponentFixture<IvaeiepsDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IvaeiepsDosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IvaeiepsDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
