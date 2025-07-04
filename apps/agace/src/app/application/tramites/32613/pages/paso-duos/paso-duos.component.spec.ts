import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDuosComponent } from './paso-duos.component';

describe('PasoDuosComponent', () => {
  let component: PasoDuosComponent;
  let fixture: ComponentFixture<PasoDuosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoDuosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDuosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
