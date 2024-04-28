import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import schema from './schema'

export async function GET(req: NextRequest) {
    const actors = await prisma.actor.findMany();
    return NextResponse.json(actors);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const newActor = await prisma.actor.create({
        data: {
            first_name: body.firstName,
            last_name: body.lastName,
            last_update: new Date()
        }
    })

    return NextResponse.json(newActor, { status: 201 })
}