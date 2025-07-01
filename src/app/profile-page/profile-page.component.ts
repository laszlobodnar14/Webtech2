import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/User';
import {NgIf} from '@angular/common';
import {UserService} from '../services/user.service';

import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
   this.user = this.userService.currentUser;


  }

}
