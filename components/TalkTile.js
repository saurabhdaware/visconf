import Link from 'next/link';

const TalkTile = ({talkData}) => {
  return (
    <Link href="/[username]/[slug]" as={'/'+ talkData.username + '/' + talkData.slug}>
      <a key={talkData.slug} className="main-talk-container shadow">
        <h2>"{talkData.talkTitle}" @{talkData.eventName}</h2>
        <div>
            <span className="talk-link">/{talkData.username}/{talkData.slug}</span>
        </div>
        <style jsx>{/* css */`
        a{
          text-decoration: none;
        }
        h2{
          margin: 0px;
          margin-bottom: 5px;
          color: #333;
        }
        .main-talk-container{
          padding: 30px 100px;
          margin: 20px 0px;
          background-color: #fff;
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .talk-link{
          color: #999;
        }
        `}</style>
      </a>
    </Link>
  )
}

export default TalkTile;