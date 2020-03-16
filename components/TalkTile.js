import Link from 'next/link';


async function deleteTalk({timestamp, slug, token}, setAllTalks) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({timestamp, slug})
  }

  const res = await ((await fetch(`${process.env.ENDPOINT}/delete-talk`, options)).json());
  if(res.success === true) {
    setAllTalks();
  }
}

const TalkTile = ({talkData, user, setAllTalks}) => {
  return (
    <div key={talkData.slug} className="main-talk-container shadow">
      <Link href="/[username]/[slug]" as={'/'+ talkData.username + '/' + talkData.slug}>
        <a>
          <div className="main-talk-padding">
            <h2>"{talkData.talkTitle}" @{talkData.eventName}</h2>
            <span className="talk-link">/{talkData.username}/{talkData.slug}</span>
          </div>
        </a>
      </Link>
      {
        user.username === talkData.username
        ? <div className="talk-options-container">
            <Link href={{pathname: 'create', query: {slug: talkData.slug, username: user.username}}}><a className="btn edit-button"><i className="material-icons">edit</i> <span>Edit Talk</span></a></Link>
            <button 
              onClick={e => deleteTalk({timestamp: talkData.timestamp, slug: talkData.slug, token: user.token}, setAllTalks)} 
              className="btn delete-button"
            >
              <i className="material-icons">delete</i> <span>Delete Talk</span>
            </button>
          </div>
        : null
      
      }
      <style jsx>{/* css */`
        a{
          text-decoration: none;
        }
        h2{
          margin: 0px;
          margin-bottom: 5px;
          color: #333;
        }
        .btn{
          border: none;
          display: inline-block;
          background-color: #eee;
          padding: 5px 15px 9px 15px;
          cursor: pointer;
          font-size: 9pt;
          margin-right: 10px;
          color: #333;
          transition: background-color .4s ease;
        }

        .btn:hover{
          background-color: #ddd;
          transition: background-color .4s ease;
        }
        .btn.delete-button{
          color: #f40;
        }
        .material-icons{
          position: relative;
          top: 5px;
          font-size: 13pt;
          margin-right: 5px;
        }
        .talk-options-container{
          padding: 0px 100px 20px 100px;
        }
        .main-talk-container{
          padding: 10px 0px;
          margin: 20px 0px;
          background-color: #fff;
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .main-talk-padding{
          padding: 20px 100px;
        }
        .talk-link{
          color: #999;
        }

        @media (max-width: 768px) {
          .main-talk-padding{
            padding: 30px 20px;
          }
          .talk-options-container{
            padding: 0px 20px 20px 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default TalkTile;