import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglabel from "./Togglabel";

describe('<Togglelable />', ()=>{
    let container
    beforeEach(()=>{
        container = render(
            <Togglabel buttonLabel="show">
                <div className="testDiv">
                    togglabel content
                </div>
            </Togglabel>
        ).container
    })

    test('renders its children', async()=>{
        await screen.findAllByAltText(' togglabel content')
    })

    test('at start the children are not displayed', ()=>{
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display:none')
    })

    test('after clicking the button, children are displayed', async ()=>{
        const user = userEvent.setup()
        const btn = screen.getByText('show...')
        await user.click(btn)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display:none')
    })

    test('toggledcontent can be closed', async ()=>{
        const user = userEvent.setup()
        const btn = screen.getByText('show...')
        await user.click(btn)

        const closeBtn = screen.getByText('cancel')
        await user.click(closeBtn)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})