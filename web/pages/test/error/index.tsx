import { NextPage } from 'next'
import { useState } from 'react'

export const TestError: NextPage = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow)
  {
    throw new Error('BOOM!')
  }
  
  return (
    <button onClick={() => setShouldThrow(true)}>Click to test error page.</button>
  )
}

export default TestError