import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibBandejaComponent } from './lib-bandeja.component';

describe('LibBandejaComponent', () => {
  let component: LibBandejaComponent;
  let fixture: ComponentFixture<LibBandejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibBandejaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibBandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
