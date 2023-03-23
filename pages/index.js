import Prismic from "prismic-javascript";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import Layout from "../components/Layout";
import Link from "next/link";
import { Client } from "../prismic-configuration";

export default function Home({ articles, trending }) {
  return (
    <div>
      <Head>
        <title>Telenews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className=" text-2xl uppercase font-bold opacity-50 my-10 ml-24">
          {" "}
          See what's happening around the world
        </h1>

        <div className="flex">
          <div className="flex  flex-col w-2/3 ml-24 mr-20">
            {articles.results.map((article, index) => (
              <div className="mb-10" key={article.uid}>
                <Link href={`article/${article.uid}`}>
                  <h1 className="bold text-3xl text-blue-600 cursor-pointer">
                    {RichText.render(article.data.title)}
                  </h1>
                </Link>

                <img
                  className="w-2/3"
                  src={article.data.feature_image.url}
                  alt="img"
                />

                <h1 className="mt-5">
                  {" "}
                  {RichText.render(article.data["preview-info"])}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex  flex-col w-1/3">
            <h1 className="text-xl uppercase font-bold opacity-50 my-10 ml-24">
              See what's trending
            </h1>

            {trending.results.map((article, index) => (
              <div key={article.uid}>
                <Link href={`trending/${article.uid}`}>
                  <h1 className="bold text-xl text-blue-600 cursor-pointer">
                    {RichText.render(article.data.headline)}
                  </h1>
                </Link>

                <hr className="mt-5" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

// this function is called everytime a request/refresh is made

export async function getServerSideProps() {
  const articles = await Client().query(
    Prismic.Predicates.at("document.type", "article")
  );
  const trending = await Client().query(
    Prismic.Predicates.at("document.type", "trending")
  );

  return {
    props: {
      articles: articles,
      trending: trending,
    },
  };
}
