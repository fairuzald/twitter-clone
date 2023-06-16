import Head from "next/head";
import React from "react";
interface PageHeadProps {
  title: string;
  websiteName: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
}
const PageHead: React.FC<PageHeadProps> = ({
  title,
  websiteName,
  description,
  logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png",
  faviconUrl,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={websiteName} />
      <meta name="twitter:title" content={websiteName} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta
        name="robots"
        content="follow, index, max-snippet:-1, max-image-preview:large"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={websiteName} />
      <meta property="og:image" content={logoUrl} />
      <meta property="og:image:width" content="1326" />
      <meta property="og:image:height" content="904" />
      <meta name="twitter: image" content={logoUrl} />
      <link rel="icon" href={faviconUrl} />
    </Head>
  );
};

export default PageHead;
