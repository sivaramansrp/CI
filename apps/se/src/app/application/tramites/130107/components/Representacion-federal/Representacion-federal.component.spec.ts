import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './Representacion-federal.component';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentacionFederalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
