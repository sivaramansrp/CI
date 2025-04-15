import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoModifyIvaEIepsComponent } from './AvisoModifyIvaEIeps.component';

describe('AvisoModifyIvaEIepsComponent', () => {
  let component: AvisoModifyIvaEIepsComponent;
  let fixture: ComponentFixture<AvisoModifyIvaEIepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoModifyIvaEIepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoModifyIvaEIepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
