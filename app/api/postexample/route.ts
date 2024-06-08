import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // add try catch if you're calling anything external
    const { test } = await request.json();
    

    return NextResponse.json(test, { status: 200 });
}
