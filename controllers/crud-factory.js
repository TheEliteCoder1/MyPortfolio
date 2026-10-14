// Builds the five CRUD handlers for any Mongoose model (used by contacts, projects, qualifications).
// Async errors are passed to errorHandler automatically (Express 5).
export default function createCrudController(Model, label) {
  const notFound = (res) => res.status(404).json({ message: `${label} not found` });

  return {
    // GET /api/resources
    getAll: async (req, res) => res.json(await Model.find().sort({ createdAt: -1 })),

    // GET /api/resources/:id
    getOne: async (req, res) => {
      const doc = await Model.findById(req.params.id);
      doc ? res.json(doc) : notFound(res);
    },

    // POST /api/resources
    create: async (req, res) => res.status(201).json(await Model.create(req.body)),

    // PUT /api/resources/:id (runValidators re-checks the schema rules)
    update: async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      doc ? res.json(doc) : notFound(res);
    },

    // DELETE /api/resources/:id
    remove: async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      doc ? res.json({ message: `${label} deleted` }) : notFound(res);
    },
  };
}
