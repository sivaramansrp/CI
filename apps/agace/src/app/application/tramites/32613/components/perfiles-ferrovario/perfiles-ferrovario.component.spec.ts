import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilesFerrovarioComponent } from './perfiles-ferrovario.component';

describe('PerfilesFerrovarioComponent', () => {
  let component: PerfilesFerrovarioComponent;
  let fixture: ComponentFixture<PerfilesFerrovarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilesFerrovarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilesFerrovarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
