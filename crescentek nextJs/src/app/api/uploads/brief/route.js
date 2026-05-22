import { apiError, apiJson } from '@/lib/api-route';
import { uploadBriefFile } from '@/services/uploads/brief-upload';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      throw Object.assign(new Error('Missing file'), { status: 400 });
    }
    const result = await uploadBriefFile(file);
    return apiJson(result);
  } catch (error) {
    return apiError(error);
  }
}
