import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Devolucion } from '../models/pokemon-list.model';
import { Observable } from 'rxjs';
import { DetailPokemon } from '../models/detail-pokemon.model';
import { FormPokemon } from '../models/form-pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseAPI = `${environment.BASE_ENDPOINT}`;
  private baseApiForm = `${environment.BASE_ENDPOINT_FORM}`;
  constructor(private http: HttpClient) {}

  /* GET LIST ITEMS POKEMONS */
  public listItemsPokemons(
    offset: number,
    limit: number
  ): Observable<Devolucion> {
    return this.http.get<Devolucion>(
      `${this.baseAPI}/?offset=${offset}&limit=${limit}`
    );
  }

  /* GET DETAIL POKEMON */
  public getDetailPokemon(name: string): Observable<DetailPokemon> {
    return this.http.get<DetailPokemon>(`${this.baseAPI}/${name}`);
  }

  /* GET DETAIL POKEMON ID */
  public getDetailPokemonId(id: string): Observable<DetailPokemon> {
    return this.http.get<DetailPokemon>(`${this.baseAPI}/${id}`);
  }
}
