import React from "react";

function PostDetails(props) {
  const { post } = props;
  console.log(post);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h5>{post.id}</h5>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
}

export default PostDetails;

export async function getStaticProps(context) {
  const { params } = context;
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await data.json();

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  //using getServerSideProps we don't need this function to pre-render these dynamic paths
  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ],
    fallback: true, //only above listed pages pre-rendered by the next js,
    //the other pages are refetched by sending request
  };
}
