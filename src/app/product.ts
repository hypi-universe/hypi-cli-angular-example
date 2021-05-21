export interface Hypi {
  id: number;
}

export interface Product {
  hypi: Hypi;
  title: string;
  description: string;
  price: number;
}

export interface Node {
  product: Product
}

export interface Edges {
  node: Node[]
}

export interface Find {
  edges: Edges;
}

export interface Response {
  find: Find;
}