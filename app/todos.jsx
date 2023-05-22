import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TodoItem } from '../components/ServerComponent'

const fetchtodo = async (token) => {
    try {
        const res = await fetch(`${process.env.URL}/api/getTask`, {
            cache: "no-cache",
            // credentials: 'include',
            headers: {
                cookie: `token=${token}`
            }
        })

        const data = await res.json()

        if (!data.success) return [];

        return data.allTasks;
    } catch (error) {
        console.log(error)
        return [];
    }
}

const Todos = async () => {
    const token = cookies().get("token")?.value;
    if (!token) return redirect("/login")
    const tasks = await fetchtodo(token)
    return (
        <section className="todosContainer">

            {
                tasks?.map((data, i) => (
                    <TodoItem
                        key={i}
                        title={data.title}
                        description={data.description}
                        id={data._id}
                        completed={data.isCompleted}
                    />
                ))
            }

        </section>
    )
}

export default Todos