import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideToastr, TOAST_CONFIG } from 'ngx-toastr';
import { TituloComponent } from '@libs/shared/data-access-user/src'; // Update with the correct path

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,TituloComponent],
      declarations: [PasoDosComponent],
      providers: [ provideToastr({
        positionClass: 'toast-top-right',
      }),]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
