"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/auth/server'
import sanitizeHtml from 'sanitize-html'
import validateComment from '@/utils/validation/validateComment'

const defaultErrorMessage = "Não foi possível enviar o comentário.";
const defaultError = { result: "error", messages: [defaultErrorMessage] };

const sanitization: sanitizeHtml.IOptions = {
  allowedTags: [
    "div", "p", "h1", "h2", "h3", "strong", "em", "u", "s", "blockquote",
    "ol", "li", "ul", "pre", "sub", "sup", "span"
  ],
  allowedClasses: {}
};

type State = {
  result?: string
  messages?: string[]
}

export default async function createComment(prevState: State, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const postId = String(formData.get('post'));
  const content = sanitizeHtml(String(formData.get('content')), sanitization);

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return defaultError;

  const { messages: errorMessages, valid: isPostValid } = validateComment(content);
  if (!isPostValid) return { result: "error", messages: errorMessages };

  const { data: postData, error } = await supabase
    .from("comments")
    .insert({
      author: userData.user.id,
      post: postId,
      content
    })
    .select();

  if (error || !postData) return defaultError;

  return { result: "success", messages: [] };
}