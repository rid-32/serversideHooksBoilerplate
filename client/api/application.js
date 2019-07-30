export const fetchData = () =>
  new Promise(res => {
    setTimeout(() => {
      res({ data: 'Hello, world!' })
    }, 200)
  })
