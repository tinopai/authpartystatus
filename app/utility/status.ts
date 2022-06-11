import cache from 'memory-cache';
import Ping from 'ping';
// Get the server's status
const servers: any = {
  "cl01.auth.party": null,
  "ca-east01.auth.party": null,
  "aws.requests.auth.party": null,
  "vercel.auth.party": null,
};
async function getServerStatus() {
  console.log(`[!] Called getServerStatus`)

  for (let server in servers) {
    console.log('in for')
    Ping.promise.probe(server, {
      timeout: 5,
    }).then((res) => {
      servers[server] = res.alive ? 'online' : 'offline';
      if (res.alive && res.time > 1000)
        servers[server] = 'lag';
      cache.put("serverStatus", servers);
    });
  }
  console.log('updating lastupdate')
  cache.put("lastUpdate", new Date());
}

if (
  !cache.get("lastUpdate") ||
  cache.get("lastUpdate") < Date.now() - 1000 * 30
) {
  getServerStatus();
}

export function serverStatusReturn() {
    return {
      servers: cache.get('serverStatus') || servers,
      lastUpdate: cache.get('lastUpdate') || new Date()
    };
}
