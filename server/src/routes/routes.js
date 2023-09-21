// routes.js
const express = require('express');
const router = express.Router();
const { getAllCodeBlocks,
       getCodeBlockById,
       createCodeBlock, 
       updateCodeBlock, 
       deleteCodeBlock } 
       = require('../controllers/controllers.js');

// GET all code blocks
router.get('/codeblocks', getAllCodeBlocks);

// GET a specific code block by ID
router.get('/codeblocks/:id', getCodeBlockById);

// POST a new code block
router.post('/codeblocks', createCodeBlock);

// PUT (update) a code block
router.put('/codeblocks/:id', updateCodeBlock);

// DELETE a code block
router.delete('/codeblocks/:id', deleteCodeBlock);

module.exports = router;