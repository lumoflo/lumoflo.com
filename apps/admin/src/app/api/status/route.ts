import { NextResponse } from "next/server";

import { getParentAndChildrenMediaFromInstagram } from "@gramflow/instagram";

export const GET = async (req: Request) => {
  return NextResponse.json({
    message: "Hello from the API",
  });
};
