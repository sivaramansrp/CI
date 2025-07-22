import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregardestinatariofinalComponent } from './agregardestinatariofinal.component';

describe('AgregardestinatariofinalComponent', () => {
  let component: AgregardestinatariofinalComponent;
  let fixture: ComponentFixture<AgregardestinatariofinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardestinatariofinalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregardestinatariofinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
