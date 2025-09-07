// NOTE: assuming only these languages are supported for now
export type languageCode =  "en" | "da" | "de"

export interface Product {
  id: string
  name: string
}

export interface SearchRequestDTO {
  user: { id: string }
  search: { 
    term: string
    languageCode: languageCode
  }
}

export interface SearchResponseDTO {
  products: Product[]
}
