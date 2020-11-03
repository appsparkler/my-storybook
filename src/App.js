import {Stack}from '@fluentui/react'
import DateTimeForm from './components/DateTimeForm'

function App() {
  return (
    <Stack tokens={{childrenGap: 10, padding: 10}}>
      <h1>Time Tool</h1>
      <DateTimeForm />
    </Stack>
  );
}

export default App;
