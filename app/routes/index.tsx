import Twemoji from '../Twemoji';

// const loader: LoaderFunction = async () => {
//   return {

//   }
// }

import { serverStatusReturn } from '~/utility/status';
function getCache(server: string): string {
  return serverStatusReturn().servers[server];
}
function setServers() {
  return [
    {
      name: 'Chile #1',
      hostname: 'cl01.auth.party',
      status: getCache('cl01.auth.party'),
      emoji: '🇨🇱'
    },
    {
      name: 'Canada East #1',
      hostname: 'ca-east01.auth.party',
      status: getCache('ca-east01.auth.party'),
      emoji: '🇨🇦'
    },
    {
      name: 'Requests API',
      hostname: 'aws.requests.auth.party',
      status: getCache('aws.requests.auth.party'),
      emoji: '🇺🇸'
    },
    {
      name: 'Vercel',
      hostname: 'vercel.auth.party',
      status: getCache('vercel.auth.party'),
      emoji: '🗄️'
    },
  ];
}
let servers = setServers();
const statusColor: any = {
  'online': 'text-green-500',
  'lag': 'text-yellow-500',
  'offline': 'text-red-500'
}

export default function Index() {
  return (
    <div className="background: #000">
      <div className="h-screen w-screen flex justify-center items-center bg-black-700">
        <div className="text-center">
          <div className="flex justify-center">
          </div>
          <a
            className="text-white hover:text-blue-700 duration-300 text-5xl font-bold"
            href="https://auth.party"
            target="_blank"
            rel="noreferrer"
          >
            auth.party
          </a>
          <p className="text-2xl text-gray-300 font-thin">List of our server's status</p>
          <div className="mt-8 text-white text-xl">
            {
              servers.map((server, index)=>{
                return (
                  <div key={`Server${index}`} className="flex items-center justify-between gap-x-8 w-full">
                    <div className='flex gap-x-2 text-2xl'>
                      <Twemoji emoji={server.emoji}/>
                      <p>{server.name}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <p className="text-sm font-mono text-gray-400">({server.hostname})</p>
                      <p className={`${statusColor[server.status]} text-2xl`}>•</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="mt-8 text-white">
            <p className="text-xl">Color code</p>
            <div className="leading-5 text-left">
              <p className="text-green-500">• Online</p>
              <p className="text-yellow-500">• Overloaded</p>
              <p className="text-red-500">• Offline</p>
              <p className="">• Status not available/updating status...</p>
            </div>
          </div>
        </div>
        <footer className="Footer">
          <p>auth.party, built by Valentino Berta</p>
          <div className="space-x-1">
            <a className="link" href="mailto:tino@auth.party">
              tino@auth.party
            </a>
            <a className="link" href="mailto:hello@ice.uy">
              hello@ice.uy
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
