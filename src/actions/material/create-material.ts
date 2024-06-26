'use server';

import { auth } from "@/auth.config";
import { Material } from "@/interfaces";
import prisma from "@/lib/prisma";
import { trakingEntry } from "@/utils";

export const createMaterials = async (materials: Material[], date: string) => {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Array to store created materials
        const createdMaterials = [];

        for (const material of materials) {
            // Check if a material with the same code and projectId exists
            const existingMaterial = await prisma.material.findFirst({
                where: {
                    code: material.code,
                    projectId: material.projectId,
                },
            });

            // If a material with the same code and projectId exists, skip creation
            if (existingMaterial) {
                console.log(`Material with code ${material.code} already exists for projectId ${material.projectId}. Skipping creation.`);
                continue;
            }

            const trakingData = trakingEntry(material, 'recibir')

            // Otherwise, create the material
            const createdMaterial = await prisma.material.create({
                data: {
                    code: material.code,
                    name: material.name,
                    type: material.type,
                    quantity: material.quantity,
                    status: material.status,
                    projectId: material.projectId,
                    received: date,
                    installed: material.installed,
                    tracking: trakingData
                },
                select: {
                    code: true,
                    name: true,
                    type: true,
                    quantity: true,
                    status: true,
                    projectId: true,
                    received: true,
                    installed: true,
                    tracking: true,
                }
            });
            createdMaterials.push(createdMaterial);
        }

        return {
            ok: true,
            materials: createdMaterials,
            message: 'Materials created'
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Cannot create Materials'
        };
    }
};
