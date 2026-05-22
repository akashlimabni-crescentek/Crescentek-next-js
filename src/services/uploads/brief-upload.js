import { getBase44ServerClient } from '@/integrations/base44-server-client';

/**
 * Store brief PDF via Base44 UploadFile (public URL).
 * Requires BASE44_API_KEY only.
 */
export async function uploadBriefFile(file) {
  if (!file) {
    throw Object.assign(new Error('Missing file'), { status: 400 });
  }

  const result = await getBase44ServerClient().asServiceRole.integrations.Core.UploadFile({
    file,
  });

  if (!result?.file_url) {
    throw new Error('Upload failed: no file_url returned');
  }

  return { file_url: result.file_url };
}
