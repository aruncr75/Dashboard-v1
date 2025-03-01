import { useState, useEffect } from "react";

export interface JournalEntry {
  id: number;
  title: string;
  body: string;
  date: string;
}

const STORAGE_KEY = "dashboard-journal-entries";

function safeParse<T>(data: string): T | null {
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("JSON parse error", err);
    return null;
  }
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? safeParse<JournalEntry[]>(stored) || [] : [];
    }
    return [];
  });
  const [draft, setDraft] = useState<JournalEntry | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch (err) {
        console.error("LocalStorage write error", err);
      }
    }
  }, [entries]);

  const saveEntry = (entry: JournalEntry) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.id === entry.id);
      if (existing) {
        return prev.map((e) => (e.id === entry.id ? entry : e));
      }
      return [entry, ...prev];
    });
  };

  const createNewEntry = () => {
    const newEntry: JournalEntry = {
      id: entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1,
      title: "",
      body: "",
      date: new Date().toISOString(),
    };
    setDraft(newEntry);
  };

  const loadEntry = (id: number) => {
    const found = entries.find(e => e.id === id);
    if (found) setDraft({ ...found });
  };

  const deleteEntry = (id: number) => {
    setEntries((prev) => prev.filter(e => e.id !== id));
    if (draft && draft.id === id) setDraft(null);
  };

  return { entries, draft, setDraft, saveEntry, createNewEntry, loadEntry, deleteEntry };
}
