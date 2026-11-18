import type { NewNote, Note } from '@/types/note';
import { notesApi } from './api';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const { data } = await notesApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search,
      perPage: 12,
      ...(tag && tag !== 'all' ? { tag } : {}),
    },
  });
  return data;
}
export async function createNote(noteData: NewNote): Promise<Note> {
  const { data } = await notesApi.post<Note>('/notes', noteData);
  return data;
}
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await notesApi.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await notesApi.get<Note>(`/notes/${id}`);
  return data;
}
