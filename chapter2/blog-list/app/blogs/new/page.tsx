"use client"

import {createBlog} from "@/app/actions/blogs";
import {useActionState} from "react";

const NewBlog = () => {
    const [state, formAction] = useActionState(createBlog, {error: ""})

    return (
        <div>
            <h1>New Blog</h1>
            {state.error && (
                <div style={{marginBottom: "1.5rem", padding: "0.5rem", border: "1px solid red"}}>
                    <p style={{color: "red"}}>{state.error}</p>
                </div>
            )}
            <form action={formAction}>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" name="title" required={true}/>
                </div>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" name="author" required={true}/>
                </div>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="url">Url: </label>
                    <input type="text" id="url" name="url" required={true}/>
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default NewBlog;
