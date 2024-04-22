'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const deleteProjectById = async (id: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        };
    }

    try {
        const project = await prisma.project.findUnique({
            where: { id }
        });

        if (!project) throw `Can't find project with ID ${id}`;

        // Assuming prisma has a delete method
        await prisma.project.delete({
            where: { id }
        });

        return {
            ok: true,
            message: `Project with ID ${id} deleted successfully`
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error deleting project'
        };
    }
};