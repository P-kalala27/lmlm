import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteForm from "./NoteForm";

test('<NoteFrom /> update parent state and calls onSubmit ', async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} /> )

  const input = Screen.getByRole('textBox')
  const saveBtn = Screen.getByText('Save')

  await user.type(input, 'testing a form')
  user.click(saveBtn)

  expect(createNote.moke.calls).toHaveLength(1)
  expect(createNote.moke.calls[0][0].content).toBe('testing a form...')
})
