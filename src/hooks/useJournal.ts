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
    const saved = localStorage.getItem('journal-entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [draft, setDraft] = useState<JournalEntry | null>(() => {
    const saved = localStorage.getItem('journal-draft');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (draft) {
      localStorage.setItem('journal-draft', JSON.stringify(draft));
    } else {
      localStorage.removeItem('journal-draft');
    }
  }, [draft]);

  const saveEntry = (entry: JournalEntry) => {
    if (entries.find(e => e.id === entry.id)) {
      setEntries(entries.map(e => e.id === entry.id ? entry : e));
    } else {
      setEntries([...entries, entry]);
    }
    setDraft(null);
  };

  const createNewEntry = () => {
    setDraft({
      id: Date.now(),
      title: '',
      body: '',
      date: new Date().toISOString()
    });
  };

  const loadEntry = (id: number) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setDraft({ ...entry });
    }
  };

  const deleteEntry = (id: number) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(e => e.id !== id));
      if (draft?.id === id) {
        setDraft(null);
      }
    }
  };

  return {
    entries,
    draft,
    setDraft,
    saveEntry,
    createNewEntry,
    loadEntry,
    deleteEntry,
    setEntries
  };
}
