import { getUserByNameSlug } from 'lib/users';
import { getPostsByAuthorSlug } from 'lib/posts';
import { AuthorJsonLd } from 'lib/json-ld';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Author({ user, posts }) {
  const { title, name, avatar, description, slug } = user;

  const { metadata } = usePageMetadata({
    metadata: {
      ...user,
      title,
      description: description || user.og?.description || `Read ${posts.length} posts from ${name}`,
    },
  });

  return (
    <>
      <AuthorJsonLd author={user} />
      <TemplateArchive
        title={name}
        Title={<Title title={name} thumbnail={avatar} />}
        posts={posts}
        slug={slug}
        metadata={metadata}
      />
    </>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { user } = await getUserByNameSlug(params?.slug);

  if (!user) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByAuthorSlug(user?.slug);

  return {
    props: {
      user,
      posts,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
