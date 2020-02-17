import Head from 'next/head';

const Meta = ({metaInfo}) => {
  const description = `Checkout ${metaInfo.title} | VisConf. VisConf lets you generate an animated version of talk from transcript and slides.`
  const url = metaInfo.url;
  const ogImage = metaInfo.ogImage;
  const title = metaInfo.title;

  return (
    <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <meta name="theme-color" content="#111111" />
        <meta name="description" content={description} />

        <link rel="icon" sizes="64x64" href="/images/favicon.ico" />
        <link rel="icon" sizes="192x192" href="/images/logo-192.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:creator" content="@saurabhcodes"></meta>


        <meta property="og:image:secure_url" itemProp="image" content={ogImage} />
        <meta property="og:image" itemProp="image" content={ogImage} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="300" />

        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet" />


      <title>{title}</title>
    </Head>
  )
}

export default Meta;