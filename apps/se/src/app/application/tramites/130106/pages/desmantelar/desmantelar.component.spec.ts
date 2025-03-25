import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesmantelarComponent } from './desmantelar.component';

describe('DesmantelarComponent', () => {
  let component: DesmantelarComponent;
  let fixture: ComponentFixture<DesmantelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesmantelarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesmantelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
