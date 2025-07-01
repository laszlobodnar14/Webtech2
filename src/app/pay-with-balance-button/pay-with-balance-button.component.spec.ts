import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayWithBalanceButtonComponent } from './pay-with-balance-button.component';

describe('PayWithBalanceButtonComponent', () => {
  let component: PayWithBalanceButtonComponent;
  let fixture: ComponentFixture<PayWithBalanceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayWithBalanceButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayWithBalanceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
