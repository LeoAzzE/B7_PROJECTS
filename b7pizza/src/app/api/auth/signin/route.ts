import { createUserToken, validateAuth } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ Error: "Campos imcompletos" });
  }

  const user = await validateAuth(email, password);

  if (!user) return NextResponse.json({ Error: "Acesso Negado" });

  const token = await createUserToken(user.id);

  return NextResponse.json({ user, token });
}
