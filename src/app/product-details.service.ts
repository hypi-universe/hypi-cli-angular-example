import { Injectable } from '@angular/core';

import { Query, gql } from 'apollo-angular';
import { Response } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService extends Query<Response>{

  document = gql`
  query productDetails($id: String!) {
    get(type: Product, id: $id ) {
      ...ProductFields
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
