import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDerechosComponent } from './pago-derechos.component';
import { provideHttpClient } from '@angular/common/http';

describe('PagoDerechosComponent', () => {
    let component: PagoDerechosComponent;
    let fixture: ComponentFixture<PagoDerechosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PagoDerechosComponent],
            providers: [provideHttpClient()]
        }).compileComponents();

        fixture = TestBed.createComponent(PagoDerechosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
