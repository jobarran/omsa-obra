'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface Props {
    code: string,
    name: string;
    shortName: string
}

export const createProject = async ({name, shortName, code} :Props) => {

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
                code,
                name,
                shortName,
            },
            select: {
                code: true,
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