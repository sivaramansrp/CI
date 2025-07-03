import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregardestinatarioComponent } from './agregardestinatario.component';

describe('AgregardestinatarioComponent', () => {
  let component: AgregardestinatarioComponent;
  let fixture: ComponentFixture<AgregardestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardestinatarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregardestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
