import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProrrogasComponent } from './prorrogas.component';

describe('ProrrogasComponent', () => {
  let component: ProrrogasComponent;
  let fixture: ComponentFixture<ProrrogasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProrrogasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProrrogasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
