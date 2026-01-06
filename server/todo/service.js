
const Todo = require('./todo.model');


const getTodos = async (limit, page, user) => {
  try {
    const offset = (page - 1) * limit;
    const todos = await Todo.find({
      createdBy: user.id
    }, null, { limit: limit, skip: offset });
    return todos;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getTodoById = async (id) => {
  try {
    const todos = await Todo.findById(id);
    return todos;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



const createTodo = async (todo, user) => {
  
  try {
    const newTodo = new Todo(
      {
        title: todo.title,
        isCompleted: todo.isCompleted || false,
        createdBy: user.id
      }
    );
    await newTodo.save();
    return newTodo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


const updateTodo = async (todoId, updatedFields, user) => {
  try {
 
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, createdBy: user.id }, 
      { $set: updatedFields },
      { new: true, runValidators: true } 
    );

    return updatedTodo; 
  } catch (error) {
    console.error('Error in updateTodo:', error);
    throw error;
  }
};


const deleteTodo = async (todoId, user) => {
  try {
    
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    const deletedTodo = await Todo.findOneAndDelete({
      _id: todoId,
      createdBy: user.id 
    });

    return deletedTodo; 
  } catch (error) {
    console.error('Error in deleteTodo:', error);
    throw error;
  }
};



module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };