import axios from 'axios'

export class Slack {
    private static authToken: string = process.env.slackToken

    static async sendMessageToChannel (channel: string, message: string): Promise<void> {
        const headers = { authorization: `Bearer ${this.authToken}`}

        await axios.post('https://slack.com/api/chat.postMessage', {
            channel,
            text: message
        }, { headers })

        return
    }
}
