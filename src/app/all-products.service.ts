import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Response } from './product';

@Injectable({
  providedIn: 'root'
})
export class AllProductsService extends Query<Response>{

  document = gql`
  query products($arcql: String!) {
    find(type: Product, arcql: $arcql) {
        edges {
            node {
               ...ProductFields
            }
        }
    }
  }

fragment ProductFields on Product {
   hypi {
        id
    }
    title
    description
  }
`;
}
