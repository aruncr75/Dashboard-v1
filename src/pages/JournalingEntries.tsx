import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJournal } from "@/hooks/useJournal";

const JournalingEntries = () => {
  const { entries, draft, setDraft, saveEntry, createNewEntry, loadEntry, deleteEntry } = useJournal();
  const [search, setSearch] = useState("");

  // Filter entries by search keyword in title & body
  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(search.toLowerCase()) ||
    entry.body.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleSave = () => {
    if(draft) {
      saveEntry({ ...draft, date: new Date().toISOString() });
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-4">Journaling</h1>
          <div className="flex items-center space-x-2 mb-4">
            <Button onClick={createNewEntry}>New Entry</Button>
            {draft && <Button onClick={handleSave}>Save Entry</Button>}
            {entries.length > 0 && (
              <Input 
                placeholder="Search entries..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="w-full"
              />
            )}
          </div>
          {draft && (
            <div className="space-y-4 mb-6">
              <Input
                placeholder="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="text-xl font-semibold"
              />
              <textarea
                placeholder="Write your thoughts..."
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                className="w-full h-40 p-2 border rounded bg-gray-900 text-white"
              />
            </div>
          )}
          {entries.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Past Entries</h2>
              <div className="space-y-3 max-h-80 overflow-auto">
                {filteredEntries
                  .sort((a, b) => b.id - a.id)
                  .map((entry) => (
                    <Card key={entry.id} className="p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                      <div onClick={() => loadEntry(entry.id)}>
                        <h3 className="font-bold text-lg">{entry.title || "Untitled"}</h3>
                        <p className="text-sm text-gray-400">{new Date(entry.date).toLocaleString()}</p>
                        <p className="mt-1 text-gray-300 line-clamp-2">{entry.body}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteEntry(entry.id)}
                        className="mt-2 text-red-500"
                      >
                        Delete
                      </Button>
                    </Card>
                  ))}
              </div>
            </>
          ) : (
            <p className="text-gray-400">No entries yet.</p>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default JournalingEntries;
