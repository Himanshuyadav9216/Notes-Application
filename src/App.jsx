import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- SVG Icons ---
// Using inline SVGs to keep this a single, self-contained file.

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path>
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconAlert = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// Category Icons
const categoryIcons = {
  'All Notes': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.8-1.2a2 2 0 0 0-3.22 0l-.8 1.2a2 2 0 0 1-1.69.9H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16z"/><path d="M20 17v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2"/></svg>
  ),
  'Work': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
  ),
  'Personal': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  'Ideas': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 13a6 6 0 0 0-12 0c0 4.42 4.42 8 6 8s6-3.58 6-8z"></path><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
  ),
  'Default': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
  )
};

// --- 1. Sidebar Component ---
function Sidebar({ categories, selectedCategory, onSelectCategory, noteCounts, isOpen, onClose }) {
  const getCategoryIcon = (categoryName) => {
    return categoryIcons[categoryName] || categoryIcons['Default'];
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-20 bg-black/30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-50 p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-gray-800">Categories</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <IconX />
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 hidden md:block">Notes App</h2>
        
        <nav>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => onSelectCategory(category)}
                  className={`flex w-full items-center justify-between space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500">{getCategoryIcon(category)}</span>
                    <span className="truncate">{category}</span>
                  </div>
                  <span className={`text-xs font-semibold rounded-full px-2 py-0.5
                    ${selectedCategory === category
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {noteCounts[category] || 0}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

// --- 2. NoteCard Component ---
function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 break-words">{note.title}</h3>
          <span className="flex-shrink-0 ml-2 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
            {note.category}
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600 line-clamp-4 break-words">
          {note.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Edit note"
          >
            <IconEdit />
          </button>
          <button
            onClick={() => onDelete(note)}
            className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete note"
          >
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. NoteList Component ---
function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center h-60">
        <h3 className="text-lg font-medium text-gray-900">No notes found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new note.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

// --- 4. NoteModal Component ---
function NoteModal({ noteToEdit, existingCategories, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        description: noteToEdit.description,
        category: noteToEdit.category,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Personal',
      });
    }
    setErrors({});
  }, [noteToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {noteToEdit ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            onClick={onClose}
            className="-mt-2 -mr-2 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border shadow-sm sm:text-sm ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              list="category-list"
              className={`mt-1 block w-full rounded-md border shadow-sm sm:text-sm ${errors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
            />
            <datalist id="category-list">
              {existingCategories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border shadow-sm sm:text-sm ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
            ></textarea>
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- 5. DeleteConfirmationModal Component ---
function DeleteConfirmationModal({ note, onConfirm, onCancel }) {
  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0 flex items-center justify-center rounded-full bg-red-100 h-12 w-12">
            <IconAlert className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900" id="modal-title">
              Delete Note
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the note "<strong>{note.title}</strong>"? 
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


// --- 6. Main App Component ---
function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(['All Notes', 'Work', 'Personal', 'Ideas']);
  const [selectedCategory, setSelectedCategory] = useState('All Notes');
  const [currentNote, setCurrentNote] = useState(null); // The note being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null); // For delete confirmation
  const [isSidebarOpen, setIsSidebarOpen] =useState(false);

  const STORAGE_KEY = 'notesApp.notes';

  // --- Effects ---

  // 1. Load initial data from localStorage or notes.json
  useEffect(() => {
    let initialNotes = [];
    try {
      const storedNotes = localStorage.getItem(STORAGE_KEY);
      if (storedNotes) {
        initialNotes = JSON.parse(storedNotes);
        setNotes(initialNotes);
        setIsLoading(false);
      } else {
        fetch('./notes.json')
          .then(res => {
            if (!res.ok) {
              console.error("Could not find notes.json, starting with empty state.");
              return [];
            }
            return res.json();
          })
          .then(data => {
            setNotes(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          })
          .catch(err => {
            console.error("Failed to load initial notes:", err);
            setNotes([]); // Load empty if fetch fails
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error("Error loading notes:", error);
      localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
      setIsLoading(false);
    }
  }, []); // Empty dependency array, runs once.

  // 2. Persist notes to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  // 3. Update categories list based on notes
  useEffect(() => {
    const noteCategories = notes.map(n => n.category);
    const defaultCategories = ['All Notes', 'Work', 'Personal', 'Ideas'];
    const uniqueCategories = [...new Set([...defaultCategories, ...noteCategories])];
    setCategories(uniqueCategories);
  }, [notes]);

  // --- Memos (Derived State) ---

  // Get notes filtered by the selected category
  const filteredNotes = useMemo(() => {
    const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (selectedCategory === 'All Notes') {
      return sortedNotes;
    }
    return sortedNotes.filter(n => n.category === selectedCategory);
  }, [notes, selectedCategory]);

  // Get categories for the modal (all except 'All Notes')
  const modalCategories = useMemo(() => {
    return categories.filter(c => c !== 'All Notes');
  }, [categories]);

  // Get note counts for the sidebar
  const noteCounts = useMemo(() => {
    const counts = {};
    notes.forEach(note => {
      counts[note.category] = (counts[note.category] || 0) + 1;
    });
    counts['All Notes'] = notes.length;
    return counts;
  }, [notes]);

  // --- Handlers (Memoized) ---

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
  }, []);

  const handleAddNewNote = useCallback(() => {
    setCurrentNote(null);
    setIsModalOpen(true);
  }, []);

  const handleEditNote = useCallback((note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentNote(null);
  }, []);

  const handleDeleteRequest = useCallback((note) => {
    setNoteToDelete(note);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setNoteToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (noteToDelete) {
      setNotes(prevNotes => prevNotes.filter(n => n.id !== noteToDelete.id));
      setNoteToDelete(null);
    }
  }, [noteToDelete]);

  const handleSaveNote = useCallback((noteData) => {
    const { title, description, category } = noteData;
    let finalTitle = title.trim();

    // --- Conflict Handling ---
    // Check for duplicates in the same category, excluding the note being edited
    const existingNotesInCategory = notes.filter(
      n => n.category === category && n.id !== currentNote?.id
    );

    const isDuplicate = existingNotesInCategory.some(
      n => n.title.toLowerCase() === finalTitle.toLowerCase()
    );

    if (isDuplicate) {
      let count = 1;
      let newTitle = `${finalTitle} (${count})`;
      while (existingNotesInCategory.some(n => n.title.toLowerCase() === newTitle.toLowerCase())) {
        count++;
        newTitle = `${finalTitle} (${count})`;
      }
      finalTitle = newTitle;
    }
    // --- End Conflict Handling ---

    if (currentNote) {
      // Editing existing note
      setNotes(prevNotes =>
        prevNotes.map(n =>
          n.id === currentNote.id
            ? { ...n, title: finalTitle, description, category }
            : n
        )
      );
    } else {
      // Creating new note
      const newNote = {
        id: `note_${Date.now()}`, // Simple unique ID
        title: finalTitle,
        description,
        category: category.trim(),
        createdAt: new Date().toISOString()
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }

    handleCloseModal();
  }, [notes, currentNote, handleCloseModal]);


  // --- Render ---

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-medium text-gray-700">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 font-inter">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        noteCounts={noteCounts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Main Content Header */}
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white/75 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label="Open sidebar"
          >
            <IconMenu />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900">{selectedCategory}</h1>
          </div>
          
          <button
            onClick={handleAddNewNote}
            className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <IconPlus />
            <span>New Note</span>
          </button>
        </header>

        {/* Notes Grid */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <NoteList
            notes={filteredNotes}
            onEdit={handleEditNote}
            onDelete={handleDeleteRequest}
          />
        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <NoteModal
          noteToEdit={currentNote}
          existingCategories={modalCategories}
          onSave={handleSaveNote}
          onClose={handleCloseModal}
        />
      )}

      {noteToDelete && (
        <DeleteConfirmationModal
          note={noteToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App; // Export the component at the end