import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesYProvedoresComponent } from './clientes-y-provedores.component';

describe('ClientesYProvedoresComponent', () => {
  let component: ClientesYProvedoresComponent;
  let fixture: ComponentFixture<ClientesYProvedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesYProvedoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesYProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
