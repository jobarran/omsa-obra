'use client'

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProject } from "@/actions";
import { useEffect, useState } from "react";

type FormInputs = {
    code: string;
    name: string;
    shortName: string;
}

interface Props {
    projectShortNames: string[] | []
}

export const RegisterProjectForm = ({projectShortNames}:Props) => {


    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')
        if (projectShortNames?.some(shortNames => shortNames === data.shortName)) {
            console.log('exist')
            setErrorMessage('You already have a project with this name')
        }

        const resp = await createProject(data)

        if (!resp.ok) {
            setErrorMessage('Cannot create project')
            return
        }
        window.location.replace('/admin')
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

            <div>
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900">Code</label>
                <input
                    type="text"
                    id="code"
                    placeholder="1234"
                    maxLength={4}
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('code', {
                        required: true,
                    })
                    }
                />
            </div>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Project Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Project 01"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('name', {
                        required: true,
                    })
                    }
                />
            </div>
            <div>
                <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-900">Project Short Name (4 characters max)</label>
                <input
                    type="text"
                    id="shortName"
                    placeholder="P01"
                    maxLength={4}
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('shortName', {
                        required: true,
                    })}
                />
            </div>

            <button
                type="submit"
                className="btn-login"
            >
                Create
            </button>
        </form>

    )
}
