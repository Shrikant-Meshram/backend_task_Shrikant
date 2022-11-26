const todo = require('../controller/todoController')
const express = require ('express')
const router = express.Router()


router.post('/tasks',todo.createTODO)
router.get('/tasks',todo.findTodo)
router.delete('/tasks/:id',todo.deleteTodo)


module.exports = router