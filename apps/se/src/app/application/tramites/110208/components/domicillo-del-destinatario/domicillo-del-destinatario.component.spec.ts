import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilloDelDestinatarioComponent } from './domicillo-del-destinatario.component';

describe('DomicilloDelDestinatarioComponent', () => {
  let component: DomicilloDelDestinatarioComponent;
  let fixture: ComponentFixture<DomicilloDelDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilloDelDestinatarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilloDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
