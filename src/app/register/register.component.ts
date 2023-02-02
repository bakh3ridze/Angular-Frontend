import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  error: string = '';

  submit(): void{
    const body = { "email": this.form.value.email, "username": this.form.value.username, "password": this.form.value.password};
    this.http.post<any>("https://localhost:7121/Account/Register", body).subscribe(response => {
      console.log(response);
      this.error = response.errorMessage;
      if(response.success)
        this.router.navigateByUrl('login');
    });
  }
}
