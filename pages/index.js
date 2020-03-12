import Link from 'next/link';
import Bol from 'bol';

function talk() {
  let bol = new Bol('UK English Male');
  bol.speak("Looking cool in nextjs website");
}

export default function Index() {
  return (
    <div>
      <Link href="/[username]/[slug]" as="/me/test">
        <a>Create</a>
      </Link>
      <button onClick={talk}>Talk</button>
      <p>Hello Next.js</p>
    </div>
  );
}