"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const AddTodoForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTaskHandler = async (e) => {
    const details = {
      title: title,
      description: description,
    }
    // validate();
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      })

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh()
      setTitle("")
      setDescription("")
    } catch (error) {
      return toast.error(error);
    }
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={addTaskHandler}>
          <input
            type="text"
            value={title}
            placeholder='Task Title'
            onChange={(e) => setTitle(e.target.value)} />
          <input
            type="text"
            value={description}
            placeholder='Task Description'
            onChange={e => setDescription(e.target.value)} />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  )
}

export default AddTodoForm