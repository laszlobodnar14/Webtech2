import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {GepComponent} from './gep/gep.component';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PayWithBalanceButtonComponent} from './pay-with-balance-button/pay-with-balance-button.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'infrendbead';
}
