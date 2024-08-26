import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService , private route:Router) {}
  imageURL = 'assets/img/aqua.png';
  userform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    pass: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.userform.valid) {
      const email = this.userform.get('email')?.value as string;
      const pass = this.userform.get('pass')?.value as string;
      this.authService.login(email, pass).subscribe(
        (response) => {
          console.log(response); // Log the response to the console
          localStorage.setItem('token', response.data.accessToken);
          this.route.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('An error occurred:', error); // Log the error to the console
          Swal.fire('Error', 'Your email or password is incorrect.', 'error');
        }
      );
    }
  }
  
}
