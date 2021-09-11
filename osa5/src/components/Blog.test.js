import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockLikes = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'MR BOJAN FLIES AGAIN!',
      author: 'MR Peter Jackson',
      url: 'www.123.com',
      likes: 123123,
      user: {
        id: '123456',
        username: 'Mika',
        name: 'Mikael'
      }
    }

    component = render(
      <Blog key={blog.id} blog={blog} addLikes={mockLikes} user={blog.user} deleteBlog={mockDelete}>
        <div className="testDiv"/>
      </Blog>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(component.container).toHaveTextContent(
      'MR BOJAN FLIES AGAIN!'
    )
    expect(component.container).toHaveTextContent(
      'MR Peter Jackson'
    )
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    expect(component.container).toHaveTextContent(
      'www.123.com'
    )
    expect(component.container).toHaveTextContent(
      '123123'
    )

  })

  test('clicking like two times fires event twice', () => {
    const likeButton = component.container.querySelector('.addLikesButton')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockLikes.mock.calls).toHaveLength(2)
  })
})