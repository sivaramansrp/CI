import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtestoDecirVerdadComponent } from './protesto-decir-verdad.component';

describe('ProtestoDecirVerdadComponent', () => {
  let component: ProtestoDecirVerdadComponent;
  let fixture: ComponentFixture<ProtestoDecirVerdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtestoDecirVerdadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtestoDecirVerdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
