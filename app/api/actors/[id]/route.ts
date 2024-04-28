import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    let id = Number.parseInt(params.id);
    if (Number.isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'id is invalid' }, { status: 400 })
    }

    const actor = await prisma.actor.findUnique({
        where: {
            actor_id: id
        }
    })

    if (!actor) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }

    return NextResponse.json(actor, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    let id = Number.parseInt(params.id);
    if (Number.isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'id is invalid' }, { status: 400 })
    }

    const body = await req.json()
    const validation = schema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const actor = await prisma.actor.findUnique({
        where: {
            actor_id: id
        }
    })

    if (!actor) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }

    const updateActor = await prisma.actor.update({
        where: { actor_id: id },
        data: {
            first_name: body.firstName,
            last_name: body.lastName,
            last_update: new Date()
        }
    })

    return NextResponse.json(updateActor);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    
    let id = Number.parseInt(params.id);
    if (Number.isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'id is invalid' }, { status: 400 })
    }

    const actor = await prisma.actor.findUnique({
        where: {
            actor_id: id
        }
    })

    if (!actor) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }

    await prisma.actor.delete({
        where: { actor_id: actor.actor_id }
    })

    return NextResponse.json({})
}