import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsDestinatarioComponent } from './agregars-destinatario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsDestinatarioComponent', () => {
  let component: AgregarsDestinatarioComponent;
  let fixture: ComponentFixture<AgregarsDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsDestinatarioComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AgregarsDestinatarioComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
