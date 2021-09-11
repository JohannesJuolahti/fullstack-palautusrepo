import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {

    component = render(
      <BlogForm createBlog={createBlog}>
        <div className="testDiv"/>
      </BlogForm>
    )
  })

  test('creates a blog with right information', () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Test title' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Test author' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'Test url' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('Test title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test author')
    expect(createBlog.mock.calls[0][0].url).toBe('Test url')
  })

})