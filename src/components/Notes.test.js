import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';


test('render content', async() => {
    const note = {
        content : 'Component testing is done with react-testing-library',
        important: true,
    }
    const mockHandler = jest.fn();
    render(<Note note={note} toggleImportant={mockHandler}/>)
    const user = userEvent.setup()
    const btn = screen.getByText('make not important')
    await user.click(btn)
   
    expect(mockHandler.mock.calls.length).toBe(1)
    
    // expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})
