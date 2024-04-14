'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getProjects = async () => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        };
    }

    try {
        const projects = await prisma.project.findMany({
        });

        if (projects.length === 0) {
            return {
                ok: true,
                projects: []
            };
        }

        return {
            ok: true,
            projects: projects
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error fetching project short names'
        };
    }
};