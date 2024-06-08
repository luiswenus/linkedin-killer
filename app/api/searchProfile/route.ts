import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams);
    const supabase = createClient();

    const searchQuery = queryParams["search_query"]

    const response = "" //semanticSearch(searchQuery)

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
