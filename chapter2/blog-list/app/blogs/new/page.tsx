"use client"

import {createBlog} from "@/app/actions/blogs";
import {useActionState} from "react";

const NewBlog = () => {
    const initialValues = {title: "", author: "", url: ""};
    const [state, formAction] = useActionState(createBlog, {errors: [], values: initialValues})

    return (
        <div>
            <h1>New Blog</h1>
            {state.errors?.length > 0 && (
                <div style={{marginBottom: "1.5rem", padding: "0.5rem", border: "1px solid red"}}>
                    {state.errors.map((error, index) => (
                        <p key={index} style={{color: "red"}}>{error}</p>
                    ))}
                </div>
            )}
            <form action={formAction}>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" name="title" required={true} defaultValue={state.values?.title}/>
                </div>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" name="author" required={true} defaultValue={state.values?.author}/>
                </div>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="url">Url: </label>
                    <input type="text" id="url" name="url" required={true} defaultValue={state.values?.url}/>
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default NewBlog;
