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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">New Blog</h1>
            <form action={formAction}>
                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium">Title: </label>
                    <input type="text" id="title" name="title" required={true} defaultValue={state.values?.title}
                           className="form-input"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block font-medium">Author: </label>
                    <input type="text" id="author" name="author" required={true} defaultValue={state.values?.author}
                           className="form-input"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="url" className="block font-medium">Url: </label>
                    <input type="text" id="url" name="url" required={true} defaultValue={state.values?.url}
                           className="form-input"/>
                </div>
                <div className="flex gap-2">
                    <button
                        className="btn btn-primary"
                        type="submit">Create Blog
                    </button>
                    <button className="btn btn-secondary" onClick={() => router.back()}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default NewBlog;
