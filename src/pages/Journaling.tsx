import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card"; // Added missing import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJournal } from "@/hooks/useJournal";
import { Wand2, X, Search } from "lucide-react"; // Add this import
import { useGeminiCorrections } from "@/hooks/useGeminiCorrections";
import { Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ScrollArea } from "@/components/ui/scroll-area"; // Add this import

const Journaling = () => {
  const {
    entries,
    draft,
    setDraft,
    saveEntry,
    createNewEntry,
    loadEntry,
    deleteEntry,
    setEntries, // Add this to the destructured hooks
  } = useJournal();
  const [search, setSearch] = useState("");

  const { correctText, loadingStates, error } = useGeminiCorrections();

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(search.toLowerCase()) ||
    entry.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (draft) {
      saveEntry({ ...draft, date: new Date().toISOString() });
    }
  };

  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null);

  const handleClose = () => {
    setDraft(null);
    setCloseDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
    if (draft?.id === id) {
      setDraft(null);
    }
    setDeleteDialogOpen(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (draft?.body.trim() || draft?.title.trim()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [draft]);

  const quickCorrections = [
    { 
      id: 'grammar',
      label: "Fix Grammar", 
      prompt: "Fix any grammar and spelling errors in this text, keeping the same tone and meaning" 
    },
    { 
      id: 'enhance',
      label: "Enhance Writing", 
      prompt: "Improve this text to be more engaging and clear, while maintaining the original meaning" 
    },
    { 
      id: 'formal',
      label: "Make Formal", 
      prompt: "Rewrite this text in a more formal and professional tone" 
    }
  ];

  const applyCorrection = async (prompt: string, correctionId: string) => {
    if (!draft?.body) return;

    const correctedText = await correctText(draft.body, prompt, correctionId);
    if (correctedText) {
      setDraft(prev => ({ ...prev!, body: correctedText }));
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] p-2 md:p-4 pb-20 md:pb-4">
        <Card className="h-full flex flex-col p-4 md:p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Journaling</h1>
            <div className="flex items-center gap-2">
              <Button onClick={createNewEntry} className="w-full md:w-auto">New Entry</Button>
              {draft && (
                <>
                  <Button onClick={handleSave} variant="default" className="w-full md:w-auto">Save Entry</Button>
                  <Button 
                    onClick={() => draft?.body.trim() || draft?.title.trim() ? setCloseDialogOpen(true) : setDraft(null)}
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Search Bar */}
          {entries.length > 0 && (
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search entries..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9"
                />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden">
            {/* Editor Section */}
            {draft && (
              <div className="flex-1 flex flex-col space-y-4 h-[40vh] lg:h-auto">
                <Input
                  placeholder="Title"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  className="text-xl font-semibold"
                />
                
                <div className="flex flex-wrap gap-2">
                  {quickCorrections.map(({ id, label, prompt }) => (
                    <Button
                      key={id}
                      variant="outline"
                      size="sm"
                      onClick={() => applyCorrection(prompt, id)}
                      className="flex items-center gap-1"
                      disabled={loadingStates[id]}
                    >
                      {loadingStates[id] ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Wand2 className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">{label}</span>
                    </Button>
                  ))}
                </div>

                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}

                <textarea
                  placeholder="Write your thoughts..."
                  value={draft.body}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                  className="flex-1 p-2 border rounded bg-gray-900 text-white resize-none min-h-0"
                />
              </div>
            )}

            {/* Entries List */}
            {entries.length > 0 && (
              <div className={`${draft ? 'lg:w-1/3' : 'w-full'} h-[30vh] lg:h-auto flex flex-col`}>
                <h2 className="text-xl font-bold mb-2">Past Entries</h2>
                <ScrollArea className="flex-1">
                  <div className="space-y-3 pr-4">
                    {filteredEntries
                      .sort((a, b) => b.id - a.id)
                      .map((entry) => (
                        <Card key={entry.id} className="p-3 md:p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                          <div onClick={() => loadEntry(entry.id)}>
                            <h3 className="font-bold text-base md:text-lg">{entry.title || "Untitled"}</h3>
                            <p className="text-xs md:text-sm text-gray-400">{new Date(entry.date).toLocaleString()}</p>
                            <p className="mt-1 text-gray-300 text-sm md:text-base line-clamp-2">{entry.body}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setDeleteDialogOpen(entry.id)}
                            className="mt-2 text-red-500 w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </Card>
                      ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </Card>
      </div>
      <ConfirmDialog
        open={closeDialogOpen}
        onOpenChange={setCloseDialogOpen}
        title="Close Entry"
        description="Are you sure you want to close? Any unsaved changes will be lost."
        onConfirm={handleClose}
      />

      <ConfirmDialog
        open={!!deleteDialogOpen}
        onOpenChange={() => setDeleteDialogOpen(null)}
        title="Delete Entry"
        description="Are you sure you want to delete this entry? This action cannot be undone."
        onConfirm={() => deleteDialogOpen && handleDelete(deleteDialogOpen)}
      />
    </Layout>
  );
};

export default Journaling;
