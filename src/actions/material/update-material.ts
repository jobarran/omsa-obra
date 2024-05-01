'use server';

import { auth } from '@/auth.config';
import { Material } from '@/interfaces';
import prisma from '@/lib/prisma';


export const updateMaterial = async (updatedMaterial: Material) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        };
    }

    try {
        const existingMaterial = await prisma.material.findUnique({
            where: { id: updatedMaterial.id }
        });

        if (!existingMaterial) throw new Error(`Can't find material with ID ${updatedMaterial.id}`);

        await prisma.material.update({
            where: { id: updatedMaterial.id },
            data: {
                status: 'fabrica',
                tracking: updatedMaterial.tracking
            }
        });

        return {
            ok: true,
            message: `Material with ID ${updatedMaterial.id} updated successfully`
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error updating material'
        };
    }
};
