import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private router: Router,
  ) {}

  handleError(error:any) {
    let errorStatusForErrorPage = [0, 500, 503];
    let errorMessage = [];
    let Error: any;
    if (error.message.includes('abort')) {
      return throwError(error);
    } else if (error?.error && error.error instanceof ErrorEvent) {
      errorMessage.push(`${error.error.message}` + '</br>');
    } else if (error?.error?.error) {
      errorMessage.push(`${error.error.error.message}` + '</br>');
    } else if (error?.error?.errors) {
      for (var k in error.error.errors) {
        var Object_Errors = error.error.errors[k];
        Object_Errors.forEach((e:any) => {
          errorMessage.push(e + '</br>');
        });
      }
    }
    else if(error?.error?.message){
      errorMessage.push(error.error.message + '</br>')
    }
    else if(error?.error?.Message){
      errorMessage.push(error.error.Message + '</br>')
    }
    else if(error?.Message){
      errorMessage.push(error.Message + '</br>')
    }
    Error = errorMessage.toString();
    Error = Error.replace(/,/, '');
    return throwError(Error);
  }
}
