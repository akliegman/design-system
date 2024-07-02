import { colors } from "../../../../data";

export async function GET(req: Request) {
  return Response.json(colors);
}
