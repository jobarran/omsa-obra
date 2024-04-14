'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface Props {
    name: string;
    shortName: string
}

export const createProject = async ({name, shortName} :Props) => {

    const session = await auth();
    const userId = session?.user.id


    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {

        const project = await prisma.project.create({
            data: {
                name,
                shortName,
            },
            select: {
                name: true,
                shortName: true
            }
        })

        return {
            ok: true,
            user: project,
            message: 'Project created'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Cannot create Project'
        }
    }
};