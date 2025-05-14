import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DerechosComponent } from './derechos.component';

describe('DerechosComponent', () => {
  let component: DerechosComponent;
  let fixture: ComponentFixture<DerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DerechosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
