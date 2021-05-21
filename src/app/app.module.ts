import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({ uri: 'https://api.hypi.app/graphql' });
        const authToken = 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnVzZXJuYW1lIjoiZW1hbi5jc2UyMDA4QGdtYWlsLmNvbSIsImh5cGkuZW1haWwiOiJlbWFuLmNzZTIwMDhAZ21haWwuY29tIiwiYXVkIjoiMDFGMkdaQkpLSDZSM1RDNkVKRFJFNU5IRzQiLCJpYXQiOjE2MjEzMzc5MzUsImV4cCI6MTYyMzkyOTkzNSwic3ViIjoiMDFGMkdaQkpLQUgxSkNDQlZaUzI0TVQ3VlIiLCJuYmYiOjE2MjEzMzc5MzV9.SrcdPxDD7YIB-S7BpBYE1tYeu08uSassvbT9ZFRffDXcYM6kda7J8EjX1YYxaXJplTtyF-4juqqkcIu_f4vrrrNVYURuPzyvhLnJj17WG2sO_vOLa0f-yMgXrA_LAxhr_OuSS6CJirzRSesP0oJ1txdVsnfMzlREPCj1dzQTHpa5n43lqcYzVx1pj59LOVQfR6WC1HRmqlbZ6VK-uCUt7lI3xKIne089wlqqUxUFDTEBWyv7ZH9JOeyf8eehQtQSIMQvQtjWf83Lz5a_1anRMfmB-S6aFVmt-qFiUmVLkKHRpIUAqbryEGnuqadZzQLb_IH4Kp7bKWgg7X1dtf4nqQ'
        const domain = 'teething.apps.hypi.app'

        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders()
              .set(
                'Authorization',
                `Bearer ${authToken}`,
              )
              .set('hypi-domain', `${domain}`),
          });
          return forward(operation);
        });

        const link = middleware.concat(http);

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
