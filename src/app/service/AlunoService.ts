
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Aluno {
  id?: number;
  nome: string;
  status: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
}

@Injectable({ providedIn: "root" })
export class AlunoService {
  private readonly apiUrl = 'http://localhost:8080/api/alunos';

  constructor(private readonly http: HttpClient) {}

  listarTodos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  criar(aluno: Omit<Aluno, 'id'>): Observable<Aluno> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Aluno>(this.apiUrl, aluno, { headers });
  }

  atualizar(id: number, aluno: Partial<Aluno>): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.apiUrl}/${id}`, aluno, { headers });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
