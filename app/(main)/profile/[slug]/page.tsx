import DateText from '@/app/_components/general/DateText';
import Pagination from '@/app/_components/navigation/Pagination';
import SignOutButton from '@/app/_components/auth/SignOutButton';
import { createClient } from '@/utils/auth/server'
import getQueryPage from '@/utils/query/getQueryPage';
import getQueryRange from '@/utils/query/getQueryRange';
import creationTimeSec from '@/utils/time/creationTimeSec';
import timeSecToString from '@/utils/time/timeSecToString';
import unwrap, { Unwrap } from '@/utils/types/unwrap';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stripHtml } from 'string-strip-html';
import { Metadata } from 'next';
import configs from "@/app/configs.json"
import SettingsButton from '@/app/_components/user/SettingsButton';

enum ActivityType {
  Comment,
  Post
}

type Props = {
  params: { slug: string },
  searchParams: { [key: string]: string | string[] | undefined }
}

type ActivityProps = {
  postName?: string,
  username: string,
  createdAt: number,
  route?: string,
  content?: string,
  action: string
  actionNotFound: string
}

function Activity({ children }: React.PropsWithChildren) {
  return (
    <li className="flex flex-col gap-1 border border-gray-200 py-2 px-4 rounded-lg">
      {children}
    </li>
  )
}

function ActivityHeader({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-1">
      {children}
    </div>
  )
}

function ActivityContent({ children }: React.PropsWithChildren) {
  return (
    <p className="text-gray-600 text-sm sm:text-base">
      {children}
    </p>
  )
}

function ProfileActivity({ postName, username, createdAt, route, content, action, actionNotFound }: ActivityProps) {
  const maxSizeContent = 100;

  const creationTime = timeSecToString(creationTimeSec(createdAt));

  const getSizedContent = (str: string) =>
    str.length < maxSizeContent ? str : str.slice(0, maxSizeContent) + "...";

  return (
    <Activity>
      <ActivityHeader>
        <p className="break-words font-medium w-full">
          {
            route ?
              <>
                <Link href={`/profile/${username}`} className="text-blue-600">{username}</Link>
                <span className="text-gray-700"> {action}</span>
                <Link href={route} className="text-blue-600"> {postName}</Link>
              </> :
            <p className="text-red-600 font-medium">{`${username} ${actionNotFound}`}</p>
          }
          <span className="text-gray-500"> há {creationTime}</span>
        </p>
      </ActivityHeader>
      <ActivityContent>
        {content && getSizedContent(content)}
      </ActivityContent>
    </Activity>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient(cookies());
  const username = decodeURIComponent(params.slug);

  const { data: query } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username);

  if (!query || query.length === 0) notFound();

  const post = query[0];

  return {
    title: `Perfil de ${post.username} - ${configs.title}`
  }
}

export default async function Page({ params, searchParams }: Props) {
  const supabase = createClient(cookies());

  const page = getQueryPage(searchParams.page);
  const [startRange, endRange, rangeStep] = getQueryRange(page);

  const username = decodeURIComponent(params.slug);
  
  const { data: profileData } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      created_at,
      posts!posts_author_fkey (
        id,
        created_at,
        title
      ),
      comments (
        id,
        content,
        post (
          id,
          title
        ),
        parent (
          id,
          author (
            username
            )
          ),
        created_at
      )
    `)
    .eq("username", username);

  if (!profileData || profileData.length === 0) notFound();

  const profile = profileData[0];

  const { data: userData } = await supabase.auth.getUser();

  const isOwnProfile = userData.user?.id === profile.id;

  const creationTime = new Date(profile.created_at * 1000);

  const getCommentRoute = (c: Unwrap<typeof profile.comments>) =>
    c.post ? `/post/${unwrap(c.post)!.id}?comment=${c.id}` : undefined;

  const getPostRoute = (c: Unwrap<typeof profile.posts>) =>
    `/post/${unwrap(c)!.id}`;
  
  const activities = [
    ...profile.comments.map(c => ({ type: ActivityType.Comment as ActivityType.Comment, value: c })),
    ...profile.posts.map(c => ({ type: ActivityType.Post as ActivityType.Post, value: c }))
  ]
  .sort((a, b) => b.value.created_at - a.value.created_at)
  .slice(startRange, endRange);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{profile.username}</h1>
        {
          isOwnProfile &&
          <div className="flex flex-row gap-2">
            <SettingsButton />
            <SignOutButton />
          </div>
        }
      </div>
      <p className="text-gray-500">Membro desde <DateText date={creationTime} /></p>
      <Pagination hasBefore={startRange > 0} hasNext={activities.length > rangeStep} thisPage={page} query={searchParams}>
        <ul className="flex flex-col gap-2 py-6">
          {
            activities.length > 0 ?
              activities.map(c =>
                <ProfileActivity
                  key={c.type + "#" + c.value.id}
                  createdAt={c.value.created_at}
                  username={profile.username}
                  postName={c.type === ActivityType.Comment ? unwrap(c.value.post)?.title : c.value.title}
                  content={c.type === ActivityType.Comment ? stripHtml(c.value.content).result : undefined}
                  route={c.type === ActivityType.Comment ? getCommentRoute(c.value) : getPostRoute(c.value)}
                  action={c.type === ActivityType.Comment ? "comentou em" : "publicou"}
                  actionNotFound={c.type === ActivityType.Comment ? "comentou em um post removido" : "publicou um post removido"}
                />
              ) :
              <p>Nenhuma atividade encontrada.</p>
          }
        </ul>
      </Pagination>
    </div>
  )
}