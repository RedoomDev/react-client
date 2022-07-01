import { Helmet } from 'react-helmet-async'


export default function Helmet(props) {

   const { title, desc, url, type } = props

   const meta = {
      title: "Redoom | Anonim Forum",
      desc: "Redoom, 2022 yılında açılan tamamen anonim olan bir forum sitesidir. Anonim olarak gönderiler paylaşabilirsiniz",
      keywords: "Anonim Forum, Redoom, Anime, Wallpaper, Duvar Kağıdı, Oyun, Bilgisayar Oyunu, Bilgisayar, Siyaset, Yazılım, Tarih, Matematik, Sanat, Ekonomi, Konudışı, Teknoloji, Müzik, Spor, Flood, Flooadlar, Facebook, Filmler, Diziler",
      image: "https://cdn.discordapp.com/attachments/813060800117080105/934792293142102046/Redoom_100_100_px.png",
   }

   return (
      <Helmet>
         <title>{title || meta.title}</title>
         <meta name="title" content={title || meta.title} />
         <meta name="description" content={desc || meta.desc} />
         <meta name="keywords" content={props.keywords || meta.keywords} />
         {props.twitter_card ? <meta property="og:image:width" content="1200" /> : ""}
         {props.twitter_card ? <meta property="og:image:height" content="628" /> : ""}
         <meta property="og:type" content={type || "website"} />
         <meta property="og:url" content={"https://www.redoom.fun/" + (url || "/")} />
         <meta property="og:title" content={title || meta.title} />
         <meta property="og:description" content={desc || meta.desc} />
         <meta property="og:image" content={props.image || meta.image} />
         <meta property="twitter:card" content={props.twitter_card ? "summary_large_image" : "summary"} />
         <meta property="twitter:url" content={"https://www.redoom.fun/" + (url || "/")} />
         <meta property="twitter:title" content={title || meta.title} />
         <meta property="twitter:description" content={desc || meta.desc} />
         <meta property="twitter:image" content={props.image || meta.image} />
      </Helmet>
   )

}