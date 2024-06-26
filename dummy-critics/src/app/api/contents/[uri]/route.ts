import { getContentDetails } from "../../utils";

export async function GET(
  request: Request,
  { params }: { params: { uri: string } }
) {
  const { uri: contentUri } = params;

  const content = await getContentDetails(contentUri);

  return Response.json(content);
}
