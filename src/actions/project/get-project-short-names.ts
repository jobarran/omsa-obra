'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getProjectShortNames = async () => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        };
    }

    try {
        const projects = await prisma.project.findMany({
            select: {
                shortName: true
            }
        });

        if (projects.length === 0) {
            return {
                ok: true,
                projects: []
            };
        }

        return {
            ok: true,
            projectShortNames: projects.map(project => project.shortName)
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error fetching project short names'
        };
    }
};