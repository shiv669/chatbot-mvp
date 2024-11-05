import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  lastReviewed?: Date;
  confidence: 1 | 2 | 3 | 4 | 5;
}

interface FlashcardStore {
  flashcards: Flashcard[];
  addFlashcard: (flashcard: Omit<Flashcard, 'id'>) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  deleteFlashcard: (id: string) => void;
  getFlashcardsBySubject: (subject: string) => Flashcard[];
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      flashcards: [],
      addFlashcard: (flashcard) => {
        set((state) => ({
          flashcards: [
            ...state.flashcards,
            { ...flashcard, id: crypto.randomUUID() },
          ],
        }));
      },
      updateFlashcard: (id, updates) => {
        set((state) => ({
          flashcards: state.flashcards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        }));
      },
      deleteFlashcard: (id) => {
        set((state) => ({
          flashcards: state.flashcards.filter((card) => card.id !== id),
        }));
      },
      getFlashcardsBySubject: (subject) => {
        return get().flashcards.filter((card) => card.subject === subject);
      },
    }),
    {
      name: 'flashcards-storage',
    }
  )
);