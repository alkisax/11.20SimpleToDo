import type { Todo } from '../types/types';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type HomepageProps = {
  username: string;
  newTodo: string;
  handleAdd: () => void;
  todos: Todo[]; 
  setUsername: (username: string) => void;
  setNewTodo: (todo: string) => void;
  handleDelete: (id?: string) => void;
};

const Homepage = ({ username, newTodo, handleAdd, todos, setUsername, setNewTodo, handleDelete }: HomepageProps) => {

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            id='new-todo'
            label="New Todo"
            variant="outlined"
            value={newTodo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
            fullWidth
          />
          <Button id='addButton' variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Box>

        <List>
          {todos.map(todo => (
            <ListItem
              key={todo._id}
              divider
              secondaryAction={
                <IconButton id={`delete_${todo._id}`} edge="end" aria-label="delete" onClick={() => handleDelete(todo._id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={todo.todo}
                secondary={todo.username ? `User: ${todo.username}` : 'User: anonymous'}
              />
            </ListItem>
          ))}
        </List>
      </Container>    
    </>
  )
}

export default Homepage