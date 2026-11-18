import axios from 'axios';
import type { NewNote, Note } from '@/types/note';

const notesApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

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
