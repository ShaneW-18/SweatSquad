import { client } from '../../db';

export default async function handler(req, res) {

    const checkSince = req.cookies['checkSince'];
    const conversationId = req.cookies['lastConversation'];

    /*
    const messages = client.query({
        query:GET_MESSAGES_SINCE,
        variables:{

        }
    })*/

    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.write("data:");
    res.write("hello\n\n");
    res.end("done\n");
}
  