"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/auth/server'
import { redirect } from 'next/navigation'
import validatePost from '@/utils/validation/validatePost'
import sanitizeHtml from 'sanitize-html'

const defaultErrorMessage = "Não foi possível enviar a postagem.";
const defaultError = { messages: [defaultErrorMessage] };

const sanitization: sanitizeHtml.IOptions = {
  allowedTags: [
    "div", "p", "h1", "h2", "h3", "strong", "em", "u", "s", "blockquote",
    "ol", "li", "ul", "a", "img", "pre", "sub", "sup", "iframe", "span"
  ],
  allowedClasses: {},
  allowedAttributes: {
    a: ["href", "rel", "target"],
    iframe: ["width", "height", "allowfullscreen", "src"]
  },
  allowedIframeHostnames: ['www.youtube.com'],
  allowedSchemes: ['http', 'https']
};

export default async function createPost(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const title = String(formData.get('title'));
  const content = sanitizeHtml(String(formData.get('content')), sanitization);

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return defaultError;

  const { messages: errorMessages, valid: isPostValid } = validatePost(title, content);
  if (!isPostValid) return { messages: errorMessages };

  const { data: postData, error } = await supabase
    .from("posts")
    .insert({
      author: userData.user.id,
      title,
      content
    })
    .select();
  if (error || !postData) return defaultError;

  const postId = postData[0].id;
  redirect(`/post/${postId}`);
}