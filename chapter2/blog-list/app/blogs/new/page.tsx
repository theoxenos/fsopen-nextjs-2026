"use client"

import {createBlog} from "@/app/actions/blogs";
import {useActionState, useEffect} from "react";
import {NotificationType, useNotification} from "@/app/components/NotificationContext";
import {useRouter} from "next/navigation";

const NewBlog = () => {
    const initialValues = {title: "", author: "", url: ""};
    const [state, formAction] = useActionState(createBlog, {errors: [], values: initialValues, success: false})
    const {showNotification} = useNotification();
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            const messages = ["Blog created successfully!"];
            showNotification(messages, NotificationType.SUCCESS);

            router.push("/blogs");
            return;
        }
        if (state.errors.length > 0) {
            const messages = state.errors;
            showNotification(messages, NotificationType.ERROR);
        }
    }, [state, showNotification, router])

    return (
        <div>
            <h1>New Blog</h1>
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
