// import Note from '../models/noteModel.js';

// class mynoteController {
//   async createNote(req, res) {
//     try {
//       const user = req.user.id;

//       const { title, description } = req.body;
//       const note = new Note({ title, description, user });
//       await note.save();

//       res.status(201).json({ data: note, status: 201, message: "Note created successfully" });
//     } catch (error) {
//       res.status(500).json({ status: 500, message: error.message });
//     }
//   }
//   // Get all notes
//   async getAllNotes(req, res) {
//     try {
//       const notes = await Note.find();
//       res.json({ data: notes, status: 200, message: "All notes retrieved successfully" });
//     } catch (error) {
//       res.status(500).json({ status: 500, message: error.message });
//     }
//   }

//   // Get note by ID
//   async getNoteById(req, res) {
//     try {
//       const note = await Note.findById(req.params.id);
//       if (!note) {
//         return res.status(404).json({ status: 404, message: 'Note not found' });
//       }
//       res.json({ data: note, status: 200, message: "Note with particular ID retrieved" });
//     } catch (error) {
//       res.status(500).json({ status: 500, message: error.message });
//     }
//   }

//   // Update a note
//   async updateNote(req, res) {
//     try {
//       // user information from the request object
//       const userId = req.user._id;


//       const noteId = req.params.id;
//       const { title, description } = req.body;
//       const note = await Note.findOneAndUpdate({ _id: noteId, userId }, { title, description }, { new: true });

//       if (!note) {
//         return res.status(404).json({ status: 404, message: 'Note not found' });
//       }

//       res.json({ data: note, status: 201, message: "Note updated successfully" });
//     } catch (error) {
//       res.status(500).json({ status: 500, message: error.message });
//     }
//   }

//   // Delete a note
//   async deleteNote(req, res) {
//     try {
//       const userId = req.user._id;

//       const noteId = req.params.id;
//       const note = await Note.findOneAndDelete({ _id: noteId, userId });

//       if (!note) {
//         return res.status(404).json({ status: 404, message: 'Note not found' });
//       }

//       res.json({ status: 200, message: 'Note deleted' });
//     } catch (error) {
//       res.status(500).json({ status: 500, message: error.message });
//     }
//   }

//   // Route search on title basis of query
//   async titleSearch(req, res) {
//     try {
//       let query = {};
//       let title = req.query.title;
//       if (title) {
//         query = { title: { $regex: title, $options: 'i' } };
//       }

//       const notes = await Note.find(query);
//       res.status(200).json(notes);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   // Get last three notes based on updated time
//   async lastThreeNotes(req, res) {
//     try {
//       const notes = await Note.find().sort({ updatedAt: -1 }).limit(3);
//       res.json({ data: notes, status: 200, message: 'Last three notes based on updated time retrieved successfully' });
//     } catch (error) {
//       res.status(500).json({ status: 500, message: error.message });
//     }
//   }
//  async deleteParticular(req, res)  {
//     try {
//       const { noteIds } = req.body;
//       if (!Array.isArray(noteIds) || noteIds.length === 0) {
//         return res.status(400).json({ message: 'Invalid note IDs provided' });
//       }
//       const updatedNotes = await Note.updateMany(
//         { _id: { $in: noteIds } }, 
//         { isDeleted: true } 
//       );
  
//       res.status(200).json({ message: 'Notes marked as deleted successfully', updatedNotes });
//     } catch (error) {
//       console.error('Error marking notes as deleted:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };

//    async noteVisible (req, res) {
//     try {
//       const notes = await Note.find({ isDeleted: false });
//       res.status(200).json({ data: notes,status:200, message: 'Notes fetched successfully' });
//     } catch (error) {
//       res.status(500).json({ status:500, message: error.message });
//     }
//   }
// }

// export default new mynoteController();
import Note from '../models/noteModel.js';

class mynoteController {
  async createNote(req, res, next) {
    try {
      const user = req.user.id;

      const { title, description } = req.body;
      const note = new Note({ title, description, user });
      await note.save();

      res.status(201).json({ data: note, status: 201, message: "Note created successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Get all notes
  async getAllNotes(req, res, next) {
    try {
      const notes = await Note.find();
      res.json({ data: notes, status: 200, message: "All notes retrieved successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Get note by ID
  async getNoteById(req, res, next) {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ status: 404, message: 'Note not found' });
      }
      res.json({ data: note, status: 200, message: "Note with particular ID retrieved" });
    } catch (error) {
      next(error);
    }
  }

  // Update a note
  async updateNote(req, res, next) {
    try {
      const userId = req.user._id;

      const noteId = req.params.id;
      const { title, description } = req.body;
      const note = await Note.findOneAndUpdate({ _id: noteId, userId }, { title, description }, { new: true });

      if (!note) {
        return res.status(404).json({ status: 404, message: 'Note not found' });
      }

      res.json({ data: note, status: 201, message: "Note updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Delete a note
  async deleteNote(req, res, next) {
    try {
      const userId = req.user._id;

      const noteId = req.params.id;
      const note = await Note.findOneAndDelete({ _id: noteId, userId });

      if (!note) {
        return res.status(404).json({ status: 404, message: 'Note not found' });
      }

      res.json({ status: 200, message: 'Note deleted' });
    } catch (error) {
      next(error);
    }
  }

  // Route search on title basis of query
  async titleSearch(req, res, next) {
    try {
      let query = {};
      let title = req.query.title;
      if (title) {
        query = { title: { $regex: title, $options: 'i' } };
      }

      const notes = await Note.find(query);
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }

  // Get last three notes based on updated time
  async lastThreeNotes(req, res, next) {
    try {
      const notes = await Note.find().sort({ updatedAt: -1 }).limit(3);
      res.json({ data: notes, status: 200, message: 'Last three notes based on updated time retrieved successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Delete particular notes
  async deleteParticular(req, res, next) {
    try {
      const { noteIds } = req.body;
      if (!Array.isArray(noteIds) || noteIds.length === 0) {
        return res.status(400).json({ message: 'Invalid note IDs provided' });
      }
      const updatedNotes = await Note.updateMany(
        { _id: { $in: noteIds } }, 
        { isDeleted: true } 
      );
  
      res.status(200).json({ message: 'Notes marked as deleted successfully', updatedNotes });
    } catch (error) {
      next(error);
    }
  }

  // Get visible notes (not deleted)
  async noteVisible(req, res, next) {
    try {
      const notes = await Note.find({ isDeleted: false });
      res.status(200).json({ data: notes, status: 200, message: 'Notes fetched successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new mynoteController();
