import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  BASE_ENDPOINT: 'https://pokeapi.co/api/v2/pokemon', // TODO: DELETE THIS
  BASE_ENDPOINT_FORM: 'https://pokeapi.co/api/v2/pokemon-form', // TODO: DELETE THIS
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  },
};
