import React, { Suspense } from 'react'
import Form from './addTodoForm'
import Todos from './todos'
import Loading from './loading'

const page = async () => {

  return (
    <div className="container">
      <Loading/>
      <Form />
      <Suspense fallback={<Loading />}>
      {/* <Todos /> */}
      </Suspense>

    </div>
  )
}

export default page