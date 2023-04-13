import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const authToken=JSON.parse(localStorage.getItem('access_token')|| '{}'
        
        );

        if(!request.url.includes('login')){
            request=request.clone({
                setHeaders:{
                    Authorization:`Bearer ${authToken}`
                }
            })
        }
        return next.handle(request)
    }
}