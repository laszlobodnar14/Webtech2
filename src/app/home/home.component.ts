import {Component, OnInit} from '@angular/core';
import {GepService} from '../services/gep.service';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {DefaultButtonComponent} from '../default-button/default-button.component';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgForOf,
    CurrencyPipe,
    DefaultButtonComponent,
    NgIf,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  gepek: any[] = [];

  constructor(private gepService: GepService, protected userService: UserService) {}

  ngOnInit(): void {
    this.gepService.getAll().subscribe({
      next: (data) => this.gepek = data,
      error: (err) => console.error('Error loading data:', err)
    });
  }
}
