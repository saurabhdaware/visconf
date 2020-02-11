import Head from 'next/head';

const Meta = ({metaInfo}) => {
  return (
    <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <meta name="theme-color" content="#111111" />

        <link rel="icon" sizes="64x64" href="images/favicon.ico" />
        <link rel="icon" sizes="192x192" href="images/logo-192.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="VisConf" />
        <meta property="og:description" content="Hey Speakers! On VisConf you can generate an animated version of your talk from transcript and slides." />
        <meta name="description" content="Hey Speakers! On VisConf you can generate an animated version of your talk from transcript and slides." />
        <meta property="og:url" content="https://visconf.netlify.com" />
        
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:creator" content="@saurabhcodes"></meta>


        <meta property="og:image:secure_url" itemprop="image" content="https://res.cloudinary.com/saurabhdaware/image/upload/c_fill,h_300,w_600/v1580471542/npm/screenshot.png" />
        <meta property="og:image" itemprop="image" content="https://res.cloudinary.com/saurabhdaware/image/upload/c_fill,h_300,w_600/v1580471542/npm/screenshot.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="300" />

        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet" />


      <title>{metaInfo.title}</title>
    </Head>
  )
}

export default Meta;