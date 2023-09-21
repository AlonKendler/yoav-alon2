const CodeBlocks = require('../models/codeBlocks.js');

// GET all code blocks
const getAllCodeBlocks = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('GET All Code Blocks: Request received');
    res.json(CodeBlocks);
  } catch (err) {
    console.error('GET All Code Blocks: Error', err);
    res.status(500).json({ error: err.message });
  }
};

// GET a specific code block by ID
const getCodeBlockById = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('GET Code Block by ID: Request received');
    const codeBlock = CodeBlocks.find((block) => block.id === req.params.id);

    if (!codeBlock) {
      console.log('GET Code Block by ID: Code block not found');
      return res.status(404).json({ error: 'Code block not found' });
    }

    console.log('GET Code Block by ID: Code block found');
    res.json(codeBlock);
  } catch (err) {
    console.error('GET Code Block by ID: Error', err);
    res.status(500).json({ error: err.message });
  }
};

// POST a new code block
const createCodeBlock = async (req, res) => {
  try {
    console.log('POST Code Block: Request received');
    const codeBlock = new CodeBlock(req.body);
    await codeBlock.save();
    console.log('POST Code Block: Code block saved', codeBlock);
    res.status(201).json(codeBlock);
  } catch (err) {
    console.error('POST Code Block: Error', err);
    res.status(400).json({ error: err.message });
  }
};

// PUT (update) a code block
const updateCodeBlock = async (req, res) => {
  try {
    console.log('PUT Code Block: Request received');
    const codeBlock = await CodeBlock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log('PUT Code Block: Code block updated', codeBlock);
    res.json(codeBlock);
  } catch (err) {
    console.error('PUT Code Block: Error', err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE a code block
const deleteCodeBlock = async (req, res) => {
  try {
    console.log('DELETE Code Block: Request received');
    await CodeBlock.findByIdAndDelete(req.params.id);
    console.log('DELETE Code Block: Code block deleted successfully');
    res.json({ message: 'Code block deleted successfully' });
  } catch (err) {
    console.error('DELETE Code Block: Error', err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllCodeBlocks,
  getCodeBlockById,
  createCodeBlock,
  updateCodeBlock,
  deleteCodeBlock,
};