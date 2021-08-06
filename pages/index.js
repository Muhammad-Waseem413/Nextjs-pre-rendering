import Link from "next/link";

function Home(props) {
  const { posts } = props;
  console.log(posts);

  return (
    <ul>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link href={`/${post.id}`}>{post.title}</Link>
          </h2>
          <li>{post.body}</li>
        </div>
      ))}
    </ul>
  );
}

export default Home;

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts"); //dummy data endpoint
  const posts = await data.json();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return { props: { posts, revallidate: 10 } };
  //Incremental Static Generation, re-generate the daga after 10 seconds
}
