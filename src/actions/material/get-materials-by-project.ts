'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getMaterialsByProject = async (projectId: string | undefined) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        };
    }

    try {
        let materials;

        if (projectId) {
            // If projectId is provided, filter materials by projectId
            materials = await prisma.material.findMany({
                where: {
                    projectId: projectId
                }
            });
        } else {
            // If projectId is not provided, fetch all materials
            materials = await prisma.material.findMany();
        }

        if (materials.length === 0) {
            return {
                ok: true,
                materials: []
            };
        }

        return {
            ok: true,
            materials: materials
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error fetching materials'
        };
    }
};