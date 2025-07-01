import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile-balance-update-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-balance-update-page.component.html',
  styleUrl: './profile-balance-update-page.component.css'
})
export class ProfileBalanceUpdatePageComponent {
  newBalance: number;

  constructor(public userService: UserService) {
    this.newBalance = this.userService.currentUser.balance;
  }


  updateBalance() {
    if (this.newBalance != null) {
      const updatedBalance = this.userService.currentUser.balance + this.newBalance;


      this.userService.updateBalance(updatedBalance).subscribe({
        next: () => alert('Egyenleg sikeresen frissítve!'),
        error: () => alert('Hiba történt az egyenleg frissítésekor.')
      });
    }
  }

}
