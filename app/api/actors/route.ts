import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function GET(req: NextRequest) {
    const actors = await prisma.actor.findMany();
    return NextResponse.json(actors);
}
