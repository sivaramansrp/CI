import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamDestinatarioComponent } from './cam-destinatario.component';

describe('CamDestinatarioComponent', () => {
  let component: CamDestinatarioComponent;
  let fixture: ComponentFixture<CamDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamDestinatarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CamDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
