import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Status } from "@prisma/client";

const statuses = Object.values(Status);

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const {
    nextUrl: { searchParams },
  } = request;

  const orderByKey = searchParams.get("orderBy");
  const statusFilter = searchParams.get("status") as Status;
  const status = statuses.includes(statusFilter) ? statusFilter : undefined;

  const orderBy = orderByKey ? { [orderByKey]: "asc" } : {};

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return NextResponse.json(issues);
}
