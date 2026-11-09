import BuyMeACoffee from "@/Components/buyMeACoffee";
import { getLongVideos, getCertificates } from "@/Lib";
import {
  About,
  Speaking,
  BlogsAndVideos,
  Projects,
  Certificates,
} from "@/Sections";

const CONTENT_REFRESH_SECONDS = 3600;

export const getStaticProps = async () => {
  const [videos, certificates] = await Promise.all([
    getLongVideos(),
    getCertificates(),
  ]);
  return {
    props: { videos, certificates },
    revalidate: CONTENT_REFRESH_SECONDS,
  };
};

export default function Home({ videos, certificates }) {
  return (
    <>
      <About certificateCount={certificates.length} />
      <Speaking />
      <BlogsAndVideos videos={videos} />
      <Projects />
      <Certificates certificates={certificates} />
      <footer
        className="flex items-center flex-wrap"
        style={{ gap: "1em", padding: "2em 0", borderTop: "1px solid #d6dbe3" }}
      >
        <p style={{ margin: 0 }}>&copy; Developed with 🖤 by Dev!</p>
        <BuyMeACoffee />
      </footer>
    </>
  );
}
