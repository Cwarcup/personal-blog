---
title: Nest Routes with React Router DOM
date: '2022-10-28'
tags: ['Routes']
images: '/static/images/individualBlogPostImages/react-router.jpg'
draft: false
summary: I recently started a new project and wanted to share how I set up my routes. I used React Router DOM to nest my routes and create a dynamic navigation bar. This post is about my journey in setting up my routes and the steps I took to get started.
---

## Nested Routes

In your `App.js`, you need to add a wildcard to your route. This will allow you to access any route that is nested under the parent route.

Remember, our parent route is `/shop` and our nested routes are `/shop/:category` and `/shop/:category`. We need to add a wildcard to our parent route so that we can access the nested routes.

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Authenticate />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="shop/*" element={<CategoryPreview />} /> // wildcard
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}
```

> Can be used like so: `<Route path='shop/*' element={<CategoryPreview />} />`. The url would look like this: `http://localhost:3000/shop/food`.

Remember, out final goal is to go from 'http://localhost:3000/shop' to 'http://localhost:3000/shop/sneakers'. We need to add another wildcard to our route.

In our `CategoryPreview.js` file, we need to add another wildcard to our route. This will allow us to access any route that is nested under the parent route.

```jsx
function CategoryPreview() {

  const Preview = () => {
    return (
      {categoryNames.map((item, index) => (
        <Link to={`${item.name.toLowerCase()}`}>
          <span className='absolute inset-0' />
          {item.name}
        </Link>
      ))}
    )
  }

  return (
    <Routes>
      <Route index element={<Preview />} />
      <Route path=':category' element={<CategoryPage />} />
    </Routes>
  )
}
```

> We set the index route to the `Preview` component. We also set the path to `:category` which will allow us to access any route that is nested under the parent route.

Over in the `CategoryPage`, we need to add a few things. We need to add a `useParams` hook to access the `category` parameter. We also need to add a `useEffect` hook to fetch the data from the API.

### Getting a parameter from the url

We can use the `useParams` hook to get the parameter from the url. We can then use this parameter to fetch data from an API.

```jsx
import { useParams } from 'react-router-dom'

function CategoryPreview() {
  const { category } = useParams()

  return (
    <div>
      <h1>{category}</h1>
    </div>
  )
}
```

The `useParams` hook returns an **object** with the parameter as a key. We can then destructure the object to get the parameter.
