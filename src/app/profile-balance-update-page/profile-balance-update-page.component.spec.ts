import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBalanceUpdatePageComponent } from './profile-balance-update-page.component';

describe('ProfileBalanceUpdatePageComponent', () => {
  let component: ProfileBalanceUpdatePageComponent;
  let fixture: ComponentFixture<ProfileBalanceUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBalanceUpdatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBalanceUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
