import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoduosComponent } from './pasoduos.component';

describe('PasoduosComponent', () => {
  let component: PasoduosComponent;
  let fixture: ComponentFixture<PasoduosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoduosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoduosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
