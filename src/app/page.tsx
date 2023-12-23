"use client"
import React, { useState, FormEvent, ChangeEvent } from "react";

interface Task {
  title: string;
  desc: string;
}

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedTasks = [...mainTask];
      if (editIndex >= 0 && editIndex < updatedTasks.length) {
        updatedTasks[editIndex] = { title, desc };
        setMainTask(updatedTasks);
        setEditIndex(null);
      }
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i: number) => {
    const copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const editHandler = (k: number) => {
    const taskToEdit = mainTask[k];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setEditIndex(k);
  };

  const cancelEditHandler = () => {
    setEditIndex(null);
    setTitle("");
    setDesc("");
  };

  let renderTask=<h2 className="grid justify-center text-1xl font-semibold">No Task Exist</h2>

  if (mainTask.length > 0) {
    renderTask = (
      <ul>
        {mainTask.map((t, i) => (
          <li key={i} className="grid grid-rows-1 grid-cols-3 gap-10">
            <div className="grid grid-cols-2 gap-10">
              <h5 className="text-3xl font-serif font-semibold gap-2">{t.title}</h5>
              <h6 className="grid text-2xl font-semibold font-serif gap-2 lg:ml-[450px] md:ml-[200px] ml-[80px]">{t.desc}</h6>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:ml-[750px] md:ml-[750px] ml-[50px] mb-6">
            <button
              onClick={() => editHandler(i)}
              className=" bg-blue-500 text-white rounded font-bold w-[80px] h-[36px] ml-[90px]"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-700 text-white rounded font-bold w-[80px] h-[36px] lg:ml-0 md:ml-0 ml-[90px] lg:mt-0 md:mt-0 mt-2"
            >
              Delete
            </button>
           
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="bg-blue-300">
        <h1 className="text-sky-700 p-5 text-center font-bold text-5xl">
          Todo-List App
        </h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="text-2xl border-2 border-black  m-4 px-3 py-1"
            placeholder="Enter Your Task Here..."
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="text-2xl border-2 border-black  m-4 px-3 py-1"
            placeholder="Enter Your Description Here..."
            value={desc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
          />
          <button className="bg-cyan-900 text-green-500 px-4 py-3 text-2xl font-bold rounded m-5">
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={cancelEditHandler}
              className="bg-gray-500 text-white px-4 py-3 text-2xl font-bold rounded m-5"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="flex text-2xl font-bold px-4 lg:gap-[600px] md:gap-[780px] gap-[100px]">
        <div>Task</div>
        <div>Description</div>
      </div>

      <div className="bg-sky-200 p-1 ">
        <div className="ml-2">{renderTask}</div>
      </div>
    </>
  );
};

export default Page;
